// api/chat.js
import { GoogleGenAI } from "@google/genai";
import { characterInfo, mainQuests, sideQuests, skills } from '../src/data/cvData.js';

// Inicializar cliente AI (singleton)
let aiClient = null;
const getAIClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }
  return aiClient;
};

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

// Helper para delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função com Retry (Backoff Exponencial)
const generateWithRetry = async (ai, params, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error) {
      // Verificar se é erro de sobrecarga (503) ou similar
      const isOverloaded = error.status === 503 || error.code === 503 || (error.message && error.message.includes('overloaded'));
      
      if (isOverloaded && i < retries - 1) {
        const waitTime = 1000 * Math.pow(2, i); // Backoff: 1s, 2s, 4s...
        console.warn(`⚠️ Modelo sobrecarregado. Tentativa ${i + 1} falhou. Aguardando ${waitTime}ms para tentar novamente...`);
        await delay(waitTime);
        continue;
      }
      // Se não for erro de sobrecarga ou acabaram as tentativas, lança o erro
      throw error;
    }
  }
};

export default async function handler(req, res) {
  // 1. Segurança: Aceitar apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Pegar a pergunta do corpo da requisição
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // 3. Inicializar o cliente AI
    const ai = getAIClient();
    const context = prepareContext();

    // 4. Gerar resposta usando o modelo gemini-2.5-flash com Retry
    // Sintaxe correta para @google/genai v1+
    const response = await generateWithRetry(ai, {
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: {
          parts: [{ text: context }]
        }
      },
      contents: [{
        role: "user",
        parts: [{ text: question }]
      }]
    });

    // Extrair texto da resposta (compatível com @google/genai)
    const text = response.candidates[0].content.parts[0].text;

    // 5. Devolver para o frontend
    return res.status(200).json({ answer: text });

  } catch (error) {
    console.error('❌ Erro ao processar IA:', error);

    // Log detalhado do erro
    if (error.message) {
      console.error('Mensagem:', error.message);
    }
    if (error.response && error.response.error) {
      console.error('Response Error Code:', error.response.error.code);
      console.error('Response Error Message:', error.response.error.message);
    }

    return res.status(500).json({
      error: 'Erro interno ao processar IA',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
