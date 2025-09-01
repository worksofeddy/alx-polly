import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Heart
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-8 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200">
            🎉 Real-time Voting Available
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Create Engaging Polls
            <span className="text-gray-600 block">in Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Build interactive polls, gather community feedback, and make data-driven decisions. 
            Simple, beautiful, and powerful polling platform for teams and communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/polls/create">
              <Button size="lg" className="text-lg px-8 py-4 bg-black hover:bg-gray-800 border-0 shadow-sm">
                Create Your First Poll
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/vote-demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors">
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-black mb-2">5+</div>
              <div className="text-gray-600 font-medium">Sample Polls</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600 font-medium">Free to Use</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-black mb-2">∞</div>
              <div className="text-gray-600 font-medium">Unlimited Options</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Everything You Need for Great Polls
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Powerful features designed to make polling simple, engaging, and insightful
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription className="text-black">
                Create polls in seconds with our intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Instant poll creation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Real-time results
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Mobile responsive
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Community Driven</CardTitle>
              <CardDescription className="text-black">
                Engage your community with interactive voting experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Multiple choice options
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Beautiful results display
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Share with anyone
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Insightful Analytics</CardTitle>
              <CardDescription className="text-black">
                Get detailed insights from your poll results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Vote percentages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Visual progress bars
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Real-time updates
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription className="text-black">
                Your data is safe with enterprise-grade security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Secure voting system
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  No personal data required
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Privacy focused
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Global Access</CardTitle>
              <CardDescription className="text-black">
                Access your polls from anywhere in the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Works on all devices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  No downloads needed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Instant sharing
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Beautiful Design</CardTitle>
              <CardDescription className="text-black">
                Modern, clean interface that looks great on any device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Modern UI/UX
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Responsive design
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Smooth animations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-black rounded-2xl p-12 text-center text-white shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Polling?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already creating engaging polls and gathering valuable insights from their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/polls/create">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-100">
                Create Your First Poll
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/polls">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-colors">
                Browse Polls
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-black">ALX Polly</span>
          </div>
          <div className="flex gap-6 text-sm text-black">
            <Link href="/polls" className="hover:text-gray-600">Polls</Link>
            <Link href="/vote-demo" className="hover:text-gray-600">Demo</Link>
            <Link href="/troubleshooting" className="hover:text-gray-600">Help</Link>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Built with ❤️ for the ALX community</p>
        </div>
      </footer>
    </div>
  );
}
