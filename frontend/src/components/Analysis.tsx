import { useState } from "react";
import api from "../api";

type StockAnalysis = {
  ticker: string;
  overall_sentiment: string | null;
  total_articles: number;
};

export default function Analysis() {
  const [ticker, setTicker] = useState("");
  const [result, setResult] = useState<StockAnalysis | null>(null);

  const analyze = async () => {
    try {
      const response = await api.get<StockAnalysis>(`/stock/${encodeURIComponent(ticker.trim())}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        className="border p-2 rounded"
        placeholder="AAPL"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />

      <button
        onClick={analyze}
        className="bg-cyan-500 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <div className="border rounded-xl p-4">
          <h2>{result.ticker}</h2>

          <p>
            Overall Sentiment: <strong>{result.overall_sentiment ?? "Unavailable"}</strong>
          </p>

          <p>Total Articles: {result.total_articles}</p>
          {result.total_articles === 0 && (
            <p className="text-sm text-muted-foreground">No recent news articles were found for this company.</p>
          )}
        </div>
      )}
    </div>
  );
}
