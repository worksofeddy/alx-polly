import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to ALX Polly</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Create and participate in polls with your community
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/polls">View Polls</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/polls/create">Create Poll</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
