"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Code2, Database, Zap, GitBranch } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", label: "All Challenges", icon: Code2 },
  { id: "api", label: "API Development", icon: Database },
  { id: "algorithms", label: "Algorithms", icon: Zap },
  { id: "react", label: "React & Frontend", icon: GitBranch },
]

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

const languages = ["All", "JavaScript", "TypeScript", "Java", "C#", "Python"]

const challenges = [
  {
    id: 1,
    title: "Build a REST API for User Management",
    description: "Create CRUD endpoints for managing users with authentication and validation.",
    category: "api",
    difficulty: "Intermediate",
    language: "TypeScript",
    duration: "45 min",
    completions: 1234,
  },
  {
    id: 2,
    title: "Implement Binary Search Tree",
    description: "Build a BST with insert, delete, and search operations. Optimize for performance.",
    category: "algorithms",
    difficulty: "Advanced",
    language: "JavaScript",
    duration: "60 min",
    completions: 892,
  },
  {
    id: 3,
    title: "Create a Todo App with React Hooks",
    description: "Build a fully functional todo application using useState, useEffect, and custom hooks.",
    category: "react",
    difficulty: "Beginner",
    language: "JavaScript",
    duration: "30 min",
    completions: 2341,
  },
  {
    id: 4,
    title: "Database Query Optimization",
    description: "Write efficient SQL queries and optimize database performance for a large dataset.",
    category: "api",
    difficulty: "Advanced",
    language: "TypeScript",
    duration: "50 min",
    completions: 567,
  },
  {
    id: 5,
    title: "Sorting Algorithm Comparison",
    description: "Implement and compare QuickSort, MergeSort, and HeapSort algorithms.",
    category: "algorithms",
    difficulty: "Intermediate",
    language: "Java",
    duration: "40 min",
    completions: 1089,
  },
  {
    id: 6,
    title: "Build a Real-time Chat Component",
    description: "Create a React component that handles real-time messaging with WebSocket integration.",
    category: "react",
    difficulty: "Advanced",
    language: "TypeScript",
    duration: "55 min",
    completions: 734,
  },
  {
    id: 7,
    title: "Authentication System Implementation",
    description: "Build a complete auth system with JWT tokens, password hashing, and session management.",
    category: "api",
    difficulty: "Advanced",
    language: "TypeScript",
    duration: "70 min",
    completions: 456,
  },
  {
    id: 8,
    title: "Dynamic Programming: Fibonacci Optimization",
    description: "Solve Fibonacci sequence using memoization and tabulation techniques.",
    category: "algorithms",
    difficulty: "Beginner",
    language: "Python",
    duration: "25 min",
    completions: 1876,
  },
]

export function ChallengeLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty
    const matchesLanguage = selectedLanguage === "All" || challenge.language === selectedLanguage
    const matchesSearch =
      searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesDifficulty && matchesLanguage && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-primary/10 text-primary border-primary/20"
      case "Intermediate":
        return "bg-[oklch(0.75_0.15_80)]/10 text-[oklch(0.75_0.15_80)] border-[oklch(0.75_0.15_80)]/20"
      case "Advanced":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-4xl font-bold">Challenge Library</h1>
        <p className="text-lg text-muted-foreground">
          Browse {challenges.length}+ coding challenges and start practicing
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff} Difficulty
              </option>
            ))}
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang === "All" ? "All Languages" : lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </Button>
          )
        })}
      </div>

      {/* Challenge Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="flex flex-col border-border bg-card p-6 transition-all hover:border-primary/50"
          >
            <div className="mb-4 flex items-start justify-between">
              <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground">{challenge.duration}</span>
            </div>

            <h3 className="mb-2 text-xl font-semibold leading-tight">{challenge.title}</h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">{challenge.description}</p>

            <div className="mb-4 flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {challenge.language}
              </Badge>
              <span className="text-xs text-muted-foreground">{challenge.completions.toLocaleString()} completed</span>
            </div>

            <Link href={`/challenges/${challenge.id}`}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Start Challenge</Button>
            </Link>
          </Card>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No challenges found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent"
            onClick={() => {
              setSelectedCategory("all")
              setSelectedDifficulty("All")
              setSelectedLanguage("All")
              setSearchQuery("")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
