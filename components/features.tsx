import { Card } from "@/components/ui/card"
import { Database, Code, Zap, GitBranch, Terminal, Trophy } from "lucide-react"

const features = [
  {
    icon: Database,
    title: "Real Database Practice",
    description: "Work with actual databases. Write queries, design schemas, and handle real data operations.",
  },
  {
    icon: Code,
    title: "API Development",
    description: "Build RESTful APIs, handle authentication, and implement real-world backend logic.",
  },
  {
    icon: Zap,
    title: "Algorithm Challenges",
    description: "Master data structures and algorithms with practical, real-world problem scenarios.",
  },
  {
    icon: GitBranch,
    title: "Framework Mastery",
    description: "Deep dive into React, Next.js, and other modern frameworks with hands-on projects.",
  },
  {
    icon: Terminal,
    title: "Multiple Languages",
    description: "Practice JavaScript, TypeScript, Java, C#, Python, and more in one platform.",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your growth with detailed analytics and achievement tracking.",
  },
]

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">Everything you need to master coding</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Simulate real development environments and build production-ready skills
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-border bg-card p-6 transition-colors hover:border-primary/50">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
