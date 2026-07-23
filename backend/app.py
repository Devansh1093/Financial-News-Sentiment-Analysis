from fastapi import FastAPI
from prediction import predict_sentiment
from pydantic import BaseModel
from news_fetcher import get_news
from analysis import analyze
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    text:str

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