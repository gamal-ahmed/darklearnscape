
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const CourseCategory = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('courses')}</h1>
      <div className="bg-card p-8 rounded-lg border border-border">
        <p className="text-lg text-center py-12">Course category content coming soon...</p>
      </div>
    </div>
  );
};

export default CourseCategory;
