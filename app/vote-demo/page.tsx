"use client";

import { useState } from "react";
import { VotingForm } from "@/src/components/polls/VotingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const demoPolls = [
  {
    id: "demo1",
    title: "What's your favorite color?",
    options: [
      { id: "1", text: "Blue", votes: 15 },
      { id: "2", text: "Red", votes: 25 },
      { id: "3", text: "Green", votes: 10 },
      { id: "4", text: "Purple", votes: 8 },
    ],
    totalVotes: 58,
    isActive: true,
  },
  {
    id: "demo2",
    title: "Best Programming Language (Results)",
    options: [
      { id: "5", text: "JavaScript", votes: 30 },
      { id: "6", text: "Python", votes: 45 },
      { id: "7", text: "TypeScript", votes: 20 },
      { id: "8", text: "Rust", votes: 12 },
    ],
    totalVotes: 107,
    isActive: false,
  },
];

export default function VoteDemoPage() {
  const [activePollIndex, setActivePollIndex] = useState(0);

  const handleVote = (optionId: string) => {
    console.log(`Demo vote submitted for option: ${optionId}`);
  };

  const switchPoll = () => {
    setActivePollIndex(activePollIndex === 0 ? 1 : 0);
  };

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

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">Voting Form Demo</h1>
        <p className="text-black mb-6">
          Interactive demonstration of the voting form component
        </p>
        <Button onClick={switchPoll} variant="outline">
          Switch to {activePollIndex === 0 ? "Closed" : "Active"} Poll
        </Button>
      </div>

      {/* Demo Poll */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{demoPolls[activePollIndex].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <VotingForm
              options={demoPolls[activePollIndex].options}
              totalVotes={demoPolls[activePollIndex].totalVotes}
              onVote={handleVote}
              isActive={demoPolls[activePollIndex].isActive}
            />
          </CardContent>
        </Card>
      </div>

      {/* Features List */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Voting Form Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Single Choice Voting</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li>• Radio button selection</li>
                <li>• One option per vote</li>
                <li>• Clear visual feedback</li>
                <li>• Disabled submit until selection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Real-time Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Vote counts and percentages</li>
                <li>• Progress bar visualization</li>
                <li>• Highlighted user selection</li>
                <li>• Success confirmation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔄 State Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Pre-vote interface</li>
                <li>• Post-vote results</li>
                <li>• Reset functionality</li>
                <li>• Active/closed poll states</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎨 Beautiful UI</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Modern card design</li>
                <li>• Responsive layout</li>
                <li>• Smooth transitions</li>
                <li>• Accessible components</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
