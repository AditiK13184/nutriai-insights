export async function analyzeFood(base64Data: string, mimeType: string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text:
              "You are a nutrition analyzer. Detect the food in the image and return ONLY this JSON:\n" +
              "{ \"food\": \"\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fats\": 0, \"description\": \"\" }"
          },
          {
            inlineData: {
              mimeType,
              data: base64Data
            }
          }
        ]
      }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  try {
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch {
    return { error: "Failed to parse Gemini response", raw: data };
  }
}
