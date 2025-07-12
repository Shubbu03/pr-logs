'use client';

import { ThemeToggle } from './theme-toggle';
import { BicepsFlexed } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                            <BicepsFlexed className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">PR Logs</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex items-center space-x-6">
                            <a
                                href="#reports"
                                className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                            >
                                Reports
                            </a>
                            <a
                                target='_blank'
                                rel="noopener noreferrer"
                                href="https://forkyou.dev/user/blackbaloon03"
                                className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                            >
                                Forkyou
                            </a>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
} 