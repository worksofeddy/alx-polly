"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TroubleshootingPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Troubleshooting Guide</h1>
        <p className="text-gray-600 mb-6">
          Current status of poll creation, editing, and deletion features
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Working Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• View polls dashboard</li>
              <li>• Vote on polls</li>
              <li>• See poll results</li>
              <li>• Thank you messages</li>
              <li>• Responsive design</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Demo Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Create polls (simulated)</li>
              <li>• Edit polls (simulated)</li>
              <li>• Delete polls (simulated)</li>
              <li>• Mock data only</li>
              <li>• No database persistence</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Not Working
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Real database operations</li>
              <li>• User authentication</li>
              <li>• Data persistence</li>
              <li>• Real-time updates</li>
              <li>• User management</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Current Implementation */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Current Implementation Status</CardTitle>
            <CardDescription>
              What's happening behind the scenes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Create Polls */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="outline">Create Polls</Badge>
                <span className="text-yellow-600">Demo Mode</span>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                The create poll form works but doesn't actually save to a database. Instead, it:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Validates the form data</li>
                <li>• Logs the poll data to console</li>
                <li>• Shows a success message</li>
                <li>• Redirects to the polls page</li>
              </ul>
            </div>

            {/* Edit Polls */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="outline">Edit Polls</Badge>
                <span className="text-yellow-600">Demo Mode</span>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                The edit poll form loads mock data and simulates updates:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Loads poll data from mock data</li>
                <li>• Allows editing of all fields</li>
                <li>• Logs changes to console</li>
                <li>• Shows success message</li>
              </ul>
            </div>

            {/* Delete Polls */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="outline">Delete Polls</Badge>
                <span className="text-yellow-600">Demo Mode</span>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Delete functionality is simulated:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Shows confirmation dialog</li>
                <li>• Logs deletion to console</li>
                <li>• Shows success message</li>
                <li>• Redirects to polls page</li>
              </ul>
            </div>

            {/* Voting */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="outline">Voting</Badge>
                <span className="text-green-600">Working</span>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Voting functionality works with mock data:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Interactive voting interface</li>
                <li>• Real-time vote updates (simulated)</li>
                <li>• Beautiful thank you messages</li>
                <li>• Results visualization</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Next Steps to Enable Real Functionality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Database Setup</h4>
                <p className="text-sm text-gray-600">
                  Re-enable foreign key constraints and RLS policies in Supabase, or implement proper error handling for the current setup.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">2. Authentication</h4>
                <p className="text-sm text-gray-600">
                  Implement proper user authentication and session management.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">3. Data Persistence</h4>
                <p className="text-sm text-gray-600">
                  Replace mock data operations with real database calls.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">4. Real-time Updates</h4>
                <p className="text-sm text-gray-600">
                  Implement real-time vote updates using Supabase subscriptions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Links */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">Test the Features</h3>
          <div className="flex gap-4 justify-center">
            <Link href="/polls/create">
              <Button>Test Create Poll</Button>
            </Link>
            <Link href="/polls/1/edit">
              <Button variant="outline">Test Edit Poll</Button>
            </Link>
            <Link href="/vote-demo">
              <Button variant="outline">Test Voting</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
