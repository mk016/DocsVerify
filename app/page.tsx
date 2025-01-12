import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Shield, Users, CheckCircle, ArrowRight, Lock, Database, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="gradient-blur bg-primary/20 top-0 left-0 animate-glow" />
        <div className="gradient-blur bg-blue-500/20 bottom-0 right-0 animate-glow [animation-delay:2s]" />
        <div className="gradient-blur bg-purple-500/20 top-1/2 right-1/4 animate-glow [animation-delay:4s]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10">
              <span className="text-sm font-medium text-primary flex items-center gap-2">
                <Zap className="h-4 w-4" /> Powered by Blockchain Technology
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Secure Document Verification System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Revolutionizing document verification with blockchain technology. 
              Ensure authenticity, prevent fraud, and maintain trust in your documentation process.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="gap-2 h-12 px-6">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/verify">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-6">
                  Verify Document <Shield className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
              <p className="text-muted-foreground">Verification Accuracy</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">System Availability</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Documents Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-card/50 backdrop-blur">
              <Lock className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground">
                Leverage the power of blockchain for immutable, tamper-proof document verification.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-card/50 backdrop-blur">
              <Database className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Instant Verification</h3>
              <p className="text-muted-foreground">
                Verify documents in seconds with our advanced hashing technology.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-card/50 backdrop-blur">
              <Users className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Multi-User Access</h3>
              <p className="text-muted-foreground">
                Perfect for organizations with multiple verification needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        <div className="gradient-blur bg-primary/10 top-1/2 left-1/4 animate-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "Upload Document", desc: "Organizations securely upload their documents" },
              { icon: Lock, title: "Generate Hash", desc: "Document is processed with blockchain technology" },
              { icon: Shield, title: "Verify", desc: "Users verify document authenticity" },
              { icon: CheckCircle, title: "Confirmation", desc: "Instant verification results" }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {<step.icon className="h-8 w-8 text-primary" />}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-2rem)] h-[2px] bg-primary/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="gradient-blur bg-white/10 top-0 right-0 animate-glow" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join organizations worldwide in securing their documents with blockchain technology.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" variant="secondary" className="gap-2">
                Upload Document <FileText className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white hover:bg-white/10">
                Verify Document <Shield className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold">DocVerify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DocVerify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}