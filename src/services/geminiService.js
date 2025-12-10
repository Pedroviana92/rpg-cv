const CACHE_KEY = 'rpg_cv_chat_cache';
const COUNT_KEY = 'rpg_cv_prompt_count';
const MAX_PROMPTS_PER_SESSION = 3;

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
    // Simulamos um erro ou retornamos uma mensagem direta
    throw new Error(
      `🛡️ Limite de mana atingido! (${MAX_PROMPTS_PER_SESSION}/3 perguntas por sessão).\n\n` +
      `Para saber mais detalhes, recarregue a página ou entre em contato:\n` +
      `LinkedIn: https://www.linkedin.com/in/pedro-viana-2b760757/\n` +
      `WhatsApp: https://wa.me/5532999315341`
    );
  }

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
      // 3. Sucesso: Salvar Cache e Incrementar Contador
      saveToCache(question, data.answer);
      incrementPromptCount();
      return data.answer; 
    }
    
    // Se a API retornou erro (ex: Overloaded), não incrementamos o contador
    if (data.error) {
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
