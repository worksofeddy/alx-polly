"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { useAuth } from "@/src/contexts/AuthContext";
import { Avatar, AvatarFallback } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { LogOut, User } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {getUserInitials(user.user_metadata?.name || user.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="font-normal">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.user_metadata?.name || user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
