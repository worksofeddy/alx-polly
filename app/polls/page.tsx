"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User, BarChart3 } from "lucide-react";
import Link from "next/link";
import { samplePolls } from "@/src/lib/sample-polls";
import { Poll } from "@/src/types/poll";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data instead of fetching from database
    setPolls(samplePolls);
    setLoading(false);
  }, []);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString();
  };

  const getVotePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading polls...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Polls</h1>
          <p className="text-gray-600 mt-2">Vote on current polls and see results</p>
        </div>
        <div className="flex gap-2">
          <Link href="/vote-demo">
            <Button variant="outline" className="flex items-center gap-2">
              🎯 Vote Demo
            </Button>
          </Link>
          <Link href="/thank-you-demo">
            <Button variant="outline" className="flex items-center gap-2">
              🙏 Thank You Demo
            </Button>
          </Link>
          <Link href="/polls/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Poll
            </Button>
          </Link>
        </div>
      </div>

      {/* Polls Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {polls.map((poll) => (
          <Card key={poll.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{poll.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3">
                    {poll.description}
                  </CardDescription>
                </div>
                <Badge variant={poll.isActive ? "default" : "secondary"}>
                  {poll.isActive ? "Active" : "Closed"}
                </Badge>
              </div>
              
              {/* Poll Metadata */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Expires: {formatDate(poll.expiresAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{poll.createdBy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  <span>{poll.totalVotes} votes</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Poll Options */}
              <div className="space-y-2 mb-4">
                {poll.options.map((option) => (
                  <div key={option.id} className="relative">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{option.text}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{option.votes} votes</span>
                        <span className="text-xs font-semibold text-blue-600">
                          {getVotePercentage(option.votes, poll.totalVotes)}%
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-blue-200 rounded-b"
                         style={{ 
                           width: `${getVotePercentage(option.votes, poll.totalVotes)}%`,
                           backgroundColor: '#3b82f6'
                         }}>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link href={`/polls/${poll.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View & Vote
                  </Button>
                </Link>
                {poll.createdBy === "alx_admin" && (
                  <>
                    <Link href={`/polls/${poll.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {polls.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BarChart3 className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No polls yet</h3>
          <p className="text-gray-600 mb-4">Be the first to create a poll!</p>
          <Link href="/polls/create">
            <Button>Create Your First Poll</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
