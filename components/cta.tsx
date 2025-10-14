import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-balance">Ready to level up your coding skills?</h2>
        <p className="mb-8 text-lg text-muted-foreground text-pretty">
          Join thousands of developers practicing real-world coding scenarios every day.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Start Your First Challenge
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
