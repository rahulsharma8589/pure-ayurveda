import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-ayurveda.jpg";

const FloatingLeaf = ({ delay, x, y, size, rotate }: { delay: number; x: string; y: string; size: number; rotate: number }) => (
  <motion.div
    className="absolute text-accent/30 pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, y: -20, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0.3],
      y: [0, 30, 0],
      rotate: [rotate, rotate + 15, rotate]
    }}
    transition={{ 
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Leaf size={size} />
  </motion.div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-40" />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-10 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/25 via-turmeric/15 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-turmeric/20 via-accent/10 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          y: [0, -30, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Leaves */}
      <FloatingLeaf delay={0} x="10%" y="20%" size={24} rotate={-15} />
      <FloatingLeaf delay={1.5} x="85%" y="15%" size={32} rotate={20} />
      <FloatingLeaf delay={3} x="75%" y="70%" size={20} rotate={-30} />
      <FloatingLeaf delay={2} x="15%" y="75%" size={28} rotate={10} />
      <FloatingLeaf delay={4} x="50%" y="85%" size={22} rotate={-20} />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <motion.div 
            className="text-primary-foreground space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">100% Natural & Ayurvedic</span>
            </motion.div>

            <motion.h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Pure Ayurvedic <br />
              <span className="text-gradient-gold inline-block">Wellness</span> Backed <br />
              by Tradition
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl opacity-90 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Discover the ancient wisdom of Ayurveda with our handcrafted products. 
              Made with 100% natural herbs and traditional formulations passed down 
              through generations.
            </motion.p>

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
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-8"
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
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.9, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                >
                  <span className="w-7 h-7 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center text-xs border border-primary-foreground/20">
                    {badge.icon}
                  </span>
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Full-bleed Hero Image with Fade Effect */}
      <motion.div 
        className="absolute inset-y-0 right-0 w-full lg:w-2/3 hidden lg:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="relative h-full w-full">
          <img 
            src={heroImage} 
            alt="Ayurvedic herbs and ingredients - mortar and pestle with turmeric, amla, and natural herbs" 
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient fade from right to left */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-primary/30" />
        </div>
      </motion.div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/50 to-transparent z-10" />
    </section>
  );
};
