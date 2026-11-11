/* ===========================================================================
 * CONTENT — every word rendered on the site lives here.
 * Nothing is invented: all facts mirror the source resume. Where a link or
 * asset does not exist yet the value is `null`, and the UI renders an honest
 * "not published yet" state rather than a fake URL.
 * =========================================================================== */

/* ---------------------------------- HERO --------------------------------- */

export const intro = {
  greeting: "Hello, I'm Pooja Jaiswal",
  headline: 'Building Intelligent Solutions Through Data & AI.',
  subtitle: 'Data Scientist | AI/ML Engineer | Generative AI | Agentic AI',
  heroDescription:
    'I build intelligent systems that turn messy data into decisions — machine learning models, LLM and RAG applications, agentic workflows, and AI-driven security monitoring that holds up in the real world.',
  stats: [
    { value: '1 yr', label: 'Professional experience' },
    { value: '9', label: 'AI / ML projects built' },
    { value: '25%', label: 'Detection accuracy gain' },
  ],
} as const;

/* --------------------------------- ABOUT --------------------------------- */

export const about = {
  lead:
    'I am a Data Science and AI/ML professional who enjoys building intelligent, data-driven systems that solve real problems — not demos that only work on clean data.',
  paragraphs: [
    'My work spans machine learning and predictive analytics, Generative AI and LLM applications, Agentic AI workflows, and cybersecurity-focused research and development. Most recently I led AI and cybersecurity R&D at C9Lab, where I built anomaly detection and risk-scoring models, secure data pipelines, and the dashboards that made their output usable by analysts.',
    'I like the full path from question to decision: understand the problem, validate the data, model it honestly, then ship something a non-technical stakeholder can act on. From RAG-powered retrieval systems and multi-agent workflows to intrusion detection and intelligent monitoring, I aim for solutions that are practical, scalable, and measurably better than the manual process they replace.',
    'I am continuously exploring emerging AI technologies — agentic architectures, context engineering, and retrieval systems in particular — and I am looking forward to contributing to innovative AI-driven products and research initiatives.',
  ],
  approach: [
    {
      title: 'Start with the data, not the model',
      body: 'Validate accuracy and quality first — EDA and clean inputs decide whether anything downstream can be trusted.',
    },
    {
      title: 'Measure, then claim',
      body: 'Models earn their place through evaluation. Precision, recall, and the cost of a false positive matter more than a headline score.',
    },
    {
      title: 'Build for the person using it',
      body: 'A pipeline is only finished when its output reaches an analyst or stakeholder in a form they can act on.',
    },
    {
      title: 'Keep learning by building',
      body: 'I pick up new AI tooling hands-on — each project deliberately adds one unfamiliar technology.',
    },
  ],
  focusAreas: [
    {
      title: 'Data Science & Analytics',
      body: 'EDA, data quality validation, statistical analysis, and BI reporting that drives decisions.',
      icon: 'BarChart3',
    },
    {
      title: 'Machine Learning Engineering',
      body: 'Supervised models, feature engineering, evaluation, and deployment-ready ML pipelines.',
      icon: 'Brain',
    },
    {
      title: 'Generative AI & LLMs',
      body: 'Prompt and context engineering, fine-tuning, and LLM-powered product features.',
      icon: 'Sparkles',
    },
    {
      title: 'Agentic AI & Multi-Agent Systems',
      body: 'Task orchestration, tool calling, and coordinated agents that complete multi-step work.',
      icon: 'Network',
    },
    {
      title: 'RAG & Semantic Search',
      body: 'Embeddings, vector databases, and retrieval pipelines that ground models in real knowledge.',
      icon: 'Search',
    },
    {
      title: 'AI for Cybersecurity',
      body: 'Anomaly detection, risk scoring, intrusion detection, and threat intelligence automation.',
      icon: 'ShieldCheck',
    },
  ],
  profileCard: {
    designation: 'Data Scientist | AI/ML Engineer',
    rows: [
      { label: 'Location', value: 'Indore, Madhya Pradesh, India', icon: 'MapPin' },
      { label: 'Education', value: 'MCA (pursuing) · University of Mysore', icon: 'GraduationCap' },
      { label: 'Current focus', value: 'Generative AI, Agentic AI & RAG systems', icon: 'Sparkles' },
      { label: 'Experience', value: 'Data Scientist — C9Lab (Dec 2024 – Nov 2025)', icon: 'Briefcase' },
      { label: 'Availability', value: 'Remote & onsite opportunities', icon: 'Globe' },
    ],
  },
  /** Compact animated timeline rendered under the profile card. */
  journey: [
    { year: '2023', label: 'BCA completed', detail: 'Prestige College · CGPA 8.15' },
    { year: '2024', label: 'Data Science Intern', detail: 'RPS Business Solutions' },
    { year: '2024–25', label: 'Data Scientist', detail: 'C9Lab — AI & Cybersecurity R&D' },
    { year: 'Now', label: 'MCA + Agentic AI', detail: 'University of Mysore · multi-agent systems' },
  ],
} as const;

