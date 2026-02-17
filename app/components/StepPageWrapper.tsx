'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StepGate } from '@/app/components/StepGate';
import { PremiumLayout } from '@/app/components/PremiumLayout';
import { useBuild } from '@/app/contexts/BuildContext';

interface StepPageProps {
  stepId: string;
  stepName: string;
  stepTitle: string;
  stepDescription: string;
  nextStepId?: string;
}

export function StepPageWrapper({
  stepId,
  stepName,
  stepTitle,
  stepDescription,
  nextStepId,
}: StepPageProps) {
  const { uploadArtifact, completeStep, getArtifact, isStepCompleted } = useBuild();
  const [fileName, setFileName] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const artifact = getArtifact(stepId);
  const isCompleted = isStepCompleted(stepId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileContent(content);
      // Commit artifact as soon as file content is read so gating unlocks reliably.
      if (content) {
        uploadArtifact(stepId, file.name, content);
        completeStep(stepId);
      }
    };
    reader.readAsText(file);
  };

  return (
    <StepGate stepId={stepId}>
      <PremiumLayout
        stepId={stepId}
        stepName={stepName}
        stepTitle={stepTitle}
        stepDescription={stepDescription}
      >
        <div className="space-y-8">
          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Deliverable</h3>
            <p className="text-gray-600 mb-6">
              Upload a file containing your work for this step. This artifact will be stored and used
              in your final proof of progress.
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
            {artifact ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-3">✓</div>
                  <h4 className="font-semibold text-gray-900">Artifact Uploaded</h4>
                  <p className="text-sm text-gray-600 mt-1">{artifact.fileName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(artifact.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFileName('');
                    setFileContent('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                >
                  Upload Different File
                </button>
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="cursor-pointer inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  Upload Artifact
                </label>
                <p className="text-sm text-gray-600 mt-3">
                  {fileName ? `Selected: ${fileName}` : 'or drag and drop'}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-8">
            <Link
              href={`/rb/0${parseInt(stepId[0]) - 1}-${getPrevStepName(stepId)}`}
              className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              ← Previous Step
            </Link>

            {nextStepId ? (
              <Link
                href={nextStepId}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  artifact
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!artifact) {
                    e.preventDefault();
                  }
                }}
              >
                Next Step →
              </Link>
            ) : (
              <Link
                href="/rb/proof"
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  artifact
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!artifact) {
                    e.preventDefault();
                  }
                }}
              >
                Go to Proof →
              </Link>
            )}
          </div>
        </div>
      </PremiumLayout>
    </StepGate>
  );
}

function getPrevStepName(currentStepId: string): string {
  const names = [
    '',
    '',
    'problem',
    'ideation',
    'architecture',
    'validation',
    'prototype',
    'refinement',
    'launch',
  ];
  const num = parseInt(currentStepId[0]);
  return names[num] || 'unknown';
}
