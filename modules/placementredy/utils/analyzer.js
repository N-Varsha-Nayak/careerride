// Lightweight heuristic analyzer for JD text

const CATEGORIES = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
  other: [],
};

function normalize(text = '') {
  return text.replace(/[\W_]+/g, ' ').toLowerCase();
}

export function extractSkills(jdText = '') {
  const normalized = normalize(jdText);
  const result = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: [],
  };

  Object.keys(CATEGORIES).forEach((cat) => {
    // skip 'other' since it's default bucket
    if (cat === 'other') return;
    CATEGORIES[cat].forEach((kw) => {
      const token = kw.toLowerCase().replace(/[^a-z0-9]+/gi, ' ').trim();
      if (!token) return;
      const words = token.split(/\s+/);
      const found = words.some((w) => normalized.includes(w));
      if (found) result[cat].push(kw);
    });
  });

  const any = Object.keys(result).some((k) => (result[k] || []).length > 0);
  if (!any) {
    // default 'other' skills when nothing detected
    result.other = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];
  }

  return result;
}

function pickN(arr, n) {
  return arr.slice(0, n);
}

export function generateChecklist(skillsByCat) {
  const core = skillsByCat.coreCS || [];
  const stack = [].concat(skillsByCat.web || [], skillsByCat.languages || [], skillsByCat.data || [], skillsByCat.cloud || []);
  const emptyDetection = (Object.keys(skillsByCat).every(k => (skillsByCat[k] || []).length === 0) || (skillsByCat.other && skillsByCat.other.length > 0 && stack.length === 0 && core.length === 0));

  const rounds = [];

  rounds.push({ roundTitle: 'Round 1: Aptitude / Basics', items: [] });
  rounds.push({ roundTitle: 'Round 2: DSA & Core CS', items: [] });
  rounds.push({ roundTitle: 'Round 3: Technical & Projects', items: [] });
  rounds.push({ roundTitle: 'Round 4: HR / Behavioral', items: [] });

  rounds[0].items = [
    'Practice numerical and logical reasoning problems',
    'Brush up on basic math and time management',
    'Review core programming constructs (loops, arrays, strings)',
    'Solve 5 short coding puzzles under time limit',
  ];

  rounds[1].items = [
    'Revise arrays, strings, and linked lists',
    'Practice sorting and searching algorithms',
    'Work on medium DSA problems (recursion, DP)',
    'Review OOP design and common patterns',
  ];
  if (core.includes('OS')) rounds[1].items.push('Review process scheduling and memory management');
  if (core.includes('Networks')) rounds[1].items.push('Review TCP/IP basics and HTTP');

  const projectItems = ['Prepare 2-3 project talking points (architecture, challenges)', 'Align resume bullets with the stack mentioned in JD', 'Be ready to explain system trade-offs and design decisions', 'Review framework-specific concepts for your stack'];
  rounds[2].items = pickN(projectItems.concat(stack.map(s => `Revise ${s}`)), 6);

  rounds[3].items = ['Prepare STAR stories for behavioral questions', 'Have clear motivations and role expectations', 'Discuss strengths, weaknesses, and learnings', 'Prepare questions to ask the interviewer'];

  if (emptyDetection) {
    // If no concrete skills detected, adjust checklist to be soft-skills and basics focused
    rounds[0].items = ['Brush up on communication and mock interviews', 'Practice problem solving with simple tasks', 'Review basic coding syntax and run small programs'];
    rounds[1].items = ['Learn foundational algorithms and common patterns', 'Practice step-by-step problem breakdown'];
    rounds[2].items = ['Prepare project summaries and learning stories', 'Practice simple end-to-end demos'];
    rounds[3].items = ['Prepare behavioral stories and expectations'];
  }

  return rounds;
}

