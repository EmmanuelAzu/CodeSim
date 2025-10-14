"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Zap, TrendingUp, Code2, Database, GitBranch, Calendar, Clock, Award, Star } from "lucide-react"
import Link from "next/link"

const userStats = {
  totalChallenges: 127,
  completedChallenges: 45,
  currentStreak: 7,
  longestStreak: 14,
  totalPoints: 3420,
  rank: "Advanced",
  hoursSpent: 68,
  averageScore: 87,
}

const recentActivity = [
  {
    id: 1,
    title: "Build a REST API for User Management",
    category: "API Development",
    completedAt: "2 hours ago",
    score: 95,
    difficulty: "Intermediate",
  },
  {
    id: 2,
    title: "Implement Binary Search Tree",
    category: "Algorithms",
    completedAt: "1 day ago",
    score: 88,
    difficulty: "Advanced",
  },
  {
    id: 3,
    title: "Create a Todo App with React Hooks",
    category: "React & Frontend",
    completedAt: "2 days ago",
    score: 92,
    difficulty: "Beginner",
  },
  {
    id: 4,
    title: "Database Query Optimization",
    category: "API Development",
    completedAt: "3 days ago",
    score: 78,
    difficulty: "Advanced",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first challenge",
    icon: Star,
    unlocked: true,
    unlockedAt: "Jan 15, 2025",
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: Zap,
    unlocked: true,
    unlockedAt: "Feb 3, 2025",
  },
  {
    id: 3,
    title: "API Master",
    description: "Complete 10 API challenges",
    icon: Database,
    unlocked: true,
    unlockedAt: "Feb 10, 2025",
  },
  {
    id: 4,
    title: "Algorithm Expert",
    description: "Complete 15 algorithm challenges",
    icon: Code2,
    unlocked: false,
    progress: 12,
    total: 15,
  },
  {
    id: 5,
    title: "Perfect Score",
    description: "Get 100% on 5 challenges",
    icon: Trophy,
    unlocked: false,
    progress: 3,
    total: 5,
  },
  {
    id: 6,
    title: "Speed Demon",
    description: "Complete a challenge in under 10 minutes",
    icon: Zap,
    unlocked: false,
    progress: 0,
    total: 1,
  },
]

const skillProgress = [
  { skill: "JavaScript", level: 85, challenges: 28 },
  { skill: "TypeScript", level: 72, challenges: 18 },
  { skill: "React", level: 68, challenges: 15 },
  { skill: "API Development", level: 79, challenges: 22 },
  { skill: "Algorithms", level: 61, challenges: 12 },
]

export function ProgressDashboard() {
  const completionRate = Math.round((userStats.completedChallenges / userStats.totalChallenges) * 100)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold">Your Progress</h1>
        <p className="text-lg text-muted-foreground">Track your coding journey and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold">
                {userStats.completedChallenges}
                <span className="text-lg text-muted-foreground">/{userStats.totalChallenges}</span>
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <Target className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-primary transition-all" style={{ width: `${completionRate}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{completionRate}% completion rate</p>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold">{userStats.currentStreak} days</p>
            </div>
            <div className="rounded-lg bg-[oklch(0.75_0.15_80)]/10 p-3">
              <Zap className="h-6 w-6 text-[oklch(0.75_0.15_80)]" />
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Longest: {userStats.longestStreak} days</p>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-3xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
          </div>
          <Badge className="mt-4 bg-primary/10 text-primary">{userStats.rank} Rank</Badge>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Time Invested</p>
              <p className="text-3xl font-bold">{userStats.hoursSpent}h</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Avg score: {userStats.averageScore}%</p>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Recent Activity */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Completions</h2>
              <Link href="/challenges">
                <Button variant="outline" size="sm">
                  Browse Challenges
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4 transition-colors hover:border-primary/50"
                >
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold">{activity.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {activity.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Code2 className="h-3 w-3" />
                        {activity.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {activity.completedAt}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-2xl font-bold text-primary">{activity.score}%</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Progress Chart */}
          <Card className="border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Weekly Progress</h2>
            <div className="flex items-end justify-between gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const heights = [60, 80, 45, 90, 75, 100, 85]
                return (
                  <div key={day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative w-full">
                      <div
                        className="w-full rounded-t-lg bg-primary transition-all hover:bg-primary/80"
                        style={{ height: `${heights[index]}px` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>You're on fire! Keep up the great work.</span>
            </div>
          </Card>
        </TabsContent>

        {/* Skills Progress */}
        <TabsContent value="skills" className="space-y-4">
          <Card className="border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-semibold">Skill Levels</h2>
            <div className="space-y-6">
              {skillProgress.map((skill) => (
                <div key={skill.skill}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{skill.skill}</h3>
                      <p className="text-xs text-muted-foreground">{skill.challenges} challenges completed</p>
                    </div>
                    <span className="text-lg font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary transition-all" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card p-6 text-center">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-2xl font-bold">28</h3>
              <p className="text-sm text-muted-foreground">JavaScript Challenges</p>
            </Card>

            <Card className="border-border bg-card p-6 text-center">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-2xl font-bold">22</h3>
              <p className="text-sm text-muted-foreground">API Challenges</p>
            </Card>

            <Card className="border-border bg-card p-6 text-center">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-2xl font-bold">15</h3>
              <p className="text-sm text-muted-foreground">React Challenges</p>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-4">
          <Card className="border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-semibold">Your Achievements</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`border p-4 ${
                      achievement.unlocked ? "border-primary/20 bg-primary/5" : "border-border bg-muted/30 opacity-60"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                          achievement.unlocked ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      {achievement.unlocked && <Award className="h-5 w-5 text-primary" />}
                    </div>
                    <h3 className="mb-1 font-semibold">{achievement.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <p className="text-xs text-primary">Unlocked {achievement.unlockedAt}</p>
                    ) : (
                      <div>
                        <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-muted-foreground transition-all"
                            style={{
                              width: `${((achievement.progress || 0) / (achievement.total || 1)) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {achievement.progress}/{achievement.total}
                        </p>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
