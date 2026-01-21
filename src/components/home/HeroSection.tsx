import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-ayurveda.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      
      {/* Background Image Layer - Right aligned */}
      <div 
        className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Fade Layer - Fades from solid left to transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 via-40% to-transparent" />

      {/* Content Layer */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">100% Natural & Ayurvedic</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Pure Ayurvedic <br />
              <span className="text-gradient-gold">Wellness</span> Backed <br />
              by Tradition
            </motion.h1>

            {/* Paragraph */}
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Discover the ancient wisdom of Ayurveda with our handcrafted products. 
              Made with 100% natural herbs and traditional formulations passed down 
              through generations.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base px-8 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-foreground/30 text-foreground hover:bg-foreground/5 text-base px-8 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                { label: "GMP Certified", icon: "✓" },
                { label: "100% Natural", icon: "🌿" },
                { label: "Ayush Approved", icon: "⚕" },
              ].map((badge, index) => (
                <motion.div 
                  key={badge.label} 
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                >
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs border border-primary/20">
                    {badge.icon}
                  </span>
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Column - Empty to let image show through */}
          <div className="hidden lg:block" />

        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
