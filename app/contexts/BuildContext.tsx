'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StepArtifact {
  stepId: string;
  fileName: string;
  uploadedAt: string;
  content: string;
}

export interface BuildState {
  completedSteps: Set<string>;
  artifacts: Map<string, StepArtifact>;
  finalSubmission: {
    submittedAt: string | null;
    proof: string;
  };
}

interface BuildContextType {
  state: BuildState;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  uploadArtifact: (stepId: string, fileName: string, content: string) => void;
  removeArtifact: (stepId: string) => void;
  completeStep: (stepId: string) => void;
  isStepUnlocked: (stepId: string) => boolean;
  isStepCompleted: (stepId: string) => boolean;
  getStepProgress: () => number;
  submitFinal: (proof: string) => void;
  getArtifact: (stepId: string) => StepArtifact | undefined;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

// Helper to get step number from step ID (e.g., "01-problem" -> 1)
function getStepNumber(stepId: string): number {
  const match = stepId.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BuildState>({
    completedSteps: new Set(),
    artifacts: new Map(),
    finalSubmission: { submittedAt: null, proof: '' },
  });
  const [isHydrated, setIsHydrated] = useState(false);

  const [currentStep, setCurrentStep] = useState<string>('01-problem');

  // Restore from localStorage after mount to avoid SSR/client hydration mismatch.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem('rb_build_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({
          completedSteps: new Set(parsed.completedSteps || []),
          artifacts: new Map(parsed.artifacts || []),
          finalSubmission: parsed.finalSubmission || { submittedAt: null, proof: '' },
        });
      }
    } catch (e) {
      console.error('Failed to restore build state:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist state to localStorage (only after hydration)
  useEffect(() => {
    if (typeof window === 'undefined' || !isHydrated) return;

    const toSave = {
      completedSteps: Array.from(state.completedSteps),
      artifacts: Array.from(state.artifacts.entries()),
      finalSubmission: state.finalSubmission,
    };
    localStorage.setItem('rb_build_state', JSON.stringify(toSave));
  }, [state, isHydrated]);

  const uploadArtifact = (stepId: string, fileName: string, content: string) => {
    setState((prev) => {
      const newArtifacts = new Map(prev.artifacts);
      newArtifacts.set(stepId, {
        stepId,
        fileName,
        uploadedAt: new Date().toISOString(),
        content,
      });
      return { ...prev, artifacts: newArtifacts };
    });
  };

  const removeArtifact = (stepId: string) => {
    setState((prev) => {
      const newArtifacts = new Map(prev.artifacts);
      newArtifacts.delete(stepId);
      const newCompleted = new Set(prev.completedSteps);
      newCompleted.delete(stepId);
      return { ...prev, artifacts: newArtifacts, completedSteps: newCompleted };
    });
  };

  const completeStep = (stepId: string) => {
    setState((prev) => ({
      ...prev,
      completedSteps: new Set([...prev.completedSteps, stepId]),
    }));
  };

  // Check if a step is unlocked (all previous steps completed)
  const isStepUnlocked = (stepId: string): boolean => {
    const stepNum = getStepNumber(stepId);
    if (stepNum === 1) return true; // Step 1 is always unlocked

    // Check if all previous steps are completed
    for (let i = 1; i < stepNum; i++) {
      const prevStepId = `0${i}-${getStepName(i)}`;
      if (!state.completedSteps.has(prevStepId)) {
        return false;
      }
    }
    return true;
  };

  const isStepCompleted = (stepId: string): boolean => {
    return state.completedSteps.has(stepId);
  };

  const getStepProgress = (): number => {
    return state.completedSteps.size;
  };

  const submitFinal = (proof: string) => {
    setState((prev) => ({
      ...prev,
      finalSubmission: {
        submittedAt: new Date().toISOString(),
        proof,
      },
    }));
  };

  const getArtifact = (stepId: string): StepArtifact | undefined => {
    return state.artifacts.get(stepId);
  };

  return (
    <BuildContext.Provider
      value={{
        state,
        currentStep,
        setCurrentStep,
        uploadArtifact,
        removeArtifact,
        completeStep,
        isStepUnlocked,
        isStepCompleted,
        getStepProgress,
        submitFinal,
        getArtifact,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error('useBuild must be used within BuildProvider');
  }
  return context;
}

// Helper to get step name from number
function getStepName(num: number): string {
  const names = [
    '',
    'problem',
    'ideation',
    'architecture',
    'validation',
    'prototype',
    'refinement',
    'launch',
    'ship',
  ];
  return names[num] || 'unknown';
}
