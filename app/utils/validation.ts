import { ResumeData } from '@/app/contexts/ResumeContext';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  completeness: number; // 0-100
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (basic)
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate URL format
 */
export function validateURL(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate date format (YYYY-MM-DD or Month YYYY)
 */
export function validateDate(date: string): boolean {
  if (!date) return false;
  // Accept formats: YYYY-MM-DD, Month YYYY, or just YYYY
  const formats = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/, // Month YYYY
    /^\d{4}$/, // Just YYYY
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/, // Short month YYYY
  ];
  return formats.some(regex => regex.test(date));
}

/**
 * Check if text contains too many special characters (spam detection)
 */
function hasExcessiveSpecialChars(text: string): boolean {
  const specialCharCount = (text.match(/[^a-zA-Z0-9\s\.\,\-]/g) || []).length;
  const specialCharRatio = specialCharCount / text.length;
  return specialCharRatio > 0.3; // More than 30% special characters
}

/**
 * Check if text is likely spam or auto-generated gibberish
 */
function isLikelySpam(text: string): boolean {
  if (hasExcessiveSpecialChars(text)) return true;
  
  // Check for excessive repetition
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const repetitionRatio = 1 - (uniqueWords.size / words.length);
  if (repetitionRatio > 0.7) return true;

  // Check for minimum coherence
  const hasNumbers = /\d/.test(text);
  const hasLetters = /[a-zA-Z]/.test(text);
  return !hasLetters || (words.length < 3 && !hasNumbers);
}

/**
 * Validate personal info section
 */
export function validatePersonalInfo(info: ResumeData['personalInfo']): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!info.name || info.name.trim().length === 0) {
    errors.push({
      field: 'personalInfo.name',
      message: 'Name is required',
      severity: 'error',
    });
  } else if (info.name.length > 100) {
    errors.push({
      field: 'personalInfo.name',
      message: 'Name is too long (max 100 characters)',
      severity: 'error',
    });
  } else if (isLikelySpam(info.name)) {
    errors.push({
      field: 'personalInfo.name',
      message: 'Name appears to contain invalid characters',
      severity: 'warning',
    });
  }

  if (info.email && !validateEmail(info.email)) {
    errors.push({
      field: 'personalInfo.email',
      message: 'Invalid email format',
      severity: 'error',
    });
  }

  if (info.phone && !validatePhone(info.phone)) {
    errors.push({
      field: 'personalInfo.phone',
      message: 'Phone number should contain at least 10 digits',
      severity: 'warning',
    });
  }

  if (info.location && info.location.length > 100) {
    errors.push({
      field: 'personalInfo.location',
      message: 'Location is too long (max 100 characters)',
      severity: 'error',
    });
  }

  return errors;
}

/**
 * Validate summary section
 */
export function validateSummary(summary: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!summary) {
    return errors; // Summary is optional
  }

  if (summary.length < 40) {
    errors.push({
      field: 'summary',
      message: 'Summary is too short (recommend 40+ characters)',
      severity: 'warning',
    });
  }

  if (summary.length > 1000) {
    errors.push({
      field: 'summary',
      message: 'Summary is too long (max 1000 characters)',
      severity: 'error',
    });
  }

  if (isLikelySpam(summary)) {
    errors.push({
      field: 'summary',
      message: 'Summary appears to contain invalid content',
      severity: 'warning',
    });
  }

  return errors;
}

/**
 * Validate experience entries
 */