/* --------------------------------- SKILLS -------------------------------- */

export type SkillTrack = 'ai' | 'data' | 'engineering';

export type SkillGroup = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: string[];
  tracks: SkillTrack[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    icon: 'Code2',
    blurb: 'Core languages I use daily for analysis, modelling, and services.',
    skills: ['Python', 'SQL'],
    tracks: ['ai', 'data', 'engineering'],
  },
  {
    id: 'ml',
    title: 'Machine Learning & Deep Learning',
    icon: 'Brain',
    blurb: 'Classical ML through to neural networks, with evaluation discipline.',
    skills: ['Scikit-learn', 'XGBoost', 'Random Forest', 'PyTorch', 'TensorFlow', 'Model Evaluation'],
    tracks: ['ai', 'data'],
  },
  {
    id: 'genai',
    title: 'Generative AI & LLM Engineering',
    icon: 'Sparkles',
    blurb: 'Designing, steering, and adapting large language models.',
    skills: [
      'Generative AI',
      'LLMs',
      'Prompt Engineering',
      'Context Engineering',
      'LLM Fine-Tuning',
      'Agentic AI',
      'Multi-Agent AI',
    ],
    tracks: ['ai'],
  },
  {
    id: 'rag',
    title: 'RAG & Search Technologies',
    icon: 'Search',
    blurb: 'Grounding models in real knowledge with retrieval pipelines.',
    skills: [
      'Retrieval-Augmented Generation',
      'Embeddings',
      'Vector Databases',
      'Semantic Search',
      'LangChain',
    ],
    tracks: ['ai'],
  },
  {
    id: 'mlops',
    title: 'AI Engineering & MLOps',
    icon: 'Container',
    blurb: 'Taking models from notebook to monitored, deployed service.',
    skills: [
      'Docker',
      'Kubernetes',
      'REST APIs',
      'Git',
      'Model Deployment',
      'ML Pipelines',
      'AI Monitoring',
    ],
    tracks: ['engineering'],
  },
  {
    id: 'cloud',
    title: 'Cloud AI',
    icon: 'Cloud',
    blurb: 'Managed platforms for training and serving models.',
    skills: ['Google Cloud Vertex AI', 'Azure Machine Learning'],
    tracks: ['engineering'],
  },
  {
    id: 'data',
    title: 'Data Engineering & Databases',
    icon: 'Database',
    blurb: 'Moving, shaping, and storing the data that models depend on.',
    skills: ['Pandas', 'NumPy', 'Excel', 'PostgreSQL', 'MongoDB', 'Snowflake'],
    tracks: ['data', 'engineering'],
  },
  {
    id: 'bi',
    title: 'Business Intelligence',
    icon: 'BarChart3',
    blurb: 'Turning model output into dashboards stakeholders actually use.',
    skills: ['Power BI', 'Tableau'],
    tracks: ['data'],
  },
  {
    id: 'domains',
    title: 'AI Application Domains',
    icon: 'Radar',
    blurb: 'Problem spaces I have shipped working solutions in.',
    skills: ['NLP', 'Computer Vision', 'Anomaly Detection', 'Threat Intelligence'],
    tracks: ['ai', 'data'],
  },
];

export const skillTracks = [
  { id: 'all', label: 'All skills' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'data', label: 'Data & Analytics' },
  { id: 'engineering', label: 'Engineering & Cloud' },
] as const;

/* ------------------------------- EXPERIENCE ------------------------------ */

