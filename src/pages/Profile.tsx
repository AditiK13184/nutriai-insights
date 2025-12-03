import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, HeartPulse, Ruler, Weight, Flame, Beef, Wheat, Droplets, Target } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  const goals = [
    {
      icon: Flame,
      label: "Calorie Goal",
      value: user.calories,
      unit: "kcal",
      percentage: Math.min((user.calories / 2500) * 100, 100),
      color: "bg-red-500",
      bgColor: "bg-red-100",
    },
    {
      icon: Beef,
      label: "Protein Goal",
      value: user.protein,
      unit: "g",
      percentage: Math.min((user.protein / 150) * 100, 100),
      color: "bg-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Wheat,
      label: "Carb Goal",
      value: user.carbs,
      unit: "g",
      percentage: Math.min((user.carbs / 300) * 100, 100),
      color: "bg-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      icon: Droplets,
      label: "Fat Goal",
      value: user.fats,
      unit: "g",
      percentage: Math.min((user.fats / 90) * 100, 100),
      color: "bg-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <Card className="border-border/50">
        <CardHeader className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-sage-light flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
          <p><strong>Activity Level:</strong> {user.activity}</p>
          <p><strong>Dietary Preference:</strong> {user.dietary}</p>
        </CardContent>
      </Card>

      {/* Goal Summary */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="h-5 w-5 text-primary" />
            Goal Summary
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-lg mb-4"><strong>Overall Goal:</strong> {user.goal}</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goals.map((stat) => (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(stat.percentage)}%
                    </span>
                  </div>

                  <div className="text-2xl font-bold">
                    {stat.value}
                    <span className="text-sm text-muted-foreground ml-1">
                      {stat.unit}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>

                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stat.color}`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Body Metrics */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <HeartPulse className="h-5 w-5 text-primary" />
            Body Metrics
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-lg">
          <p><Ruler className="inline h-5 w-5 mr-2 text-primary" /> Height: {user.height} cm</p>
          <p><Weight className="inline h-5 w-5 mr-2 text-primary" /> Weight: {user.weight} kg</p>
          <p><Mail className="inline h-5 w-5 mr-2 text-primary" /> BMI: {(user.weight / ((user.height/100)**2)).toFixed(1)}</p>
        </CardContent>
      </Card>

    </div>
  );
};

export default Profile;
