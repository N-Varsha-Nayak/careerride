"use client";

import Link from "next/link";

export default function ResumeProofPage() {
  return (
    <div className="min-h-screen bg-gray-50 rounded-xl border border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Proof & Artifacts</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Export</h2>
            <p className="text-gray-600 mb-6">Export your resume in multiple formats.</p>
            <p className="text-xs text-gray-500">Placeholder block retained from original app.</p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Continue Building</h2>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard/resume/builder" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">Back to Builder</Link>
            <Link href="/dashboard/resume/preview" className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">View Preview</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
