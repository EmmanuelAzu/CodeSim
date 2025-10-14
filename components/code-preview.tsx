"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Play } from "lucide-react"

const codeExample = `// Challenge: Build a User API Endpoint
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  
  // TODO: Fetch user from database
  const user = await db.users.findUnique({
    where: { id: userId }
  })
  
  return NextResponse.json({ user })
}`

export function CodePreview() {
  const [isRunning, setIsRunning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold">Interactive Code Challenges</h2>
          <p className="text-muted-foreground">Write code, run tests, and get instant feedback</p>
        </div>

        <Card className="overflow-hidden border-border bg-card">
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
                <>Running...</>
              ) : showSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Passed
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Tests
                </>
              )}
            </Button>
          </div>

          <div className="bg-[var(--color-code-bg)] p-6">
            <pre className="overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed">
                <span className="text-muted-foreground">// Challenge: Build a User API Endpoint</span>
                {"\n"}
                <span className="text-[oklch(0.65_0.20_250)]">import</span>
                {" { NextResponse } "}
                <span className="text-[oklch(0.65_0.20_250)]">from</span>{" "}
                <span className="text-[oklch(0.70_0.15_50)]">'next/server'</span>
                {"\n\n"}
                <span className="text-[oklch(0.65_0.20_250)]">export</span>{" "}
                <span className="text-[oklch(0.65_0.20_250)]">async</span>{" "}
                <span className="text-[oklch(0.65_0.20_250)]">function</span> <span className="text-primary">GET</span>
                {"("}
                <span className="text-foreground">request</span>
                {": Request) {\n  "}
                <span className="text-[oklch(0.65_0.20_250)]">const</span>
                {" { searchParams } = "}
                <span className="text-[oklch(0.65_0.20_250)]">new</span> <span className="text-primary">URL</span>
                {"(request.url)\n  "}
                <span className="text-[oklch(0.65_0.20_250)]">const</span>
                {" userId = searchParams."}
                <span className="text-primary">get</span>
                {"("}
                <span className="text-[oklch(0.70_0.15_50)]">'id'</span>
                {")\n  \n  "}
                <span className="text-muted-foreground">// TODO: Fetch user from database</span>
                {"\n  "}
                <span className="text-[oklch(0.65_0.20_250)]">const</span>
                {" user = "}
                <span className="text-[oklch(0.65_0.20_250)]">await</span>
                {" db.users."}
                <span className="text-primary">findUnique</span>
                {"({\n    where: { id: userId }\n  })\n  \n  "}
                <span className="text-[oklch(0.65_0.20_250)]">return</span>
                {" NextResponse."}
                <span className="text-primary">json</span>
                {"({ user })\n}"}
              </code>
            </pre>
          </div>

          {showSuccess && (
            <div className="border-t border-border bg-primary/10 px-6 py-3">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Check className="h-4 w-4" />
                <span className="font-mono">All tests passed! Challenge complete.</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
