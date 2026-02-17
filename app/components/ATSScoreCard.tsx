'use client';

import React, { useMemo } from 'react';
import { useResume } from '@/app/contexts/ResumeContext';
import { calculateATSScore } from '@/app/utils/atsScoring';

export function ATSScoreCard() {
  const { data } = useResume();

  const { score, suggestions } = useMemo(() => {
    return calculateATSScore(data);
  }, [data]);

  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 71) return 'from-green-400 to-green-600';
    if (s >= 41) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getScoreLabel = (s: number) => {
    if (s >= 71) return 'Strong Resume';
    if (s >= 41) return 'Getting There';
    return 'Needs Work';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-32">
      {/* Score Meter */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-3">
          <h3 className="font-bold text-gray-900">ATS Readiness Score</h3>
          <span className="text-3xl font-bold text-gray-900">{score}</span>
        </div>

        {/* Meter Background */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${getScoreColor(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>

        {/* Score Label and Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">0</span>
          <span className="text-sm font-semibold text-gray-900">{getScoreLabel(score)}</span>
          <span className="text-xs text-gray-600">100</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 py-4">
        {suggestions.length > 0 ? (
          <>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              💡 Suggestions
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-green-600 font-medium">✓ All suggestions completed!</p>
          </div>
        )}
      </div>

      {/* Score Breakdown (Optional - Hidden by default) */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <details className="group">
          <summary className="text-xs font-medium text-gray-600 cursor-pointer hover:text-gray-900">
            View Score Breakdown
          </summary>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Summary Quality</span>
              <span className="font-medium">0 / 15</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Projects</span>
              <span className="font-medium">0 / 10</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Experience</span>
              <span className="font-medium">0 / 10</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Skills Count</span>
              <span className="font-medium">0 / 10</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Professional Links</span>
              <span className="font-medium">0 / 10</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Measurable Metrics</span>
              <span className="font-medium">0 / 15</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Education</span>
              <span className="font-medium">0 / 10</span>
            </div>
          </div>
        </details>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">What is ATS?</span> Applicant Tracking Systems scan resumes
          automatically. Higher scores mean better compatibility with recruiters.
        </p>
      </div>
    </div>
  );
}
