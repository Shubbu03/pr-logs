import { Header } from './components/header';
import { ProgressSummary } from './components/progress-summary';
import { GitHubContributions } from './components/github-contributions';
import { sampleReports } from './lib/data';
import Link from 'next/link';

export default function Home() {
  const recentReports = sampleReports
    .sort((a, b) => b.number - a.number)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Progress Reports
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my learning journey, technical achievements, and progress.
            Building in public, one report at a time.
          </p>
        </section>

        <GitHubContributions username="Shubbu03" />

        <section id="reports">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Latest Progress Reports</h2>
            <div className="text-sm text-muted-foreground">
              Showing latest {recentReports.length} of {sampleReports.length} reports
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {recentReports.map((report) => (
              <ProgressSummary key={report.id} report={report} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="/reports"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              See All Reports ({sampleReports.length})
            </Link>
          </div>
        </section>

        <section className="mt-16 text-center">
          <div className="bg-card border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Follow my journey on Twitter for real-time updates and more insights.
            </p>
            <a
              href="https://x.com/blackbaloon03"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
            >
              Follow on X
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {`© ${new Date().getFullYear()} PR Logs.`}
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-sm font-bold text-muted-foreground">
                WAGMI 💪
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
