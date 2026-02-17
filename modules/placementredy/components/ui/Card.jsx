import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`card ${className} p-6 bg-white border border-gray-200`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`text-sm text-gray-700 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`mt-4 ${className}`}>{children}</div>;
}

export default Card;
