
import SummaryCard from "./SummaryCard";
import CompanyCard from "./CompanyCard";
import LatestAnalysis from "./Analysis";
import RecentHeadlines from "./Headline";
import {
  Building2,
  Newspaper,
  Brain,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const handleCompanyClick = (ticker: string) => { 
    console.log(ticker);
  }
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
            value="73%"
            description="ML Model"
            icon={<Brain className="h-6 w-6" />}
          />

          <SummaryCard
            title="API Status"
            value="Online"
            description="FastAPI"
            icon={<Activity className="h-6 w-6" />}
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
    <LatestAnalysis />
  </div>

</section>

      {/* Chart & Headlines */}
      <section className="grid grid-cols-2 gap-6">

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Sentiment Chart
          </h2>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Recent Headlines
          </h2>
        </div>

      </section>

    </div>
  );
}