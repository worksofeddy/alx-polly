"use client";

import { useState } from "react";
import Link from "next/link";
import { Poll, PollOption } from "@/src/types/poll";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, BarChart3 } from "lucide-react";

interface PollCardProps {
  poll: Poll;
  showVoting?: boolean;
}

export function PollCard({ poll, showVoting = true }: PollCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [localPoll, setLocalPoll] = useState<Poll>(poll);

  const handleVote = () => {
    if (selectedOptions.length === 0) return;

    // Update the poll with new votes
    const updatedOptions = localPoll.options.map(option => ({
      ...option,
      votes: selectedOptions.includes(option.id) 
        ? option.votes + 1 
        : option.votes
    }));

    const newTotalVotes = localPoll.totalVotes + selectedOptions.length;

    setLocalPoll({
      ...localPoll,
      options: updatedOptions,
      totalVotes: newTotalVotes
    });

    setHasVoted(true);
    setSelectedOptions([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Product: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Fun: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Team: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{localPoll.title}</CardTitle>
            <CardDescription className="text-sm mb-3">
              {localPoll.description}
            </CardDescription>
          </div>
          <Badge className={getCategoryColor(localPoll.category)}>
            {localPoll.category}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{localPoll.createdBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(localPoll.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            <span>{localPoll.totalVotes} votes</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showVoting && !hasVoted ? (
          <div className="space-y-3">
            <p className="text-sm font-medium">
              {localPoll.allowMultipleVotes 
                ? "Select one or more options:" 
                : "Select one option:"}
            </p>
            
            {localPoll.allowMultipleVotes ? (
              <div className="space-y-2">
                {localPoll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOptions([...selectedOptions, option.id]);
                        } else {
                          setSelectedOptions(selectedOptions.filter(id => id !== option.id));
                        }
                      }}
                    />
                    <Label htmlFor={option.id} className="text-sm font-normal">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={selectedOptions[0] || ""}
                onValueChange={(value) => setSelectedOptions([value])}
              >
                {localPoll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="text-sm font-normal">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            <Button 
              onClick={handleVote}
              disabled={selectedOptions.length === 0}
              className="w-full"
            >
              Vote
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {localPoll.options.map((option) => {
              const percentage = localPoll.totalVotes > 0 
                ? (option.votes / localPoll.totalVotes) * 100 
                : 0;
              
              return (
                <div key={option.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{option.text}</span>
                    <span className="font-medium">
                      {option.votes} votes ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
            
            {hasVoted && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300">
                  ✓ Your vote has been recorded!
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t">
          <Link href={`/polls/${localPoll.id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
