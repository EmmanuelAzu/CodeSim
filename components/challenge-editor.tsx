"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Check, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { CodeValidator, getTestSuite, type ValidationResult } from "@/lib/code-validator"

const challengeData = {
  "1": {
    title: "Build a REST API for User Management",
    description: "Create CRUD endpoints for managing users with authentication and validation.",
    difficulty: "Intermediate",
    language: "TypeScript",
    instructions: `## Challenge Overview
Create a complete REST API for user management with the following requirements:

### Requirements:
1. Implement GET endpoint to fetch all users
2. Implement GET endpoint to fetch a single user by ID
3. Implement POST endpoint to create a new user
4. Implement PUT endpoint to update an existing user
5. Implement DELETE endpoint to remove a user
6. Add proper error handling for invalid requests
7. Validate user data (email format, required fields)

### Starter Code:
The basic structure is provided. Complete the TODO sections.

### Test Cases:
- GET /api/users should return an array of users
- GET /api/users?id=1 should return a single user
- POST /api/users with valid data should create a user
- Invalid email should return 400 error`,
    starterCode: `import { NextResponse } from 'next/server'

// Mock database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  
  // TODO: Implement GET logic
  // If userId exists, return single user
  // Otherwise return all users
  
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  // TODO: Implement POST logic
  // Parse request body
  // Validate email format
  // Add new user to database
  
  return NextResponse.json({ message: 'Not implemented' })
}`,
    solution: `import { NextResponse } from 'next/server'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

function isValidEmail(email: string) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  
  if (userId) {
    const user = users.find(u => u.id === parseInt(userId))
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ user })
  }
  
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  }
  
  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }
  
  const newUser = {
    id: users.length + 1,
    name: body.name,
    email: body.email,
  }
  
  users.push(newUser)
  return NextResponse.json({ user: newUser }, { status: 201 })
}`,
  },
}

interface ChallengeEditorProps {
  challengeId: string
}

export function ChallengeEditor({ challengeId }: ChallengeEditorProps) {
  const challenge = challengeData[challengeId as keyof typeof challengeData]
  const [code, setCode] = useState(challenge?.starterCode || "")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<ValidationResult[]>([])
  const [showSolution, setShowSolution] = useState(false)

  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-muted-foreground">Challenge not found</p>
      </div>
    )
  }

  const handleRun = async () => {
    setIsRunning(true)
    setTestResults([])

    // Get test suite for this challenge
    const testCases = getTestSuite(challengeId, "api")
    const validator = new CodeValidator(testCases)

    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Run validation
    const results = await validator.validateCode(code)
    setTestResults(results)
    setIsRunning(false)
  }

  const handleReset = () => {
    setCode(challenge.starterCode)
    setTestResults([])
    setShowSolution(false)
  }

  const handleShowSolution = () => {
    setCode(challenge.solution)
    setShowSolution(true)
  }

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

  const passedTests = testResults.filter((t) => t.passed).length
  const totalTests = testResults.length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/challenges">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Challenges
            </Button>
          </Link>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-2xl font-bold">{challenge.title}</h1>
              <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{challenge.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleShowSolution}>
            View Solution
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Panel - Instructions */}
        <Card className="border-border bg-card p-6">
          <Tabs defaultValue="instructions">
            <TabsList className="mb-4">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="instructions" className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{challenge.instructions}</div>
              </div>
            </TabsContent>

            <TabsContent value="hints" className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold">Hint 1: URL Parameters</h4>
                  <p className="text-sm text-muted-foreground">
                    Use searchParams.get() to extract query parameters from the URL.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold">Hint 2: Email Validation</h4>
                  <p className="text-sm text-muted-foreground">
                    Use a regular expression to validate email format before creating a user.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold">Hint 3: Error Handling</h4>
                  <p className="text-sm text-muted-foreground">
                    Return appropriate HTTP status codes: 200 for success, 400 for bad requests, 404 for not found.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="space-y-3">
                <a
                  href="#"
                  className="block rounded-lg border border-border bg-muted/50 p-4 transition-colors hover:border-primary/50"
                >
                  <h4 className="mb-1 font-semibold">Next.js Route Handlers</h4>
                  <p className="text-sm text-muted-foreground">Official documentation for API routes</p>
                </a>
                <a
                  href="#"
                  className="block rounded-lg border border-border bg-muted/50 p-4 transition-colors hover:border-primary/50"
                >
                  <h4 className="mb-1 font-semibold">REST API Best Practices</h4>
                  <p className="text-sm text-muted-foreground">Learn about RESTful API design patterns</p>
                </a>
                <a
                  href="#"
                  className="block rounded-lg border border-border bg-muted/50 p-4 transition-colors hover:border-primary/50"
                >
                  <h4 className="mb-1 font-semibold">Input Validation Guide</h4>
                  <p className="text-sm text-muted-foreground">How to validate user input effectively</p>
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Right Panel - Code Editor */}
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-[oklch(0.75_0.15_80)]" />
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-sm text-muted-foreground">api/users/route.ts</span>
              <Button
                size="sm"
                onClick={handleRun}
                disabled={isRunning}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Tests
                  </>
                )}
              </Button>
            </div>

            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-[400px] w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-foreground outline-none"
                spellCheck={false}
              />
            </div>
          </Card>

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card className="border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Test Results</h3>
                <Badge variant={passedTests === totalTests ? "default" : "secondary"}>
                  {passedTests}/{totalTests} Passed
                </Badge>
              </div>

              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 rounded-lg border p-3 ${
                      result.passed ? "border-primary/20 bg-primary/5" : "border-destructive/20 bg-destructive/5"
                    }`}
                  >
                    {result.passed ? (
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{result.name}</p>
                      <p className="text-xs text-muted-foreground">{result.message}</p>
                      {result.executionTime && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Execution time: {result.executionTime.toFixed(2)}ms
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {passedTests === totalTests && (
                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 p-4 text-center">
                  <Check className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="font-semibold text-primary">Challenge Complete!</p>
                  <p className="mt-1 text-sm text-muted-foreground">All tests passed. Great job!</p>
                  <Link href="/challenges">
                    <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                      Next Challenge
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          )}

          {showSolution && (
            <Card className="border-[oklch(0.75_0.15_80)]/20 bg-[oklch(0.75_0.15_80)]/10 p-4">
              <p className="text-sm text-[oklch(0.75_0.15_80)]">
                Solution loaded. Try to understand the implementation before moving forward!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
