'use client';

import React from 'react';
import { useBuild } from '@/app/contexts/BuildContext';

interface PremiumLayoutProps {
  stepId: string;
  stepName: string;
  stepTitle: string;
  stepDescription: string;
  children: React.ReactNode;
}

export function PremiumLayout({
  stepId,
  stepName,
  stepTitle,
  stepDescription,
  children,
}: PremiumLayoutProps) {
  const { getStepProgress, isStepCompleted, getArtifact } = useBuild();

  const stepNum = parseInt(stepId.split('-')[0], 10);
  const progress = getStepProgress();
  const isCompleted = isStepCompleted(stepId);
  const hasArtifact = !!getArtifact(stepId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            <div className="h-6 w-px bg-gray-200"></div>
            <span className="text-sm font-medium text-gray-600">
              Step {stepNum} of 8
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{progress}</div>
              <div className="text-xs text-gray-600">of 8 Complete</div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isCompleted
                  ? 'bg-green-100 text-green-800'
                  : hasArtifact
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {isCompleted ? '✓ Complete' : hasArtifact ? 'In Progress' : 'To Do'}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(progress / 8) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 70/30 Split */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - 70% - Content */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-4">
                  Step {stepNum} — {stepName}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{stepTitle}</h2>
                <p className="text-lg text-gray-600">{stepDescription}</p>
              </div>

              {/* Content */}
              <div className="border-t border-gray-200 pt-8">{children}</div>
            </div>
          </div>

          {/* Right Column - 30% - Summary */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-32">
              <h3 className="font-bold text-gray-900 mb-6">Build Progress</h3>

              {/* Step List */}
              <div className="space-y-3">
                {Array.from({ length: 8 }, (_, i) => {
                  const sNum = i + 1;
                  const sId = `0${sNum}-${getStepNameByNum(sNum)}`;
                  return (
                    <div key={sNum} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          sNum < stepNum
                            ? 'bg-green-100 text-green-700'
                            : sNum === stepNum
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {sNum < stepNum ? '✓' : sNum}
                      </div>
                      <span
                        className={`text-sm ${
                          sNum <= stepNum ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}
                      >
                        {getStepLabel(sNum)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Artifact Status */}
              {hasArtifact && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-900 mb-2">Artifact</div>
                  <div className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    ✓ Uploaded
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStepLabel(num: number): string {
  const labels = [
    '',
    'Define Problem',
    'Brainstorm Ideas',
    'Design Architecture',
    'Validate Solution',
    'Build Prototype',
    'Refine & Test',
    'Go Live',
    'Ship & Review',
  ];
  return labels[num] || 'Unknown';
}

function getStepNameByNum(num: number): string {
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
