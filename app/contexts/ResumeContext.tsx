'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  links: {
    github: string;
    linkedin: string;
  };
}

interface ResumeContextType {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addEducation: (entry: ResumeData['education'][0]) => void;
  updateEducation: (id: string, entry: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addExperience: (entry: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, entry: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addProject: (entry: ResumeData['projects'][0]) => void;
  updateProject: (id: string, entry: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addSkill: (category: 'technical' | 'soft' | 'tools', skill: string) => void;
  removeSkill: (category: 'technical' | 'soft' | 'tools', skill: string) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateLinks: (links: Partial<ResumeData['links']>) => void;
  loadSampleData: () => void;
  reset: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const defaultData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: [],
    tools: [],
  },
  links: {
    github: '',
    linkedin: '',
  },
};

const sampleData: ResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about React, Node.js, and creating excellent user experiences.',
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      graduationDate: 'May 2019',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Frontend Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Led frontend architecture for 10+ products. Improved performance by 40% through optimization.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      description: 'Built MVP for SaaS platform. Managed database design and API development.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'AI Resume Builder',
      description: 'Web app for building AI-powered resumes with ATS scoring',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://airesume.example.com',
      githubUrl: 'https://github.com/example/resume-builder',
    },
    {
      id: '2',
      name: 'Task Management Dashboard',
      description: 'Collaborative task management tool with real-time updates',
      technologies: ['Node.js', 'MongoDB', 'Socket.io', 'Vue.js'],
      liveUrl: 'https://tasks.example.com',
      githubUrl: 'https://github.com/example/task-dashboard',
    },
  ],
  skills: {
    technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
    soft: ['Team Leadership', 'Problem Solving'],
    tools: ['Git', 'Docker', 'AWS'],
  },
  links: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
  },
};

/**
 * Migrate old data structure to new format
 * Handles conversion from old project/skills format to new categorized structure
 */
function migrateData(data: any): ResumeData {
  // Migrate projects
  if (data.projects && Array.isArray(data.projects)) {
    data.projects = data.projects.map((proj: any) => ({
      ...proj,
      // Convert technologies string to array if needed
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies
        : (typeof proj.technologies === 'string' && proj.technologies
          ? proj.technologies.split(',').map((t: string) => t.trim())
          : []),
      // Migrate old 'link' field to 'liveUrl'
      liveUrl: proj.liveUrl || proj.link || '',
      githubUrl: proj.githubUrl || '',
    }));
  }

  // Migrate skills from string format to object format
  if (data.skills && typeof data.skills === 'string') {
    const skillsArray = data.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s);
    data.skills = {
      technical: skillsArray.slice(0, Math.ceil(skillsArray.length / 3)),
      soft: skillsArray.slice(Math.ceil(skillsArray.length / 3), Math.ceil(2 * skillsArray.length / 3)),
      tools: skillsArray.slice(Math.ceil(2 * skillsArray.length / 3)),
    };
  }

  // Ensure skills object has all categories
  if (typeof data.skills !== 'string' && typeof data.skills === 'object' && !Array.isArray(data.skills)) {
    data.skills = {
      technical: Array.isArray(data.skills?.technical) ? data.skills.technical : [],
      soft: Array.isArray(data.skills?.soft) ? data.skills.soft : [],
      tools: Array.isArray(data.skills?.tools) ? data.skills.tools : [],
    };
  }

  return data as ResumeData;
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeBuilderData');
      if (saved) {
        const parsed = JSON.parse(saved);
        const migrated = migrateData(parsed);
        setData(migrated);
      }
    } catch (e) {
      console.error('Failed to restore resume data:', e);
    }
    setIsHydrated(true);
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('resumeBuilderData', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save resume data:', e);
    }
  }, [data, isHydrated]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setData((prev) => ({ ...prev, summary }));
  };

  const addEducation = (entry: ResumeData['education'][0]) => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, entry],
    }));
  };

  const updateEducation = (id: string, entry: Partial<ResumeData['education'][0]>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addExperience = (entry: ResumeData['experience'][0]) => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, entry],
    }));
  };

  const updateExperience = (id: string, entry: Partial<ResumeData['experience'][0]>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...entry } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const addProject = (entry: ResumeData['projects'][0]) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, entry],
    }));
  };

  const updateProject = (id: string, entry: Partial<ResumeData['projects'][0]>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...entry } : p)),
    }));
  };

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (category: 'technical' | 'soft' | 'tools', skill: string) => {
    if (!skill.trim()) return;
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: Array.from(new Set([...prev.skills[category], skill.trim()])),
      },
    }));
  };

  const removeSkill = (category: 'technical' | 'soft' | 'tools', skill: string) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((s) => s !== skill),
      },
    }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setData((prev) => ({ ...prev, skills }));
  };

  const updateLinks = (links: Partial<ResumeData['links']>) => {
    setData((prev) => ({
      ...prev,
      links: { ...prev.links, ...links },
    }));
  };

  const loadSampleData = () => {
    setData(sampleData);
  };

  const reset = () => {
    setData(defaultData);
  };

  return (
    <ResumeContext.Provider
      value={{
        data,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        removeSkill,
        updateSkills,
        updateLinks,
        loadSampleData,
        reset,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
}
