'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TemplateType = 'classic' | 'modern' | 'minimal';
export type ColorTheme = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal';

export const COLOR_THEMES: Record<ColorTheme, { hsl: string; label: string }> = {
  teal: { hsl: 'hsl(168, 60%, 40%)', label: 'Teal' },
  navy: { hsl: 'hsl(220, 60%, 35%)', label: 'Navy' },
  burgundy: { hsl: 'hsl(345, 60%, 35%)', label: 'Burgundy' },
  forest: { hsl: 'hsl(150, 50%, 30%)', label: 'Forest' },
  charcoal: { hsl: 'hsl(0, 0%, 25%)', label: 'Charcoal' },
};

interface TemplateContextType {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
  colorTheme: ColorTheme;
  setColorTheme: (color: ColorTheme) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<TemplateType>('classic');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('teal');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedTemplate = localStorage.getItem('resumeTemplate');
      if (savedTemplate && ['classic', 'modern', 'minimal'].includes(savedTemplate)) {
        setTemplateState(savedTemplate as TemplateType);
      }
      const savedColor = localStorage.getItem('resumeColorTheme');
      if (savedColor && Object.keys(COLOR_THEMES).includes(savedColor)) {
        setColorThemeState(savedColor as ColorTheme);
      }
    } catch (e) {
      console.error('Failed to load template/color:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when template changes
  const setTemplate = (newTemplate: TemplateType) => {
    setTemplateState(newTemplate);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('resumeTemplate', newTemplate);
      } catch (e) {
        console.error('Failed to save template:', e);
      }
    }
  };

  // Save to localStorage when color changes
  const setColorTheme = (newColor: ColorTheme) => {
    setColorThemeState(newColor);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('resumeColorTheme', newColor);
      } catch (e) {
        console.error('Failed to save color theme:', e);
      }
    }
  };

  return (
    <TemplateContext.Provider value={{ template, setTemplate, colorTheme, setColorTheme }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider');
  }
  return context;
}
