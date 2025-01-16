"use client";

import { FileText, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">DocVerify</span>
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="hover:bg-primary/10">Dashboard</Button>
          </Link>
          <Link href="/upload">
            <Button variant="ghost" className="hover:bg-primary/10">Upload Document</Button>
          </Link>
          <Link href="/verify">
            <Button variant="ghost" className="hover:bg-primary/10">Verify Document</Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </nav>
  );
}