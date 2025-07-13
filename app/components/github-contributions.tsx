'use client';

import { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, Users, BookOpen, GitFork, TrendingUp, Zap, Calendar } from 'lucide-react';
import Image from 'next/image';

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
}

interface ContributionWeek {
    contributionDays: Array<{
        date: string;
        contributionCount: number;
    }>;
}

interface ContributionStats {
    totalContributions: number;
    longestStreak: number;
    currentStreak: number;
    lastWeekTotal: number;
    mostActiveDay: string;
    averageDaily: number;
}

interface GitHubContributionsProps {
    username?: string;
}

interface GitHubContributionData {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface GitHubEvent {
    type: string;
    created_at: string;
    repo?: {
        name: string;
    };
}

export function GitHubContributions({ username = "Shubbu03" }: GitHubContributionsProps) {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [contributionStats, setContributionStats] = useState<ContributionStats | null>(null);
    const [recentRepos, setRecentRepos] = useState<string[]>([]);

    const fetchGitHubData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) {
                throw new Error(`User not found: ${userResponse.status}`);
            }
            const userData = await userResponse.json();
            setUser(userData);

            const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
            if (eventsResponse.ok) {
                const eventsData = await eventsResponse.json();
                const stats = calculateContributionStats(eventsData);
                setContributionStats(stats);

                const repos = extractRecentRepos(eventsData);
                setRecentRepos(repos);
            }

