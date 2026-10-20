import { useEffect, useState, type FormEvent } from "react";
import SummaryCard from "./SummaryCard";
import api from "../api";
import SentimentChart from "./SentimentChart";
import RecentHeadlines from "./Headline";

import { Building2, Newspaper, Brain, MessagesSquare } from "lucide-react";

type StockAnalysis = {
  ticker: string;
  overall_sentiment: string | null;
  total_articles: number;
  summary: Record<string, number>;
  headlines: { headline: string; sentiment: string }[];
};

type RecentAnalysis = {
  ticker: string;
  total_articles: number;
  overall_sentiment: string | null;
  analyzed_at: string;
};

type MarketDiscussion = {
  ticker: string;
  total_articles: number;
};

const RECENT_ANALYSES_KEY = "finance-recent-analyses";

function RecentAnalyses({
  analyses,
  onSelect,
}: {
  analyses: RecentAnalysis[];
  onSelect: (ticker: string) => void;
}) {
  return (
    <div className="space-y-2">
      {analyses.length === 0 ? (
        <p className="text-sm text-muted-foreground">No analyses yet. Search for a company to get started.</p>
      ) : (
        analyses.map((item) => (
            <button
              key={item.ticker}
              type="button"
              onClick={() => onSelect(item.ticker)}
              className="flex w-full items-center justify-between rounded-lg border p-3 text-left transition hover:border-cyan-500 hover:shadow-sm"
            >
              <span className="min-w-0">
                <span className="block">
                  <strong>{item.ticker}</strong>
                  <span className="ml-2 text-xs text-muted-foreground">{item.total_articles} articles</span>
                </span>
                <span className="block text-xs text-muted-foreground">
                  {new Date(item.analyzed_at).toLocaleString()}
                </span>
              </span>
              <span className="text-sm text-muted-foreground">
                {item.overall_sentiment ?? "Unavailable"}
              </span>
            </button>
        ))
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("");
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_ANALYSES_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed as RecentAnalysis[] : [];
    } catch {
      return [];
    }
  });
  const [mostDiscussed, setMostDiscussed] = useState<MarketDiscussion | null>(null);
  const [marketDiscussionLoading, setMarketDiscussionLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get<{ most_discussed: MarketDiscussion[] }>("/market-movers", {
      params: { timezone_offset_minutes: new Date().getTimezoneOffset() },
    })
      .then(({ data }) => {
        if (active) setMostDiscussed(data.most_discussed?.[0] ?? null);
      })
      .catch(() => {
        if (active) setMostDiscussed(null);
      })
      .finally(() => {
        if (active) setMarketDiscussionLoading(false);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem(RECENT_ANALYSES_KEY, JSON.stringify(recentAnalyses));
  }, [recentAnalyses]);

  useEffect(() => {
    if (!analysis) return;
    const latest: RecentAnalysis = {
      ticker: analysis.ticker,
      total_articles: analysis.total_articles,
      overall_sentiment: analysis.overall_sentiment,
      analyzed_at: new Date().toISOString(),
    };
    setRecentAnalyses((current) => [
      latest,
      ...current.filter((item) => item.ticker !== latest.ticker),
    ].slice(0, 5));
  }, [analysis]);

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

          <SummaryCard
            title="Most Discussed Today"
            value={marketDiscussionLoading ? "…" : mostDiscussed?.ticker ?? "—"}
            description={mostDiscussed
              ? `${mostDiscussed.total_articles} articles across tracked companies`
              : marketDiscussionLoading ? "Loading market news" : "No market news available today"}
            icon={<MessagesSquare className="h-6 w-6" />}
          />

        </div>
      </section>

      {/* Recent Analyses & Latest Analysis */}
      <section className="grid grid-cols-3 gap-6">
  <div className="space-y-6">
    <h2 className="text-lg font-semibold"> History</h2>
    <RecentAnalyses analyses={recentAnalyses} onSelect={handleCompanyClick} />
  </div>

  

  <div className="col-span-2 rounded-xl border p-6">
    <h2 className="mb-4 text-lg font-semibold">
      
      Search Company

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
    {!selectedTicker && <p className="text-sm text-muted-foreground">Search for a company to view its latest sentiment analysis.</p>}
    {loading && <p className="text-sm text-muted-foreground">Loading {selectedTicker} analysis…</p>}
    {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
    {analysis && !loading && <>
      <p>Overall Sentiment: <strong>{analysis.overall_sentiment ?? "Unavailable"}</strong></p>
      <p>Total Articles: {analysis.total_articles}</p>
      {analysis.total_articles === 0 &&
        <p className="text-sm text-muted-foreground">No recent news articles were found for this company.</p>}
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