export function generatePlan(skillsByCat) {
  const core = skillsByCat.coreCS || [];
  const web = skillsByCat.web || [];
  const data = skillsByCat.data || [];
  const emptyDetection = (Object.keys(skillsByCat).every(k => (skillsByCat[k] || []).length === 0) || (skillsByCat.other && skillsByCat.other.length > 0 && web.length === 0 && core.length === 0));

  const plan7Days = [
    { day: 1, focus: 'Basics & Foundation', tasks: ['Math fundamentals', 'Syntax review', 'Simple problems'] },
    { day: 2, focus: 'Core CS', tasks: ['Data structures review', 'Complexity analysis'] },
    { day: 3, focus: 'DSA Intensive', tasks: ['Array/Strings problems', 'Binary search, two pointers'] },
    { day: 4, focus: 'DSA Intensive', tasks: ['Trees & Graphs practice', 'Greedy & DP'] },
    { day: 5, focus: 'Project & Resume', tasks: ['Align resume with JD', 'Prepare project talking points'] },
    { day: 6, focus: 'Mock Interviews', tasks: ['Simulate interview', 'Review feedback'] },
    { day: 7, focus: 'Revision', tasks: ['Revise weak areas', 'Plan next steps'] },
  ];

  if (web.length > 0) {
    plan7Days[4].tasks.unshift('Frontend concepts: React lifecycle & hooks');
  }
  if (data.length > 0) {
    plan7Days[3].tasks.push('Practice SQL queries and joins');
  }

  if (emptyDetection) {
    plan7Days[0].tasks = ['Brush up on communication and mock interviews', 'Practice problem solving with simple tasks'];
    plan7Days[1].tasks = ['Learn foundational algorithms and common patterns'];
    plan7Days[2].tasks = ['Practice simple coding problems and walkthroughs'];
    plan7Days[4].tasks = ['Prepare project summaries and learnings'];
  }

  return plan7Days;
}

export function generateQuestions(skillsByCat) {
  const questions = [];
  const add = (q) => { if (questions.length < 10) questions.push(q); };

  // Core
  if ((skillsByCat.core || []).includes('DSA')) add('How would you optimize search in sorted data?');
  if ((skillsByCat.core || []).includes('OOP')) add('Explain SOLID principles and give examples.');

  // Languages
  if ((skillsByCat.languages || []).includes('Java')) add('Explain the Java memory model and garbage collection basics.');
  if ((skillsByCat.languages || []).includes('Python')) add('What are Python list comprehensions and when to use them?');

  // Web
  if ((skillsByCat.web || []).includes('React')) add('Explain state management options in React and trade-offs.');
  if ((skillsByCat.web || []).includes('Node.js')) add('How do you handle concurrency in Node.js?');

  // Data
  if ((skillsByCat.data || []).includes('SQL')) add('Explain indexing and when it helps.');
  if ((skillsByCat.data || []).includes('MongoDB')) add('Describe differences between SQL and NoSQL databases.');

  // Cloud
  if ((skillsByCat.cloud || []).includes('Docker')) add('How would you containerize an application and manage configuration?');
  if ((skillsByCat.cloud || []).includes('AWS')) add('Which AWS services would you use for a scalable web application?');

  // Testing
  if ((skillsByCat.testing || []).includes('Selenium')) add('How do you design end-to-end tests for a web application?');

  // Fill up generic questions if under 10
  const generic = [
    'Describe a challenging bug you fixed and how you approached it.',
    'How do you prioritize tasks under tight deadlines?',
    'Explain a system you designed and the trade-offs you made.',
  ];
  generic.forEach((g) => add(g));

  // ensure length 10
  while (questions.length < 10) questions.push('Prepare to discuss your projects and technical decisions.');

  return questions.slice(0, 10);
}

export function computeReadiness(skillsByCat, company = '', role = '', jdText = '') {
  let score = 35;
  const categoriesPresent = Object.keys(CATEGORIES).filter(cat => (skillsByCat[cat] || []).length > 0).length;
  score += Math.min(categoriesPresent * 5, 30);
  if (company && company.trim().length > 0) score += 10;
  if (role && role.trim().length > 0) score += 10;
  if ((jdText || '').length > 800) score += 10;
  return Math.min(score, 100);
}

const KNOWN_ENTERPRISES = ['amazon', 'google', 'microsoft', 'facebook', 'meta', 'apple', 'ibm', 'infosys', 'tcs', 'wipro', 'accenture', 'cognizant', 'deloitte'];

export function generateCompanyIntel(companyName = '') {
  const name = (companyName || '').trim();
  const lname = name.toLowerCase();
  let industry = 'Technology Services';
  // simple keyword industry guess
  if (lname.includes('bank') || lname.includes('finance') || lname.includes('capital')) industry = 'Financial Services';
  else if (lname.includes('health') || lname.includes('clinic') || lname.includes('hospital')) industry = 'Healthcare';
  else if (lname.includes('edu') || lname.includes('univ') || lname.includes('academy')) industry = 'Education';

  // size heuristic
  let sizeCategory = 'Startup';
  const isEnterprise = KNOWN_ENTERPRISES.some(k => lname.includes(k));
  if (isEnterprise) sizeCategory = 'Enterprise';
  else if (lname.includes('solutions') || lname.includes('systems')) sizeCategory = 'Mid-size';

  // typical hiring focus
  const typicalHiringFocus = sizeCategory === 'Enterprise'
    ? 'Structured DSA + core fundamentals focus, standardized assessment processes.'
    : 'Practical problem solving and hands-on stack depth; expect broader responsibilities.';

  return { name, industry, sizeCategory, typicalHiringFocus, demoNote: 'Demo Mode: Company intel generated heuristically.' };
}

