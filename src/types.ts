export type UserRole = 'learner' | 'admin' | 'trainer' | 'faculty';

export type NavTab = 
  | 'landing'
  | 'dashboard'
  | 'competency_insights'
  | 'learning_path'
  | 'course_detail'
  | 'pragya_play'
  | 'quiz_viewer'
  | 'content_studio'
  | 'ai_quiz_gen'
  | 'ai_game_gen'
  | 'content_review'
  | 'igot_integration'
  | 'leaderboard'
  | 'achievements'
  | 'progress_analytics'
  | 'admin_analytics';

export interface UserSkill {
  name: string;
  category: string;
  currentLevel: number; // 1 to 5
  requiredLevel: number; // 1 to 5
  lastAssessed?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  designation: string;
  experience: string;
  avatarUrl?: string;
  skills: UserSkill[];
  overallCompetency: number; // percentage, e.g. 72
  level: number;
  levelTitle: string; // e.g. "Skilled Analyst"
  xp: number;
  streak: number; // days
  coursesCompleted: number;
  quizAccuracy: number; // percentage
  gameScore: number;
  badges: string[]; // badge IDs
  createdAt: string;
}

export interface Competency {
  id: string;
  domain: string;
  name: string;
  currentScore: number; // 1 to 5
  benchmarkScore: number; // 1 to 5
  gap: number;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  recommendedCourses: string[];
}

export interface SkillGap {
  skill: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number; // requiredLevel - currentLevel
  classification: 'No Gap' | 'Low' | 'Medium' | 'High';
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyTakeaways: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
  xpReward?: number;
  lessons?: Lesson[];
  gamesCount?: number;
  quizId?: string;
}

export type Module = CourseModule;

export interface Course {
  id: string;
  title: string;
  code?: string;
  description: string;
  category: string;
  competencyDomain?: string;
  skills?: string[];
  skillsGained?: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  estimatedHours?: number;
  progress: number;
  xpReward: number;
  enrolledCount?: number;
  rating?: number;
  modules: CourseModule[];
  isEnrolled?: boolean;
  isIgotSynced?: boolean;
  igotCourseId?: string;
  prerequisites?: string[];
  instructorName?: string;
  instructorTitle?: string;
  provider?: string;
  thumbnailUrl?: string;
}

export interface LearningMaterial {
  id: string;
  title?: string;
  fileName: string;
  fileType: 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx' | 'txt';
  fileSize: string;
  uploadedBy?: string;
  uploadedAt?: string;
  uploadDate?: string;
  extractedText?: string;
  chunksCount: number;
  status: 'uploaded' | 'processing' | 'processed' | 'ready';
  summary?: string;
  extractedConcepts?: string[];
  conceptsExtracted?: string[];
  courseId?: string;
  generatedQuizzesCount?: number;
  generatedGamesCount?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export interface Quiz {
  id: string;
  courseId?: string;
  courseTitle?: string;
  title: string;
  description?: string;
  topic?: string;
  questions: QuizQuestion[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  timeLimitMinutes?: number;
  xpReward?: number;
  passingScore?: number;
  status?: 'draft' | 'under_review' | 'approved' | 'published';
  createdBy?: string;
  approvedBy?: string;
  createdAt?: string;
}

export type GameType = 
  | 'quiz_battle'
  | 'match_concept'
  | 'memory_match'
  | 'scenario_challenge'
  | 'true_or_false'
  | 'true_false'
  | 'speed_challenge'
  | 'level_challenge';

export interface MatchingPair {
  id?: string;
  concept: string;
  definition: string;
}

export interface ScenarioItem {
  id?: string;
  situation: string;
  options: string[];
  correctOption?: number;
  explanation?: string;
  hint?: string;
}

export interface TrueFalseItem {
  id?: string;
  statement: string;
  isTrue: boolean;
  explanation?: string;
}

export interface Game {
  id: string;
  courseId?: string;
  courseTitle?: string;
  type: GameType;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward?: number;
  rewardXP?: number;
  duration?: string;
  topic?: string;
  status?: 'draft' | 'approved' | 'published';
  matchingItems?: MatchingPair[];
  scenarioItems?: ScenarioItem[];
  trueFalseItems?: TrueFalseItem[];
  quizQuestions?: QuizQuestion[];
}

export type GameData = Game;

export interface Badge {
  id: string;
  title?: string;
  name?: string;
  description: string;
  icon: string;
  earnedAt?: string;
  unlockedDate?: string;
  unlocked: boolean;
  category: string;
}

export interface LeaderboardEntry {
  rank: number;
  id?: string;
  userId?: string;
  name: string;
  department: string;
  designation: string;
  avatarUrl?: string;
  xp: number;
  level: string | number;
  coursesCompleted?: number;
  gameScore?: number;
  badgesCount?: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface CertificateData {
  id: string;
  learnerName: string;
  courseName: string;
  completionDate: string;
  score: number;
  certificateNumber: string;
  issuer: string;
  authority: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'course' | 'streak' | 'badge' | 'challenge' | 'competency';
}

export interface IGOTCourse {
  id: string;
  title: string;
  courseCode?: string;
  provider: string;
  accreditationBody?: string;
  competencyArea?: string;
  duration: string;
  level?: 'Basic' | 'Intermediate' | 'Advanced';
  rating?: number;
  enrolledCount?: number;
  synced?: boolean;
  description: string;
}

export type iGOTCourse = IGOTCourse;

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: string[];
}
