import { useState } from "react";

export function useOpenAIChat() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const fetchChatResponse = async (messages: any) => {
    const requestBody = {
      model: "gpt-4-turbo",
      messages: messages,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    setLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        },
      );
      const data = await response.json();

      setResponse(data.choices[0].message.content);
    } catch (error: unknown) {
      console.error("Error fetching from OpenAI:", error);
      setError(error);
    }
    setLoading(false);
  };

  return { fetchChatResponse, response, loading, error };
}