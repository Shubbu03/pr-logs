import { Header } from '../components/header';
import { ProgressSummary } from '../components/progress-summary';
import { sampleReports } from '../lib/data';
import Link from 'next/link';

export default function AllReportsPage() {
    const allReports = sampleReports
        .sort((a, b) => b.number - a.number);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                                All Progress Reports
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Complete collection of my learning journey and technical achievements.
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">All Reports</h2>
                        <div className="text-sm text-muted-foreground">
                            {allReports.length} reports total
                        </div>
                    </div>

                    <div className="grid gap-4 sm:gap-6">
                        {allReports.map((report) => (
                            <ProgressSummary key={report.id} report={report} />
                        ))}
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