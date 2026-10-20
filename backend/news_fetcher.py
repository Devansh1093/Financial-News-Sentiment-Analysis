import json
import logging
import os
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import urlopen

import yfinance as yf

logger = logging.getLogger(__name__)

COMPANY_TICKERS = {
    "APPLE": "AAPL",
    "TESLA": "TSLA",
    "MICROSOFT": "MSFT",
    "GOOGLE": "GOOGL",
    "ALPHABET": "GOOGL",
    "AMAZON": "AMZN",
    "NVIDIA": "NVDA",
    "META": "META",
    "FACEBOOK": "META",
}


def normalize_ticker(value):
    value = value.strip().upper()
    return COMPANY_TICKERS.get(value, value)


def _published_time(article):
    content = article.get("content")
    value = content.get("pubDate") if isinstance(content, dict) else None
    value = value or article.get("pubDate") or article.get("providerPublishTime") or article.get("published_at")

    if isinstance(value, (int, float)):
        return datetime.fromtimestamp(value, tz=timezone.utc)
    if isinstance(value, str):
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
            return parsed.replace(tzinfo=timezone.utc) if parsed.tzinfo is None else parsed.astimezone(timezone.utc)
        except ValueError:
            return None
    return None


def _normalize_article(article, published_after=None):
    if not isinstance(article, dict):
        return None

    content = article.get("content")
    title = (content.get("title") if isinstance(content, dict) else None) or article.get("title")
    published_at = _published_time(article)
    if not isinstance(title, str) or not title.strip() or (published_after and (not published_at or published_at < published_after)):
        return None

    return {"headline": title.strip(), "published_at": published_at}


def _filter_articles(articles, published_after=None):
    normalized = []
    seen = set()
    for article in articles or []:
        item = _normalize_article(article, published_after)
        if item and item["headline"].casefold() not in seen:
            normalized.append(item)
            seen.add(item["headline"].casefold())
    return normalized


def _get_marketaux_news(ticker, published_after=None):
    token = os.getenv("MARKETAUX_API_TOKEN")
    if not token:
        logger.warning("MARKETAUX_API_TOKEN is not configured; skipping Marketaux for %s", ticker)
        return []

    params = {
        "api_token": token,
        "symbols": ticker,
        "filter_entities": "true",
        "language": "en",
        "limit": 3,
    }
    if published_after:
        params["published_after"] = published_after.strftime("%Y-%m-%dT%H:%M")

    url = f"https://api.marketaux.com/v1/news/all?{urlencode(params)}"
    try:
        with urlopen(url, timeout=15) as response:
            payload = json.loads(response.read().decode("utf-8"))
        return _filter_articles(payload.get("data", []), published_after)
    except HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        logger.error("Marketaux rejected the news request for %s (HTTP %s): %s", ticker, error.code, details)
    except Exception:
        logger.exception("Marketaux news lookup failed for %s", ticker)
    return []


def get_news_articles(ticker, published_after=None):
    ticker = normalize_ticker(ticker)

    try:
        articles = _filter_articles(yf.Ticker(ticker).news, published_after)
        if articles:
            return articles
    except Exception:
        logger.exception("yfinance news lookup failed for %s", ticker)

    # Yahoo Search can return headlines when the Ticker.news endpoint is empty.
    try:
        search_news = yf.Search(ticker, news_count=10).news
        articles = _filter_articles(search_news, published_after)
        if articles:
            return articles
    except Exception:
        logger.exception("yfinance search news lookup failed for %s", ticker)

    # Marketaux remains the final fallback and is filtered to today's articles when requested.
    return _get_marketaux_news(ticker, published_after)


def get_news(ticker):
    return [article["headline"] for article in get_news_articles(ticker)]


def start_of_today_utc(timezone_offset_minutes=0):
    local_timezone = timezone(timedelta(minutes=-timezone_offset_minutes))
    local_now = datetime.now(timezone.utc).astimezone(local_timezone)
    return local_now.replace(hour=0, minute=0, second=0, microsecond=0).astimezone(timezone.utc)
