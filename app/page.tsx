import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { CodePreview } from "@/components/code-preview"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <CodePreview />
        <Features />
        <CTA />
      </main>
    </div>
  )
}
