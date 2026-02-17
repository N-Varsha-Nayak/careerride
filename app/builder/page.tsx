'use client';

import { Navigation } from '@/app/components/Navigation';
import {
  PersonalInfoForm,
  SummaryForm,
  EducationForm,
  ExperienceForm,
  ProjectsForm,
  SkillsForm,
  LinksForm,
} from '@/app/components/FormSections';
import { ResumePreview } from '@/app/components/ResumePreview';
import { ATSScoreCard } from '@/app/components/ATSScoreCard';
import { ImprovementPanel } from '@/app/components/ImprovementPanel';
import { TemplatePicker } from '@/app/components/TemplatePicker';
import { ColorPicker } from '@/app/components/ColorPicker';
import { useResume } from '@/app/contexts/ResumeContext';

export default function BuilderPage() {
  const { data, loadSampleData, reset } = useResume();

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <div className="flex gap-3 items-center">
              <button
                onClick={loadSampleData}
                className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
              >
                Load Sample Data
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms (2 columns) */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <PersonalInfoForm />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <SummaryForm />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <ExperienceForm />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <EducationForm />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <ProjectsForm />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <SkillsForm />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <LinksForm />
                </div>
              </div>
            </div>

            {/* Right Column - Live Preview + ATS Score + Improvements (1 column) */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-8">
                {/* Live Preview */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-900 mb-4">Customization</h2>
                    <TemplatePicker />
                    <ColorPicker />
                  </div>
                  <div className="px-6 pt-4 pb-6 bg-white">
                    <h3 className="font-semibold text-gray-900 mb-4">Live Preview</h3>
                    <div className="max-h-[calc(100vh-600px)] overflow-y-auto">
                      <ResumePreview data={data} />
                    </div>
                  </div>
                </div>

                {/* ATS Score Card */}
                <ATSScoreCard />

                {/* Improvement Panel */}
                <ImprovementPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
