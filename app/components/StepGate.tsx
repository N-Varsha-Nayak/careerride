'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useBuild } from '@/app/contexts/BuildContext';

interface StepGateProps {
  stepId: string;
  children: React.ReactNode;
}

export function StepGate({ stepId, children }: StepGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isStepUnlocked, currentStep, setCurrentStep } = useBuild();

  useEffect(() => {
    if (!isStepUnlocked(stepId)) {
      // Redirect to first unlocked step (which should be step 1)
      router.push('/rb/01-problem');
    } else {
      // Update current step when accessing unlocked step
      setCurrentStep(stepId);
    }
  }, [stepId, isStepUnlocked, router, setCurrentStep]);

  // Don't render if not unlocked
  if (!isStepUnlocked(stepId)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Step Locked</h1>
          <p className="text-gray-600 mb-6">Complete previous steps to unlock this one.</p>
          <a
            href="/rb/01-problem"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
          >
            ← Start from Step 1
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
