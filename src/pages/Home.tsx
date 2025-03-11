
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Play, 
  Star, 
  Clock, 
  User, 
  BookOpen,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock data for featured courses
const featuredCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 1245,
    duration: '6 weeks',
    category: 'web-development'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the core concepts of data science, analytics, and visualization techniques.',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 985,
    duration: '8 weeks',
    category: 'data-science'
  },
  {
    id: '3',
    title: 'UX/UI Design Masterclass',
    description: 'Create beautiful user interfaces and experiences with professional design principles.',
    instructor: 'Elena Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 752,
    duration: '5 weeks',
    category: 'design'
  }
];

// Mock data for popular courses
const popularCourses = [
  {
    id: '4',
    title: 'Advanced JavaScript Patterns',
    description: 'Deep dive into advanced JavaScript patterns, performance optimization, and modern frameworks.',
    instructor: 'David Williams',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 1567,
    duration: '7 weeks',
    category: 'web-development'
  },
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications with React Native for iOS and Android.',
    instructor: 'Alex Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 1123,
    duration: '9 weeks',
    category: 'mobile-development'
  },
  {
    id: '6',
    title: 'Machine Learning for Beginners',
    description: 'Introduction to machine learning concepts, algorithms, and practical applications.',
    instructor: 'Priya Sharma',
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 987,
    duration: '8 weeks',
    category: 'data-science'
  },
  {
    id: '7',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to developing and implementing digital marketing strategies.',
    instructor: 'James Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1557858310-9052820906be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviewCount: 856,
    duration: '5 weeks',
    category: 'business'
  }
];

// Mock data for continued learning courses
const continueLearningCourses = [
  {
    id: '2',
    title: 'Data Science Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    progress: 65,
    lastLesson: 'Module 5: Data Visualization',
    category: 'data-science'
  },
  {
    id: '5',
    title: 'Mobile App Development with React Native',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    progress: 30,
    lastLesson: 'Module 3: Navigation',
    category: 'mobile-development'
  }
];

// Mock data for categories
const categories = [
  { id: 'web-development', name: 'Web Development', count: 120, icon: '💻' },
  { id: 'data-science', name: 'Data Science', count: 85, icon: '📊' },
  { id: 'mobile-development', name: 'Mobile Development', count: 65, icon: '📱' },
  { id: 'design', name: 'UX/UI Design', count: 70, icon: '🎨' },
  { id: 'business', name: 'Business', count: 110, icon: '💼' },
  { id: 'marketing', name: 'Marketing', count: 55, icon: '📈' },
  { id: 'photography', name: 'Photography', count: 45, icon: '📷' },
  { id: 'music', name: 'Music', count: 40, icon: '🎵' }
];

const Home = () => {
  const { t } = useLanguage();
  const [visibleCategories, setVisibleCategories] = useState(6);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Add animation classes after initial render
    const timer = setTimeout(() => {
      setHasScrolled(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleCategories = () => {
    setVisibleCategories(visibleCategories === categories.length ? 6 : categories.length);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Unlock Your Potential With Expert-Led Courses
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Join millions of learners and expand your skills with courses taught by real-world experts.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <Button size="lg" asChild>
                <Link to="/courses">
                  {t('explore_courses')} <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur border-white/20 hover:bg-background/20" asChild>
                <Link to="/learning-paths">
                  <Play className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" /> {t('watch_intro')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {continueLearningCourses.length > 0 && (
        <section className={cn(
          "py-12 border-b border-secondary/20",
          hasScrolled ? "animate-fade-in" : "opacity-0",
        )}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t('continue_learning')}</h2>
              <Button variant="ghost" asChild>
                <Link to="/profile/courses" className="flex items-center">
                  {t('view_all')} <ChevronRight className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {continueLearningCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden glass-card">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="h-40 md:h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:bg-gradient-to-l"></div>
                    </div>
                    <div className="flex-1 p-5">
                      <Badge variant="outline" className="mb-2">
                        {course.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                      <h3 className="text-xl font-semibold line-clamp-1 mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t('last_lesson')}: {course.lastLesson}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('progress')}</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button className="mt-4" asChild>
                        <Link to={`/courses/${course.id}`}>
                          {t('continue')} <ChevronRight className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses Section */}
      <section className={cn(
        "py-12 border-b border-secondary/20",
        hasScrolled ? "animate-fade-in" : "opacity-0",
      )} style={{ animationDelay: '0.2s' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('featured')}</h2>
            <Button variant="ghost" asChild>
              <Link to="/courses" className="flex items-center">
                {t('view_all')} <ChevronRight className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden glass-card-hover h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
                    {t('featured')}
                  </Badge>
                </div>
                <CardContent className="flex-1 flex flex-col p-5">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline">
                      {course.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                    <div className="flex items-center ml-auto rtl:mr-auto rtl:ml-0">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 rtl:mr-1 rtl:ml-0 text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1 rtl:mr-1 rtl:ml-0">({course.reviewCount})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2 mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="ml-1 rtl:mr-1 rtl:ml-0 text-sm text-muted-foreground">{course.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="ml-1 rtl:mr-1 rtl:ml-0 text-sm text-muted-foreground">{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <Button className="w-full rounded-none h-12" variant="ghost" asChild>
                    <Link to={`/courses/${course.id}`}>
                      {t('view_course')}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={cn(
        "py-12 border-b border-secondary/20",
        hasScrolled ? "animate-fade-in" : "opacity-0",
      )} style={{ animationDelay: '0.3s' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('categories')}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, visibleCategories).map((category) => (
              <Link 
                to={`/courses?category=${category.id}`} 
                key={category.id}
                className="glass-card-hover p-4 text-center rounded-lg hover:bg-secondary/10 transition duration-300"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} {t('courses')}</p>
              </Link>
            ))}
          </div>
          {categories.length > 6 && (
            <div className="text-center mt-6">
              <Button variant="outline" onClick={toggleCategories}>
                {visibleCategories === categories.length ? t('show_less') : t('show_more')}
                <ChevronDown className={cn(
                  "ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4 transition-transform",
                  visibleCategories === categories.length && "rotate-180"
                )} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className={cn(
        "py-12",
        hasScrolled ? "animate-fade-in" : "opacity-0",
      )} style={{ animationDelay: '0.4s' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('popular_courses')}</h2>
            <Button variant="ghost" asChild>
              <Link to="/courses?sort=popular" className="flex items-center">
                {t('view_all')} <ChevronRight className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden glass-card-hover h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="text-xs">
                      {course.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                    <div className="flex items-center ml-auto rtl:mr-auto rtl:ml-0">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="ml-1 rtl:mr-1 rtl:ml-0 text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold line-clamp-2 mb-2">{course.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{course.description}</p>
                  <div className="mt-auto flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                    <span className="truncate">{course.instructor}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <Button className="w-full rounded-none h-10 text-sm" variant="ghost" asChild>
                    <Link to={`/courses/${course.id}`}>
                      {t('view_course')}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={cn(
        "py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-t border-secondary/20",
        hasScrolled ? "animate-fade-in" : "opacity-0",
      )} style={{ animationDelay: '0.5s' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your learning journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform. Get unlimited access to all courses.
          </p>
          <Button size="lg" asChild>
            <Link to="/courses">
              {t('get_started')} <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
