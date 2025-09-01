"use client";

import { CheckCircle, Share2, Heart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThankYouMessageProps {
  pollTitle?: string;
  selectedOption?: string;
  totalVotes: number;
  onShare?: () => void;
  onVoteAgain?: () => void;
  variant?: "default" | "celebration" | "simple";
}

export function ThankYouMessage({
  pollTitle,
  selectedOption,
  totalVotes,
  onShare,
  onVoteAgain,
  variant = "default"
}: ThankYouMessageProps) {
  const messages = {
    default: {
      title: "Thank You for Voting!",
      subtitle: "Your vote has been successfully recorded.",
      icon: CheckCircle,
      bgClass: "bg-gradient-to-r from-green-50 to-blue-50",
      borderClass: "border-green-200",
      textClass: "text-green-800"
    },
    celebration: {
      title: "🎉 Vote Recorded Successfully!",
      subtitle: "You've contributed to this important decision!",
      icon: Trophy,
      bgClass: "bg-gradient-to-r from-yellow-50 to-orange-50",
      borderClass: "border-yellow-200",
      textClass: "text-yellow-800"
    },
    simple: {
      title: "Vote Submitted",
      subtitle: "Thank you for participating.",
      icon: Heart,
      bgClass: "bg-gray-50",
      borderClass: "border-gray-200",
      textClass: "text-gray-800"
    }
  };

  const currentMessage = messages[variant];
  const IconComponent = currentMessage.icon;

  return (
    <div className={`p-6 ${currentMessage.bgClass} border ${currentMessage.borderClass} rounded-lg text-center`}>
      <div className="mb-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <IconComponent className="w-8 h-8 text-green-600" />
        </div>
        
        <h3 className={`text-xl font-semibold ${currentMessage.textClass} mb-2`}>
          {currentMessage.title}
        </h3>
        
        <p className="text-black mb-3">
          {currentMessage.subtitle}
        </p>
        
        {pollTitle && (
          <p className="text-sm text-black mb-3">
            Poll: <span className="font-medium">{pollTitle}</span>
          </p>
        )}
        
        {selectedOption && (
          <p className="text-sm text-black mb-3">
            Your choice: <span className="font-medium text-black">{selectedOption}</span>
          </p>
        )}
        
        <div className="text-sm text-black mb-4">
          Total votes: <span className="font-semibold">{totalVotes}</span>
        </div>
      </div>
      
      <div className="flex gap-2 justify-center">
        {onVoteAgain && (
          <Button variant="outline" onClick={onVoteAgain} size="sm">
            Vote Again
          </Button>
        )}
        {onShare && (
          <Button variant="outline" onClick={onShare} size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        )}
      </div>
    </div>
  );
}
