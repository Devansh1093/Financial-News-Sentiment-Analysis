from datetime import datetime, timezone
import logging

from fastapi import FastAPI, Query
from prediction import predict_sentiment
from pydantic import BaseModel
from news_fetcher import get_news, get_news_articles, normalize_ticker, start_of_today_utc
from analysis import analyze
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://financial-news-sentiment-analysis-kappa.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    text:str


MARKET_MOVERS_TICKERS = ["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "NVDA"]

@app.get("/")
def home():
    return{"message":"API is running"}



@app.post("/prediction")
def predict(request:NewsRequest):
    sentiment = predict_sentiment(request.text)

    

    return{
        "headline": request.text,
        "sentiment": sentiment
    }



@app.get("/stock/{ticker}")

def stock_sentiment(ticker: str):
    ticker = normalize_ticker(ticker)
    headlines = get_news(ticker)

    results = []

    for headline in headlines:
        sentiment = predict_sentiment(headline)

        results.append({
            "headline": headline,
            "sentiment": sentiment

        })

    analysis = analyze(results)

    return {
    "ticker": ticker,
    "overall_sentiment": analysis["overall_sentiment"],
    "summary": analysis["summary"],
    "total_articles": analysis["total_articles"],
    "headlines": results
      }


@app.get("/market-movers")
def market_movers(timezone_offset_minutes: int = Query(default=0, ge=-840, le=840)):
    published_after = start_of_today_utc(timezone_offset_minutes)
    positive = []
    negative = []
    discussed = []

    for ticker in MARKET_MOVERS_TICKERS:
        try:
            articles = get_news_articles(ticker, published_after=published_after)
            if not articles:
                continue

            valid_headlines = [
                article["headline"]
                for article in articles
                if isinstance(article.get("headline"), str) and article["headline"].strip()
            ]
            if not valid_headlines:
                continue

            discussed.append({"ticker": ticker, "total_articles": len(valid_headlines)})

            sentiments = [predict_sentiment(headline) for headline in valid_headlines]

            positive_count = sentiments.count("Positive")
            negative_count = sentiments.count("Negative")
            total_articles = len(sentiments)
            score = (positive_count - negative_count) / total_articles

            company = {
                "ticker": ticker,
                "total_articles": total_articles,
                "positive_count": positive_count,
                "negative_count": negative_count,
                "sentiment_score": round(score, 3),
            }
            if score > 0:
                positive.append(company)
            elif score < 0:
                negative.append(company)
        except Exception:
            # A single ticker's provider/model error should not make the whole dashboard fail.
            logging.getLogger(__name__).exception("Unable to calculate today's sentiment for %s", ticker)

    positive.sort(key=lambda item: (item["sentiment_score"], item["total_articles"]), reverse=True)
    negative.sort(key=lambda item: (item["sentiment_score"], -item["total_articles"]))
    discussed.sort(key=lambda item: item["total_articles"], reverse=True)

    return {
        "as_of": datetime.now(timezone.utc).isoformat(),
        "most_discussed": discussed[:3],
        "top_positive": positive[:3],
        "top_negative": negative[:3],
    }
