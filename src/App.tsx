import React, { useState } from 'react';
import { 
  mockUser, 
  mockFacultyUser,
  mockAdminUser,
  mockCompetencies, 
  mockCourses, 
  mockLearningMaterials, 
  mockQuizzes, 
  mockGames, 
  mockLeaderboard, 
  mockBadges,
  mockIgotCourses,
  mockNotifications
} from './data/mockData';
import { 
  UserProfile, 
  UserRole, 
  NavTab, 
  Course, 
  LearningMaterial, 
  Quiz, 
  Game, 
  QuizQuestion,
  IGOTCourse,
  NotificationItem
} from './types';

// Navigation & Global Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { PragyaAssistantModal } from './components/PragyaAssistantModal';

// Pages
import { LandingPage } from './components/LandingPage';
import { LearnerDashboard } from './components/LearnerDashboard';
import { CompetencyInsights } from './components/CompetencyInsights';
import { PersonalizedLearningPath } from './components/PersonalizedLearningPath';
import { CourseDetail } from './components/CourseDetail';
import { PragyaPlay } from './components/PragyaPlay';
import { QuizViewer } from './components/QuizViewer';
import { AIContentStudio } from './components/AIContentStudio';
import { AIQuizGenerator } from './components/AIQuizGenerator';
import { AIGameGenerator } from './components/AIGameGenerator';
import { ContentReview } from './components/ContentReview';
import { IGOTIntegration } from './components/IGOTIntegration';
import { LeaderboardView } from './components/LeaderboardView';
import { AchievementsView } from './components/AchievementsView';
import { ProgressAnalytics } from './components/ProgressAnalytics';
import { AdminAnalytics } from './components/AdminAnalytics';

