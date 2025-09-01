"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, CheckCircle } from "lucide-react";

export default function CreatePollPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [category, setCategory] = useState("Technology");
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false);
  const [endDate, setEndDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !description.trim() || options.some(opt => !opt.trim())) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate creating a poll (in real app, this would insert into database)
      console.log("Creating poll:", {
        title,
        description,
        options: options.filter(opt => opt.trim()),
        category,
        allowMultipleVotes,
        endDate
      });

      // Show success message
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Redirect to polls page after 2 seconds
      setTimeout(() => {
        router.push("/polls");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating poll:", error);
      alert(`Error creating poll: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Poll Created Successfully!</h2>
              <p className="text-green-600 mb-4">Your poll has been created and is now live.</p>
              <p className="text-sm text-gray-500">Redirecting to polls page...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-black">Create New Poll</CardTitle>
            <CardDescription className="text-black">
              Create a new poll for others to vote on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Poll Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-black">Poll Title *</Label>
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
                <Label htmlFor="description" className="text-black">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about this poll..."
                  rows={3}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-black">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Sports">Sports</option>
                  <option value="Politics">Politics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-black">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Multiple Votes */}
              <div className="flex items-center space-x-2">
                <input
                  id="multipleVotes"
                  type="checkbox"
                  checked={allowMultipleVotes}
                  onChange={(e) => setAllowMultipleVotes(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="multipleVotes" className="text-black">Allow multiple votes per user</Label>
              </div>

              {/* Poll Options */}
              <div className="space-y-4">
                <Label className="text-black">Poll Options *</Label>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
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
                {isSubmitting ? "Creating Poll..." : "Create Poll"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
