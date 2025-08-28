"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl">ALX Polly</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/polls/create"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/polls/create") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Create Poll
            </Link>
            <Link
              href="/polls"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith("/polls") && !isActive("/polls/create") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Browse Polls
            </Link>
          </div>

          {/* Auth/Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
