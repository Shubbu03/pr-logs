import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Progress Report Not Found</h2>
                    <p className="text-muted-foreground">
                        The progress report you&apos;re looking for doesn&apos;t exist or may have been moved.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <Home className="h-5 w-5" />
                        <span className="ml-2">Back to Reports</span>
                    </Link>

                    <p className="text-sm text-muted-foreground">
                        Or browse all available progress reports on the homepage.
                    </p>
                </div>
            </div>
        </div>
    );
} 