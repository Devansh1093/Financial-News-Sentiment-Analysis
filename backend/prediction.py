import joblib
from pathlib import Path
from scipy import sparse
import pandas as pd






model_folder = Path(__file__).parent/"models"


tfidf = joblib.load(model_folder / "tfidf.pkl")
model = joblib.load(model_folder / "svm.pkl")
reverse_map =joblib.load(model_folder / "reverse_map.pkl")



def predict_sentiment(text):
    X_tfidf = tfidf.transform([text])

    word_count = len(text.split())
    char_count = len(text)
    avg_word_length = char_count / word_count if word_count > 0 else 0
    digit_count = sum(c.isdigit() for c in text)

    manual = pd.DataFrame([[
        word_count,
        char_count,
        avg_word_length,
        digit_count
    ]])
    X = sparse.hstack([X_tfidf, manual])



    pred = model.predict(X)[0]

    label = reverse_map[pred]


    sentiment = {
        -1: "Negative",
         0: "Neutral",
         1: "Positive"
    }


    return sentiment[label]

