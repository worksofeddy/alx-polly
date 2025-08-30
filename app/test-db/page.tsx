"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function TestDBPage() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      const supabase = createClient();
      addResult("Testing Supabase connection...");

      // Test 1: Basic connection
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        addResult(`❌ User auth error: ${userError.message}`);
      } else {
        addResult(`✅ User auth OK: ${userData.user?.id || 'No user'}`);
      }

      // Test 2: Simple table query
      addResult("Testing basic polls table query...");
      const { data: basicData, error: basicError } = await supabase
        .from('polls')
        .select('id')
        .limit(1);

      if (basicError) {
        addResult(`❌ Basic query error: ${basicError.message}`);
        addResult(`Error code: ${basicError.code}`);
        addResult(`Error details: ${JSON.stringify(basicError.details)}`);
      } else {
        addResult(`✅ Basic query OK: Found ${basicData?.length || 0} polls`);
      }

      // Test 3: Count query
      addResult("Testing count query...");
      const { count, error: countError } = await supabase
        .from('polls')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        addResult(`❌ Count query error: ${countError.message}`);
      } else {
        addResult(`✅ Count query OK: ${count} total polls`);
      }

      // Test 4: Full query with options
      addResult("Testing full query with options...");
      const { data: fullData, error: fullError } = await supabase
        .from('polls')
        .select(`
          id,
          title,
          options (id, text)
        `)
        .limit(1);

      if (fullError) {
        addResult(`❌ Full query error: ${fullError.message}`);
        addResult(`Error code: ${fullError.code}`);
      } else {
        addResult(`✅ Full query OK: Found ${fullData?.length || 0} polls with options`);
        if (fullData?.[0]) {
          addResult(`Sample poll: ${fullData[0].title} with ${fullData[0].options?.length || 0} options`);
        }
      }

    } catch (error) {
      addResult(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
        
        <Button 
          onClick={testConnection} 
          disabled={loading}
          className="mb-6"
        >
          {loading ? "Testing..." : "Run Database Tests"}
        </Button>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Results:</h2>
          {results.length === 0 ? (
            <p className="text-gray-500">Click the button above to run tests</p>
          ) : (
            <div className="space-y-1">
              {results.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
