# MarketSight — Financial News Sentiment Analysis

Predict market trends from financial news. MarketSight classifies the sentiment of financial headlines and articles with an ML model, then serves the results through a FastAPI backend and a React dashboard.

**Live demo:** <!-- add production URL -->

<!-- ![MarketSight dashboard](docs/dashboard.png) -->

## Highlights

- 100+ supported companies
- 2,500+ articles analyzed
- ~75% model accuracy on sentiment classification
- Live news pipeline: fetch, score and display sentiment per ticker

## Tech Stack

| Layer | Tools |
|-------|-------|
| ML / NLP | Python, scikit-learn, TF-IDF, FinBERT, imbalanced-learn (SMOTE) |
| Data | Financial PhraseBank, news datasets, pandas |
| Backend | FastAPI, Uvicorn |
| Frontend | React, TypeScript |
| Experimentation | Jupyter Notebooks |

## Project Structure

```
.
├── Data/         # Raw and processed datasets
├── Notebooks/    # EDA, feature engineering, model training
├── backend/      # FastAPI service: sentiment inference + news endpoints
├── frontend/     # React + TypeScript dashboard
└── README.md
```

## How
