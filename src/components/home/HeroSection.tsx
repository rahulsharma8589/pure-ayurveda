import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-turmeric/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">100% Natural & Ayurvedic</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Pure Ayurvedic <br />
              <span className="text-gradient-gold">Wellness</span> Backed <br />
              by Tradition
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-xl leading-relaxed">
              Discover the ancient wisdom of Ayurveda with our handcrafted products. 
              Made with 100% natural herbs and traditional formulations passed down 
              through generations.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base px-8">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-8">
              {[
                { label: "GMP Certified", icon: "✓" },
                { label: "100% Natural", icon: "🌿" },
                { label: "Ayush Approved", icon: "⚕" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm opacity-80">
                  <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-turmeric/20 rounded-full animate-float" />
              <div className="absolute inset-8 bg-primary-foreground/10 rounded-full backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌿</div>
                  <p className="font-serif text-2xl text-primary-foreground">Ancient Wisdom</p>
                  <p className="text-primary-foreground/80 text-sm mt-2">Modern Wellness</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
