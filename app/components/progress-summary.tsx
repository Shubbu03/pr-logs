"use client";

import Link from 'next/link';
import { ProgressReport as ProgressReportType } from '@/app/types/progress';

import { Calendar, Hash, ArrowRight } from 'lucide-react';

interface ProgressSummaryProps {
    report: ProgressReportType;
}

export function ProgressSummary({ report }: ProgressSummaryProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Link href={`/report/${report.id}`}>
            <article className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer group">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Hash className="h-4 w-4" />
                            <h2 className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
                                pr#{report.number}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span className="ml-1">{formatDate(report.date)}</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        {report.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <span className="text-primary mt-1 text-sm">-</span>
                                <p className="text-foreground/80 leading-relaxed text-sm line-clamp-1">
                                    {item}
                                </p>
                            </div>
                        ))}
                        {report.items.length > 2 && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span className="text-primary">-</span>
                                <span>and {report.items.length - 2} more items...</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex flex-wrap gap-1">
                            {report.tags?.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-secondary/60 text-secondary-foreground px-2 py-1 rounded-md"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {report.tags && report.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground px-2 py-1">
                                    +{report.tags.length - 3}
                                </span>
                            )}
                        </div>

                        {report.link && (
                            <div className="flex items-center">
                                <a
                                    href={report.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {report.link.name}
                                </a>
                            </div>
                        )}

                    </div>
                </div>
            </article>
        </Link>
    );
} 