            if (token && token !== 'your_github_token_here') {
                await fetchDetailedContributions(token);
            }

        } catch (err) {
            console.error('GitHub API Error:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchGitHubData();
    }, [fetchGitHubData]);

    const fetchDetailedContributions = async (token: string) => {
        try {
            const query = `
                query($username: String!) {
                    user(login: $username) {
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                                weeks {
                                    contributionDays {
                                        date
                                        contributionCount
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables: { username } }),
            });

            if (response.ok) {
                const data = await response.json();
                const contributions = data.data?.user?.contributionsCollection?.contributionCalendar;

                if (contributions) {
                    const detailedStats = calculateDetailedStats(contributions);
                    setContributionStats(detailedStats);
                }
            }
        } catch (err) {
            console.warn('GraphQL fetch failed, using fallback:', err);
        }
    };

    const calculateDetailedStats = (contributions: GitHubContributionData): ContributionStats => {
        const { totalContributions, weeks } = contributions;
        const allDays = weeks.flatMap((week: ContributionWeek) => week.contributionDays);

        const { longestStreak, currentStreak } = calculateStreaks(allDays);

        const lastWeekTotal = allDays.slice(-7).reduce((sum: number, day: { date: string; contributionCount: number }) => sum + day.contributionCount, 0);

        const mostActiveDay = allDays.reduce((max: { date: string; contributionCount: number }, day: { date: string; contributionCount: number }) =>
            day.contributionCount > max.contributionCount ? day : max
        );

        const averageDaily = Math.round(totalContributions / 365 * 10) / 10;

        return {
            totalContributions,
            longestStreak,
            currentStreak,
            lastWeekTotal,
            mostActiveDay: mostActiveDay.date,
            averageDaily
        };
    };

    const calculateStreaks = (days: Array<{ date: string; contributionCount: number }>) => {
        let longestStreak = 0;
        let currentStreak = 0;
        let tempStreak = 0;

        const sortedDays = days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        for (let i = sortedDays.length - 1; i >= 0; i--) {
            const day = sortedDays[i];

            if (day.contributionCount > 0) {
                tempStreak++;
                if (i === sortedDays.length - 1) {
                    currentStreak = tempStreak;
                }
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 0;
                if (i === sortedDays.length - 1) {
                    currentStreak = 0;
                }
            }
        }

        longestStreak = Math.max(longestStreak, tempStreak);

        return { longestStreak, currentStreak };
    };

    const calculateContributionStats = (events: GitHubEvent[]): ContributionStats => {
        const contributionTypes = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'];
        const recentContributions = events.filter(event => contributionTypes.includes(event.type));

        const dateGroups = new Map<string, number>();
        recentContributions.forEach(event => {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            dateGroups.set(date, (dateGroups.get(date) || 0) + 1);
        });

        const totalFromEvents = recentContributions.length;
        const uniqueDays = Array.from(dateGroups.keys()).sort();

        let currentStreak = 0;
        const today = new Date().toISOString().split('T')[0];
        const checkDate = new Date();

        while (checkDate >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (dateGroups.has(dateStr)) {
                currentStreak++;
            } else if (dateStr !== today) {
                break;
            }
            checkDate.setDate(checkDate.getDate() - 1);
        }

        const lastWeekTotal = recentContributions.filter(event => {
            const eventDate = new Date(event.created_at);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return eventDate >= weekAgo;
        }).length;

        return {
            totalContributions: totalFromEvents,
            longestStreak: Math.max(currentStreak, 5),
            currentStreak,
            lastWeekTotal,
            mostActiveDay: uniqueDays[uniqueDays.length - 1] || today,
            averageDaily: Math.round(totalFromEvents / 30 * 10) / 10
        };
    };

    const extractRecentRepos = (events: GitHubEvent[]): string[] => {
        const repos = new Set<string>();
        events.forEach(event => {
            if (event.repo?.name) {
                repos.add(event.repo.name.split('/')[1]);
            }
        });
        return Array.from(repos).slice(0, 5);
    };

    if (loading) {
        return (
            <section className="mb-12">
                <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg">
                                <Github className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">GitHub Activity</h2>
                                <p className="text-sm text-muted-foreground">Loading live data...</p>
                            </div>
                        </div>
                    </div>
                    <div className="animate-pulse space-y-4">
                        <div className="h-32 bg-muted rounded-lg"></div>
                        <div className="h-16 bg-muted rounded-lg"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mb-12">
                <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg">
                                <Github className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">GitHub Activity</h2>
                                <p className="text-sm text-muted-foreground">Unable to load GitHub data</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-8">
                        <div className="text-red-500 mb-4">
                            <Github className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">GitHub API Error</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <button
                            onClick={fetchGitHubData}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    const hasToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    return (
        <section className="mb-12">
            <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg">
                            <Github className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">GitHub Activity</h2>
                            <p className="text-sm text-muted-foreground">
                                My contribution stats
                            </p>
                        </div>
                    </div>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span>View Profile</span>
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>

                {user && (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={user.avatar_url}
                                alt={`${user.name || user.login}'s avatar`}
                                width={48}
                                height={48}
                                className="rounded-full border-2 border-primary/20"
                                priority={true}
                                onError={(e) => {
                                    console.error('Failed to load avatar:', e);
                                }}
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
                                <p className="text-sm text-muted-foreground">@{user.login}</p>
                                {user.bio && (
                                    <p className="text-sm text-foreground/80 mt-1">{user.bio}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contribution Activity</h4>
                            <div className="bg-background border rounded-lg p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {contributionStats?.totalContributions || 0}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {hasToken ? 'Total Contributions' : 'Recent Activity'}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {hasToken ? 'Last year' : 'Last 100 events'}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Zap className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {contributionStats?.currentStreak || 0}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Current Streak</div>
                                        <div className="text-xs text-muted-foreground mt-1">Days</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {contributionStats?.lastWeekTotal || 0}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Last Week</div>
                                        <div className="text-xs text-muted-foreground mt-1">Contributions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {contributionStats?.averageDaily || 0}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Daily Average</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {hasToken ? 'Per day' : 'Recent avg'}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm text-muted-foreground mb-3">Recent Activity</div>
                                    <div className="bg-muted/30 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {contributionStats?.lastWeekTotal || 0} contributions this week
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {recentRepos.length > 0 && `Active in: ${recentRepos.slice(0, 3).join(', ')}`}
                                                    {recentRepos.length > 3 && ` +${recentRepos.length - 3} more`}
                                                </p>
                                            </div>
                                            <a
                                                href={`https://github.com/${username}?tab=overview`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
                                            >
                                                <span>View full graph</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:block">
                            <h4 className="text-lg font-semibold mb-4">GitHub Stats</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-background border rounded-lg p-4 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="text-2xl font-bold text-primary">{user.public_repos}</div>
                                    <div className="text-sm text-muted-foreground">Public Repositories</div>
                                </div>
                                <div className="bg-background border rounded-lg p-4 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="text-2xl font-bold text-primary">{user.followers}</div>
                                    <div className="text-sm text-muted-foreground">Followers</div>
                                </div>
                                <div className="bg-background border rounded-lg p-4 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <GitFork className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="text-2xl font-bold text-primary">{user.following}</div>
                                    <div className="text-sm text-muted-foreground">Following</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
} 