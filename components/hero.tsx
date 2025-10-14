import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
          <span className="font-mono text-sm text-primary">Master Real-World Coding</span>
        </div>

        <h1 className="mb-6 font-sans text-5xl font-bold leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl">
          Practice coding like you're building <span className="text-primary">real apps</span>
        </h1>

        <p className="mb-10 text-lg text-muted-foreground text-pretty md:text-xl">
          Simulate actual development workflows with interactive challenges. Build APIs, implement algorithms, master
          React, and practice with real databases—all in your browser.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Coding Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>500+ Challenges</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Real-time Validation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Multiple Languages</span>
          </div>
        </div>
      </div>
    </section>
  )
}
