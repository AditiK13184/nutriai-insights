import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import Logo from "@/components/Logo";
import { Bot, Camera, Apple, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";

const Index = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Nutrition Coach",
      description: "Get personalized diet tips and meal recommendations powered by advanced AI technology.",
    },
    {
      icon: Camera,
      title: "Food Scanner",
      description: "Simply snap a photo of your meal and instantly get detailed nutritional breakdown.",
    },
    {
      icon: Apple,
      title: "Calorie Tracking",
      description: "Effortlessly track your daily calories, proteins, carbs, and fats in one place.",
    },
    {
      icon: TrendingUp,
      title: "Progress Insights",
      description: "Visualize your nutrition journey with beautiful charts and actionable insights.",
    },
    {
      icon: Shield,
      title: "Personalized Goals",
      description: "Set and achieve your health goals with plans tailored to your body and lifestyle.",
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions",
      description: "Receive AI-powered meal suggestions based on your preferences and nutritional needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero opacity-60" />
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-sage-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-peach/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light/50 rounded-full text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI-Powered Nutrition
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Eat Smarter,{" "}
                <span className="text-primary">Live Healthier</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Your personal AI nutrition assistant. Scan your meals, track calories, and get personalized recommendations for a healthier lifestyle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    I have an account
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1M+</div>
                  <div className="text-sm text-muted-foreground">Meals Scanned</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Fresh healthy food arrangement"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-lg border border-border animate-bounce-gentle">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sage-light flex items-center justify-center">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Instant Analysis</div>
                    <div className="text-xs text-muted-foreground">Scan any meal</div>
                  </div>
                </div>
              </div>

              {/* Another floating card */}
              <div className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-lg border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-peach flex items-center justify-center">
                    <Bot className="h-5 w-5 text-coral" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">NutriAI</div>
                    <div className="text-xs text-muted-foreground">Your AI coach</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for{" "}
              <span className="text-primary">Better Nutrition</span>
            </h2>
            <p className="text-muted-foreground">
              Powerful AI-driven tools designed to make healthy eating simple and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative bg-primary rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage-dark/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Health?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Join thousands of users who have already improved their nutrition with NutriAI. Start your free journey today!
              </p>
              <Link to="/signup">
                <Button variant="coral" size="xl">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2024 NutriAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
