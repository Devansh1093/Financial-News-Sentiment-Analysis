import json
import logging
import os
from urllib.parse import urlencode
from urllib.error import HTTPError
from urllib.request import urlopen

import yfinance as yf

logger = logging.getLogger(__name__)


COMPANY_TICKERS = {
    "APPLE": "AAPLE",
    "TESLA": "TESLA",
    "MICROSOFT": "MSFT",
    "GOOGLE": "GOOGLE",
    "ALPHABET": "GOOGLE",
    "AMAZON": "AMZN",
    "NVIDIA": "NVDA",
    "META": "META",
    "FACEBOOK": "META",
}


def normalize_ticker(value):
    value = value.strip().upper()
    return COMPANY_TICKERS.get(value, value)


def get_news(ticker):
    ticker = normalize_ticker(ticker)
    headlines = []
    try:
        stock = yf.Ticker(ticker)
        for article in stock.news or []:
            content = article.get("content")
            title = (content.get("title") if isinstance(content, dict) else None) or article.get("title")
            if title:
                headlines.append(title)
    except Exception:
        logger.exception("yfinance news lookup failed for %s", ticker)

    if headlines:
        return headlines

    # Yahoo's search endpoint may still return news when Ticker.news is empty.
    try:
        search_news = yf.Search(ticker, news_count=5).news
        for article in search_news or []:
            content = article.get("content")
            title = (content.get("title") if isinstance(content, dict) else None) or article.get("title")
            if title:
                headlines.append(title)
    except Exception:
        logger.exception("yfinance search news lookup failed for %s", ticker)

    if headlines:
        return headlines

    token = os.getenv("MARKETAUX_API_TOKEN")
    if not token:
        logger.warning("No yfinance headlines for %s and MARKETAUX_API_TOKEN is not configured", ticker)
        return []

    params = urlencode({
        "api_token": token,
        "symbols": ticker,
        "filter_entities": "true",
        "language": "en",
        "limit": 3,
    })
    url = f"https://api.marketaux.com/v1/news/all?{params}"

    try:
        with urlopen(url, timeout=15) as response:
            payload = json.loads(response.read().decode("utf-8"))
        return [
            article["title"]
            for article in payload.get("data", [])
            if article.get("title")
        ]
    except HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        logger.error("Marketaux rejected the news request for %s (HTTP %s): %s", ticker, error.code, details)
        return []
    except Exception:
        logger.exception("Marketaux news lookup failed for %s", ticker)
        return []




