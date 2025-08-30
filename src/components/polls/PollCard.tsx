"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, BarChart3, Edit, Trash2 } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  poll_id: string;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  created_at: string;
  end_date?: string;
  user_id: string;
  options: PollOption[];
}

interface PollCardProps {
  poll: Poll;
  isOwner?: boolean;
  onDelete?: () => void;
}

export function PollCard({ poll, isOwner = false, onDelete }: PollCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{poll.title}</CardTitle>
            <CardDescription className="text-sm mb-3">
              {poll.description}
            </CardDescription>
          </div>
          {isOwner && (
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = `/polls/${poll.id}/edit`}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{isOwner ? 'You' : 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(poll.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            <span>{poll.options.length} options</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Poll Options:
          </p>
          <div className="space-y-1">
            {poll.options.map((option) => (
              <div key={option.id} className="text-sm p-2 bg-gray-50 rounded">
                {option.text}
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Link href={`/polls/${poll.id}`}>
            <Button variant="outline" className="w-full">
              View Details & Vote
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
