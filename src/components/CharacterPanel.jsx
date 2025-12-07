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
  stats
}) => {
  return (
    <Card variant="dark-800" shadow="brutal-xl" className="mb-6">
      <div className="flex items-start gap-6 mb-6">
        <div className="text-6xl">{avatar}</div>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold mb-2">{name}</h1>
          <p className="font-mono text-sm mb-1">{title}</p>
          <p className="font-mono text-xs text-gray-700 mb-3">{location}</p>
          <div className="flex gap-2">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border-3 border-primary bg-dark-600 p-3 shadow-brutal text-light">
          <p className="font-display text-xs font-bold mb-1">Total XP</p>
          <p className="font-mono text-xl font-bold text-primary">{stats.totalXP}</p>
        </div>
        <div className="border-3 border-secondary bg-dark-600 p-3 shadow-brutal-green text-light">
          <p className="font-display text-xs font-bold mb-1">Main Quests</p>
          <p className="font-mono text-xl font-bold text-secondary">
            {stats.completedQuests}/{stats.totalQuests}
          </p>
        </div>
        <div className="border-3 border-accent bg-dark-600 p-3 shadow-brutal-cyan text-light">
          <p className="font-display text-xs font-bold mb-1">Side Quests</p>
          <p className="font-mono text-xl font-bold text-accent">
            {stats.completedSideQuests}/{stats.totalSideQuests}
          </p>
        </div>
        <div className="border-3 border-warning bg-dark-600 p-3 shadow-brutal text-light">
          <p className="font-display text-xs font-bold mb-1">Certificações</p>
          <p className="font-mono text-xl font-bold text-warning">{stats.certifications}</p>
        </div>
      </div>
    </Card>
  );
};

export default CharacterPanel;