export function validateExperience(experience: ResumeData['experience']): ValidationError[] {
  const errors: ValidationError[] = [];

  experience.forEach((exp, index) => {
    const prefix = `experience[${index}]`;

    if (!exp.company.trim()) {
      errors.push({
        field: `${prefix}.company`,
        message: 'Company name is required',
        severity: 'error',
      });
    }

    if (!exp.position.trim()) {
      errors.push({
        field: `${prefix}.position`,
        message: 'Position title is required',
        severity: 'error',
      });
    }

    if (!exp.startDate) {
      errors.push({
        field: `${prefix}.startDate`,
        message: 'Start date is required',
        severity: 'error',
      });
    } else if (!validateDate(exp.startDate)) {
      errors.push({
        field: `${prefix}.startDate`,
        message: 'Invalid date format',
        severity: 'warning',
      });
    }

    if (exp.endDate && !validateDate(exp.endDate)) {
      errors.push({
        field: `${prefix}.endDate`,
        message: 'Invalid date format',
        severity: 'warning',
      });
    }

    if (exp.description && exp.description.length < 10) {
      errors.push({
        field: `${prefix}.description`,
        message: 'Description is too short (recommend 10+ characters)',
        severity: 'warning',
      });
    }

    if (exp.description && exp.description.length > 1000) {
      errors.push({
        field: `${prefix}.description`,
        message: 'Description is too long (max 1000 characters)',
        severity: 'error',
      });
    }

    if (exp.description && isLikelySpam(exp.description)) {
      errors.push({
        field: `${prefix}.description`,
        message: 'Description appears to contain invalid content',
        severity: 'warning',
      });
    }
  });

  return errors;
}

/**
 * Validate education entries
 */
export function validateEducation(education: ResumeData['education']): ValidationError[] {
  const errors: ValidationError[] = [];

  education.forEach((edu, index) => {
    const prefix = `education[${index}]`;

    if (!edu.school.trim()) {
      errors.push({
        field: `${prefix}.school`,
        message: 'School name is required',
        severity: 'error',
      });
    }

    if (!edu.degree.trim()) {
      errors.push({
        field: `${prefix}.degree`,
        message: 'Degree is required',
        severity: 'error',
      });
    }

    if (!edu.field.trim()) {
      errors.push({
        field: `${prefix}.field`,
        message: 'Field of study is required',
        severity: 'error',
      });
    }

    if (!edu.graduationDate) {
      errors.push({
        field: `${prefix}.graduationDate`,
        message: 'Graduation date is required',
        severity: 'error',
      });
    } else if (!validateDate(edu.graduationDate)) {
      errors.push({
        field: `${prefix}.graduationDate`,
        message: 'Invalid date format',
        severity: 'warning',
      });
    }
  });

  return errors;
}

/**
 * Validate project entries
 */
export function validateProjects(projects: ResumeData['projects']): ValidationError[] {
  const errors: ValidationError[] = [];

  projects.forEach((proj, index) => {
    const prefix = `projects[${index}]`;

    if (!proj.name.trim()) {
      errors.push({
        field: `${prefix}.name`,
        message: 'Project name is required',
        severity: 'error',
      });
    }

    if (!proj.description.trim()) {
      errors.push({
        field: `${prefix}.description`,
        message: 'Project description is required',
        severity: 'error',
      });
    } else if (proj.description.length < 10) {
      errors.push({
        field: `${prefix}.description`,
        message: 'Description is too short (recommend 10+ characters)',
        severity: 'warning',
      });
    }

    if (proj.liveUrl && !validateURL(proj.liveUrl)) {
      errors.push({
        field: `${prefix}.liveUrl`,
        message: 'Invalid Live URL format',
        severity: 'warning',
      });
    }

    if (proj.githubUrl && !validateURL(proj.githubUrl)) {
      errors.push({
        field: `${prefix}.githubUrl`,
        message: 'Invalid GitHub URL format',
        severity: 'warning',
      });
    }

    if (proj.description && isLikelySpam(proj.description)) {
      errors.push({
        field: `${prefix}.description`,
        message: 'Description appears to contain invalid content',
        severity: 'warning',
      });
    }
  });

  return errors;
}

/**
 * Validate skills section
 */
export function validateSkills(skills: { technical: string[]; soft: string[]; tools: string[] }): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!skills || (skills.technical.length === 0 && skills.soft.length === 0 && skills.tools.length === 0)) {
    return errors; // Skills are optional
  }

  const skillsList = [...skills.technical, ...skills.soft, ...skills.tools].filter(Boolean);

  if (skillsList.length < 3) {
    errors.push({
      field: 'skills',
      message: 'Add at least 3 skills for better ATS compatibility',
      severity: 'warning',
    });
  }

  if (skillsList.length > 50) {
    errors.push({
      field: 'skills',
      message: 'Too many skills (max 50 recommended)',
      severity: 'warning',
    });
  }

  // Check individual skills
  skillsList.forEach((skill, index) => {
    if (skill.length > 50) {
      errors.push({
        field: `skills[${index}]`,
        message: 'Skill name is too long (max 50 characters)',
        severity: 'warning',
      });
    }
  });

  return errors;
}

