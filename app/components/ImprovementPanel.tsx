'use client';

import React, { useMemo } from 'react';
import { useResume } from '@/app/contexts/ResumeContext';
import { generateImprovementSuggestions } from '@/app/utils/improvementSuggestions';

export function ImprovementPanel() {
  const { data } = useResume();

  const suggestions = useMemo(() => {
    return generateImprovementSuggestions(data);
  }, [data]);

  if (suggestions.length === 0) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-50 border-red-200';
    if (priority === 'medium') return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-700';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <h3 className="font-bold text-gray-900 mb-4">🚀 Top 3 Improvements</h3>
      <div className="space-y-3">
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 ${getPriorityColor(suggestion.priority)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(suggestion.priority)}`}
                >
                  {suggestion.priority === 'high' ? '⚡' : suggestion.priority === 'medium' ? '→' : '✓'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {suggestion.title}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
