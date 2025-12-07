import React from 'react';
import Card from './Card';
import Badge from './Badge';

const SideQuest = ({
  title,
  issuer,
  date,
  type,
  icon,
  xpReward,
  status,
  description
}) => {
  const typeColors = {
    'certification': 'warning',
    'course': 'accent',
    'education': 'secondary'
  };

  const typeLabels = {
    'certification': 'Certificação',
    'course': 'Curso',
    'education': 'Formação'
  };

  return (
    <Card
      variant="dark-600"
      shadow="brutal-green"
      padding="md"
      className="hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-display font-bold text-base text-light">{title}</h4>
            <Badge variant="primary" size="sm" icon="⭐">
              +{xpReward} XP
            </Badge>
          </div>
          <p className="font-mono text-sm text-gray-300 mb-1">{issuer}</p>
          <p className="font-mono text-xs text-gray-400 mb-2">{date}</p>
          <Badge variant={typeColors[type]} size="sm">
            {typeLabels[type]}
          </Badge>
          {description && (
            <p className="font-mono text-xs mt-3 text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SideQuest;
