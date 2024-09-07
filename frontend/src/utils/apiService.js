// src/utils/apiService.js

export const sendPromptToLLM = async (prompt, selectedModels) => {
    try {
      const response = await fetch('/api/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          models: selectedModels,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  