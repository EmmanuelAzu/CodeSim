import { ChallengeEditor } from "@/components/challenge-editor"
import { Header } from "@/components/header"

export default function ChallengePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <ChallengeEditor challengeId={params.id} />
    </div>
  )
}
