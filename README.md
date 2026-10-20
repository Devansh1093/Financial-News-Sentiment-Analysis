# MarketSight: Financial News Sentiment Analysis

Predict market trends from financial news. MarketSight classifies the sentiment of financial headlines and articles with an ML model, that serves the results through a FastAPI backend and a React dashboard.

**Live demo:** <!-- add production URL -->

<!-- ![MarketSight dashboard](docs/dashboard.png) -->

## Highlights
- 2,500 articles analyzed
- 75% model accuracy on sentiment classification
- Live news pipeline: fetch, score and display sentiment per ticker

## Tech Stack

| Layers | Tools |
|-------|-------|
| ML / NLP | Python, scikit-learn, TF-IDF,imbalanced-learn (SMOTE) |
| Data | Financial PhraseBank, Yahoo Fianance |
| Backend | FastAPI, Uvicorn |
| Frontend | React, TypeScript |

## Project Structure

```
.
├── Data/         # Raw and processed datasets
├── Notebooks/    # EDA, feature engineering, model training
├── backend/      # FastAPI service: sentiment inference and news endpoints
├── frontend/     # React + TypeScript dashboard
└── README.md
```

## How It Works

1. **Data preprocessing:** Financial PhraseBank is cleaned and explored (class balance, text length, vocabulary).
2. **Features:** TF-IDF vectorization produces the feature matrix for classical models.
3. **Model:** Classical classifiers on TF-IDF are benchmarked against FinBERT. Class imbalance is handled with SMOTE.
4. **Serving:** The best model is loaded by the FastAPI backend and exposed as an API.
5. **Dashboard:** The React frontend lets you enter a ticker (e.g. `AAPL`) and view the latest sentiment analysis.

## Backend
Backend is running on Render
https://finance-backend-zys6.onrender.com/

## Frontend
The application is deployed on vercel.
https://financial-news-sentiment-analysis-kappa.vercel.app/
