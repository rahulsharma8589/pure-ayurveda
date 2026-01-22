import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(100);
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100);

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (!isLogin) {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) {
        newErrors.name = nameResult.error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              variant: "destructive",
              title: "Login failed",
              description: "Invalid email or password. Please try again.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Login failed",
              description: error.message,
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              variant: "destructive",
              title: "Registration failed",
              description: "This email is already registered. Please login instead.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Registration failed",
              description: error.message,
            });
          }
        } else {
          toast({
            title: "Welcome to Dinkar Ayurveda!",
            description: "Your account has been created successfully.",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        
        {/* Floating leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-foreground/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Leaf className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <motion.div
            className="p-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20"
            whileHover={{ scale: 1.05 }}
          >
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <span className="font-serif text-3xl font-bold text-primary-foreground">
            Dinkar Ayurveda
          </span>
        </Link>

        <Card className="bg-primary-foreground/5 backdrop-blur-sm border-primary-foreground/20">
          <CardHeader className="text-center pb-4">
            <motion.div
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mx-auto mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">
                {isLogin ? "Welcome Back" : "Join Our Family"}
              </span>
            </motion.div>
            
            <CardTitle className="font-serif text-2xl text-primary-foreground">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-primary-foreground/70">
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Start your Ayurvedic wellness journey today"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Label htmlFor="name" className="text-primary-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-300">{errors.name}</p>
                  )}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-300">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-base shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-foreground/70">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-accent hover:text-accent/80 font-semibold transition-colors underline-offset-4 hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust badges */}
        <motion.div 
          className="flex items-center justify-center gap-6 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: "🔒", label: "Secure" },
            { icon: "🌿", label: "Natural" },
            { icon: "✓", label: "Trusted" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