export function generateRoundMapping(skillsByCat, companyIntel) {
  const rounds = [];
  const hasDSA = (skillsByCat.coreCS || []).includes('DSA');
  const hasWeb = (skillsByCat.web || []).length > 0;
  const hasData = (skillsByCat.data || []).length > 0;

  function pushRound(title, focusAreas, why) {
    rounds.push({ roundTitle: title, focusAreas: Array.isArray(focusAreas) ? focusAreas : [focusAreas], whyItMatters: why });
  }

  if (!companyIntel || companyIntel.sizeCategory === 'Enterprise') {
    if (hasDSA) {
      pushRound('Round 1: Online Test', ['DSA', 'Aptitude'], 'Filters candidates at scale for core algorithmic ability.');
      pushRound('Round 2: Technical Interview', ['DSA', 'Core CS'], 'Deep assessment of algorithmic thinking and system fundamentals.');
      pushRound('Round 3: System / Project Interview', ['Architecture', 'Stack'], 'Evaluate system design and practical experience.');
      pushRound('Round 4: HR / Managerial', ['Behavioral'], 'Assess fit and communication.');
    } else if (hasWeb) {
      pushRound('Round 1: Coding Assignment', ['Practical coding'], 'Validate implementation skills and code quality.');
      pushRound('Round 2: Technical Interview', ['Core CS', 'Stack'], 'Assess depth in relevant technologies.');
      pushRound('Round 3: System + Integration', ['APIs', 'Systems'], 'Understand production-readiness and trade-offs.');
      pushRound('Round 4: HR', ['Behavioral'], 'Cultural fit and role expectations.');
    } else {
      pushRound('Round 1: Screening', ['Aptitude'], 'General screening for baseline skills.');
      pushRound('Round 2: Technical', ['Core CS'], 'Assess fundamentals relevant to the role.');
      pushRound('Round 3: HR', ['Behavioral'], 'Check alignment and communication.');
    }
  } else {
    if (hasWeb) {
      pushRound('Round 1: Practical Coding', ['Build feature', 'Small tasks'], 'Tests practical problem solving and speed.');
      pushRound('Round 2: System Discussion', ['Design', 'Trade-offs'], 'Assesses architectural thinking and ownership.');
      pushRound('Round 3: Culture Fit', ['Team', 'Product'], 'Evaluate adaptability and product sense.');
    } else if (hasDSA) {
      pushRound('Round 1: Coding Challenge', ['DSA'], 'Quick check for algorithmic ability.');
      pushRound('Round 2: Technical + Projects', ['Core CS', 'Projects'], 'Assess real-world application and problem solving.');
      pushRound('Round 3: HR', ['Behavioral'], 'Discuss fit and expectations.');
    } else {
      pushRound('Round 1: Practical Screening', ['Aptitude', 'Basics'], 'Baseline evaluation for quick hiring cycles.');
      pushRound('Round 2: Technical', ['Role-specific skills'], 'Ensure candidate can execute on required tasks.');
      pushRound('Round 3: HR', ['Behavioral'], 'Confirm fit.');
    }
  }

  return rounds;
}

// LocalStorage helpers
const STORAGE_KEY = 'placement_history_v1';

