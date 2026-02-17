'use client';

import { Navigation } from '@/app/components/Navigation';
import Link from 'next/link';

export default function ProofPage() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Proof & Artifacts</h1>

          {/* Placeholder Sections */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Export</h2>
              <p className="text-gray-600 mb-6">
                Export your resume in multiple formats (PDF, DOCX, JSON)
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium" disabled>
                  Export as PDF
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium" disabled>
                  Export as DOCX
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium" disabled>
                  Export as JSON
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">Coming soon</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">ATS Score</h2>
              <p className="text-gray-600 mb-6">
                Get your resume scored for ATS compatibility and receive optimization suggestions
              </p>
              <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium" disabled>
                Calculate ATS Score
              </button>
              <p className="text-xs text-gray-500 mt-3">Coming soon</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Resume</h2>
              <p className="text-gray-600 mb-6">
                Generate a shareable link for your resume
              </p>
              <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium" disabled>
                Generate Share Link
              </button>
              <p className="text-xs text-gray-500 mt-3">Coming soon</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Continue Building</h2>
            <p className="text-gray-600 mb-6">
              Go back to the builder to edit your resume or preview it
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/builder"
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Back to Builder
              </Link>
              <Link
                href="/preview"
                className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium"
              >
                View Preview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
