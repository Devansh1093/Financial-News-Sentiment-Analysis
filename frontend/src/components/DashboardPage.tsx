import { useEffect, useState, type FormEvent } from "react";
import SummaryCard from "./SummaryCard";
import CompanyCard from "./CompanyCard";
import api from "../api";
import SentimentChart from "./SentimentChart";
import RecentHeadlines from "./Headline";

import { Building2, Newspaper, Brain } from "lucide-react";

type StockAnalysis = {
  ticker: string;
  overall_sentiment: string;
  total_articles: number;
  summary: Record<string, number>;
  headlines: { headline: string; sentiment: string }[];
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("");
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!selectedTicker) {
      setAnalysis(null);
      setLoading(false);
      setError("");
      return () => { active = false; };
    }

    setLoading(true);
    setError("");

    api.get<StockAnalysis>(`/stock/${encodeURIComponent(selectedTicker)}`)
      .then(({ data }) => { if (active) setAnalysis(data); })
      .catch(() => { if (active) { setAnalysis(null); setError("Unable to load company news. Please try again."); } })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [selectedTicker]);

  const searchCompany = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const company = searchTerm.trim();
    if (company) setSelectedTicker(company);
  };

  const handleCompanyClick = (ticker: string) => {
    setSearchTerm(ticker);
    setSelectedTicker(ticker);
  };
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-6">

      {/* Welcome Section */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome Back 
          </h1>

          <p className="text-muted-foreground">
            Predict market trends from financial news.
          </p>
        </div>

      </section>

      {/* Market Overview */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          Market Overview
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <SummaryCard
            title="Companies"
            value="100+"
            description="Supported"
            icon={<Building2 className="h-6 w-6" />}
          />

          <SummaryCard
            title="Articles"
            value="2500+"
            description="Analyzed"
            icon={<Newspaper className="h-6 w-6" />}
          />

          <SummaryCard
            title="Accuracy"
            value="75%"
            description="ML Model"
            icon={<Brain className="h-6 w-6" />}
          />

        </div>
      </section>

      {/* Popular Companies & Latest Analysis */}
      <section className="grid grid-cols-3 gap-6">
  <div>
    <h2 className="mb-4 text-lg font-semibold">
      Popular Companies
    </h2>

    <div className="space-y-4">

      <CompanyCard
        name="Apple"
        ticker="AAPL"
        onClick={() => handleCompanyClick("AAPL")}
      />

      <CompanyCard
        name="Tesla"
        ticker="TSLA"
        onClick={() => handleCompanyClick("TSLA")}
      />

      <CompanyCard
        name="Microsoft"
        ticker="MSFT"
        onClick={() => handleCompanyClick("MSFT")}
      />

      <CompanyCard
        name="Google"
        ticker="GOOGL"
        onClick={() => handleCompanyClick("GOOGL")}
      />

      <CompanyCard
        name="Amazon"
        ticker="AMZN"
        onClick={() => handleCompanyClick("AMZN")}
      />

      <CompanyCard
        name="NVIDIA"
        ticker="NVDA"
        onClick={() => handleCompanyClick("NVDA")}
      />

    </div>
  </div>

  

  <div className="col-span-2 rounded-xl border p-6">
    <h2 className="mb-4 text-lg font-semibold">
      
      Latest Analysis

    </h2>
    <form onSubmit={searchCompany} className="mb-4 flex gap-2">
      <input
        className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2"
        aria-label="Company name or ticker"
        placeholder="Search a company or ticker (e.g. Meta or META)"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
        type="submit"
        disabled={!searchTerm.trim() || loading}
        className="rounded-md bg-cyan-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Analyze
      </button>
    </form>
    {!selectedTicker && <p className="text-sm text-muted-foreground">Search for a company or choose one from Popular Companies.</p>}
    {loading && <p className="text-sm text-muted-foreground">Loading {selectedTicker} analysis…</p>}
    {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
    {analysis && !loading && <>
      <p>Overall Sentiment: <strong>{analysis.overall_sentiment}</strong></p>
      <p>Total Articles: {analysis.total_articles}</p>
    </>}
  </div>

</section>

      {/* Chart & Headlines */}
      <section className="grid grid-cols-2 gap-6">

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Sentiment Chart{analysis ? ` · ${analysis.ticker}` : ""}
          </h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading sentiment…</p> : error ? null :
            <SentimentChart summary={analysis?.summary ?? {}} />}
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Recent Headlines{analysis ? ` · ${analysis.ticker}` : ""}
          </h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading headlines…</p> : error ? null :
            <RecentHeadlines data={analysis?.headlines ?? []} />}
        </div>

      </section>

    </div>
  );
}
