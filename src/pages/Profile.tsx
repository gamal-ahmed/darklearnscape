
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

// Profile sub-pages
const MyCourses = () => <div>My Courses content coming soon...</div>;
const Certificates = () => <div>Certificates content coming soon...</div>;
const EditProfile = () => <div>Edit Profile content coming soon...</div>;

const Profile = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('profile')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <nav className="space-y-2">
            <Link to="/profile" className="block p-2 rounded-md hover:bg-secondary">
              {t('my_courses')}
            </Link>
            <Link to="/profile/certificates" className="block p-2 rounded-md hover:bg-secondary">
              {t('certificates')}
            </Link>
            <Link to="/profile/edit" className="block p-2 rounded-md hover:bg-secondary">
              {t('edit_profile')}
            </Link>
          </nav>
        </div>
        
        {/* Content Area */}
        <div className="md:col-span-3 bg-card p-6 rounded-lg border border-border min-h-[400px]">
          <Routes>
            <Route path="/" element={<MyCourses />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
