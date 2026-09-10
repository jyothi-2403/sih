import { 
  UserProfile, 
  Course, 
  GameData, 
  Quiz, 
  Badge, 
  LeaderboardEntry, 
  iGOTCourse, 
  NotificationItem,
  LearningMaterial 
} from '../types';

export const INITIAL_LEARNER: UserProfile = {
  id: 'usr-001',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@mospi.gov.in',
  role: 'learner',
  department: 'Field Operations Division (FOD)',
  designation: 'Senior Statistical Officer',
  experience: '4.5 Years',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  overallCompetency: 72,
  level: 8,
  levelTitle: 'Skilled Analyst',
  xp: 2450,
  streak: 7,
  coursesCompleted: 4,
  quizAccuracy: 84,
  gameScore: 3820,
  badges: ['badge-1', 'badge-2', 'badge-3', 'badge-4'],
  createdAt: '2025-11-12T09:30:00Z',
  skills: [
    { name: 'Python for Data Analysis', category: 'Programming', currentLevel: 2, requiredLevel: 5 },
    { name: 'Survey Statistics & Sampling', category: 'Statistical Theory', currentLevel: 4, requiredLevel: 5 },
    { name: 'Data Analysis & Cleaning', category: 'Data Science', currentLevel: 2, requiredLevel: 4 },
    { name: 'Data Visualization & Reporting', category: 'Presentation', currentLevel: 1, requiredLevel: 4 },
    { name: 'Official Statistics Quality Control', category: 'Governance', currentLevel: 3, requiredLevel: 4 },
    { name: 'National Accounts & Price Indices', category: 'Economics', currentLevel: 3, requiredLevel: 4 },
    { name: 'R Programming for Surveys', category: 'Programming', currentLevel: 2, requiredLevel: 3 },
  ]
};

export const INITIAL_ADMIN: UserProfile = {
  id: 'usr-admin-01',
  name: 'Dr. Sunita Rao',
  email: 'sunita.rao@nasa.gov.in',
  role: 'admin',
  department: 'National Academy of Statistical Administration (NASA)',
  designation: 'Joint Director & Training Head',
  experience: '16 Years',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  overallCompetency: 96,
  level: 15,
  levelTitle: 'Chief Statistical Architect',
  xp: 12800,
  streak: 28,
  coursesCompleted: 18,
  quizAccuracy: 98,
  gameScore: 9400,
  badges: ['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5', 'badge-6'],
  createdAt: '2024-01-10T10:00:00Z',
  skills: [
    { name: 'Official Statistics Governance', category: 'Governance', currentLevel: 5, requiredLevel: 5 },
    { name: 'Curriculum & Capacity Building', category: 'Education', currentLevel: 5, requiredLevel: 5 },
    { name: 'Data Analytics & AI', category: 'Technology', currentLevel: 4, requiredLevel: 5 },
  ]
};

