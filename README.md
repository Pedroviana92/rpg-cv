# 🎮 RPG CV - Currículo em Formato RPG

Um currículo interativo gamificado com integração de IA usando a API Gemini do Google.

## 🚀 Tecnologias

- React
- Vite
- TailwindCSS
- Google Gen AI SDK (@google/genai) com Prompt Caching
- Gemini 2.5 Flash

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
   GEMINI_API_KEY=sua_chave_aqui
   VITE_GEMINI_API_KEY=sua_chave_aqui
   VITE_GEMINI_API_ACTIVE=true
   ```

## 💰 Prompt Caching - Economize até 96% em Tokens

Este projeto utiliza **Prompt Caching** do Gemini para reduzir drasticamente o uso de tokens:

### Como Funciona

1. **Contexto Cacheado**: O currículo completo (informações profissionais, experiências, skills) é enviado apenas 1 vez e cacheado por 1 hora
2. **Reutilização**: Cada pergunta subsequente usa apenas ~50 tokens ao invés de ~1.500 tokens
3. **Economia Real**: **96% de redução** no uso de tokens!

### Exemplo de Economia

**Sem cache (antes):**
```
100 perguntas × 1.500 tokens = 150.000 tokens
Custo: ~$0.15 - $0.30 USD
```

**Com cache (agora):**
```
1ª pergunta: 1.500 tokens (cria cache)
99 perguntas: 50 tokens cada = 4.950 tokens
Total: 6.450 tokens
Custo: ~$0.01 - $0.02 USD
💸 Economia: 20x menos custos!
```

### Logs do Console

Quando o servidor estiver rodando, você verá logs indicando o status do cache:

- `🔄 Criando novo cache de contexto...` - Cache sendo criado pela primeira vez
- `✅ Usando cache existente` - Cache reutilizado (economia ativa!)
- `💬 Gerando resposta COM CACHE` - Requisição usando cache
- `⚠️ Gerando resposta SEM CACHE` - Fallback caso cache falhe

### Configurações de Cache

- **TTL (Time To Live)**: 1 hora
- **Modelo**: Gemini 2.5 Flash (otimizado para cache)
- **Mínimo de tokens**: 1.024 tokens (seu contexto tem ~1.500 ✅)
- **Auto-renovação**: Cache é recriado automaticamente após expiração

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
