# MarketSight: Financial News Sentiment Analysis

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
├── backend/      # FastAPI service: sentiment inference and news endpoints
├── frontend/     # React + TypeScript dashboard
└── README.md
```

## How It Works

1. **Data prep:** Financial PhraseBank is cleaned and explored (class balance, text length, vocabulary).
2. **Features:** TF-IDF vectorization produces the feature matrix for classical models.
3. **Models:** Classical classifiers on TF-IDF are benchmarked against FinBERT. Class imbalance is handled with SMOTE.
4. **Serving:** The best model is loaded by the FastAPI backend and exposed as an API.
5. **Dashboard:** The React frontend lets you enter a ticker (e.g. `AAPL`) and view the latest sentiment analysis.

## Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at `http://localhost:8000`. Interactive docs at `/docs`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analyze/{ticker}` | Latest sentiment analysis for a company |
| GET | `/companies` | Supported companies |

<!-- Update endpoints to match your actual routes -->

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`. Set the backend URL in `.env`:

```
VITE_API_URL=http://localhost:8000
```
