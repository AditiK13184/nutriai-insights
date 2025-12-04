import { useState } from "react";
import { analyzeFood } from "@/lib/gemini";

export default function Scanner() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result!.toString().split(",")[1];
      setImagePreview(reader.result!.toString());

      setLoading(true);
      const data = await analyzeFood(base64, file.type);
      setLoading(false);

      setResult(data);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Food Scanner</h1>

      <input type="file" accept="image/*" onChange={handleFile} />

      {imagePreview && (
        <img
          src={imagePreview}
          className="w-60 h-60 object-cover rounded-xl mt-4"
        />
      )}

      {loading && <p>Analyzing…</p>}

      {result && !loading && (
        <div className="mt-6 p-4 rounded-xl bg-card border">
          <h2 className="text-xl font-semibold">{result.food}</h2>
          <p>Calories: {result.calories}</p>
          <p>Protein: {result.protein}g</p>
          <p>Carbs: {result.carbs}g</p>
          <p>Fats: {result.fats}g</p>
          <p className="mt-2">{result.description}</p>
        </div>
      )}
    </div>
  );
}
