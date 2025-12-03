import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { ArrowRight, ArrowLeft, Target, Activity, Scale, Ruler, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Details = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const activityLevels = [
    { value: "sedentary", label: "Sedentary", description: "Little or no exercise" },
    { value: "light", label: "Light", description: "Exercise 1-3 times/week" },
    { value: "moderate", label: "Moderate", description: "Exercise 3-5 times/week" },
    { value: "active", label: "Active", description: "Exercise 6-7 times/week" },
    { value: "very-active", label: "Very Active", description: "Intense daily exercise" },
  ];

  const goals = [
    { value: "lose", label: "Lose Weight", icon: "📉" },
    { value: "maintain", label: "Maintain Weight", icon: "⚖️" },
    { value: "gain", label: "Gain Muscle", icon: "💪" },
    { value: "health", label: "Improve Health", icon: "🌱" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate saving - will be replaced with actual API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile complete!",
        description: "Your personalized dashboard is ready.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="age"
            type="number"
            placeholder="25"
            className="pl-11"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            min="13"
            max="120"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <div className="grid grid-cols-3 gap-3">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, gender: option.value })}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.gender === option.value
                  ? "border-primary bg-sage-light/50"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <User className={`h-5 w-5 mx-auto mb-1 ${formData.gender === option.value ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${formData.gender === option.value ? "text-primary" : "text-foreground"}`}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <div className="relative">
            <Scale className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="weight"
              type="number"
              placeholder="70"
              className="pl-11"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <div className="relative">
            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="height"
              type="number"
              placeholder="175"
              className="pl-11"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Activity Level</Label>
        <div className="space-y-2">
          {activityLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setFormData({ ...formData, activityLevel: level.value })}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                formData.activityLevel === level.value
                  ? "border-primary bg-sage-light/50"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className={`h-5 w-5 ${formData.activityLevel === level.value ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <div className={`font-medium ${formData.activityLevel === level.value ? "text-primary" : "text-foreground"}`}>
                    {level.label}
                  </div>
                  <div className="text-sm text-muted-foreground">{level.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>What's your goal?</Label>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() => setFormData({ ...formData, goal: goal.value })}
              className={`p-6 rounded-xl border-2 text-center transition-all duration-200 ${
                formData.goal === goal.value
                  ? "border-primary bg-sage-light/50"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-3xl mb-2">{goal.icon}</div>
              <div className={`font-medium ${formData.goal === goal.value ? "text-primary" : "text-foreground"}`}>
                {goal.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const canProceed = () => {
    if (step === 1) return formData.age && formData.gender && formData.weight && formData.height;
    if (step === 2) return formData.activityLevel;
    if (step === 3) return formData.goal;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-peach/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-mint/30 rounded-full blur-3xl" />

      <Card className="w-full max-w-lg relative z-10 shadow-lg border-border/50 animate-scale-in">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={false} />
          </div>
          <CardTitle className="text-2xl font-bold">Tell Us About You</CardTitle>
          <CardDescription>
            Step {step} of 3 — We'll personalize your experience
          </CardDescription>

          {/* Progress bar */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  variant="sage"
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="sage"
                  size="lg"
                  className="flex-1"
                  disabled={isLoading || !canProceed()}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Complete Setup
                      <Target className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
