import { samplePolls, getActivePolls } from "@/lib/sample-polls";
import { PollCard } from "@/src/components/polls/PollCard";
import { PollsHeader } from "@/src/components/polls/PollsHeader";

export default function PollsPage() {
  const activePolls = getActivePolls();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PollsHeader />
        
        <div className="mt-8">
          {activePolls.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No polls available
              </h3>
              <p className="text-muted-foreground">
                Create the first poll to get started!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activePolls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
