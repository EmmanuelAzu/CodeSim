import { ProgressDashboard } from "@/components/progress-dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProgressDashboard />
    </div>
  )
}
