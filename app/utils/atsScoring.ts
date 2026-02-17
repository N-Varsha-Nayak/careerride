import { ResumeData } from '@/app/contexts/ResumeContext';

export interface ATSScore {
  score: number;
  suggestions: string[];
  details: {
    summaryScore: number;
    projectsScore: number;
    experienceScore: number;
    skillsScore: number;
    linksScore: number;
    metricsScore: number;
    educationScore: number;
  };
}

export function calculateATSScore(data: ResumeData): ATSScore {
  let score = 0;
  const suggestions: string[] = [];
  const details = {
    name: 0,
    email: 0,
    summaryLength: 0,
    experienceBullets: 0,
    education: 0,
    skillsCount: 0,
    projects: 0,
    phone: 0,
    linkedin: 0,
    github: 0,
    summaryVerbs: 0,
  } as any;

  // +10 if name provided
  if (data.personalInfo?.name && data.personalInfo.name.trim().length > 0) {
    score += 10;
    details.name = 10;
  } else {
    suggestions.push('Add your full name (+10 points)');
  }

  // +10 if email provided
  if (data.personalInfo?.email && data.personalInfo.email.trim().length > 0) {
    score += 10;
    details.email = 10;
  } else {
    suggestions.push('Add an email address (+10 points)');
  }

  // +10 if summary > 50 chars
  const summary = data.summary || '';
  if (summary.trim().length > 50) {
    score += 10;
    details.summaryLength = 10;
  } else {
    suggestions.push('Add a professional summary >50 characters (+10 points)');
  }

  // +10 if summary contains action verbs
  const actionVerbs = ['built', 'led', 'designed', 'improved', 'created', 'developed', 'launched', 'optimized', 'managed', 'increased', 'reduced', 'implemented'];
  const summaryLower = summary.toLowerCase();
  const hasActionVerb = actionVerbs.some((v) => summaryLower.includes(v));
  if (hasActionVerb) {
    score += 10;
    details.summaryVerbs = 10;
  } else {
    suggestions.push('Use action verbs in your summary (built, led, designed) (+10 points)');
  }

  // +15 if at least 1 experience entry with bullets
  const hasExperienceWithBullets = data.experience.some((exp) => {
    const desc = exp.description || '';
    return /\n|•|\-|\u2022/.test(desc);
  });
  if (hasExperienceWithBullets) {
    score += 15;
    details.experienceBullets = 15;
  } else if (data.experience.length > 0) {
    suggestions.push('Add bullet points in your experience descriptions (+15 points)');
  } else {
    suggestions.push('Add at least one work experience entry (+15 points)');
  }

  // +10 if at least 1 education entry
  if (data.education && data.education.length > 0) {
    score += 10;
    details.education = 10;
  } else {
    suggestions.push('Add education details (+10 points)');
  }

  // +10 if at least 5 skills added
  const totalSkills = (data.skills?.technical?.length || 0) + (data.skills?.soft?.length || 0) + (data.skills?.tools?.length || 0);
  if (totalSkills >= 5) {
    score += 10;
    details.skillsCount = 10;
  } else {
    suggestions.push(`Add more skills (need 5+, currently ${totalSkills}) (+10 points)`);
  }

  // +10 if at least 1 project added
  if (data.projects && data.projects.length > 0) {
    score += 10;
    details.projects = 10;
  } else {
    suggestions.push('Add a project to showcase your work (+10 points)');
  }

  // +5 if phone provided
  if (data.personalInfo?.phone && data.personalInfo.phone.trim().length > 0) {
    score += 5;
    details.phone = 5;
  } else {
    suggestions.push('Add a phone number (+5 points)');
  }

  // +5 if LinkedIn provided
  if (data.links?.linkedin && data.links.linkedin.trim().length > 0) {
    score += 5;
    details.linkedin = 5;
  }

  // +5 if GitHub provided
  if (data.links?.github && data.links.github.trim().length > 0) {
    score += 5;
    details.github = 5;
  }

  // Cap at 100
  score = Math.max(0, Math.min(100, score));

  // Provide unique suggestions
  const uniqueSuggestions = Array.from(new Set(suggestions));
  return {
    score,
    suggestions: uniqueSuggestions,
    details,
  };
}