export function saveHistory(entry) {
  const { list } = loadHistorySafe();
  const ensured = ensureEntrySchema(entry, true);
  list.unshift(ensured);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getHistory() {
  return loadHistorySafe().list;
}

export function getHistoryItem(id) {
  const list = getHistory();
  return list.find((i) => i.id === id) || null;
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
}

export function updateHistoryEntry(updated) {
  const { list, skipped } = loadHistorySafe();
  const idx = list.findIndex((i) => i.id === updated.id);
  if (idx === -1) return false;
  const ensured = ensureEntrySchema(updated, false);
  // preserve baseScore if present; ensure finalScore reflects skillConfidenceMap
  const base = ensured.baseScore || 0;
  const map = ensured.skillConfidenceMap || {};
  let adj = 0;
  Object.keys(map).forEach((skill) => {
    if (map[skill] === 'know') adj += 2;
    else if (map[skill] === 'practice') adj -= 2;
  });
  ensured.finalScore = Math.max(0, Math.min(100, base + adj));
  ensured.updatedAt = new Date().toISOString();
  list[idx] = ensured;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
}

export function loadHistorySafe() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { list: [], skipped: 0 };
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { list: [], skipped: 1 };
    const list = [];
    let skipped = 0;
    parsed.forEach((item) => {
      if (!item || typeof item !== 'object' || !item.id) { skipped += 1; return; }
      try {
        const ensured = ensureEntrySchema(item, false);
        list.push(ensured);
      } catch (e) {
        skipped += 1;
      }
    });
    return { list, skipped };
  } catch (e) {
    // corrupted JSON - clear storage to avoid repeated errors
    localStorage.removeItem(STORAGE_KEY);
    return { list: [], skipped: 1 };
  }
}

function ensureEntrySchema(entry = {}, isNew = false) {
  const now = new Date().toISOString();
  const e = Object.assign({}, entry);
  e.id = e.id || makeId();
  e.createdAt = e.createdAt || now;
  e.company = typeof e.company === 'string' ? e.company : '';
  e.role = typeof e.role === 'string' ? e.role : '';
  e.jdText = typeof e.jdText === 'string' ? e.jdText : '';
  e.extractedSkills = e.extractedSkills && typeof e.extractedSkills === 'object' ? e.extractedSkills : { coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [] };
  // normalize extractedSkills keys
  e.extractedSkills.coreCS = e.extractedSkills.coreCS || e.extractedSkills.core || [];
  e.extractedSkills.languages = e.extractedSkills.languages || [];
  e.extractedSkills.web = e.extractedSkills.web || [];
  e.extractedSkills.data = e.extractedSkills.data || [];
  e.extractedSkills.cloud = e.extractedSkills.cloud || [];
  e.extractedSkills.testing = e.extractedSkills.testing || [];
  e.extractedSkills.other = e.extractedSkills.other || [];

  e.roundMapping = Array.isArray(e.roundMapping) ? e.roundMapping.map(r => ({ roundTitle: r.roundTitle || r.name || '', focusAreas: r.focusAreas || (r.focus ? [r.focus] : []), whyItMatters: r.whyItMatters || r.why || '' })) : [];
  e.checklist = Array.isArray(e.checklist) ? e.checklist.map(c => ({ roundTitle: c.roundTitle || c.name || '', items: c.items || [] })) : [];
  e.plan7Days = Array.isArray(e.plan7Days) ? e.plan7Days.map(p => ({ day: p.day || 0, focus: p.focus || p.title || '', tasks: p.tasks || p.tasks || [] })) : [];
  // backward compatibility: if plan exists as 'plan', map it
  if ((!e.plan7Days || e.plan7Days.length === 0) && Array.isArray(e.plan)) {
    e.plan7Days = e.plan.map(p => ({ day: p.day || 0, focus: p.title || '', tasks: p.tasks || [] }));
  }
  e.questions = Array.isArray(e.questions) ? e.questions : (Array.isArray(e.questions) ? e.questions : []);
  e.baseScore = typeof e.baseScore === 'number' ? e.baseScore : (typeof e.readinessScore === 'number' ? e.readinessScore : computeReadiness(e.extractedSkills || {}, e.company || '', e.role || '', e.jdText || ''));
  e.skillConfidenceMap = e.skillConfidenceMap && typeof e.skillConfidenceMap === 'object' ? e.skillConfidenceMap : {};
  const mapKeys = Object.keys(e.skillConfidenceMap || {});
  if (mapKeys.length === 0) {
    // initialize from skills
    const all = Object.values(e.extractedSkills || {}).flat();
    all.forEach(s => { e.skillConfidenceMap[s] = 'practice'; });
  }
  // finalScore is baseScore adjusted by skillConfidenceMap
  let adj = 0;
  Object.keys(e.skillConfidenceMap).forEach((skill) => {
    if (e.skillConfidenceMap[skill] === 'know') adj += 2;
    else if (e.skillConfidenceMap[skill] === 'practice') adj -= 2;
  });
  e.finalScore = typeof e.finalScore === 'number' ? e.finalScore : Math.max(0, Math.min(100, e.baseScore + adj));
  e.updatedAt = e.updatedAt || (isNew ? now : e.updatedAt || e.createdAt);
  return e;
}
