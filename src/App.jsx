import React, { useState, useRef } from 'react';
import CharacterPanel from './components/CharacterPanel';
import Quest from './components/Quest';
import SideQuest from './components/SideQuest';
import SearchBar from './components/SearchBar';
import Badge from './components/Badge';
import { characterInfo, mainQuests, sideQuests, skills, stats } from './data/cvData';

function App() {
  const [activeTab, setActiveTab] = useState('quests');
  const contentSectionRef = useRef(null);

  const handleStatClick = (statType) => {
    // Mapear o tipo de stat para a aba correspondente
    const tabMap = {
      'totalXP': 'quests',
      'mainQuests': 'quests',
      'sideQuests': 'sideQuests',
      'certifications': 'sideQuests'
    };

    const targetTab = tabMap[statType];
    if (targetTab) {
      setActiveTab(targetTab);

      // Scroll suave para a seção de conteúdo após mudar a aba
      setTimeout(() => {
        contentSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 p-3 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-light drop-shadow-lg">
            ⚔️ RPG CURRICULUM VITAE ⚔️
          </h1>
          <p className="font-mono text-sm sm:text-base md:text-lg text-gray-300">
            Uma jornada profissional épica
          </p>
        </div>

        {/* Character Panel */}
        <CharacterPanel
          name={characterInfo.name}
          title={characterInfo.title}
          location={characterInfo.location}
          level={characterInfo.level}
          currentXP={characterInfo.currentXP}
          maxXP={characterInfo.maxXP}
          avatar={characterInfo.avatar}
          characterClass={characterInfo.class}
          specialization={characterInfo.specialization}
          stats={stats}
          onStatClick={handleStatClick}
        />

        {/* Search Bar */}
        <SearchBar />

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={() => setActiveTab('quests')}
            className={`font-display font-bold px-4 py-3 sm:px-6 border-3 transition-all w-full sm:w-auto text-sm sm:text-base ${
              activeTab === 'quests'
                ? 'bg-primary text-dark border-primary shadow-brutal translate-x-0 translate-y-0'
                : 'bg-dark-700 text-light border-primary hover:bg-dark-600 hover:translate-x-1 hover:translate-y-1 shadow-brutal hover:shadow-none'
            }`}
          >
            ⚔️ Main Quests
          </button>
          <button
            onClick={() => setActiveTab('sideQuests')}
            className={`font-display font-bold px-4 py-3 sm:px-6 border-3 transition-all w-full sm:w-auto text-sm sm:text-base ${
              activeTab === 'sideQuests'
                ? 'bg-secondary text-dark border-secondary shadow-brutal-green translate-x-0 translate-y-0'
                : 'bg-dark-700 text-light border-secondary hover:bg-dark-600 hover:translate-x-1 hover:translate-y-1 shadow-brutal-green hover:shadow-none'
            }`}
          >
            📚 Side Quests
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`font-display font-bold px-4 py-3 sm:px-6 border-3 transition-all w-full sm:w-auto text-sm sm:text-base ${
              activeTab === 'skills'
                ? 'bg-accent text-dark border-accent shadow-brutal-cyan translate-x-0 translate-y-0'
                : 'bg-dark-700 text-light border-accent hover:bg-dark-600 hover:translate-x-1 hover:translate-y-1 shadow-brutal-cyan hover:shadow-none'
            }`}
          >
            ⚡ Skills
          </button>
        </div>

        {/* Content Sections */}
        <div ref={contentSectionRef} className="scroll-mt-4">
        {activeTab === 'quests' && (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-light flex items-center gap-2">
              ⚔️ Experiências Profissionais
            </h2>
            <p className="font-mono text-sm mb-6 text-gray-300">
              Cada experiência é uma quest épica na jornada profissional!
            </p>
            {mainQuests.map((quest) => (
              <Quest key={quest.id} {...quest} />
            ))}
          </div>
        )}

        {activeTab === 'sideQuests' && (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-light flex items-center gap-2">
              📚 Formação e Certificações
            </h2>
            <p className="font-mono text-sm mb-6 text-gray-300">
              Upgrades e habilidades adquiridos ao longo da jornada!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sideQuests.map((sq) => (
                <SideQuest key={sq.id} {...sq} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 text-light flex items-center gap-2">
              ⚡ Habilidades e Atributos
            </h2>

            {/* Technical Skills */}
            <div className="mb-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 text-light">
                💻 Habilidades Técnicas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.technical.map((skill, index) => (
                  <div
                    key={index}
                    className="border-3 border-primary bg-dark-700 p-4 shadow-brutal text-light"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold flex items-center gap-2">
                        <span>{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="font-mono text-sm text-gray-300">{skill.level}%</span>
                    </div>
                    <div className="h-4 border-3 border-primary bg-dark-900 overflow-hidden">
                      <div
                        className="h-full bg-secondary border-r-3 border-primary transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 text-light">
                🌍 Idiomas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skills.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="border-3 border-accent bg-dark-700 p-4 shadow-brutal-cyan text-center text-light"
                  >
                    <div className="text-4xl mb-2">{lang.flag}</div>
                    <div className="font-display font-bold mb-2">{lang.name}</div>
                    <div className="font-mono text-sm text-gray-300">{lang.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 text-light">
                🤝 Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.soft.map((skill, index) => (
                  <Badge key={index} variant="secondary" size="lg" icon={skill.icon}>
                    {skill.name} ({skill.level}%)
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-3 border-primary bg-dark-800 text-light p-6 shadow-brutal-lg">
          <p className="font-display font-bold mb-2">
            🎮 Desenvolvido com React + Vite + Tailwind CSS
          </p>
          <p className="font-mono text-sm text-gray-400">
            Estilo: Neobrutalist Design | Tema: RPG Adventure
          </p>
          <p className="font-mono text-xs mt-4">
            LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/in/pedro-viana-2b760757/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors font-bold"
            >
              pedro-viana-2b760757
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
