"use client";

import { useState } from "react";
import Link from "next/link";
import { ResumePreview } from "@/app/components/ResumePreview";
import { ATSMini } from "@/app/components/ATSMini";
import { TemplateSelector } from "@/app/components/TemplateSelector";
import { ExportButton } from "@/app/components/ExportButton";
import { ValidationPanel } from "@/app/components/ValidationPanel";
import { useResume } from "@/app/contexts/ResumeContext";

export default function ResumePreviewPage() {
  const { data } = useResume();
  const [activeTab, setActiveTab] = useState<"preview" | "validation">("preview");

  return (
    <div className="min-h-screen bg-gray-50 rounded-xl border border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Resume Preview</h1>
          <div className="flex gap-3 items-center">
            <TemplateSelector />
            <ExportButton data={data} variant="default" />
            <Link href="/dashboard/resume/builder" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium">
              Back to Builder
            </Link>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button onClick={() => setActiveTab("preview")} className={`px-4 py-3 font-medium border-b-2 ${activeTab === "preview" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}>
            Resume Preview
          </button>
          <button onClick={() => setActiveTab("validation")} className={`px-4 py-3 font-medium border-b-2 ${activeTab === "validation" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"}`}>
            Validation
          </button>
        </div>

        {activeTab === "preview" && (
          <div className="space-y-6">
            <div className="flex justify-center"><div className="w-full max-w-lg"><ATSMini /></div></div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"><div className="p-12"><ResumePreview data={data} minimal={true} /></div></div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => window.print()} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">Print / Save as PDF</button>
              <ExportButton data={data} variant="default" />
            </div>
          </div>
        )}

        {activeTab === "validation" && <ValidationPanel data={data} variant="expanded" />}
      </div>
    </div>
  );
}
