const CACHE_KEY = 'rpg_cv_chat_cache';
const COUNT_KEY = 'rpg_cv_prompt_count';
const MAX_PROMPTS_PER_SESSION = 3;

// Mensagem amigável para limites (Sessão ou API 429)
const LIMIT_MESSAGE = `🛡️ Limite de mana atingido!\n\n` +
  `Para continuar sua jornada, recarregue a página (se for limite de sessão) ou entre em contato diretamente:\n` +
  `LinkedIn: https://www.linkedin.com/in/pedro-viana-2b760757/\n` +
  `WhatsApp: https://wa.me/5532999315341`;

/**
 * Normaliza a pergunta para usar como chave de cache
 */
const getCacheKey = (question) => {
  return question.trim().toLowerCase();
};

/**
 * Recupera o cache do sessionStorage
 */
const getCache = () => {
  try {
    const cache = sessionStorage.getItem(CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch (e) {
    console.warn('Erro ao ler cache', e);
    return {};
  }
};

/**
 * Salva item no cache
 */
const saveToCache = (question, answer) => {
  try {
    const cache = getCache();
    cache[getCacheKey(question)] = answer;
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Erro ao salvar cache', e);
  }
};

/**
 * Gerencia a contagem de prompts da sessão
 */
const getPromptCount = () => {
  return parseInt(sessionStorage.getItem(COUNT_KEY) || '0', 10);
};

const incrementPromptCount = () => {
  const current = getPromptCount();
  sessionStorage.setItem(COUNT_KEY, (current + 1).toString());
};

/**
 * Fazer uma pergunta sobre o currículo usando Gemini API (Google)
 * @param {string} question - A pergunta do usuário
 * @returns {Promise<string>} - A resposta da IA
 */
export const askAI = async (question) => {
  // 1. Verificar Cache (Não conta no limite)
  const cacheKey = getCacheKey(question);
  const cachedData = getCache();
  
  if (cachedData[cacheKey]) {
    console.log('⚡ Resposta recuperada do cache local (Frontend)');
    return cachedData[cacheKey];
  }

  // 2. Verificar Limite da Sessão
  const currentUsage = getPromptCount();
  if (currentUsage >= MAX_PROMPTS_PER_SESSION) {
    throw new Error(LIMIT_MESSAGE);
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    });

    // 2.1 Verificar Erro 429 (API Gateway/Vercel)
    if (response.status === 500) {
      throw new Error(LIMIT_MESSAGE);
    }

    const data = await response.json();
    console.log(data);
    
    if (data.answer) {
      // 3. Sucesso: Salvar Cache e Incrementar Contador
      saveToCache(question, data.answer);
      incrementPromptCount();
      return data.answer; 
    }
    
    // 4. Tratar erros da API
    if (data.error) {
       // Verificar se o erro interno é de cota (Quota Exceeded / 429)
       const errorStr = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
       if (errorStr.includes('429') || errorStr.toLowerCase().includes('quota') || errorStr.toLowerCase().includes('exhausted')) {
         throw new Error(LIMIT_MESSAGE);
       }

       throw new Error(data.error);
    }

    return null;

  } catch (error) {
    console.error("Erro", error);
    throw error; // Propagar erro para ser tratado na UI
  }
};

/**
 * Verificar se a API está configurada corretamente
 * @returns {boolean}
 */
export const isAIConfigured = () => {
  const apiActive = import.meta.env.VITE_GEMINI_API_ACTIVE;
  // A chave agora é usada apenas no backend, mas mantemos a verificação para flags de feature
  return apiActive;
};

// Exportar com nomes genéricos para compatibilidade
export const askGemini = askAI;
export const isGeminiConfigured = isAIConfigured;