export type Experience = {
  role: string;
  company: string;
  companyNote?: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  /** Single measurable outcome, exactly as stated in the resume. */
  metric?: { value: string; label: string };
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: 'Data Scientist',
    company: 'C9Lab',
    companyNote: 'Pinak Infosec Pvt. Ltd.',
    period: 'December 2024 – November 2025',
    type: 'Full-time',
    summary:
      'Led AI and cybersecurity R&D, owning the path from raw security data to deployed detection models and analyst-facing dashboards.',
    highlights: [
      'Validated data accuracy and maintained data quality before analysis and dashboard reporting.',
      'Led AI and cybersecurity R&D projects focused on threat detection and intelligence automation.',
      'Performed exploratory data analysis, data cleaning, and ML model development for anomaly detection and risk scoring.',
      'Built secure data pipelines using Python, SQL, and Snowflake, integrated with Power BI dashboards.',
      'Developed AI-driven decision systems, improving detection accuracy by 25%.',
    ],
    metric: { value: '25%', label: 'Improvement in detection accuracy' },
    stack: [
      'Python',
      'SQL',
      'Snowflake',
      'Power BI',
      'Scikit-learn',
      'Anomaly Detection',
      'Threat Intelligence',
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'RPS Business Solutions',
    period: 'April 2024 – August 2024',
    type: 'Internship',
    summary:
      'Worked across the analytics stack — from cleaning structured datasets to shipping NLP models and dashboards that produced client insights.',
    highlights: [
      'Collected, cleaned, and analyzed structured datasets using Excel, SQL, and Python.',
      'Developed NLP models and analytical dashboards for generating client insights.',
      'Collaborated on machine learning workflows for text classification and business analytics.',
      'Contributed to improving data-driven decision accuracy by 20% through automation and visualization.',
    ],
    metric: { value: '20%', label: 'Improvement in decision accuracy' },
    stack: ['Python', 'SQL', 'Excel', 'NLP', 'Text Classification', 'Dashboards'],
  },
];

/* -------------------------------- PROJECTS ------------------------------- */

export type ProjectCategory = 'genai' | 'cv' | 'security' | 'ml';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Drives the generated technical illustration. */
  visual: 'interview' | 'agents' | 'face' | 'traffic' | 'ids';
  status?: 'In Development';
  tagline: string;
  problem: string;
  solution: string;
  /** Rendered as an architecture / workflow strip. */
  architecture: string[];
  features: string[];
  stack: string[];
  /** null = not published yet. The UI shows a disabled, honest state. */
  github: string | null;
  demo: string | null;
};

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'genai', label: 'Generative & Agentic AI' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'security', label: 'AI for Cybersecurity' },
  { id: 'ml', label: 'Machine Learning' },
] as const;

