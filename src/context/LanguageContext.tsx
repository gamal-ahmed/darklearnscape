
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

// English and Arabic translations
const translations = {
  en: {
    'home': 'Home',
    'courses': 'Courses',
    'learning_paths': 'Learning Paths',
    'profile': 'Profile',
    'login': 'Login',
    'signup': 'Sign Up',
    'search_placeholder': 'Search for courses...',
    'continue_learning': 'Continue Learning',
    'popular_courses': 'Popular Courses',
    'categories': 'Categories',
    'featured': 'Featured',
    'view_all': 'View All',
    'filter': 'Filter',
    'sort_by': 'Sort By',
    'newest': 'Newest',
    'highest_rated': 'Highest Rated',
    'most_popular': 'Most Popular',
    'course_details': 'Course Details',
    'instructor': 'Instructor',
    'ratings': 'Ratings',
    'reviews': 'Reviews',
    'curriculum': 'Curriculum',
    'mark_complete': 'Mark as Complete',
    'enroll_now': 'Enroll Now',
    'my_courses': 'My Courses',
    'certificates': 'Certificates',
    'edit_profile': 'Edit Profile',
    'language': 'Language',
    'completed': 'Completed',
    'in_progress': 'In Progress',
    'share': 'Share',
    'download': 'Download',
    // Add more translations as needed
  },
  ar: {
    'home': 'الرئيسية',
    'courses': 'الدورات',
    'learning_paths': 'مسارات التعلم',
    'profile': 'الملف الشخصي',
    'login': 'تسجيل الدخول',
    'signup': 'إنشاء حساب',
    'search_placeholder': 'ابحث عن الدورات...',
    'continue_learning': 'متابعة التعلم',
    'popular_courses': 'الدورات الشائعة',
    'categories': 'التصنيفات',
    'featured': 'مميز',
    'view_all': 'عرض الكل',
    'filter': 'تصفية',
    'sort_by': 'ترتيب حسب',
    'newest': 'الأحدث',
    'highest_rated': 'الأعلى تقييماً',
    'most_popular': 'الأكثر شعبية',
    'course_details': 'تفاصيل الدورة',
    'instructor': 'المدرب',
    'ratings': 'التقييمات',
    'reviews': 'المراجعات',
    'curriculum': 'المنهج',
    'mark_complete': 'اكتمل',
    'enroll_now': 'سجل الآن',
    'my_courses': 'دوراتي',
    'certificates': 'الشهادات',
    'edit_profile': 'تعديل الملف',
    'language': 'اللغة',
    'completed': 'مكتمل',
    'in_progress': 'قيد التقدم',
    'share': 'مشاركة',
    'download': 'تحميل',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    } else {
      // Default to browser language if available and supported
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang === 'ar' ? 'ar' : 'en');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
