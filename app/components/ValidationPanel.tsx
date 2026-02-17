'use client';

import { useState, useEffect } from 'react';
import { ResumeData } from '@/app/contexts/ResumeContext';
import {
  validateResume,
  getValidationSuggestions,
  ValidationResult,
} from '@/app/utils/validation';

interface ValidationPanelProps {
  data: ResumeData;
  variant?: 'expanded' | 'compact' | 'inline';
}

export function ValidationPanel({ data, variant = 'compact' }: ValidationPanelProps) {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');

  useEffect(() => {
    // Validate on data change
    const validationResult = validateResume(data);
    setResult(validationResult);
    setSuggestions(getValidationSuggestions(data));
  }, [data]);

  if (!result) return null;

  const errors = result.errors.filter(e => e.severity === 'error');
  const warnings = result.errors.filter(e => e.severity === 'warning');
  const infos = result.errors.filter(e => e.severity === 'info');

  if (variant === 'inline') {
    return (
      <div className={`rounded-lg p-4 ${
        result.isValid 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold ${
              result.isValid ? 'text-green-900' : 'text-red-900'
            }`}>
              {result.isValid ? '✓ Resume Valid' : '⚠ Issues Found'}
            </h3>
            <p className={`text-sm mt-1 ${
              result.isValid ? 'text-green-800' : 'text-red-800'
            }`}>
              Completeness: {result.completeness}%
            </p>
          </div>
          {errors.length > 0 && (
            <div className="text-red-900 font-semibold text-lg">
              {errors.length} Error{errors.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full px-4 py-3 flex items-center justify-between ${
            result.isValid 
              ? 'bg-green-50 text-green-900' 
              : errors.length > 0 
                ? 'bg-red-50 text-red-900'
                : 'bg-yellow-50 text-yellow-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {result.isValid ? '✓' : errors.length > 0 ? '✕' : '⚠'}
            </span>
            <div className="text-left">
              <p className="font-semibold text-sm">
                {result.isValid 
                  ? 'Resume Valid' 
                  : `${errors.length} Error${errors.length !== 1 ? 's' : ''}`}
              </p>
              <p className="text-xs opacity-75">Completeness: {result.completeness}%</p>
            </div>
          </div>
          <span className="text-lg">{isExpanded ? '−' : '+'}</span>
        </button>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            {/* Completeness Meter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Completeness</span>
                <span className="text-sm font-semibold text-gray-900">
                  {result.completeness}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    result.completeness >= 80
                      ? 'bg-green-500'
                      : result.completeness >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${result.completeness}%` }}
                ></div>
              </div>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-red-900 mb-2">Errors</h4>
                <ul className="space-y-1">
                  {errors.slice(0, 3).map((error, idx) => (
                    <li key={idx} className="text-sm text-red-800 flex gap-2">
                      <span>•</span>
                      <span>{error.message}</span>
                    </li>
                  ))}
                  {errors.length > 3 && (
                    <li className="text-sm text-red-700 font-medium">
                      +{errors.length - 3} more error{errors.length - 3 !== 1 ? 's' : ''}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-yellow-900 mb-2">Warnings</h4>
                <ul className="space-y-1">
                  {warnings.slice(0, 2).map((warning, idx) => (
                    <li key={idx} className="text-sm text-yellow-800 flex gap-2">
                      <span>•</span>
                      <span>{warning.message}</span>
                    </li>
                  ))}
                  {warnings.length > 2 && (
                    <li className="text-sm text-yellow-700 font-medium">
                      +{warnings.length - 2} more warning{warnings.length - 2 !== 1 ? 's' : ''}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-blue-900 mb-2">Suggestions</h4>
                <ul className="space-y-1">
                  {suggestions.slice(0, 2).map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-blue-800 flex gap-2">
                      <span>💡</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                  {suggestions.length > 2 && (
                    <li className="text-sm text-blue-700 font-medium">
                      +{suggestions.length - 2} more suggestion{suggestions.length - 2 !== 1 ? 's' : ''}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Expanded view
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className={`rounded-lg p-6 border-2 ${
        result.isValid 
          ? 'bg-green-50 border-green-200' 
          : errors.length > 0
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`text-4xl ${
            result.isValid ? 'text-green-600' : errors.length > 0 ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {result.isValid ? '✓' : errors.length > 0 ? '✕' : '⚠'}
          </div>
          <div className="flex-1">
            <h2 className={`text-2xl font-bold ${
              result.isValid ? 'text-green-900' : errors.length > 0 ? 'text-red-900' : 'text-yellow-900'
            }`}>
              {result.isValid 
                ? 'Resume Validation Complete' 
                : `${errors.length} Validation Error${errors.length !== 1 ? 's' : ''}`}
            </h2>
            <p className={`mt-2 ${
              result.isValid ? 'text-green-800' : 'text-gray-700'
            }`}>
              Your resume is <strong>{result.completeness}%</strong> complete and ready for submission.
            </p>
          </div>
        </div>

        {/* Completeness Meter */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">Overall Completeness</span>
            <span className="text-2xl font-bold text-gray-900">{result.completeness}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                result.completeness >= 80
                  ? 'bg-green-500'
                  : result.completeness >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              style={{ width: `${result.completeness}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Errors Section */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">
            Critical Issues ({errors.length})
          </h3>
          <ul className="space-y-2">
            {errors.map((error, idx) => (
              <li key={idx} className="text-red-800 flex gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <div>
                  <div className="font-medium">{error.field}</div>
                  <div>{error.message}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings Section */}
      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-4">
            Warnings ({warnings.length})
          </h3>
          <ul className="space-y-2">
            {warnings.map((warning, idx) => (
              <li key={idx} className="text-yellow-800 flex gap-3">
                <span className="text-yellow-600 font-bold">⚠</span>
                <div>
                  <div className="font-medium">{warning.field}</div>
                  <div>{warning.message}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            Improvement Suggestions ({suggestions.length})
          </h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-blue-800 flex gap-3">
                <span className="text-blue-600">💡</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* All Good Message */}
      {result.isValid && errors.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-bold text-green-900">Perfect!</h3>
          <p className="text-green-800 mt-2">
            Your resume is ready to submit. No critical issues found!
          </p>
        </div>
      )}
    </div>
  );
}