export const projects: Project[] = [
  {
    id: 'ai-mock-interview',
    title: 'AI Mock Interview Platform',
    category: 'genai',
    visual: 'interview',
    tagline: 'Role-specific interview practice with AI-generated questions and scored feedback.',
    problem:
      'Interview preparation is generic. Candidates rehearse against static question banks that ignore the role they are applying for, and they get no structured feedback on how their answers actually sound.',
    solution:
      'An AI-powered preparation platform that generates role-specific questions with Google Gemini, captures spoken answers through speech-to-text, and returns AI-evaluated feedback and scoring — with every session stored so progress stays reviewable.',
    architecture: [
      'Role & experience input',
      'Gemini question generation',
      'Speech-to-text capture',
      'AI evaluation & scoring',
      'Session history in PostgreSQL',
    ],
    features: [
      'Role-based interview question generation',
      'Google Gemini AI integration',
      'Speech-to-text answer capture',
      'AI-powered feedback and response scoring',
      'Secure user data and interview history management',
    ],
    stack: ['Next.js', 'React', 'Google Gemini AI', 'PostgreSQL', 'Drizzle ORM'],
    github: null,
    demo: null,
  },
  {
    id: 'multi-agent-system',
    title: 'Multi-Agent AI / Agentic AI System',
    category: 'genai',
    visual: 'agents',
    status: 'In Development',
    tagline: 'Specialised agents that plan, call tools, and coordinate to finish multi-step tasks.',
    problem:
      'A single LLM call struggles with work that needs planning, external tools, and several rounds of reasoning. State gets lost and the model has no way to delegate.',
    solution:
      'An in-progress agentic system built around specialised agents, an orchestration layer that routes tasks, shared context management, and tool calling — so multi-step problems get decomposed and solved collaboratively rather than in one shot.',
    architecture: [
      'Task intake & decomposition',
      'Orchestrator routing',
      'Specialised agents',
      'Tool calling',
      'Shared context & memory',
      'Result synthesis',
    ],
    features: [
      'Multi-agent orchestration',
      'Context management across agent turns',
      'LLM-based decision-making',
      'Tool integration',
      'Intelligent workflow automation',
    ],
    stack: ['Python', 'LLMs', 'Agentic AI', 'Tool Calling', 'Context Engineering'],
    github: null,
    demo: null,
  },
  {
    id: 'face-detection-protection',
    title: 'AI-Based Face Detection & Data Protection System',
    category: 'cv',
    visual: 'face',
    tagline: 'Computer vision that spots an unauthorised viewer and protects the screen instantly.',
    problem:
      'Sensitive information stays exposed whenever someone other than the authorised user is in front of the machine — and conventional screen locks react to idle time, not to who is actually watching.',
    solution:
      'A computer vision monitoring system that performs real-time face detection and recognition with a CNN model, flags unrecognised faces as unauthorised, and triggers automatic screen protection while handling records through a secure backend.',
    architecture: [
      'Camera stream capture',
      'Face detection (OpenCV)',
      'CNN recognition',
      'Authorised / unauthorised decision',
      'Automatic screen protection',
      'Secure logging to MongoDB',
    ],
    features: [
      'Real-time face detection and recognition',
      'Unauthorized user identification',
      'Automatic screen protection',
      'Secure backend data handling',
      'AI-powered monitoring',
    ],
    stack: ['Python', 'OpenCV', 'CNN', 'Node.js', 'MongoDB'],
    github: null,
    demo: null,
  },
  {
    id: 'traffic-monitoring',
    title: 'Real-Time Traffic Monitoring System',
    category: 'cv',
    visual: 'traffic',
    tagline: 'YOLOv8 detection and SORT tracking turned into a live traffic dashboard.',
    problem:
      'Traffic insight usually arrives after the fact. Counting and classifying vehicles by hand does not scale, and raw camera feeds offer no usable view of what is happening on the road right now.',
    solution:
      'An AI traffic monitoring solution that detects vehicles with YOLOv8, maintains identity across frames using SORT multi-object tracking, and streams the resulting counts and movement patterns into an interactive Streamlit and Plotly dashboard.',
    architecture: [
      'Video feed ingestion',
      'YOLOv8 vehicle detection',
      'SORT multi-object tracking',
      'Count & flow aggregation',
      'Streamlit + Plotly visualisation',
    ],
    features: [
      'Vehicle detection using YOLOv8',
      'Multi-object tracking using SORT',
      'Real-time traffic monitoring',
      'Interactive visualization using Streamlit and Plotly',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'YOLOv8', 'SORT', 'Streamlit'],
    github: null,
    demo: null,
  },
  {
    id: 'intrusion-detection',
    title: 'AI-Powered Intrusion Detection System',
    category: 'security',
    visual: 'ids',
    tagline: 'Network traffic classified into normal and threat activity with ensemble models.',
    problem:
      'Network telemetry is far too high-volume for manual review, and rule-based detection misses attack patterns it was never explicitly written for.',
    solution:
      'A machine learning intrusion detection pipeline: security datasets are explored and engineered into features, Random Forest and XGBoost classifiers separate abnormal activity from normal traffic, and detections surface on a dashboard analysts can read at a glance.',
    architecture: [
      'Security dataset ingestion',
      'EDA & feature engineering',
      'Random Forest / XGBoost classification',
      'Threat scoring',
      'Streamlit threat dashboard',
    ],
    features: [
      'Security dataset analysis',
      'Exploratory data analysis',
      'Abnormal activity detection',
      'Random Forest and XGBoost classification',
      'Threat visualization through dashboards',
    ],
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit'],
    github: null,
    demo: null,
  },
];

export type OtherProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  icon: string;
  summary: string;
  points: string[];
  stack: string[];
  github: string | null;
};

