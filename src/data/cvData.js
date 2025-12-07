// Dados do currículo estruturados como RPG
// TODO: Adicione mais detalhes das experiências profissionais baseado no LinkedIn

export const characterInfo = {
  name: "Pedro Viana",
  title: "Back-End Developer | Salesforce Specialist",
  location: "São Paulo, SP, Brasil",
  level: 15, // Baseado em anos de experiência
  currentXP: 8500,
  maxXP: 10000,
  avatar: "🧙‍♂️",
  class: "Full Stack Mage",
  specialization: "Salesforce Sorcerer"
};

// Experiências profissionais como Main Quests
export const mainQuests = [
  {
    id: "quest-1",
    title: "Salesforce Developer",
    company: "Platform Builders",
    location: "São Paulo, SP, Brasil",
    period: "Jul 2025 - Atual",
    status: "in_progress",
    difficulty: "Epic",
    xpReward: 2500,
    description: "Desenvolvimento back-end com Salesforce (Sales, Service e Commerce). Trabalhando com soluções enterprise e integrações complexas.",
    skills: ["Salesforce", "B2C Commerce", "Back-end Development", "API Integration"],
    achievements: [
      "Implementação de soluções B2C Commerce",
      "Integração de sistemas enterprise",
      "Desenvolvimento de APIs customizadas"
    ]
  },
  {
    id: "quest-2",
    title: "Salesforce Developer Senior I",
    company: "OSF Digital",
    location: "São Paulo, SP, Brasil",
    period: "Abr 2024 - Jul 2025 (1 ano e 4 meses)",
    status: "completed",
    difficulty: "Epic",
    xpReward: 2200,
    description: "Desenvolvimento de aplicações de e-commerce usando SFCC, Salesforce Service e Sales Cloud com Apex e Lightning Web Components. Especialista em backend com suporte frontend.",
    skills: ["SFCC", "Apex", "Lightning Web Components", "Python", "AI Integration", "NodeJS"],
    achievements: [
      "Integrações com serviços externos (payment gateway, Google Analytics, Meta/Facebook)",
      "Uso de IA e Python para aumentar produtividade e automação de tarefas",
      "Integrações com OpenAI para melhorar uso de IA na empresa",
      "Experiência com projetos de diferentes indústrias (varejo, supermercados, produtos digitais, agronegócio)",
      "Code review e deployment de soluções complexas"
    ]
  },
  {
    id: "quest-3",
    title: "Salesforce Developer Advanced",
    company: "Globant",
    location: "São Paulo, SP, Brasil",
    period: "Fev 2023 - Abr 2024 (1 ano e 3 meses)",
    status: "completed",
    difficulty: "Hard",
    xpReward: 1800,
    description: "Desenvolvimento web na plataforma Salesforce Commerce Cloud, atuando como desenvolvedor backend e frontend em sites de e-commerce. Planejamento e design de soluções para projetos com clientes.",
    skills: ["SFCC", "Apex", "Lightning Web Components", "Marketing Cloud", "Service Cloud", "Google Analytics", "API Integration"],
    achievements: [
      "Integrações com sistemas externos: payment gateways, OMS, Marketing Cloud, Service Cloud",
      "Implementação de Google Analytics/GTM, Facebook Pixel e Google Measure Protocol",
      "Avaliação das melhores soluções técnicas para atender demandas de clientes",
      "Desenvolvimento fullstack em projetos de e-commerce"
    ]
  },
  {
    id: "quest-4",
    title: "Digital Solutions Consultant",
    company: "Capgemini",
    location: "São Paulo, SP, Brasil",
    period: "Out 2020 - Fev 2023 (2 anos e 5 meses)",
    status: "completed",
    difficulty: "Hard",
    xpReward: 2000,
    description: "Progressão de Analyst para Consultant III em Salesforce Commerce Cloud. Desenvolvimento back-end B2C e B2B, especialista em SFRA, integração de APIs e web services.",
    skills: ["SFCC B2C/B2B", "Apex", "Lightning Web Components", "NodeJS", "Golang", "SFRA", "API Integration", "Agile"],
    achievements: [
      "Promoção de Digital Solutions Analyst para Consultant III",
      "Desenvolvimento de APIs e aplicações com Golang",
      "Integração de payment gateways, geolocation e outros web services",
      "Especialização em SFRA (Storefront Reference Architecture)",
      "Code review, deploys e replicação de código em projetos enterprise"
    ]
  }
];

