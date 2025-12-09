import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import { askGemini, isGeminiConfigured } from '../services/geminiService';

const SearchBar = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState(isGeminiConfigured());
  const answerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await askGemini(question);
      setAnswer(response);
    } catch (error) {
      setAnswer(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const exampleQuestions = [
    "Qual é a experiência profissional de Pedro?",
    "Quais certificações Pedro possui?",
    "Quais são as principais habilidades técnicas?",
    "Em quais idiomas Pedro tem fluência?"
  ];

  // Scroll automático para a resposta quando ela aparecer
  useEffect(() => {
    if (answer && answerRef.current) {
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        answerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [answer]);

  return (
    <Card variant="dark-700" shadow="brutal-cyan" className="mb-6">
      <div className="mb-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          🔍 Pergunte sobre o Profissional
        </h2>
        <p className="font-mono text-xs sm:text-sm">
          Use a IA para descobrir informações sobre experiências, habilidades e formação.
        </p>
      </div>

      {!configured && (
        <div className="mb-4 p-4 border-3 border-dark bg-warning">
          <p className="font-display font-bold text-sm mb-2">⚠️ API não configurada</p>
          <p className="font-mono text-xs">
            Configure a VITE_GEMINI_API_KEY no arquivo .env
          </p>
          <p className="font-mono text-xs mt-2">
            🎁 Obtenha sua chave em: https://aistudio.google.com/app/apikey
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-3 sm:px-4 py-3 border-3 border-dark font-mono text-xs sm:text-sm focus:outline-none focus:ring-3 focus:ring-primary w-full"
            disabled={loading || !configured}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !configured || !question.trim()}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            <span className="hidden sm:inline">{loading ? '⏳ Pensando...' : '🚀 Perguntar'}</span>
            <span className="sm:hidden">{loading ? '⏳' : '🚀'}</span>
          </Button>
        </div>
      </form>

      <div className="mb-4">
        <p className="font-display text-xs font-bold mb-2">Exemplos:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => setQuestion(q)}
              className="font-mono text-xs px-2 sm:px-3 py-2 border-2 border-secondary bg-dark-600 text-light hover:bg-secondary hover:text-dark transition-colors text-left"
              disabled={loading || !configured}
            >
              <span className="line-clamp-2">{q}</span>
            </button>
          ))}
        </div>
      </div>

      {answer && (
        <Card variant="dark-600" shadow="brutal-green" padding="md" className="scroll-mt-4">
          <div ref={answerRef}>
            <h3 className="font-display font-bold text-sm mb-2 flex items-center gap-2 text-light">
              🤖 Resposta da IA:
            </h3>
            <p className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-gray-300">
              {answer}
            </p>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default SearchBar;
