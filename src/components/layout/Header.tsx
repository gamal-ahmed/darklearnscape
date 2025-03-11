
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, Menu, X, User, LogIn, LogOut,
  BookOpen, GraduationCap, Home
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/ui-custom/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { t, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  // Track scroll for transparent/solid header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchValue);
  };

  const navLinks = [
    { name: 'home', path: '/', icon: Home },
    { name: 'courses', path: '/courses', icon: BookOpen },
    { name: 'learning_paths', path: '/learning-paths', icon: GraduationCap },
  ];

  const userMenuItems = isAuthenticated ? [
    { label: t('profile'), path: '/profile', icon: User },
    { label: t('my_courses'), path: '/profile/courses', icon: BookOpen },
    { label: t('certificates'), path: '/profile/certificates', icon: GraduationCap },
  ] : [];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent",
        mobileMenuOpen && "bg-background"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">EduLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                )}
              >
                {t(link.name)}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex relative max-w-sm flex-1 mx-4"
          >
            <Input
              type="text"
              placeholder={t('search_placeholder')}
              className="pl-10 pr-4 rtl:pl-4 rtl:pr-10 h-10 rounded-full bg-secondary/50"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search 
              className={cn(
                "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                dir === 'ltr' ? "left-3" : "right-3"
              )}
            />
          </form>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.name && <p className="font-medium">{user.name}</p>}
                      {user?.email && <p className="text-sm text-muted-foreground truncate w-full">{user.email}</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link to={item.path} className="flex items-center gap-2 w-full cursor-pointer">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button asChild variant="ghost">
                  <Link to="/login" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    {t('login')}
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">
                    {t('signup')}
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-secondary/20 animate-slide-down">
          <div className="container mx-auto p-4">
            <form 
              onSubmit={handleSearch}
              className="relative mb-6"
            >
              <Input
                type="text"
                placeholder={t('search_placeholder')}
                className="pl-10 pr-4 rtl:pl-4 rtl:pr-10 h-10 w-full rounded-full bg-secondary/50"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search 
                className={cn(
                  "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                  dir === 'ltr' ? "left-3" : "right-3"
                )}
              />
            </form>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center text-sm font-medium py-2 transition-colors hover:text-primary",
                    location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t(link.name)}
                </Link>
              ))}
              
              <div className="h-px bg-border my-2" />
              
              {isAuthenticated ? (
                <>
                  {userMenuItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.path}
                      className="flex items-center text-sm font-medium py-2 transition-colors hover:text-primary"
                    >
                      <item.icon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                      {item.label}
                    </Link>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="flex items-center justify-start px-0 text-destructive hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline">
                    <Link to="/login" className="w-full flex items-center justify-center gap-2">
                      <LogIn className="h-4 w-4" />
                      {t('login')}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup" className="w-full">
                      {t('signup')}
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
