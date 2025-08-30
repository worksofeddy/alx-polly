"use client";

import { useState } from "react";
import { ThankYouMessage } from "@/src/components/polls/ThankYouMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const demoData = {
  pollTitle: "What's your favorite programming language?",
  selectedOption: "TypeScript",
  totalVotes: 156
};

export default function ThankYouDemoPage() {
  const [activeVariant, setActiveVariant] = useState<"default" | "celebration" | "simple">("default");

  const handleShare = () => {
    alert("Share functionality would be implemented here!");
  };

  const handleVoteAgain = () => {
    alert("Vote again functionality would be implemented here!");
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You Message Demo</h1>
        <p className="text-gray-600 mb-6">
          Different styles of thank you messages after voting
        </p>
      </div>

      {/* Variant Selector */}
      <div className="flex justify-center gap-4 mb-8">
        <Button 
          variant={activeVariant === "default" ? "default" : "outline"}
          onClick={() => setActiveVariant("default")}
        >
          Default
        </Button>
        <Button 
          variant={activeVariant === "celebration" ? "default" : "outline"}
          onClick={() => setActiveVariant("celebration")}
        >
          Celebration
        </Button>
        <Button 
          variant={activeVariant === "simple" ? "default" : "outline"}
          onClick={() => setActiveVariant("simple")}
        >
          Simple
        </Button>
      </div>

      {/* Thank You Message Display */}
      <div className="max-w-2xl mx-auto mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {activeVariant.charAt(0).toUpperCase() + activeVariant.slice(1)} Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThankYouMessage
              pollTitle={demoData.pollTitle}
              selectedOption={demoData.selectedOption}
              totalVotes={demoData.totalVotes}
              onShare={handleShare}
              onVoteAgain={handleVoteAgain}
              variant={activeVariant}
            />
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Thank You Message Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎨 Multiple Styles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Default - Professional</li>
                <li>• Celebration - Festive</li>
                <li>• Simple - Minimal</li>
                <li>• Customizable colors</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Rich Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Poll title display</li>
                <li>• Selected option</li>
                <li>• Total vote count</li>
                <li>• Success confirmation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔧 Interactive Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Vote again button</li>
                <li>• Share results</li>
                <li>• Custom callbacks</li>
                <li>• Responsive design</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Usage Examples
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <pre className="text-sm overflow-x-auto">
{`// Basic usage
<ThankYouMessage
  totalVotes={156}
  onVoteAgain={handleReset}
/>

// With all options
<ThankYouMessage
  pollTitle="What's your favorite color?"
  selectedOption="Blue"
  totalVotes={156}
  onShare={handleShare}
  onVoteAgain={handleReset}
  variant="celebration"
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