export const INITIAL_TRAINER: UserProfile = {
  id: 'usr-trainer-01',
  name: 'Prof. Rajesh Varma',
  email: 'rajesh.varma@isi.ac.in',
  role: 'trainer',
  department: 'Indian Statistical Institute & MoSPI Faculty',
  designation: 'Senior Faculty & Statistical Advisor',
  experience: '12 Years',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  overallCompetency: 92,
  level: 12,
  levelTitle: 'Master Instructor',
  xp: 8650,
  streak: 15,
  coursesCompleted: 12,
  quizAccuracy: 95,
  gameScore: 7100,
  badges: ['badge-1', 'badge-2', 'badge-5'],
  createdAt: '2024-06-15T08:00:00Z',
  skills: [
    { name: 'Survey Design & Sampling', category: 'Statistical Theory', currentLevel: 5, requiredLevel: 5 },
    { name: 'Applied Econometrics', category: 'Economics', currentLevel: 5, requiredLevel: 5 },
    { name: 'Pedagogy & Assessment Design', category: 'Education', currentLevel: 5, requiredLevel: 5 }
  ]
};

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'course-python',
    title: 'Python for Data Analysis',
    description: 'Master Python fundamentals, Pandas dataframes, NumPy arrays, and automated ETL pipelines tailored for official government datasets.',
    category: 'Programming & Data Science',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Automation'],
    difficulty: 'Intermediate',
    duration: '14 Hours',
    progress: 35,
    xpReward: 500,
    isIgotSynced: true,
    igotCourseId: 'igot-py-204',
    provider: 'iGOT Karmayogi / MoSPI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    modules: [
      {
        id: 'mod-py-1',
        title: 'Module 1 – Python Fundamentals for Statisticians',
        description: 'Variables, data types, lists, dictionaries, and functional control structures in statistical operations.',
        duration: '2.5 Hours',
        completed: true,
        gamesCount: 2,
        quizId: 'quiz-py-1',
        lessons: [
          {
            id: 'les-py-101',
            title: 'Core Syntax and Data Structures',
            duration: '45 mins',
            content: `Python is the gold standard scripting language for modern statistical data processing. In official statistics, data is ingested across structured formats (CSV, Excel, fixed-width ASCII from legacy NSS census tapes). Understanding atomic types (int, float, str, bool) alongside composite containers (lists, tuples, dicts) enables automated verification routines.`,
            keyTakeaways: [
              'Dictionaries provide O(1) key-lookup optimal for category code mapping.',
              'List comprehensions offer vectorized-like concise syntax for data cleaning.',
              'Immutable tuples are ideal for geographic hierarchy codes (State-District-Subdistrict).'
            ]
          },
          {
            id: 'les-py-102',
            title: 'Statistical Functions & Control Flow',
            duration: '50 mins',
            content: `Learn writing modular reusable functions for computing central tendency, variance measures, and validation flags. Exception handling with try/except prevents pipeline failure when processing large-scale survey batches with occasional missing records.`,
            keyTakeaways: [
              'Custom statistical functions should handle NaN and missing data indicators (-999, -99).',
              'Use type hints (int, float, List) for enterprise-grade government codebase reliability.'
            ]
          }
        ]
      },
      {
        id: 'mod-py-2',
        title: 'Module 2 – Pandas & Data Wrangling',
        description: 'Handling tabular survey files, filtering records, merging strata tables, and imputing missing values.',
        duration: '4 Hours',
        completed: false,
        gamesCount: 3,
        quizId: 'quiz-py-2',
        lessons: [
          {
            id: 'les-py-201',
            title: 'DataFrame Operations & Subsetting',
            duration: '1 Hour',
            content: `A Pandas DataFrame is a two-dimensional labeled data structure with columns of potentially different types. For National Sample Survey (NSS) schedules, blocks of household identifiers and consumption items map directly to DataFrame multi-indices.`,
            keyTakeaways: [
              'Use .loc for label-based and .iloc for integer-based positional indexing.',
              'Avoid iterating over rows using iterrows(); prefer vectorized column operations.'
            ]
          }
        ]
      },
      {
        id: 'mod-py-3',
        title: 'Module 3 – Practical Application with Government Datasets',
        description: 'Case study: Ingesting periodic labour force survey (PLFS) samples, weighting multipliers, and generating key indicators.',
        duration: '4.5 Hours',
        completed: false,
        gamesCount: 2,
        quizId: 'quiz-py-3',
        lessons: [
          {
            id: 'les-py-301',
            title: 'Applying Survey Multipliers and Sub-sample Weights',
            duration: '1.5 Hours',
            content: `Official survey data requires applying sampling multipliers to estimate population totals. In two-stage stratified sampling, sub-sample weights compensate for unequal selection probabilities.`,
            keyTakeaways: [
              'Weighted mean formula: sum(w * x) / sum(w).',
              'Ensure multiplier fields are stored in numeric float64 precision to avoid rounding bias.'
            ]
          }
        ]
      },
      {
        id: 'mod-py-4',
        title: 'Module 4 – Advanced Automation & Verification',
        description: 'Building automated data validation pipelines and audit trails before publishing official releases.',
        duration: '3 Hours',
        completed: false,
        gamesCount: 2,
        quizId: 'quiz-py-4',
        lessons: [
          {
            id: 'les-py-401',
            title: 'Automated Sanity Checks & Outlier Rules',
            duration: '1 Hour',
            content: `Statistical verification requires rule-based range checking (e.g. household consumption expenditure cannot be negative or exceed logical boundaries relative to reported income quintiles).`,
            keyTakeaways: [
              'Interquartile range (IQR) and Z-score methods identify potential transcription errors.',
              'Log anomalous records to validation error logs with household ID references.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-stats',
    title: 'Fundamentals of Statistics',
    description: 'Core probability distributions, sampling designs, standard error estimation, and hypothesis testing for civil statistical officers.',
    category: 'Statistical Theory',
    skills: ['Probability', 'Sampling Theory', 'Hypothesis Testing', 'Estimation'],
    difficulty: 'Beginner',
    duration: '10 Hours',
    progress: 80,
    xpReward: 400,
    isIgotSynced: true,
    igotCourseId: 'igot-stat-101',
    provider: 'NASA / MoSPI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    modules: [
      {
        id: 'mod-stat-1',
        title: 'Module 1 – Probability & Distributions',
        description: 'Normal, Binomial, Poisson, and Hypergeometric distributions applied to socio-economic populations.',
        duration: '2 Hours',
        completed: true,
        gamesCount: 2,
        quizId: 'quiz-stat-1',
        lessons: [
          {
            id: 'les-stat-101',
            title: 'Sampling Distributions and the Central Limit Theorem',
            duration: '40 mins',
            content: `The Central Limit Theorem (CLT) establishes that the sample mean distribution tends toward normality as sample size increases, regardless of the underlying population shape. This provides the mathematical justification for confidence interval estimation in national surveys.`,
            keyTakeaways: [
              'Sample size of n >= 30 is a general empirical threshold for CLT applicability.',
              'Standard Error of the mean equals sigma / sqrt(n).'
            ]
          }
        ]
      },
      {
        id: 'mod-stat-2',
        title: 'Module 2 – Sampling Methodologies in Practice',
        description: 'Simple random sampling, stratified sampling, systematic sampling, and multi-stage cluster sampling in Indian surveys.',
        duration: '3 Hours',
        completed: true,
        gamesCount: 2,
        quizId: 'quiz-stat-2',
        lessons: [
          {
            id: 'les-stat-201',
            title: 'Stratified vs Cluster Sampling',
            duration: '1 Hour',
            content: `Stratified sampling groups homogeneous units within strata and samples from every stratum to minimize variance. Cluster sampling groups heterogeneous mini-populations for logistical field economy.`,
            keyTakeaways: [
              'Stratification reduces sampling variance when between-strata variance is high.',
              'Clustering reduces field travel costs at the expense of a Design Effect (Deff > 1).'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-data-analysis',
    title: 'Data Analysis for Statistical Officers',
    description: 'Practical exploratory data analysis, tabular summaries, imputation methodologies, and variance reduction techniques for official records.',
    category: 'Data Analysis',
    skills: ['EDA', 'Imputation', 'Variance Estimation', 'Index Numbers'],
    difficulty: 'Intermediate',
    duration: '12 Hours',
    progress: 20,
    xpReward: 450,
    isIgotSynced: true,
    igotCourseId: 'igot-da-305',
    provider: 'iGOT Karmayogi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    modules: [
      {
        id: 'mod-da-1',
        title: 'Module 1 – Exploratory Analysis of Microdata',
        description: 'Frequency distributions, percentiles, cross-tabulation tables, and outlier triage.',
        duration: '3 Hours',
        completed: false,
        gamesCount: 2,
        quizId: 'quiz-da-1',
        lessons: [
          {
            id: 'les-da-101',
            title: 'Microdata Quality Checks',
            duration: '45 mins',
            content: `Before publishing national statistical bulletins, microdata must pass logical coherence checks between demographic rosters and economic activity questions.`,
            keyTakeaways: [
              'Identify logical contradictions (e.g. child under 10 reported as head of enterprise).',
              'Examine heaping and digit preference in reported ages using Whipple or Myers indices.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-dataviz',
    title: 'Data Visualization & Dashboarding',
    description: 'Transform complex statistical series into clean, accessible charts, thematic maps, and executive dashboards for policymaking.',
    category: 'Presentation',
    skills: ['Visualization', 'Infographics', 'Dashboarding', 'GIS Mapping'],
    difficulty: 'Beginner',
    duration: '8 Hours',
    progress: 10,
    xpReward: 350,
    isIgotSynced: false,
    provider: 'Pragya AI & MoSPI DIID',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80',
    modules: [
      {
        id: 'mod-viz-1',
        title: 'Module 1 – Principles of Visual Data Storytelling',
        description: 'Choosing the right chart, color contrast compliance, and avoiding deceptive graphical representations.',
        duration: '2 Hours',
        completed: false,
        gamesCount: 1,
        quizId: 'quiz-viz-1',
        lessons: [
          {
            id: 'les-viz-101',
            title: 'Visual Hierarchy for Policy Briefs',
            duration: '40 mins',
            content: `Government leaders require instant clarity on trends. Line charts for time series (CPI inflation), bar charts for cross-state comparisons (SDG index), and choropleth maps for regional disparity.`,
            keyTakeaways: [
              'Never truncate baseline y-axes misleadingly in comparative bar charts.',
              'Use accessible color palettes distinguishable by colorblind readers.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-survey-mgmt',
    title: 'Survey Data Management & CAPI Operations',
    description: 'End-to-end management of Computer Assisted Personal Interviewing (CAPI) applications, field supervision, and metadata standards.',
    category: 'Field Operations',
    skills: ['CAPI', 'Field Supervision', 'Survey Auditing', 'Metadata'],
    difficulty: 'Intermediate',
    duration: '11 Hours',
    progress: 50,
    xpReward: 420,
    isIgotSynced: true,
    igotCourseId: 'igot-capi-108',
    provider: 'iGOT Karmayogi / FOD',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=600&auto=format&fit=crop&q=80',
    modules: [
      {
        id: 'mod-surv-1',
        title: 'Module 1 – CAPI Architecture and Field Monitoring',
        description: 'GPS timestamp validation, paradata auditing, and enumerator speed run detection.',
        duration: '3 Hours',
        completed: true,
        gamesCount: 2,
        quizId: 'quiz-surv-1',
        lessons: [
          {
            id: 'les-surv-101',
            title: 'Paradata Analysis for Quality Assurance',
            duration: '50 mins',
            content: `Paradata captures the process of data collection—timestamps per question, interview duration, geo-coordinates, and edit counts. Identifying enumerator anomalies prevents fabricated survey submissions.`,
            keyTakeaways: [
              'Interviews completed in under 20% of median expected time trigger field re-investigation.',
              'GPS distance check confirms interview location coincides with mapped Primary Sampling Unit (PSU).'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-sqc',
    title: 'Statistical Quality Control in Official Statistics',
    description: 'Applying Total Quality Management (TQM), Generic Statistical Business Process Model (GSBPM), and audit protocols.',
    category: 'Governance & Quality',
    skills: ['GSBPM', 'Audit', 'Quality Dimensions', 'Standardization'],
    difficulty: 'Advanced',
    duration: '9 Hours',
    progress: 0,
    xpReward: 480,
    isIgotSynced: true,
    igotCourseId: 'igot-sqc-401',
    provider: 'MoSPI Quality Assurance Wing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    modules: [
      {
        id: 'mod-sqc-1',
        title: 'Module 1 – The GSBPM Framework for National Statistical Systems',
        description: 'The 8 phases: Specify Needs, Design, Build, Collect, Process, Analyse, Disseminate, and Evaluate.',
        duration: '2.5 Hours',
        completed: false,
        gamesCount: 1,
        quizId: 'quiz-sqc-1',
        lessons: [
          {
            id: 'les-sqc-101',
            title: 'Quality Dimensions in Official Statistics',
            duration: '45 mins',
            content: `The UN Fundamental Principles of Official Statistics and India's National Quality Assurance Framework (NQAF) define quality across relevance, accuracy, timeliness, accessibility, interpretability, and coherence.`,
            keyTakeaways: [
              'Accuracy measures proximity to truth; precision measures reproducibility.',
              'Timeliness balances fast preliminary estimates against highly audited final series.'
            ]
          }
        ]
      }
    ]
  }
];

export const SAMPLE_GAMES: GameData[] = [
  {
    id: 'game-quiz-battle-1',
    courseId: 'course-python',
    courseTitle: 'Python for Data Analysis',
    type: 'quiz_battle',
    title: 'Data Wrangling Quiz Battle',
    description: 'Fast-paced statistical trivia battle! Answer rapid-fire questions, maintain your combo streak, and protect your 3 lives.',
    difficulty: 'medium',
    rewardXP: 100,
    status: 'published',
    quizQuestions: [
      {
        id: 'qb-1',
        question: 'Which Pandas function is most efficient for reading a 2GB survey CSV file in chunks?',
        options: ['pd.read_csv(chunksize=10000)', 'pd.read_table(all=True)', 'pd.load_chunks()', 'pd.stream_data()'],
        correctAnswer: 0,
        explanation: 'Specifying chunksize in pd.read_csv returns a TextFileReader iterator, allowing low-memory incremental processing.',
        difficulty: 'Medium',
        topic: 'Pandas I/O'
      },
      {
        id: 'qb-2',
        question: 'What is the result of np.isnan(val) when val is a missing survey response marked as np.nan?',
        options: ['True', 'False', 'None', 'Throws ValueError'],
        correctAnswer: 0,
        explanation: 'np.isnan() specifically evaluates floating-point NaN values to boolean True.',
        difficulty: 'Easy',
        topic: 'NumPy Missing Data'
      },
      {
        id: 'qb-3',
        question: 'In statistical sampling, what does the .sample(frac=0.1, random_state=42) method achieve?',
        options: ['Selects 10% stratified rows with reproducible pseudo-random seed', 'Sorts the lowest 10% of values', 'Removes 10% outliers', 'Calculates 10th percentile'],
        correctAnswer: 0,
        explanation: 'frac=0.1 extracts a random 10% subset, while random_state guarantees reproducibility for statistical auditability.',
        difficulty: 'Medium',
        topic: 'Random Sampling'
      },
      {
        id: 'qb-4',
        question: 'Which method should you use to combine household demographic tables with enterprise output tables on common ID?',
        options: ['pd.merge(left, right, on="hh_id", how="inner")', 'pd.concat([left, right], axis=1)', 'pd.stack()', 'left.append(right)'],
        correctAnswer: 0,
        explanation: 'pd.merge performs relational database-style joins on explicit key columns such as unique household identifier hh_id.',
        difficulty: 'Medium',
        topic: 'Table Joins'
      },
      {
        id: 'qb-5',
        question: 'What is the correct way to compute a weighted average of consumption expenditure in Pandas?',
        options: ['(df["exp"] * df["weight"]).sum() / df["weight"].sum()', 'df["exp"].mean() * df["weight"].mean()', 'df.groupby("weight")["exp"].mean()', 'df["exp"].weighted()'],
        correctAnswer: 0,
        explanation: 'Weighted mean is mathematically defined as sum(weight * value) divided by the total sum of weights.',
        difficulty: 'Hard',
        topic: 'Survey Multipliers'
      }
    ]
  },
  {
    id: 'game-match-1',
    courseId: 'course-stats',
    courseTitle: 'Fundamentals of Statistics',
    type: 'match_concept',
    title: 'Match the Statistical Concept',
    description: 'Connect each foundational statistical concept with its precise definition in India\'s Official Statistical System.',
    difficulty: 'medium',
    rewardXP: 100,
    status: 'published',
    matchingItems: [
      {
        id: 'pair-1',
        concept: 'Sampling Multiplier',
        definition: 'Reciprocal of probability of selection used to inflate sample to universe estimate'
      },
      {
        id: 'pair-2',
        concept: 'Stratification',
        definition: 'Dividing heterogeneous population into mutually exclusive homogeneous sub-groups'
      },
      {
        id: 'pair-3',
        concept: 'Design Effect (Deff)',
        definition: 'Ratio of variance under complex design to variance under simple random sampling'
      },
      {
        id: 'pair-4',
        concept: 'CAPI Paradata',
        definition: 'Auxiliary process data capturing timestamps, GPS, and enumerator keystrokes'
      },
      {
        id: 'pair-5',
        concept: 'CPI Inflation',
        definition: 'Measure of average change over time in retail prices paid by consumers'
      }
    ]
  },
  {
    id: 'game-memory-1',
    courseId: 'course-stats',
    courseTitle: 'Fundamentals of Statistics',
    type: 'memory_match',
    title: 'Memory Match: Official Statistics Key Terms',
    description: 'Flip face-down cards to match statistical terms with their definitions. Test your memory and grasp of official terminology!',
    difficulty: 'easy',
    rewardXP: 120,
    status: 'published',
    matchingItems: [
      {
        id: 'mem-1',
        concept: 'Primary Sampling Unit (PSU)',
        definition: 'First-stage sampling cluster, e.g. Census Village or Urban Frame Block'
      },
      {
        id: 'mem-2',
        concept: 'Non-Sampling Error',
        definition: 'Deviations caused by measurement defects, non-response, or transcription error'
      },
      {
        id: 'mem-3',
        concept: 'Standard Error (SE)',
        definition: 'Standard deviation of the sampling distribution of a statistical estimator'
      },
      {
        id: 'mem-4',
        concept: 'Gross Value Added (GVA)',
        definition: 'Value of output minus intermediate consumption in National Accounts'
      }
    ]
  },
  {
    id: 'game-scenario-1',
    courseId: 'course-survey-mgmt',
    courseTitle: 'Survey Data Management & CAPI Operations',
    type: 'scenario_challenge',
    title: 'Scenario Challenge: Field Survey Officer Decisions',
    description: 'Face real-world field dilemmas encountered by MoSPI Statistical Officers and select the scientifically sound protocol.',
    difficulty: 'hard',
    rewardXP: 150,
    status: 'published',
    scenarioItems: [
      {
        id: 'scen-1',
        situation: 'You are supervising an all-India household survey in an agricultural district. During verification, you notice that 15 households in a single hamlet report zero expenditure on cereal and pulses despite living in rural poverty. What should you do first?',
        options: [
          'Directly replace them with convenient neighbouring substitute households without documentation',
          'Conduct an immediate physical re-interview check or verify if they receive 100% PDS free grain under PMGKAY welfare scheme',
          'Impute the district average expenditure without investigating field causes',
          'Delete the entire village cluster from the sample to avoid skewing standard errors'
        ],
        correctOption: 1,
        explanation: 'In India, under national food security and PMGKAY welfare programs, qualifying households receive free ration grains, leading to legitimately zero market cash purchases. A supervisor must verify the factual ground condition before concluding error.',
        hint: 'Consider government social safety net distributions in rural India.'
      },
      {
        id: 'scen-2',
        situation: 'Your CAPI dashboard reveals an enumerator completed 8 comprehensive 45-minute agricultural survey schedules in a single afternoon between 2:00 PM and 4:30 PM. What action is required?',
        options: [
          'Approve their work because high enumerator velocity saves government survey budget',
          'Flag the submissions for speed-running violation, audit GPS timestamps, and dispatch an inspection officer for random sample re-enumeration',
          'Automatically award bonus XP to the enumerator for record-breaking speed',
          'Change the schedule format to be even longer so it cannot be rushed'
        ],
        correctOption: 1,
        explanation: '8 schedules x 45 minutes requires 360 minutes (6 hours). Completing them in 150 minutes indicates fraudulent speed-running or fabricated answers (curbstoning). Rigorous paradata auditing and field verification are mandated by survey protocol.',
        hint: 'Calculate total required time vs available elapsed hours.'
      },
      {
        id: 'scen-3',
        situation: 'While preparing monthly Consumer Price Index (CPI) basket quotations, a regular sample price reporter in a wholesale mandi is temporarily closed for renovation. What is the standard statistical procedure?',
        options: [
          'Carry forward last month\'s price quotation indefinitely without noting substitution',
          'Select a matched substitute shop of similar retail trade class in the same market center and record the change',
          'Input 0 as the commodity price',
          'Drop the commodity weight from the entire state inflation calculation'
        ],
        correctOption: 1,
        explanation: 'Under official price index compilation manuals, when a quotation outlet is unavailable, matched outlet substitution within the same market stratum preserves price continuity without distorting relative price relatives.',
        hint: 'Review index number compilation guidelines for missing price quotations.'
      }
    ]
  },
  {
    id: 'game-true-false-1',
    courseId: 'course-stats',
    courseTitle: 'Fundamentals of Statistics',
    type: 'true_false',
    title: 'True or False: Official Statistics Edition',
    description: 'Rapid-fire statistical statements. Determine whether each statement conforms to statistical theory and government guidelines.',
    difficulty: 'easy',
    rewardXP: 80,
    status: 'published',
    trueFalseItems: [
      {
        id: 'tf-1',
        statement: 'Data validation and range checking must be performed prior to calculating national sampling aggregates.',
        isTrue: true,
        explanation: 'Ingesting uncleaned microdata into weighting multipliers spreads transcription bugs across published national totals.'
      },
      {
        id: 'tf-2',
        statement: 'Stratified sampling always produces higher sampling variance than Simple Random Sampling with the same sample size.',
        isTrue: false,
        explanation: 'Stratified sampling generally produces lower (or equal) variance by isolating between-stratum variation.'
      },
      {
        id: 'tf-3',
        statement: 'In Python, Pandas NaN values evaluate as equal when checked using the standard equality operator (np.nan == np.nan).',
        isTrue: false,
        explanation: 'Under IEEE floating point standards, NaN is never equal to itself. You must use np.isnan() or pd.isna().'
      },
      {
        id: 'tf-4',
        statement: 'The Generic Statistical Business Process Model (GSBPM) provides a standardized terminology for statistical business processes.',
        isTrue: true,
        explanation: 'Adopted worldwide and by MoSPI, GSBPM defines 8 phases from identifying user needs to statistical dissemination.'
      },
      {
        id: 'tf-5',
        statement: 'In survey analysis, increasing sample size eliminates all non-sampling errors such as reporting bias.',
        isTrue: false,
        explanation: 'Increasing sample size only reduces sampling variance; non-sampling errors (enumerator bias, non-response) can actually increase if field supervision deteriorates.'
      }
    ]
  },
  {
    id: 'game-speed-1',
    courseId: 'course-python',
    courseTitle: 'Python for Data Analysis',
    type: 'speed_challenge',
    title: 'Speed Challenge: 60s Python Blitz',
    description: 'Race against a 60-second countdown clock! Maximize your score with correct rapid answers and maintain an unbroken combo streak.',
    difficulty: 'medium',
    rewardXP: 140,
    status: 'published',
    quizQuestions: [
      {
        id: 'sc-1',
        question: 'Which method returns the count of non-null values per column in a DataFrame?',
        options: ['df.count()', 'df.len()', 'df.size()', 'df.totals()'],
        correctAnswer: 0,
        explanation: 'df.count() returns non-NA/null counts, whereas len(df) or df.shape returns row count.',
        difficulty: 'Easy',
        topic: 'Pandas Exploration'
      },
      {
        id: 'sc-2',
        question: 'Which symbol is used for logical AND in Pandas boolean filtering?',
        options: ['&', 'and', '&&', 'AND'],
        correctAnswer: 0,
        explanation: 'Pandas uses bitwise operators (&, |, ~) for vectorized element-wise boolean operations.',
        difficulty: 'Easy',
        topic: 'Pandas Syntax'
      },
      {
        id: 'sc-3',
        question: 'Which Pandas method drops rows containing any missing value?',
        options: ['df.dropna()', 'df.remove_nan()', 'df.clear_nulls()', 'df.drop_missing()'],
        correctAnswer: 0,
        explanation: 'df.dropna() defaults to dropping any row with at least one missing field.',
        difficulty: 'Easy',
        topic: 'Missing Data'
      },
      {
        id: 'sc-4',
        question: 'What parameter in df.to_csv() prevents index column from being saved to disk?',
        options: ['index=False', 'no_index=True', 'save_index=0', 'omit_idx=True'],
        correctAnswer: 0,
        explanation: 'Passing index=False prevents writing extraneous unnamed 0,1,2... index columns.',
        difficulty: 'Easy',
        topic: 'Pandas Export'
      }
    ]
  },
  {
    id: 'game-level-1',
    courseId: 'course-stats',
    courseTitle: 'Fundamentals of Statistics',
    type: 'level_challenge',
    title: 'Level Challenge: 5-Stage Competency Ascent',
    description: 'Ascend through 5 progressive levels of difficulty from Beginner to Expert. Test your mastery to unlock higher tiers!',
    difficulty: 'hard',
    rewardXP: 200,
    status: 'published',
    quizQuestions: [
      {
        id: 'lc-lvl-1',
        question: 'Level 1 (Beginner): What is the statistical term for the value that appears most frequently in a sample?',
        options: ['Mode', 'Median', 'Mean', 'Variance'],
        correctAnswer: 0,
        explanation: 'The mode represents the highest frequency category or observation in a distribution.',
        difficulty: 'Easy',
        topic: 'Descriptive Statistics'
      },
      {
        id: 'lc-lvl-2',
        question: 'Level 2 (Basic): In a symmetric bell-shaped normal distribution, what percentage of data falls within +/- 1 standard deviation of the mean?',
        options: ['Approximately 68%', 'Approximately 95%', 'Approximately 50%', 'Approximately 99.7%'],
        correctAnswer: 0,
        explanation: 'The empirical 68-95-99.7 rule dictates ~68.27% of observations lie within 1 sigma of the mean.',
        difficulty: 'Easy',
        topic: 'Probability Distributions'
      },
      {
        id: 'lc-lvl-3',
        question: 'Level 3 (Intermediate): When sampling without replacement from a finite population of size N, what correction factor is applied to variance?',
        options: ['Finite Population Correction (FPC = (N - n) / (N - 1))', 'Bessel\'s Correction (n / (n - 1))', 'Degrees of Freedom (n - k)', 'Design Weight'],
        correctAnswer: 0,
        explanation: 'FPC accounts for reduction in uncertainty as sample fraction n/N becomes non-negligible (> 5%).',
        difficulty: 'Medium',
        topic: 'Finite Population Sampling'
      },
      {
        id: 'lc-lvl-4',
        question: 'Level 4 (Advanced): If a survey cluster design has an intra-cluster correlation coefficient (rho) of 0.05 with cluster size m = 21, what is the Design Effect (Deff = 1 + (m - 1) * rho)?',
        options: ['2.0', '1.05', '3.1', '1.5'],
        correctAnswer: 0,
        explanation: 'Deff = 1 + (21 - 1) * 0.05 = 1 + 20 * 0.05 = 1 + 1.0 = 2.0. This indicates sample variance is double simple random sampling.',
        difficulty: 'Hard',
        topic: 'Complex Survey Variance'
      },
      {
        id: 'lc-lvl-5',
        question: 'Level 5 (Expert): Which econometric estimator is best suited to control for unobserved time-invariant heterogeneity across Indian states over a 10-year panel survey?',
        options: ['Fixed Effects (Within) Estimator', 'Ordinary Least Squares (Pooled OLS)', 'Cross-Sectional OLS', 'Raw Correlation Matrix'],
        correctAnswer: 0,
        explanation: 'Fixed Effects regression eliminates time-invariant state-specific omitted variables by de-meaning variables relative to state averages.',
        difficulty: 'Hard',
        topic: 'Panel Data Econometrics'
      }
    ]
  }
];

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'quiz-py-1',
    courseId: 'course-python',
    courseTitle: 'Python for Data Analysis',
    title: 'Python Fundamentals Assessment',
    difficulty: 'Medium',
    status: 'published',
    createdBy: 'Prof. Rajesh Varma',
    approvedBy: 'Dr. Sunita Rao',
    createdAt: '2025-10-15T11:00:00Z',
    questions: [
      {
        id: 'q-py-1',
        question: 'Which Python data structure maintains key-value pairs with average O(1) time complexity for key lookups?',
        options: ['Dictionary (dict)', 'List (list)', 'Tuple (tuple)', 'String (str)'],
        correctAnswer: 0,
        explanation: 'Dictionaries are implemented using hash tables in Python, delivering constant-time lookups on average.',
        difficulty: 'Easy',
        topic: 'Data Structures'
      },
      {
        id: 'q-py-2',
        question: 'How do you prevent a Python script from crashing when parsing non-standard survey date strings?',
        options: [
          'Wrap the parsing logic in a try ... except ValueError block',
          'Delete all rows that look like dates',
          'Use infinite while loops until it works',
          'Convert everything to float'
        ],
        correctAnswer: 0,
        explanation: 'Exception handling with try/except cleanly captures ValueError and routes invalid dates to an anomaly log.',
        difficulty: 'Medium',
        topic: 'Error Handling'
      },
      {
        id: 'q-py-3',
        question: 'What is the purpose of list comprehensions in data cleaning scripts?',
        options: [
          'Concise syntax to transform elements of an iterable into a new list',
          'To compress the file size on disk',
          'To plot charts automatically',
          'To encrypt government survey passwords'
        ],
        correctAnswer: 0,
        explanation: 'List comprehensions provide an idiomatic, readable, and often faster method for mapping and filtering list items.',
        difficulty: 'Easy',
        topic: 'Python Constructs'
      },
      {
        id: 'q-py-4',
        question: 'Which module in the Python standard library should be used for reading structured JSON APIs from national data portals?',
        options: ['json', 'math', 'os', 'random'],
        correctAnswer: 0,
        explanation: 'The built-in json module handles serializing and deserializing JSON strings and files.',
        difficulty: 'Easy',
        topic: 'Standard Library'
      }
    ]
  },
  {
    id: 'quiz-stat-1',
    courseId: 'course-stats',
    courseTitle: 'Fundamentals of Statistics',
    title: 'Probability & Sampling Fundamentals Quiz',
    difficulty: 'Medium',
    status: 'published',
    createdBy: 'Prof. Rajesh Varma',
    approvedBy: 'Dr. Sunita Rao',
    createdAt: '2025-09-20T14:30:00Z',
    questions: [
      {
        id: 'q-st-1',
        question: 'What happens to the standard error of the mean when sample size n is quadrupled (multiplied by 4)?',
        options: ['It is halved (divided by 2)', 'It is quadrupled', 'It remains identical', 'It drops to zero'],
        correctAnswer: 0,
        explanation: 'Since Standard Error = sigma / sqrt(n), multiplying n by 4 yields sqrt(4) = 2 in the denominator, halving the SE.',
        difficulty: 'Medium',
        topic: 'Sampling Distributions'
      },
      {
        id: 'q-st-2',
        question: 'In stratified random sampling, how should sample size ideally be allocated across strata if variance is higher in certain strata?',
        options: [
          'Neyman (Optimum) Allocation where sample size is proportional to stratum size and stratum standard deviation',
          'Equal allocation regardless of stratum diversity',
          'Allocate all sample units to the largest stratum only',
          'Randomly distribute without consideration of variance'
        ],
        correctAnswer: 0,
        explanation: 'Neyman allocation minimizes sample variance for a fixed overall sample size by allocating more units to larger and more variable strata.',
        difficulty: 'Hard',
        topic: 'Stratified Allocation'
      }
    ]
  }
];

export const SAMPLE_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Course',
    description: 'Completed your first official capacity building course on Pragya AI.',
    icon: '🏆',
    earnedAt: '2025-11-20',
    unlocked: true,
    category: 'learning'
  },
  {
    id: 'badge-2',
    name: 'Quiz Master',
    description: 'Achieved 100% accuracy on an adaptive statistical examination.',
    icon: '🎯',
    earnedAt: '2025-12-05',
    unlocked: true,
    category: 'quiz'
  },
  {
    id: 'badge-3',
    name: '7-Day Streak',
    description: 'Sustained continuous daily learning activity for 7 consecutive days.',
    icon: '🔥',
    earnedAt: '2026-03-08',
    unlocked: true,
    category: 'streak'
  },
  {
    id: 'badge-4',
    name: 'Fast Learner',
    description: 'Finished 5 learning modules and mini-games in a single week.',
    icon: '🧠',
    earnedAt: '2026-02-14',
    unlocked: true,
    category: 'learning'
  },
  {
    id: 'badge-5',
    name: 'Skill Improver',
    description: 'Elevated competency level by 2 or more points in a core discipline.',
    icon: '⭐',
    unlocked: false,
    category: 'mastery'
  },
  {
    id: 'badge-6',
    name: 'Learning Champion',
    description: 'Earned more than 5,000 XP across games, quizzes, and course completions.',
    icon: '👑',
    unlocked: false,
    category: 'mastery'
  },
  {
    id: 'badge-7',
    name: 'Data Wizard',
    description: 'Completed all Python, Data Wrangling, and CAPI simulation games with high score.',
    icon: '📊',
    unlocked: false,
    category: 'game'
  }
];

export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'usr-101',
    name: 'Pooja Bhattacharya',
    department: 'National Accounts Division (NAD)',
    designation: 'Assistant Director',
    xp: 4120,
    level: 'Level 11 – Master Statistician',
    coursesCompleted: 7,
    gameScore: 5900,
    badgesCount: 6,
    streak: 19
  },
  {
    rank: 2,
    userId: 'usr-102',
    name: 'Vikramaditya Sen',
    department: 'Economic Statistics Division (ESD)',
    designation: 'Senior Statistical Officer',
    xp: 3680,
    level: 'Level 10 – Lead Analyst',
    coursesCompleted: 6,
    gameScore: 5240,
    badgesCount: 5,
    streak: 14
  },
  {
    rank: 3,
    userId: 'usr-001',
    name: 'Arjun Sharma',
    department: 'Field Operations Division (FOD)',
    designation: 'Senior Statistical Officer',
    xp: 2450,
    level: 'Level 8 – Skilled Analyst',
    coursesCompleted: 4,
    gameScore: 3820,
    badgesCount: 4,
    streak: 7,
    isCurrentUser: true
  },
  {
    rank: 4,
    userId: 'usr-103',
    name: 'Kavita Sundaram',
    department: 'Price Statistics Division',
    designation: 'Statistical Investigator',
    xp: 2190,
    level: 'Level 7 – Data Practitioner',
    coursesCompleted: 3,
    gameScore: 3410,
    badgesCount: 3,
    streak: 5
  },
  {
    rank: 5,
    userId: 'usr-104',
    name: 'Rohan Deshmukh',
    department: 'Data Informatics and Innovation Division (DIID)',
    designation: 'Junior Statistical Officer',
    xp: 1940,
    level: 'Level 6 – Associate Analyst',
    coursesCompleted: 3,
    gameScore: 2950,
    badgesCount: 3,
    streak: 4
  },
  {
    rank: 6,
    userId: 'usr-105',
    name: 'Ananya Iyer',
    department: 'Survey Design & Research Division (SDRD)',
    designation: 'Statistical Officer',
    xp: 1720,
    level: 'Level 5 – Practitioner',
    coursesCompleted: 2,
    gameScore: 2400,
    badgesCount: 2,
    streak: 3
  }
];

export const SAMPLE_IGOT_COURSES: iGOTCourse[] = [
  {
    id: 'igot-py-204',
    title: 'Python for Civil Servants & Statistical Officers',
    provider: 'iGOT Karmayogi / Department of Personnel & Training (DoPT)',
    competencyArea: 'Digital & Data Analytics',
    duration: '14 Hours',
    level: 'Intermediate',
    rating: 4.8,
    enrolledCount: 14200,
    synced: true,
    description: 'Government-focused Python training for civil servants handling departmental microdata and policy reporting.'
  },
  {
    id: 'igot-stat-101',
    title: 'Core Statistical Techniques for Public Administration',
    provider: 'National Academy of Statistical Administration (NASA)',
    competencyArea: 'Statistical Governance',
    duration: '10 Hours',
    level: 'Basic',
    rating: 4.9,
    enrolledCount: 28900,
    synced: true,
    description: 'Foundations of probability, sampling surveys, and official indicator interpretation for Indian ministries.'
  },
  {
    id: 'igot-da-305',
    title: 'Advanced Data Cleansing and Microdata Governance',
    provider: 'iGOT Karmayogi / MoSPI',
    competencyArea: 'Data Science & Audit',
    duration: '12 Hours',
    level: 'Intermediate',
    rating: 4.7,
    enrolledCount: 9400,
    synced: true,
    description: 'Standard operating procedures for managing national survey files, ensuring data privacy, and auditing outliers.'
  },
  {
    id: 'igot-capi-108',
    title: 'CAPI Applications & Digital Field Survey Auditing',
    provider: 'Field Operations Division (FOD) / MoSPI',
    competencyArea: 'Field Operations',
    duration: '11 Hours',
    level: 'Intermediate',
    rating: 4.6,
    enrolledCount: 8200,
    synced: true,
    description: 'Practical training on Android-based CAPI tools, paradata auditing, and geolocation verification protocols.'
  },
  {
    id: 'igot-sqc-401',
    title: 'Total Quality Management & UN NQAF Framework',
    provider: 'Quality Assurance Wing / MoSPI',
    competencyArea: 'Governance & Quality',
    duration: '9 Hours',
    level: 'Advanced',
    rating: 4.8,
    enrolledCount: 5100,
    synced: true,
    description: 'Implementing the United Nations National Quality Assurance Framework across India\'s decentralized statistical system.'
  }
];

export const SAMPLE_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-001',
    fileName: 'NSS_78th_Round_Survey_Manual.pdf',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    uploadDate: '2026-03-01',
    extractedText: `NATIONAL SAMPLE SURVEY - 78th ROUND: INSTRUCTIONS FOR FIELD STAFF (SCHEDULE 0.0 & 21.1).
CHAPTER 1: CONCEPTS AND DEFINITIONS.
1.1 Household: A group of persons normally living together and taking food from a common kitchen constitutes a household.
1.2 Primary Sampling Unit (PSU): In rural sector, the 2011 Census villages constitute the primary sampling units. In urban sector, Urban Frame Survey (UFS) blocks constitute the PSUs.
1.3 Stratification: All rural areas within a district constitute rural stratum. Urban areas are stratified by population size.
1.4 Multipliers: In two-stage sampling, inverse probability of selection accounts for village size and household listing sampling fraction.`,
    chunksCount: 18,
    status: 'processed',
    summary: 'Comprehensive field instructions for NSS 78th Round household socio-economic enumeration, clarifying household definition, PSU criteria, stratification mechanics, and sampling multiplier calculation.',
    extractedConcepts: ['Household Definition', 'Primary Sampling Unit (PSU)', 'Urban Frame Survey (UFS)', 'Stratification', 'Sampling Multiplier', 'Sub-sample Weights'],
    courseId: 'course-stats'
  },
  {
    id: 'mat-002',
    fileName: 'CPI_Methodology_Technical_Handbook.docx',
    fileType: 'docx',
    fileSize: '1.8 MB',
    uploadDate: '2026-03-04',
    extractedText: `METHODOLOGY FOR COMPILATION OF CONSUMER PRICE INDEX (RURAL, URBAN & COMBINED) - BASE YEAR 2012=100.
The Consumer Price Index (CPI) measures the changes over time in the general level of prices of goods and services that a reference population acquires, uses or pays for.
Weighting Diagram: Derived from the Consumer Expenditure Survey (CES).
Index Formula: Laspeyres' base-weighted index number formula is utilized.
Price Collection: Data collected weekly for perishable items and monthly for non-perishable commodities from 1,181 village markets and 1,114 urban markets.`,
    chunksCount: 12,
    status: 'processed',
    summary: 'Technical guidance on Consumer Price Index basket weighting, Laspeyres index compilation methodology, price collection frequency, and missing quotation substitution.',
    extractedConcepts: ['Laspeyres Formula', 'Weighting Diagram', 'Consumer Expenditure Survey (CES)', 'Price Quotation Substitution', 'Core Inflation'],
    courseId: 'course-data-analysis'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Personalized Course Recommended',
    message: 'Based on your high skill gap in Python for Data Analysis, "Module 2: Pandas & Data Wrangling" is recommended.',
    time: '15 mins ago',
    read: false,
    type: 'course'
  },
  {
    id: 'notif-2',
    title: '7-Day Learning Streak Active! 🔥',
    message: 'Congratulations Arjun! You completed daily learning 7 days in a row. Bonus +100 XP awarded!',
    time: '2 hours ago',
    read: false,
    type: 'streak'
  },
  {
    id: 'notif-3',
    title: 'Badge Unlocked: Quiz Master 🎯',
    message: 'You scored 100% on the Probability & Sampling Fundamentals Quiz!',
    time: '1 day ago',
    read: true,
    type: 'badge'
  },
  {
    id: 'notif-4',
    title: 'Daily Challenge Available',
    message: 'Win today\'s Quiz Battle against the clock in Pragya Play to earn 150 bonus XP.',
    time: '1 day ago',
    read: true,
    type: 'challenge'
  },
  {
    id: 'notif-5',
    title: 'Competency Score Updated',
    message: 'Your competency in Survey Statistics & Sampling increased from Level 3 to Level 4 (+10%).',
    time: '3 days ago',
    read: true,
    type: 'competency'
  }
];

export const mockCompetencies = [
  {
    id: 'comp-1',
    domain: 'Programming & Data Science',
    name: 'Python for Data Analysis',
    currentScore: 2.0,
    benchmarkScore: 4.5,
    gap: 2.5,
    priority: 'High' as const,
    description: 'Requires training in Pandas data wrangling, NumPy vectorization, and automated CSV survey pipelines.',
    recommendedCourses: ['Python for Data Analysis (iGOT-204)'],
  },
  {
    id: 'comp-2',
    domain: 'Statistical Theory & Sampling',
    name: 'Survey Design & Sampling Multipliers',
    currentScore: 3.8,
    benchmarkScore: 4.8,
    gap: 1.0,
    priority: 'Medium' as const,
    description: 'Inverse probability weighting, Stratified two-stage sampling, and non-sampling error modeling.',
    recommendedCourses: ['NSS Survey Methodology Masterclass'],
  },
  {
    id: 'comp-3',
    domain: 'Data Science & Cleaning',
    name: 'Microdata Cleansing & Imputation',
    currentScore: 2.2,
    benchmarkScore: 4.0,
    gap: 1.8,
    priority: 'High' as const,
    description: 'Automated deduplication, cold-deck/hot-deck imputation, and boundary outlier audits.',
    recommendedCourses: ['Advanced Microdata Cleansing (iGOT-305)'],
  },
  {
    id: 'comp-4',
    domain: 'Field Operations & Auditing',
    name: 'CAPI Applications & Paradata Auditing',
    currentScore: 3.2,
    benchmarkScore: 4.5,
    gap: 1.3,
    priority: 'Medium' as const,
    description: 'Real-time telemetry, interview duration auditing, and GPS boundary verification.',
    recommendedCourses: ['CAPI Field Quality & Paradata Auditing'],
  },
  {
    id: 'comp-5',
    domain: 'Economic Statistics',
    name: 'National Accounts & Price Indices',
    currentScore: 3.0,
    benchmarkScore: 4.2,
    gap: 1.2,
    priority: 'Medium' as const,
    description: 'Laspeyres price aggregation, Consumer Expenditure Survey weighting diagrams, and GVA modeling.',
    recommendedCourses: ['Consumer Price Index & Inflation Metrics'],
  },
  {
    id: 'comp-6',
    domain: 'Data Visualization & Reporting',
    name: 'Statistical Dashboards & Reporting',
    currentScore: 1.5,
    benchmarkScore: 4.0,
    gap: 2.5,
    priority: 'High' as const,
    description: 'Interactive visual storytelling, policy briefs, and automated MoSPI dissemination bulletins.',
    recommendedCourses: ['Modern Data Storytelling for Official Statisticians'],
  },
];

// Unified aliases for application components
export const mockUser = INITIAL_LEARNER;
export const mockFacultyUser = INITIAL_TRAINER;
export const mockAdminUser = INITIAL_ADMIN;
export const mockCourses = SAMPLE_COURSES;
export const mockLearningMaterials = SAMPLE_MATERIALS;
export const mockQuizzes = SAMPLE_QUIZZES;
export const mockGames = SAMPLE_GAMES;
export const mockLeaderboard = SAMPLE_LEADERBOARD;
export const mockBadges = SAMPLE_BADGES;
export const mockIgotCourses = SAMPLE_IGOT_COURSES;
export const mockNotifications = INITIAL_NOTIFICATIONS;