export const otherProjects: OtherProject[] = [
  {
    id: 'fraud-detection',
    title: 'Credit Card Fraud Detection',
    category: 'ml',
    icon: 'CreditCard',
    summary: 'Classifying fraudulent transactions from behavioural patterns in transaction data.',
    points: ['Transaction pattern analysis', 'Feature engineering and fraud classification'],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest'],
    github: null,
  },
  {
    id: 'spam-detection',
    title: 'Email / SMS Spam Detection',
    category: 'ml',
    icon: 'MailWarning',
    summary: 'A text classification pipeline that separates spam from legitimate messages.',
    points: ['TF-IDF based text classification', 'SVM model for spam detection'],
    stack: ['Python', 'Scikit-learn', 'NLP'],
    github: null,
  },
  {
    id: 'concentration-tracker',
    title: 'Real-Time Concentration Tracker',
    category: 'cv',
    icon: 'Eye',
    summary: 'Attention monitoring driven by facial landmarks and eye movement signals.',
    points: ['Facial landmark detection and eye movement tracking', 'Attention monitoring'],
    stack: ['Python', 'OpenCV', 'MediaPipe'],
    github: null,
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot for Real-Time Query Handling',
    category: 'genai',
    icon: 'MessagesSquare',
    summary: 'Conversational assistant that recognises intent and responds in real time.',
    points: ['Intent recognition and intelligent response generation'],
    stack: ['Python', 'Rasa', 'LangChain', 'REST API'],
    github: null,
  },
];

/* -------------------------------- RESEARCH ------------------------------- */

export const research = {
  title: 'Exploring the Future of AI Innovation',
  intro:
    'Alongside delivered work, these are the areas I actively read about, prototype in, and want to build my next role around. They are interests and ongoing exploration — not completed professional engagements.',
  cards: [
    {
      title: 'Generative AI & Agentic Systems',
      icon: 'Bot',
      accent: 'violet' as const,
      points: [
        'Multi-agent architecture',
        'Intelligent decision-making',
        'LLM orchestration',
        'Autonomous workflow automation',
      ],
    },
    {
      title: 'AI for Cybersecurity',
      icon: 'ShieldCheck',
      accent: 'cyan' as const,
      points: [
        'Threat detection',
        'Anomaly detection',
        'Threat intelligence automation',
        'Intelligent intrusion detection',
      ],
    },
    {
      title: 'RAG & Intelligent Knowledge Systems',
      icon: 'Library',
      accent: 'accent' as const,
      points: [
        'Retrieval-Augmented Generation',
        'Vector databases',
        'Semantic search',
        'Context-aware AI applications',
      ],
    },
  ],
} as const;

/* -------------------------------- EDUCATION ------------------------------ */

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'University of Mysore',
    period: 'Currently Pursuing',
    status: 'ongoing' as const,
    details: [] as string[],
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Prestige College',
    period: '2023',
    status: 'completed' as const,
    details: [
      'CGPA: 8.15',
      'University: Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal, Madhya Pradesh, India',
    ],
  },
];

/* ----------------------------- CERTIFICATIONS ---------------------------- */

export type Certification = {
  title: string;
  issuer: string;
  /** Add a verification URL when you have one; otherwise leave null. */
  credentialUrl: string | null;
};

export const certifications: Certification[] = [
  { title: 'Generative AI for Beginners', issuer: 'Great Learning', credentialUrl: 'https://drive.google.com/file/d/14ZUsnS2HosuRft6oFV3ox5ZtEeHeuBdA/view?usp=sharing' },
  { title: 'Neural Networks & Deep Learning', issuer: 'Great Learning', credentialUrl: 'https://drive.google.com/file/d/15f72qSqiADvJEIxMO-y37UG_1TRUoP7Q/view?usp=drive_link' },
  { title: 'Python for Data Science', issuer: 'Great Learning', credentialUrl: 'https://drive.google.com/file/d/1V2kPbvfRs36lGzoox3zM7SNZuPc4UmhL/view?usp=drive_link' },
  { title: 'Data Science and Analytics', issuer: 'Bignalytics IT Solutions', credentialUrl: 'https://drive.google.com/file/d/1zlpbHTD6u5biohvmzy0gLmLgnmjbuHWC/view?usp=drive_link' },
];

/* --------------------------------- CONTACT ------------------------------- */

export const contact = {
  headline: "Let's Build Something Intelligent Together.",
  description:
    "I'm open to opportunities, technical collaborations, AI research initiatives, and innovative projects. If you're building something impactful with AI, I'd love to connect.",
} as const;

/** Floating technology labels around the hero neural network. */
export const heroTechLabels = ['Python', 'LLMs', 'RAG', 'ML', 'AI Agents', 'SQL'] as const;
