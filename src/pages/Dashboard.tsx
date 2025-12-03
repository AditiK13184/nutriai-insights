import DashboardHeader from "@/components/DashboardHeader";
import NutriChat from "@/components/NutriChat";
import FoodAnalysis from "@/components/FoodAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Beef, Wheat, Droplets, Target, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const todayStats = {
    calories: { current: 1450, target: 2000 },
    protein: { current: 85, target: 120 },
    carbs: { current: 150, target: 250 },
    fats: { current: 45, target: 65 },
  };

  const statsCards = [
    {
      icon: Flame,
      label: "Calories",
      current: todayStats.calories.current,
      target: todayStats.calories.target,
      unit: "kcal",
      color: "text-coral",
      bgColor: "bg-coral/10",
    },
    {
      icon: Beef,
      label: "Protein",
      current: todayStats.protein.current,
      target: todayStats.protein.target,
      unit: "g",
      color: "text-primary",
      bgColor: "bg-sage-light",
    },
    {
      icon: Wheat,
      label: "Carbs",
      current: todayStats.carbs.current,
      target: todayStats.carbs.target,
      unit: "g",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Droplets,
      label: "Fats",
      current: todayStats.fats.current,
      target: todayStats.fats.target,
      unit: "g",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader
        title="Dashboard"
        subtitle="Track your daily nutrition and explore options"
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => {
            const percentage = Math.round((stat.current / stat.target) * 100);
            return (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`h-10 w-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                    >
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {percentage}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.current}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      / {stat.target} {stat.unit}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>

                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stat.color === "text-coral"
                          ? "bg-coral"
                          : stat.color === "text-primary"
                          ? "bg-primary"
                          : stat.color === "text-amber-600"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-primary" />
                Today's Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">72%</div>
              <p className="text-sm text-muted-foreground">
                You're doing great! Keep it up to reach your daily targets.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" />
                Weekly Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">5 days 🔥</div>
              <p className="text-sm text-muted-foreground">
                Amazing consistency! 2 more days to complete the week.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI + Scanner */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-[500px]">
            <NutriChat />
          </div>
          <div className="h-[500px]">
            <FoodAnalysis />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
