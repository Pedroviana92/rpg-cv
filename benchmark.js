import { performance } from 'perf_hooks';

// Configuração
const BASE_URL = 'http://localhost:3000'; // Vercel Dev geralmente roda na 3000
const ENDPOINT = '/api/chat';
const TEST_QUESTION = "Resuma o perfil profissional em uma frase.";

async function benchmark() {
  console.log(`🚀 Iniciando Teste de Performance da IA`);
  console.log(`🎯 Alvo: ${BASE_URL}${ENDPOINT}`);
  console.log(`📝 Pergunta: "${TEST_QUESTION}"`);
  console.log('--------------------------------------------------');

  const times = [];

  // Função helper para fazer a request
  const runRequest = async (iteration) => {
    const start = performance.now();
    
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: TEST_QUESTION })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      await response.json(); // Esperar o parsing do JSON
      const end = performance.now();
      const duration = (end - start).toFixed(2);
      
      return parseFloat(duration);
    } catch (error) {
      console.error(`❌ Erro na requisição ${iteration}:`, error.message);
      return null;
    }
  };

  // 1. Cold Start (Primeira requisição costuma ser mais lenta)
  console.log('❄️  Testando Cold Start (1ª requisição)...');
  const coldTime = await runRequest(1);
  
  if (coldTime) {
    console.log(`⏱️  Tempo Cold Start: ${coldTime}ms`);
    times.push(coldTime);
  }

  console.log('\n🔥 Testando Warm Start (4 requisições seguidas)...');

  // 2. Warm Start (Próximas requisições)
  for (let i = 1; i <= 4; i++) {
    process.stdout.write(`   Req ${i + 1}... `);
    const time = await runRequest(i + 1);
    if (time) {
      console.log(`${time}ms`);
      times.push(time);
    }
  }

  // 3. Relatório
  if (times.length > 0) {
    const warmTimes = times.slice(1); // Remover o cold start da média
    const avgWarm = warmTimes.reduce((a, b) => a + b, 0) / warmTimes.length;
    const min = Math.min(...warmTimes);
    const max = Math.max(...warmTimes);

    console.log('\n📊 RELATÓRIO DE PERFORMANCE');
    console.log('--------------------------------------------------');
    console.log(`❄️  Cold Start:      ${coldTime}ms`);
    console.log(`🔥 Média (Warm):    ${avgWarm.toFixed(2)}ms`);
    console.log(`⚡ Mais rápida:     ${min}ms`);
    console.log(`🐢 Mais lenta:      ${max}ms`);
    console.log('--------------------------------------------------');
    
    // Análise rápida
    if (avgWarm > 3000) {
      console.log('⚠️  CONCLUSÃO: A API está lenta (> 3s). Pode ser latência do modelo ou conexão.');
    } else if (avgWarm < 1000) {
      console.log('✅ CONCLUSÃO: Performance excelente (< 1s)!');
    } else {
      console.log('ℹ️  CONCLUSÃO: Performance aceitável (1s - 3s).');
    }
  }
}

benchmark();