// Floating action icon
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  // App Navigation & Session State
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('learner');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  // User Profile
  const [user, setUser] = useState<UserProfile>(mockUser);

  // Application Data Stores
  const [competencies, setCompetencies] = useState(mockCompetencies);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [materials, setMaterials] = useState<LearningMaterial[]>(mockLearningMaterials);
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [games, setGames] = useState<Game[]>(mockGames);
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [badges, setBadges] = useState(mockBadges);
  const [igotCourses, setIgotCourses] = useState<IGOTCourse[]>(mockIgotCourses);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Contextual Selection State
  const [selectedCourse, setSelectedCourse] = useState<Course>(mockCourses[0]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz>(mockQuizzes[0]);
  const [targetMaterialForGen, setTargetMaterialForGen] = useState<LearningMaterial | null>(null);

  // Role switching
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'learner') {
      setUser(mockUser);
      if (activeTab === 'content_studio' || activeTab === 'content_review' || activeTab === 'admin_analytics') {
        setActiveTab('dashboard');
      }
    } else if (role === 'faculty') {
      setUser(mockFacultyUser);
      setActiveTab('content_studio');
    } else if (role === 'admin') {
      setUser(mockAdminUser);
      setActiveTab('admin_analytics');
    }
  };

  // Gamification XP Rewards
  const handleRewardXP = (amount: number) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  // Navigations
  const handleOpenCourse = (courseId: string) => {
    const found = courses.find(c => c.id === courseId) || courses[0];
    setSelectedCourse(found);
    setActiveTab('course_detail');
  };

  const handleStartQuiz = (quizId: string) => {
    const found = quizzes.find(q => q.id === quizId) || quizzes[0];
    setActiveQuiz(found);
    setActiveTab('quiz_viewer');
  };

  // Studio Pipelines
  const handleUploadMaterial = (newDoc: LearningMaterial) => {
    setMaterials(prev => [newDoc, ...prev]);
  };

  const handleGenerateQuizFromMaterial = (material: LearningMaterial) => {
    setTargetMaterialForGen(material);
    setActiveTab('ai_quiz_gen');
  };

  const handleGenerateGameFromMaterial = (material: LearningMaterial) => {
    setTargetMaterialForGen(material);
    setActiveTab('ai_game_gen');
  };

  const handlePublishQuiz = (newQuizData: { title: string; topic: string; questions: QuizQuestion[] }) => {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: newQuizData.title,
      description: `Targeted assessment on ${newQuizData.topic} generated from MoSPI official documents.`,
      courseId: courses[0]?.id || 'course-1',
      topic: newQuizData.topic,
      difficulty: 'Medium',
      questions: newQuizData.questions,
      timeLimitMinutes: 10,
      xpReward: 150,
      passingScore: 70,
    };
    setQuizzes(prev => [newQuiz, ...prev]);
  };

  const handlePublishGame = (gameData: Partial<Game>) => {
    const newGame: Game = {
      id: gameData.id || `game-${Date.now()}`,
      title: gameData.title || 'Official Pragya Play Session',
      description: gameData.description || 'Interactive competency reinforcement.',
      type: (gameData.type as any) || 'match_concept',
      difficulty: gameData.difficulty || 'medium',
      xpReward: gameData.xpReward || 200,
      duration: gameData.duration || '5 mins',
      topic: gameData.topic || 'Survey Operations',
    };
    setGames(prev => [newGame, ...prev]);
  };

  const handleEnrollIgotCourse = (course: IGOTCourse) => {
    const newPragyaCourse: Course = {
      id: `course-${Date.now()}`,
      title: course.title,
      code: course.courseCode,
      description: course.description,
      category: 'Official Statistics',
      competencyDomain: 'Survey Methodology & Sampling',
      difficulty: 'Intermediate',
      estimatedHours: 8,
      xpReward: 350,
      enrolledCount: 1,
      rating: 4.9,
      modules: [
        {
          id: `mod-igot-1`,
          title: 'Module 1: Foundational Framework & Legal Provisions',
          description: 'Official statistical mandates under the Collection of Statistics Act.',
          duration: '45 mins',
          isCompleted: false,
          isLocked: false,
          xpReward: 100,
        },
        {
          id: `mod-igot-2`,
          title: 'Module 2: Practical Data Auditing & Field Procedures',
          description: 'Hands-on validation of survey microdata records.',
          duration: '60 mins',
          isCompleted: false,
          isLocked: true,
          xpReward: 150,
        },
      ],
      progress: 0,
      isEnrolled: true,
      igotCourseId: course.id,
      prerequisites: ['Basic Statistical Terminology'],
      instructorName: course.provider,
      instructorTitle: course.accreditationBody,
    };
    setCourses(prev => [newPragyaCourse, ...prev]);
    setSelectedCourse(newPragyaCourse);
    setActiveTab('course_detail');
  };

  // Render Landing Page as standalone or seamlessly
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white">
        <LandingPage
          onStartExploring={() => setActiveTab('dashboard')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(loggedInUser, role) => {
            setUser(loggedInUser);
            setCurrentRole(role);
            setIsAuthModalOpen(false);
            setActiveTab('dashboard');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased">
      
      {/* Top Navigation */}
      <Navbar
        user={user}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        notifications={notifications}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => setIsAuthModalOpen(true)}
        isLoggedIn={true}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Left Sidebar */}
        <Sidebar
          currentRole={currentRole}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          user={user}
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <LearnerDashboard
              user={user}
              courses={courses}
              onNavigateTab={setActiveTab}
              onSelectCourse={handleOpenCourse}
            />
          )}

          {activeTab === 'competency_insights' && (
            <CompetencyInsights
              user={user}
              competencies={competencies}
              onNavigatePath={() => setActiveTab('learning_path')}
              onGenerateLearningPath={() => setActiveTab('learning_path')}
            />
          )}

          {activeTab === 'learning_path' && (
            <PersonalizedLearningPath
              courses={courses}
              onSelectCourse={handleOpenCourse}
              onNavigatePlay={() => setActiveTab('pragya_play')}
              onLaunchPlay={() => setActiveTab('pragya_play')}
              onLaunchQuiz={() => handleStartQuiz(quizzes[0]?.id || 'quiz-1')}
            />
          )}

          {activeTab === 'course_detail' && (
            <CourseDetail
              course={selectedCourse}
              onBack={() => setActiveTab('dashboard')}
              onStartQuiz={() => handleStartQuiz(quizzes[0]?.id || 'quiz-1')}
              onStartGame={() => setActiveTab('pragya_play')}
            />
          )}

          {activeTab === 'pragya_play' && (
            <PragyaPlay
              games={games}
              onRewardXP={handleRewardXP}
            />
          )}

          {activeTab === 'quiz_viewer' && (
            <QuizViewer
              quiz={activeQuiz}
              onBack={() => setActiveTab('course_detail')}
              onRewardXP={handleRewardXP}
              onNavigatePlay={() => setActiveTab('pragya_play')}
              onNavigateCourse={handleOpenCourse}
            />
          )}

          {activeTab === 'content_studio' && (
            <AIContentStudio
              materials={materials}
              onUploadMaterial={handleUploadMaterial}
              onGenerateQuizFromMaterial={handleGenerateQuizFromMaterial}
              onGenerateGameFromMaterial={handleGenerateGameFromMaterial}
            />
          )}

          {activeTab === 'ai_quiz_gen' && (
            <AIQuizGenerator
              materials={materials}
              preloadedMaterial={targetMaterialForGen}
              onPublishQuiz={handlePublishQuiz}
            />
          )}

          {activeTab === 'ai_game_gen' && (
            <AIGameGenerator
              materials={materials}
              preloadedMaterial={targetMaterialForGen}
              onPublishGame={handlePublishGame}
            />
          )}

          {activeTab === 'content_review' && (
            <ContentReview />
          )}

          {activeTab === 'igot_integration' && (
            <IGOTIntegration
              igotCourses={igotCourses}
              onEnrollIgotCourse={handleEnrollIgotCourse}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView
              entries={leaderboard}
              currentUserId={user.id}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsView
              user={user}
              badges={badges}
            />
          )}

          {activeTab === 'progress_analytics' && (
            <ProgressAnalytics
              user={user}
            />
          )}

          {activeTab === 'admin_analytics' && (
            <AdminAnalytics />
          )}
        </main>
      </div>

      {/* Floating Pragya Assistant Chat Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="group relative flex items-center space-x-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
          title="Ask Pragya AI Statistical Assistant"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-amber-300">
            <Bot className="w-4 h-4" />
          </div>
          <span className="font-bold text-xs">Ask Pragya AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5"></span>
        </button>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser, role) => {
          setUser(loggedInUser);
          setCurrentRole(role);
          setIsAuthModalOpen(false);
          setActiveTab('dashboard');
        }}
      />

      <PragyaAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onNavigateCourse={handleOpenCourse}
      />

    </div>
  );
}
