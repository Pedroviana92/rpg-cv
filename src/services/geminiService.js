/**
 * CONFIGURAÇÃO DA API GEMINI (Google)
 *
 * PASSO 1: Obter uma API Key
 * --------------------------------------
 * 1. Acesse: https://aistudio.google.com/app/apikey
 * 2. Faça login com sua conta Google
 * 3. Clique em "Create API Key"
 * 4. Copie a chave
 *
 * PASSO 2: Configurar a chave no projeto
 * ---------------------------------------
 * 1. Crie um arquivo .env na raiz do projeto
 * 2. Adicione a seguinte linha:
 *    VITE_GEMINI_API_KEY=sua_chave_aqui
 * 3. Substitua 'sua_chave_aqui' pela chave copiada
 *
 * PASSO 3: Adicionar .env ao .gitignore
 * --------------------------------------
 * IMPORTANTE: Nunca commite sua API key!
 * O arquivo .env já está no .gitignore
 *
 * NOTA: A API do Gemini oferece uso gratuito com limites generosos.
 * Verifique os limites em: https://ai.google.dev/pricing
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { characterInfo, mainQuests, sideQuests, skills } from '../data/cvData';

// Preparar contexto do currículo
const prepareContext = () => {
  const context = `
Você é um assistente especializado em responder perguntas sobre o profissional ${characterInfo.name}.

INFORMAÇÕES DO PROFISSIONAL:
Nome: ${characterInfo.name}
Título: ${characterInfo.title}
Localização: ${characterInfo.location}
Classe Profissional: ${characterInfo.class}
Especialização: ${characterInfo.specialization}

EXPERIÊNCIAS PROFISSIONAIS:
${mainQuests.map(quest => `
- ${quest.title} na ${quest.company}
  Período: ${quest.period}
  Local: ${quest.location}
  Descrição: ${quest.description}
  Skills: ${quest.skills.join(', ')}
  Conquistas: ${quest.achievements.join('; ')}
`).join('\n')}

FORMAÇÃO E CERTIFICAÇÕES:
${sideQuests.map(sq => `
- ${sq.title} (${sq.type})
  Instituição: ${sq.issuer}
  Data: ${sq.date}
  Descrição: ${sq.description}
`).join('\n')}

HABILIDADES TÉCNICAS:
${skills.technical.map(s => `- ${s.name}: Nível ${s.level}%`).join('\n')}

IDIOMAS:
${skills.languages.map(l => `- ${l.name}: Nível ${l.level}%`).join('\n')}

SOFT SKILLS:
${skills.soft.map(s => `- ${s.name}: Nível ${s.level}%`).join('\n')}

Responda sempre em português, de forma clara e profissional.
Baseie suas respostas APENAS nas informações fornecidas acima.
Se a pergunta não puder ser respondida com as informações disponíveis, seja honesto e diga isso.
Seja conciso e objetivo nas respostas (máximo 3 parágrafos).
`;

  return context;
};

/**
 * Fazer uma pergunta sobre o currículo usando Gemini API (Google)
 * @param {string} question - A pergunta do usuário
 * @returns {Promise<string>} - A resposta da IA
 */
export const askAI = async (question) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return 'Erro: API Key não configurada. Por favor, configure a VITE_GEMINI_API_KEY no arquivo .env\n\nObtenha gratuitamente em: https://aistudio.google.com/app/apikey';
    }

    const context = prepareContext();

    // Inicializar o Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash-lite' });

    // Combinar o contexto com a pergunta
    const prompt = `${context}\n\nPERGUNTA DO VISITANTE: ${question}`;

    // Gerar resposta
    const result = await model.generateContent(prompt);
    const response = result.response;
    const answer = response.text();

    if (!answer || answer.trim() === '') {
      return 'Desculpe, não consegui gerar uma resposta adequada. Tente reformular a pergunta.';
    }

    return answer.trim();
  } catch (error) {
    console.error('Erro ao consultar Gemini API:', error);

    // Tratamento de erros específicos
    if (error.message && error.message.includes('API key not valid')) {
      return 'Erro: API Key inválida. Verifique se você configurou corretamente a chave no arquivo .env\n\nObtenha em: https://aistudio.google.com/app/apikey';
    }

    if (error.message && error.message.includes('quota')) {
      return 'Erro: Limite de requisições atingido. Por favor, aguarde alguns minutos e tente novamente.';
    }

    if (error.message && error.message.includes('SAFETY')) {
      return 'Desculpe, não posso responder essa pergunta devido a restrições de segurança. Por favor, reformule sua pergunta.';
    }

    if (error.message && error.message.includes('fetch')) {
      console.log(error.message);
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }

    return `Erro ao processar sua pergunta: ${error.message || 'Erro desconhecido'}`;
  }
};

/**
 * Verificar se a API está configurada corretamente
 * @returns {boolean}
 */
export const isAIConfigured = () => {
  return !!import.meta.env.VITE_GEMINI_API_KEY;
};

// Exportar com nomes genéricos para compatibilidade
export const askGemini = askAI;
export const isGeminiConfigured = isAIConfigured;
