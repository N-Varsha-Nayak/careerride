import React, { useEffect, useRef } from 'react';

export default function CircularProgress({ size = 160, stroke = 12, value = 72 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  const circleRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = 'stroke-dashoffset 1s cubic-bezier(.22,.9,.3,1)';
      circleRef.current.style.strokeDashoffset = `${circumference - dash}`;
    }
  }, [circumference, dash]);

  return (
    <div className="flex items-center justify-center flex-col">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="gp" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle
            r={radius}
            fill="transparent"
            stroke="rgba(15,23,42,0.06)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <circle
            ref={circleRef}
            r={radius}
            fill="transparent"
            stroke="url(#gp)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - dash}
            transform="rotate(-90)"
          />
        </g>
      </svg>

      <div className="-mt-28 text-center">
        <div className="text-4xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">Readiness Score</div>
      </div>
    </div>
  );
}
