import { ResumeData } from '@/app/contexts/ResumeContext';

export interface ImprovementSuggestion {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export function generateImprovementSuggestions(data: ResumeData): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = [];

  // 1. Check for projects
  if (data.projects.length < 2) {
    suggestions.push({
      title: 'Add More Projects',
      description: `You have ${data.projects.length} project(s). Target 2+ to showcase real work.`,
      priority: 'high',
    });
  }

  // 2. Check for numeric indicators
  let hasNumbers = false;
  const metricsRegex = /(\d+%)|(\d+[kK])|(\d+\+)|(\d+→\d+)|(\d+x)/i;

  if (data.experience.some((exp) => metricsRegex.test(exp.description))) {
    hasNumbers = true;
  }
  if (data.projects.some((proj) => metricsRegex.test(proj.description))) {
    hasNumbers = true;
  }

  if (!hasNumbers) {
    suggestions.push({
      title: 'Add Measurable Impact',
      description: 'Include numbers, percentages, or metrics (e.g., "40% improvement", "5k users").',
      priority: 'high',
    });
  }

  // 3. Check summary length
  const summaryWordCount = data.summary.trim().split(/\s+/).length;
  if (data.summary && summaryWordCount < 40) {
    suggestions.push({
      title: 'Expand Summary',
      description: `Your summary is ${summaryWordCount} words. Aim for 40–120 words to stand out.`,
      priority: 'medium',
    });
  }

  // 4. Check skills count
  const skillsList = [
    ...data.skills.technical,
    ...data.skills.soft,
    ...data.skills.tools,
  ].filter((s) => s.length > 0);
  if (skillsList.length < 8) {
    suggestions.push({
      title: 'Expand Skills List',
      description: `You have ${skillsList.length} skills. Add more to reach 8+ for better ATS compatibility.`,
      priority: 'medium',
    });
  }

  // 5. Check for experience
  if (data.experience.length === 0) {
    suggestions.push({
      title: 'Add Work Experience',
      description: 'Include internships, freelance work, or contract positions if no full-time roles.',
      priority: 'high',
    });
  }

  // Return top 3 suggestions
  return suggestions.slice(0, 3);
}

// Helper to check if bullet starts with action verb
export function startsWithActionVerb(bullet: string): boolean {
  const actionVerbs = [
    'built',
    'developed',
    'designed',
    'implemented',
    'led',
    'improved',
    'created',
    'optimized',
    'automated',
    'managed',
    'achieved',
    'delivered',
    'enhanced',
    'launched',
    'mentored',
    'spearheaded',
    'transformed',
    'scaled',
    'architected',
    'coordinated',
    'collaborated',
    'established',
    'executed',
    'reduced',
    'increased',
  ];

  const firstWord = bullet.trim().split(/\s+/)[0].toLowerCase();
  return actionVerbs.some((verb) => firstWord.startsWith(verb.substring(0, 4)));
}

// Helper to check if bullet has numeric indicator
export function hasNumericIndicator(bullet: string): boolean {
  const metricsRegex = /(\d+%)|(\d+[kK])|(\d+\+)|(\d+→\d+)|(\d+x)/i;
  return metricsRegex.test(bullet);
}
