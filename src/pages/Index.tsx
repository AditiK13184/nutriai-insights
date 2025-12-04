import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
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
            
            {/* Left Section */}
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
                Your personal AI nutrition assistant. Scan your meals, track calories,
                and get personalized recommendations for a healthier lifestyle.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="hero-outline"
                    size="xl"
                    className="w-full sm:w-auto"
                  >
                    I have an account
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Fresh healthy food arrangement"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
