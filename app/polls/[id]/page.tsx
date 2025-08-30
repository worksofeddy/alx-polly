"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, BarChart3, Edit, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { samplePolls } from "@/src/lib/sample-polls";
import { Poll } from "@/src/types/poll";
import { VotingForm } from "@/src/components/polls/VotingForm";

export default function PollDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pollId = params.id as string;
  
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Find poll from mock data
    const foundPoll = samplePolls.find(p => p.id === pollId);
    if (foundPoll) {
      setPoll(foundPoll);
      // Simulate current user for demo
      setCurrentUserId("alx_admin");
    }
    setLoading(false);
  }, [pollId]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString();
  };

  const getVotePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const handleVote = async (optionId: string) => {
    if (!poll) return;

    // Simulate voting (in real app, this would update the database)
    console.log(`Vote submitted for option: ${optionId}`);
    
    // Update the poll data to reflect the new vote
    const updatedPoll = { ...poll };
    const selectedOptionData = updatedPoll.options.find(opt => opt.id === optionId);
    if (selectedOptionData) {
      selectedOptionData.votes += 1;
      updatedPoll.totalVotes += 1;
      setPoll(updatedPoll);
    }
  };

  const handleDeletePoll = async () => {
    if (!poll) return;
    
    if (confirm('Are you sure you want to delete this poll?')) {
      alert('Poll deleted successfully!');
      router.push('/polls');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading poll...</div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Poll Not Found</h2>
          <p className="text-gray-600 mb-4">The poll you're looking for doesn't exist.</p>
          <Link href="/polls">
            <Button>Back to Polls</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = poll && currentUserId && poll.createdBy === currentUserId;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/polls">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Polls
          </Button>
        </Link>
      </div>

      {/* Poll Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{poll.title}</CardTitle>
              <CardDescription className="text-lg mb-4">
                {poll.description}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant={poll.isActive ? "default" : "secondary"}>
                {poll.isActive ? "Active" : "Closed"}
              </Badge>
              {isOwner && (
                <>
                  <Link href={`/polls/${poll.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDeletePoll}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Poll Metadata */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Expires: {formatDate(poll.expiresAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Created by: {poll.createdBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              <span>{poll.totalVotes} total votes</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Category: {poll.category}</span>
            </div>
          </div>
        </CardHeader>

                <CardContent>
          <VotingForm
            options={poll.options}
            totalVotes={poll.totalVotes}
            onVote={handleVote}
            isActive={poll.isActive}
            allowMultipleVotes={poll.allowMultipleVotes}
          />
        </CardContent>
      </Card>
    </div>
  );
}
