
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const LearningPath = () => {
  const { pathId } = useParams<{ pathId?: string }>();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('learning_paths')}</h1>
      <div className="bg-card p-8 rounded-lg border border-border">
        {pathId ? (
          <p className="text-lg mb-4">Learning Path ID: {pathId}</p>
        ) : (
          <p className="text-lg mb-4">All Learning Paths</p>
        )}
        <p className="text-lg text-center py-8">Learning path content coming soon...</p>
      </div>
    </div>
  );
};

export default LearningPath;
