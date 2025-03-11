
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('course_details')}</h1>
      <div className="bg-card p-8 rounded-lg border border-border">
        <p className="text-lg mb-4">Course ID: {courseId}</p>
        <p className="text-lg text-center py-8">Course detail content coming soon...</p>
      </div>
    </div>
  );
};

export default CourseDetail;
