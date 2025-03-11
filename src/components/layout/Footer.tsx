
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Facebook, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('courses'),
      links: [
        { name: 'Web Development', href: '/courses?category=web-development' },
        { name: 'Data Science', href: '/courses?category=data-science' },
        { name: 'Mobile Development', href: '/courses?category=mobile-development' },
        { name: 'UX/UI Design', href: '/courses?category=design' },
        { name: 'Business', href: '/courses?category=business' },
      ],
    },
    {
      title: t('learning_paths'),
      links: [
        { name: 'Become a Frontend Developer', href: '/learning-paths/frontend-developer' },
        { name: 'Data Science Career Path', href: '/learning-paths/data-science' },
        { name: 'Mobile App Developer', href: '/learning-paths/mobile-developer' },
        { name: 'UI/UX Designer', href: '/learning-paths/ui-ux-designer' },
      ],
    },
    {
      title: t('about'),
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: t('support'),
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-secondary/50 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">EduLearn</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Empowering learners worldwide with premium educational content and certification opportunities.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="font-semibold text-sm mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-secondary/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} EduLearn. {t('all_rights_reserved')}.
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              <a href="mailto:support@edulearn.com" className="text-muted-foreground hover:text-primary text-sm flex items-center transition-colors">
                <Mail className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                support@edulearn.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
