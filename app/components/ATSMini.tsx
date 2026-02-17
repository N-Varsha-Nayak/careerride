'use client';

import React, { useMemo } from 'react';
import { useResume } from '@/app/contexts/ResumeContext';
import { calculateATSScore } from '@/app/utils/atsScoring';

export function ATSMini() {
  const { data } = useResume();

  const { score, suggestions } = useMemo(() => calculateATSScore(data), [data]);

  // Color and label based on requested thresholds
  const getColor = (s: number) => {
    if (s <= 40) return '#e11d48'; // red
    if (s <= 70) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  const getLabel = (s: number) => {
    if (s <= 40) return 'Needs Work';
    if (s <= 70) return 'Getting There';
    return 'Strong Resume';
  };

  const color = getColor(score);
  const label = getLabel(score);

  // SVG circular progress params
  const radius = 36;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <svg height={radius * 2} width={radius * 2} className="flex-shrink-0">
          <defs>
            <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            stroke="#e6e6e6"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="url(#atsGradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 500ms ease' }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fill="#111">
            {score}
          </text>
        </svg>

        <div>
          <div className="text-sm font-semibold text-gray-900">ATS Readiness</div>
          <div className="text-xs text-gray-600">{label}</div>
        </div>
      </div>

      <div className="mt-4">
        {suggestions.length > 0 ? (
          <ul className="text-xs text-gray-600 space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-400">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xs text-green-600 font-medium">Great job! No immediate improvements detected.</div>
        )}
      </div>
    </div>
  );
}
