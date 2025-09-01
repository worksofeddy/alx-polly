"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { samplePolls } from "@/src/lib/sample-polls";
import { EditPollData, PollOptionEdit } from "@/src/types/poll";

export default function EditPollPage() {
  const router = useRouter();
  const params = useParams();
  const pollId = params.id as string;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<PollOptionEdit[]>([]);
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchPoll();
  }, [pollId]);

  const fetchPoll = async () => {
    try {
      // Find poll from mock data
      const foundPoll = samplePolls.find(p => p.id === pollId);
      
      if (!foundPoll) {
        alert('Poll not found');
        router.push('/polls');
        return;
      }

      // Check if user owns this poll (simulate ownership for demo)
      const isOwner = foundPoll.createdBy === "alx_admin" || 
                     process.env.NODE_ENV === 'development';
      
      if (!isOwner) {
        alert('You can only edit your own polls');
        router.push('/polls');
        return;
      }

      setTitle(foundPoll.title);
      setDescription(foundPoll.description);
      setEndDate(foundPoll.expiresAt || "");
      setOptions(foundPoll.options.map(opt => ({ id: opt.id, text: opt.text })));
    } catch (error) {
      console.error('Error fetching poll:', error);
      alert('Error loading poll');
      router.push('/polls');
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    setOptions([...options, { text: "", isNew: true }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text: value };
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !description.trim() || options.some(opt => !opt.text.trim())) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedPoll: EditPollData = {
        id: pollId,
        title,
        description,
        options: options.filter(opt => opt.text.trim()),
        endDate: endDate || undefined
      };

      // Simulate updating a poll (in real app, this would update the database)
      console.log("Updating poll:", updatedPoll);

      // Show success message
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Redirect to polls page after 2 seconds
      setTimeout(() => {
        router.push("/polls");
      }, 2000);
    } catch (error: any) {
      console.error("Error updating poll:", error);
      alert(`Error updating poll: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading poll...</div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Poll Updated Successfully!</h2>
              <p className="text-green-600 mb-4">Your poll has been updated and is now live.</p>
              <p className="text-sm text-gray-500">Redirecting to polls page...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Poll</CardTitle>
            <CardDescription>
              Update your poll details and options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Poll Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Poll Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your favorite programming language?"
                  required
                />
              </div>

              {/* Poll Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about this poll..."
                  rows={3}
                  required
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Poll Options */}
              <div className="space-y-4">
                <Label>Poll Options *</Label>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Updating Poll..." : "Update Poll"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
