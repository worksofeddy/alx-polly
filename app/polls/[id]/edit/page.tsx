"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

export default function EditPollPage() {
  const router = useRouter();
  const params = useParams();
  const pollId = params.id as string;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<{ id?: string; text: string; isNew?: boolean }[]>([]);
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchPoll();
  }, [pollId]);

  const fetchPoll = async () => {
    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      // Fetch poll
      const { data: pollData, error: pollError } = await supabase
        .from('polls')
        .select('*')
        .eq('id', pollId)
        .single();

      if (pollError) {
        console.error('Error fetching poll:', pollError);
        alert('Error loading poll');
        router.push('/polls');
        return;
      }

      if (!pollData) {
        alert('Poll not found');
        router.push('/polls');
        return;
      }

      // Fetch options for this poll
      const { data: optionsData, error: optionsError } = await supabase
        .from('options')
        .select('*')
        .eq('poll_id', pollId);

      if (optionsError) {
        console.error('Error fetching options:', optionsError);
        alert('Error loading poll options');
        router.push('/polls');
        return;
      }

      // Check if user owns this poll (with development mode fallback)
      const isOwner = pollData.user_id === (user?.id || 'mock-user-id') || 
                     process.env.NODE_ENV === 'development';
      
      if (!isOwner) {
        alert('You can only edit your own polls');
        router.push('/polls');
        return;
      }

      setTitle(pollData.title);
      setDescription(pollData.description);
      setEndDate(pollData.end_date || "");
      setOptions(optionsData?.map(opt => ({ id: opt.id, text: opt.text })) || []);
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
      const supabase = createClient();

      // Update poll
      const { error: pollError } = await supabase
        .from("polls")
        .update({
          title,
          description,
          end_date: endDate || null,
        })
        .eq('id', pollId);

      if (pollError) {
        throw pollError;
      }

      // Handle options
      const existingOptions = options.filter(opt => opt.id && !opt.isNew);
      const newOptions = options.filter(opt => opt.isNew && opt.text.trim());
      const removedOptions = options.filter(opt => opt.id && !existingOptions.find(eo => eo.id === opt.id));

      // Delete removed options
      for (const option of removedOptions) {
        if (option.id) {
          await supabase
            .from("options")
            .delete()
            .eq('id', option.id);
        }
      }

      // Update existing options
      for (const option of existingOptions) {
        if (option.id) {
          await supabase
            .from("options")
            .update({ text: option.text })
            .eq('id', option.id);
        }
      }

      // Add new options
      if (newOptions.length > 0) {
        const optionInserts = newOptions.map((opt) => ({
          poll_id: pollId,
          text: opt.text,
        }));

        await supabase
          .from("options")
          .insert(optionInserts);
      }

      alert("Poll updated successfully!");
      router.push("/polls");
    } catch (error: any) {
      console.error("Error updating poll:", error);
      alert(`Error updating poll: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading poll...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Edit Poll</h1>
            <p className="text-muted-foreground">
              Update your poll details and options
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Poll Details</CardTitle>
              <CardDescription>
                Update the details for your poll
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Poll Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's your favorite programming language?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide more context about your poll..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Poll Options</Label>
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
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
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <X className="h-4 w-4" />
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
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/polls")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Poll"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
