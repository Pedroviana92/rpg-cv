import React from 'react';
import Card from './Card';
import Badge from './Badge';
import ProgressBar from './ProgressBar';

const CharacterPanel = ({
  name,
  title,
  location,
  level,
  currentXP,
  maxXP,
  avatar,
  characterClass,
  specialization,
  stats,
  onStatClick
}) => {
  return (
    <Card variant="dark-800" shadow="brutal-xl" className="mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
        <div className="text-5xl sm:text-6xl">{avatar}</div>
        <div className="flex-1 text-center sm:text-left w-full">
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">{name}</h1>
          <p className="font-mono text-xs sm:text-sm mb-1">{title}</p>
          <p className="font-mono text-xs text-gray-700 mb-3">{location}</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Badge variant="danger" size="md">
              Nível {level}
            </Badge>
            <Badge variant="secondary" size="md">
              {characterClass}
            </Badge>
            <Badge variant="accent" size="md">
              {specialization}
            </Badge>
          </div>
        </div>
      </div>

      <ProgressBar
        current={currentXP}
        max={maxXP}
        label="Experiência"
        height="lg"
        color="primary"
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => onStatClick?.('totalXP')}
          className="border-3 border-primary bg-dark-600 p-3 sm:p-4 shadow-brutal text-light cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform hover:shadow-none"
        >
          <p className="font-display text-xs font-bold mb-1">Total XP</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-primary">{stats.totalXP}</p>
        </div>
        <div
          onClick={() => onStatClick?.('mainQuests')}
          className="border-3 border-secondary bg-dark-600 p-3 sm:p-4 shadow-brutal-green text-light cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform hover:shadow-none"
        >
          <p className="font-display text-xs font-bold mb-1">Main Quests</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-secondary">
            {stats.completedQuests}/{stats.totalQuests}
          </p>
        </div>
        <div
          onClick={() => onStatClick?.('sideQuests')}
          className="border-3 border-accent bg-dark-600 p-3 sm:p-4 shadow-brutal-cyan text-light cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform hover:shadow-none"
        >
          <p className="font-display text-xs font-bold mb-1">Side Quests</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-accent">
            {stats.completedSideQuests}/{stats.totalSideQuests}
          </p>
        </div>
        <div
          onClick={() => onStatClick?.('certifications')}
          className="border-3 border-warning bg-dark-600 p-3 sm:p-4 shadow-brutal text-light cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform hover:shadow-none"
        >
          <p className="font-display text-xs font-bold mb-1">Certificações</p>
          <p className="font-mono text-lg sm:text-xl font-bold text-warning">{stats.certifications}</p>
        </div>
      </div>
    </Card>
  );
};

export default CharacterPanel;
