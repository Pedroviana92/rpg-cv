import React, { useState } from 'react';
import Card from './Card';
import Badge from './Badge';

const Quest = ({
  title,
  company,
  location,
  period,
  status,
  difficulty,
  xpReward,
  description,
  skills = [],
  achievements = []
}) => {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors = {
    'Easy': 'primary',
    'Medium': 'warning',
    'Hard': 'secondary',
    'Epic': 'danger'
  };

  const statusIcons = {
    'in_progress': '⚔️',
    'completed': '✅'
  };

  const statusText = {
    'in_progress': 'Em Progresso',
    'completed': 'Completa'
  };

  return (
    <Card variant="dark-700" shadow="brutal-lg" className="mb-4 sm:mb-6 hover:translate-x-1 hover:translate-y-1 transition-transform">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-xl sm:text-2xl flex-shrink-0">{statusIcons[status]}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base sm:text-xl font-bold text-light break-words">{title}</h3>
          </div>
        </div>
        <p className="font-mono text-xs sm:text-sm text-gray-300">
          {company}
        </p>
        <p className="font-mono text-xs sm:text-sm text-gray-300">
          {location}
        </p>
        <p className="font-mono text-xs sm:text-sm text-gray-400">{period}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant={difficultyColors[difficulty]} size="sm">
            {difficulty}
          </Badge>
          <Badge variant="accent" size="sm" icon="⭐">
            {xpReward} XP
          </Badge>
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <Badge variant={status === 'completed' ? 'primary' : 'warning'} size="sm">
          {statusText[status]}
        </Badge>
      </div>

      <p className="font-mono text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed text-gray-300">{description}</p>

      {skills.length > 0 && (
        <div className="mb-3 sm:mb-4">
          <h4 className="font-display font-bold text-xs sm:text-sm mb-2 text-light">Skills:</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {achievements.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-display font-bold text-xs sm:text-sm mb-2 flex items-center gap-2 text-light hover:text-primary transition-colors"
          >
            <span>{expanded ? '▼' : '▶'}</span>
            Conquistas ({achievements.length})
          </button>
          {expanded && (
            <ul className="list-none space-y-2 mt-2">
              {achievements.map((achievement, index) => (
                <li key={index} className="font-mono text-xs sm:text-sm flex items-start gap-2 text-gray-300">
                  <span className="text-primary flex-shrink-0">🏆</span>
                  <span className="flex-1">{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
};

export default Quest;
