from collections import Counter


def analyze(results):
    sentiments = [item["sentiment"] for item in results]
    counts = Counter(sentiments)
    summary = {
        "Positive": counts.get("Positive",0),
        "Neutral": counts.get("Neutral",0),
        "Negative": counts.get("Negative",0)
    }

    overall = max(summary,key = summary.get)

    return {
        "overall_sentiment": overall,
        "summary": summary,
        "total_articles": len(results)
    }