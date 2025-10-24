"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-mono text-lg font-bold">CodeSim</span>
        </Link>

        {/* Center: Nav (hide on small screens) */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/challenges" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Challenges
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
        </nav>

        {/* Right: Auth */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="text-sm">Sign in</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="text-sm">Sign up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