/**
 * Calculate resume completeness score
 */
export function calculateCompleteness(data: ResumeData): number {
  let score = 0;
  const maxScore = 100;

  // Personal info (30 points)
  if (data.personalInfo.name) score += 10;
  if (data.personalInfo.email && validateEmail(data.personalInfo.email)) score += 10;
  if (data.personalInfo.phone && validatePhone(data.personalInfo.phone)) score += 5;
  if (data.personalInfo.location) score += 5;

  // Summary (15 points)
  if (data.summary && data.summary.length >= 40) score += 15;

  // Experience (20 points)
  if (data.experience.length > 0) {
    const validExperience = data.experience.filter(
      e => e.company && e.position && e.startDate
    ).length;
    score += Math.min((validExperience / 3) * 20, 20);
  }

  // Education (15 points)
  if (data.education.length > 0) {
    const validEducation = data.education.filter(
      e => e.school && e.degree && e.field && e.graduationDate
    ).length;
    score += Math.min((validEducation / 2) * 15, 15);
  }

  // Projects (10 points)
  if (data.projects.length >= 2) {
    score += 10;
  } else if (data.projects.length === 1) {
    score += 5;
  }

  // Skills (5 points)
  const skillsList = [
    ...data.skills.technical,
    ...data.skills.soft,
    ...data.skills.tools,
  ].filter(s => s.trim());
  if (skillsList.length >= 5) {
    score += 5;
  }

  // Links (5 points)
  if (data.links.linkedin || data.links.github) score += 5;

  return Math.round((score / maxScore) * 100);
}

/**
 * Comprehensive resume validation
 */
export function validateResume(data: ResumeData): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate all sections
  errors.push(...validatePersonalInfo(data.personalInfo));
  errors.push(...validateSummary(data.summary));
  errors.push(...validateExperience(data.experience));
  errors.push(...validateEducation(data.education));
  errors.push(...validateProjects(data.projects));
  errors.push(...validateSkills(data.skills));

  // Validate links if present
  if (data.links.linkedin && !validateURL(data.links.linkedin)) {
    errors.push({
      field: 'links.linkedin',
      message: 'Invalid LinkedIn URL',
      severity: 'warning',
    });
  }

  if (data.links.github && !validateURL(data.links.github)) {
    errors.push({
      field: 'links.github',
      message: 'Invalid GitHub URL',
      severity: 'warning',
    });
  }

  const hasErrors = errors.some(e => e.severity === 'error');
  const completeness = calculateCompleteness(data);

  return {
    isValid: !hasErrors,
    errors,
    completeness,
  };
}

/**
 * Get validation suggestions for improvement
 */
export function getValidationSuggestions(data: ResumeData): string[] {
  const suggestions: string[] = [];

  // Personal info suggestions
  if (!data.personalInfo.email) {
    suggestions.push('Add your email address');
  }
  if (!data.personalInfo.phone) {
    suggestions.push('Add your phone number');
  }
  if (!data.personalInfo.location) {
    suggestions.push('Add your location');
  }

  // Experience suggestions
  if (data.experience.length === 0) {
    suggestions.push('Add at least one work experience entry');
  } else if (data.experience.length === 1) {
    suggestions.push('Add more work experience entries for better visibility');
  }

  // Education suggestions
  if (data.education.length === 0) {
    suggestions.push('Add your education history');
  }

  // Project suggestions
  if (data.projects.length === 0) {
    suggestions.push('Add projects to showcase your work');
  } else if (data.projects.length === 1) {
    suggestions.push('Add at least 2 projects for better impact');
  }

  // Skills suggestions
  const skillsList = [
    ...data.skills.technical,
    ...data.skills.soft,
    ...data.skills.tools,
  ].filter(s => s.trim());
  if (skillsList.length === 0) {
    suggestions.push('Add your technical and professional skills');
  } else if (skillsList.length < 5) {
    suggestions.push('Add more skills (aim for 5+ skills)');
  }

  // Links suggestions
  if (!data.links.linkedin && !data.links.github) {
    suggestions.push('Link your LinkedIn or GitHub profile');
  }

  return suggestions;
}
