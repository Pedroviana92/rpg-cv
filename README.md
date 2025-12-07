# 🎮 RPG CV - Currículo em Formato RPG

Um currículo interativo gamificado com integração de IA usando a API Gemini do Google.

## 🚀 Tecnologias

- React
- Vite
- TailwindCSS
- Google Generative AI (Gemini)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env e adicione sua VITE_GEMINI_API_KEY
```

## 🔑 Configuração da API Gemini

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma API Key gratuita
3. Adicione no arquivo `.env`:
   ```
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

## 🎯 Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## ✨ Funcionalidades

- Currículo gamificado em formato RPG
- Chat com IA para responder perguntas sobre o profissional
- Interface neobrutalist moderna
- Sistema de quests (experiências profissionais)
- Sistema de skills e níveis

## 📝 Licença

MIT
