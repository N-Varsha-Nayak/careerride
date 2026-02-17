'use client';

import React from 'react';
import { useTemplate } from '@/app/contexts/TemplateContext';

export function TemplateSelector() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-600">Template:</span>
      <div className="flex gap-2">
        {['classic', 'modern', 'minimal'].map((t) => (
          <button
            key={t}
            onClick={() => setTemplate(t as any)}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              template === t
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
