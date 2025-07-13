import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sampleReports } from '@/app/lib/data';
import { ArrowLeft, Calendar, Hash, ArrowRight } from 'lucide-react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ReportPage({ params }: PageProps) {
    const { id } = await params;
    const report = sampleReports.find(r => r.id === id);

    if (!report) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Reports</span>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <article className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg">
                                <Hash className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-primary">
                                    Progress Report #{report.number}
                                </h1>
                                <div className="flex items-center text-muted-foreground mt-1">
                                    <Calendar className="h-5 w-5" />
                                    <span className="ml-2">{formatDate(report.date)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border rounded-lg p-8 space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold mb-6">What I Accomplished</h2>
                            <div className="space-y-4">
                                {report.items.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <span className="text-primary text-lg font-bold">-</span>
                                        <p className="text-foreground/90 leading-relaxed text-lg">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {report.link && (
                            <section>
                                <h2 className="text-xl font-semibold mb-6">Related Link</h2>
                                <div className="bg-secondary/20 border border-secondary rounded-lg p-4">
                                    <a
                                        href={report.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline font-medium text-lg"
                                    >
                                        {report.link.name}
                                    </a>
                                </div>
                            </section>
                        )}

                        {report.tags && report.tags.length > 0 && (
                            <section>
                                <h2 className="text-xl font-semibold mb-6">Technologies & Topics</h2>
                                <div className="flex flex-wrap gap-3">
                                    {report.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-medium"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="pt-8 border-t text-center">
                            <p className="text-3xl font-bold text-primary">WAGMI💪</p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-between">
                        <div>
                            {report.number > 1 && (
                                <Link
                                    href={`/report/${sampleReports.find(r => r.number === report.number - 1)?.id}`}
                                    className="inline-flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                    <span>PR #{report.number - 1}</span>
                                </Link>
                            )}
                        </div>

                        <div>
                            {sampleReports.find(r => r.number === report.number + 1) && (
                                <Link
                                    href={`/report/${sampleReports.find(r => r.number === report.number + 1)?.id}`}
                                    className="inline-flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <span>PR #{report.number + 1}</span>
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}

export async function generateStaticParams() {
    return sampleReports.map((report) => ({
        id: report.id,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const report = sampleReports.find(r => r.id === id);

    if (!report) {
        return {
            title: 'Report Not Found',
        };
    }

    return {
        title: `Progress Report #${report.number} - PR Logs`,
        description: `Progress report from ${report.date} covering ${report.items.length} accomplishments`,
    };
} 