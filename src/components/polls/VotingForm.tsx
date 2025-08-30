"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { ThankYouMessage } from "./ThankYouMessage";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface VotingFormProps {
  options: PollOption[];
  totalVotes: number;
  onVote: (optionId: string) => void;
  isActive: boolean;
  allowMultipleVotes?: boolean;
}

export function VotingForm({ 
  options, 
  totalVotes, 
  onVote, 
  isActive, 
  allowMultipleVotes = false 
}: VotingFormProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    onVote(selectedOption);
    setHasVoted(true);
  };

  const handleReset = () => {
    setHasVoted(false);
    setSelectedOption(null);
  };

  if (!isActive) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Poll Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.text}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{option.votes} votes</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {getVotePercentage(option.votes, totalVotes)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getVotePercentage(option.votes, totalVotes)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (hasVoted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📊 Vote Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Results Header */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Current Results</h4>
            <p className="text-blue-600 text-sm">
              Based on {totalVotes} total votes
            </p>
          </div>
          
          <div className="space-y-3">
            {options.map((option) => (
              <div 
                key={option.id} 
                className={`p-3 border rounded-lg ${
                  selectedOption === option.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{option.text}</span>
                    {selectedOption === option.id && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{option.votes} votes</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {getVotePercentage(option.votes, totalVotes)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getVotePercentage(option.votes, totalVotes)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-4">
            <ThankYouMessage
              selectedOption={options.find(opt => opt.id === selectedOption)?.text}
              totalVotes={totalVotes}
              onVoteAgain={handleReset}
              variant="celebration"
            />
            
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalVotes}</div>
                <div className="text-xs text-gray-600">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{options.length}</div>
                <div className="text-xs text-gray-600">Options</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-500">
                Results are updated in real-time
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cast Your Vote</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          onValueChange={(value) => setSelectedOption(value)} 
          value={selectedOption || ""}
        >
          <div className="space-y-3 mb-6">
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                <Label 
                  htmlFor={`option-${option.id}`} 
                  className="font-medium cursor-pointer flex-1"
                >
                  {option.text}
                </Label>
                <span className="text-sm text-gray-500">
                  {option.votes} votes ({getVotePercentage(option.votes, totalVotes)}%)
                </span>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <Button 
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full"
        >
          Submit Vote
        </Button>
      </CardContent>
    </Card>
  );
}
