import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Loader2, Flame, Beef, Wheat, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
}

const FoodAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setNutritionData(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-food`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64: image }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze food');
      }

      const data = await response.json();
      setNutritionData(data);
      toast({
        title: "Analysis complete!",
        description: `We've identified ${data.name} and calculated the nutrition.`,
      });
    } catch (error) {
      console.error('Food analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Could not analyze the food image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setNutritionData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nutritionItems = nutritionData
    ? [
        { icon: Flame, label: "Calories", value: nutritionData.calories, unit: "kcal", color: "text-coral" },
        { icon: Beef, label: "Protein", value: nutritionData.protein, unit: "g", color: "text-primary" },
        { icon: Wheat, label: "Carbs", value: nutritionData.carbs, unit: "g", color: "text-amber-500" },
        { icon: Droplets, label: "Fats", value: nutritionData.fats, unit: "g", color: "text-blue-500" },
      ]
    : [];

  return (
    <Card className="h-full border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Camera className="h-5 w-5 text-primary" />
          Food Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              Upload a food photo
            </p>
            <p className="text-xs text-muted-foreground">
              Click to browse or drag and drop
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={image}
                alt="Uploaded food"
                className="w-full h-48 object-cover"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!nutritionData && (
              <Button
                onClick={analyzeFood}
                variant="sage"
                className="w-full"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Analyze Food
                  </>
                )}
              </Button>
            )}

            {nutritionData && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center py-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {nutritionData.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nutritional breakdown per serving
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {nutritionItems.map((item) => (
                    <div
                      key={item.label}
                      className="bg-muted/50 rounded-xl p-3 text-center"
                    >
                      <item.icon className={`h-5 w-5 mx-auto mb-1 ${item.color}`} />
                      <div className="text-lg font-bold text-foreground">
                        {item.value}
                        <span className="text-xs font-normal text-muted-foreground ml-0.5">
                          {item.unit}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={clearImage}
                  variant="outline"
                  className="w-full"
                >
                  Scan Another Meal
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodAnalysis;