// Cursos e certificações como Side Quests (Upgrades)
export const sideQuests = [
  {
    id: "cert-1",
    title: "B2C Commerce Developer",
    issuer: "Salesforce",
    date: "Jul 2021",
    type: "certification",
    icon: "🏆",
    xpReward: 500,
    status: "completed",
    description: "Certificação oficial Salesforce B2C Commerce Developer"
  },
  {
    id: "cert-2",
    title: "Introdução a automação com n8n",
    issuer: "Rocketseat",
    date: "Nov 2025",
    type: "course",
    icon: "⚙️",
    xpReward: 200,
    status: "completed",
    description: "Curso de automação de processos com n8n"
  },
  {
    id: "edu-1",
    title: "Tecnologia",
    issuer: "Impacta Technology",
    date: "Ago 2021 - Dez 2023",
    type: "education",
    icon: "🎓",
    xpReward: 1500,
    status: "completed",
    description: "Formação em Tecnologia"
  },
  {
    id: "cert-3",
    title: "GIS on the Web",
    issuer: "LinkedIn Learning",
    date: "Out 2017",
    type: "course",
    icon: "📚",
    xpReward: 150,
    status: "completed",
    description: "Curso sobre sistemas de informação geográfica na web"
  },
  {
    id: "cert-4",
    title: "Learning Java",
    issuer: "LinkedIn Learning",
    date: "Out 2017",
    type: "course",
    icon: "📚",
    xpReward: 150,
    status: "completed",
    description: "Fundamentos da linguagem Java"
  },
  {
    id: "cert-5",
    title: "Programming Foundations: Fundamentals",
    issuer: "LinkedIn Learning",
    date: "Out 2017",
    type: "course",
    icon: "📚",
    xpReward: 150,
    status: "completed",
    description: "Fundamentos de programação"
  },
  {
    id: "cert-6",
    title: "IELTS Certification",
    issuer: "University of Cambridge",
    date: "Dez 2013",
    type: "certification",
    icon: "🌍",
    xpReward: 300,
    status: "completed",
    description: "International English Language Testing System"
  }
];

// Skills e habilidades
export const skills = {
  technical: [
    { name: "Salesforce", level: 90, icon: "⚡" },
    { name: "B2C Commerce", level: 85, icon: "🛒" },
    { name: "Back-end Development", level: 88, icon: "⚙️" },
    { name: "JavaScript", level: 85, icon: "💻" },
    { name: "API Integration", level: 82, icon: "🔗" },
    { name: "Java", level: 75, icon: "☕" }
  ],
  languages: [
    { name: "Português", level: 100, flag: "🇧🇷" },
    { name: "English", level: 100, flag: "🇺🇸" },
    { name: "Français", level: 30, flag: "🇫🇷" }
  ],
  soft: [
    { name: "Trabalho em Equipe", level: 95, icon: "👥" },
    { name: "Dedicação", level: 98, icon: "🎯" },
    { name: "Colaboração", level: 96, icon: "🤝" },
    { name: "Resolução de Problemas", level: 90, icon: "🧩" }
  ]
};

// Estatísticas do personagem
export const stats = {
  totalQuests: mainQuests.length,
  completedQuests: mainQuests.filter(q => q.status === 'completed').length,
  totalSideQuests: sideQuests.length,
  completedSideQuests: sideQuests.filter(q => q.status === 'completed').length,
  totalXP: [...mainQuests, ...sideQuests].reduce((sum, quest) => sum + quest.xpReward, 0),
  yearsOfExperience: 15,
  certifications: sideQuests.filter(q => q.type === 'certification').length
};
