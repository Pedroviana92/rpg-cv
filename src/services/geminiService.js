import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Fazer uma pergunta sobre o currículo usando Gemini API (Google)
 * @param {string} question - A pergunta do usuário
 * @returns {Promise<string>} - A resposta da IA
 */
export const askAI = async (question) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    });

    const data = await response.json();
    console.log(data);
    if (data.answer) {
      return data.answer; 
    }
    return null;

  } catch (error) {
    console.error("Erro", error);
  }
};

/**
 * Verificar se a API está configurada corretamente
 * @returns {boolean}
 */
export const isAIConfigured = () => {
  const apiActive = import.meta.env.VITE_GEMINI_API_ACTIVE;
  const hasApiKey = !!import.meta.env.VITE_GEMINI_API_KEY;
  
  return apiActive && hasApiKey;
};

// Exportar com nomes genéricos para compatibilidade
export const askGemini = askAI;
export const isGeminiConfigured = isAIConfigured;
