// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

import { characterInfo, mainQuests, sideQuests, skills } from '../src/data/cvData.js';

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
    // 3. Inicializar o Gemini (A chave vem das Variáveis de Ambiente do Servidor)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite" });

    const context = prepareContext();
    
    const prompt = `${context}\n\nPergunta do usuário: ${question}`;

    // 5. Gerar a resposta
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 6. Devolver para o frontend
    return res.status(200).json({ answer: text });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao processar IA' });
  }
}