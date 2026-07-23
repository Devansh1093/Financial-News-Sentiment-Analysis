import yfinance as yf


def get_news(ticker):
    stock = yf.Ticker(ticker)
    news = stock.news

    headlines=[]
    for article in news:
        headlines.append(article["content"]["title"])

    return headlines




