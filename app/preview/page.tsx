'use client';

import { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { ResumePreview } from '@/app/components/ResumePreview';
import { ATSMini } from '@/app/components/ATSMini';
import { TemplateSelector } from '@/app/components/TemplateSelector';
import { ExportButton } from '@/app/components/ExportButton';
import { ValidationPanel } from '@/app/components/ValidationPanel';
import { useResume } from '@/app/contexts/ResumeContext';
import Link from 'next/link';

export default function PreviewPage() {
  const { data } = useResume();
  const [activeTab, setActiveTab] = useState<'preview' | 'validation'>('preview');

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume Preview</h1>
            <div className="flex gap-3 items-center">
              <TemplateSelector />
              <ExportButton data={data} variant="default" />
              <Link
                href="/builder"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                ← Edit Resume
              </Link>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Resume Preview
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'validation'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Validation & Quality Check
            </button>
          </div>

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* ATS Mini */}
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <ATSMini />
                </div>
              </div>

              {/* Full-Page Resume */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-12 print:p-0">
                  <ResumePreview data={data} minimal={true} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center print:hidden">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
                >
                  Print / Save as PDF
                </button>
                <ExportButton data={data} variant="default" />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Use the Export button to download your resume in multiple formats (Text, HTML, CSV, JSON). 
                  Use Print/Save as PDF for a professional PDF version.
                </p>
              </div>
            </div>
          )}

          {/* Validation Tab */}
          {activeTab === 'validation' && (
            <div className="space:y-8">
              <ValidationPanel data={data} variant="expanded" />
            </div>
          )}
        </div>
      </div>

      {/* Print Stylesheet */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
