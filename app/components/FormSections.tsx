'use client';

import { useResume, ResumeData } from '@/app/contexts/ResumeContext';
import { useState } from 'react';
import { startsWithActionVerb, hasNumericIndicator } from '@/app/utils/improvementSuggestions';
export { SkillsForm } from './SkillsForm';
export { ProjectsForm } from './ProjectsForm';

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useResume();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={data.personalInfo.name}
          onChange={(e) => updatePersonalInfo({ name: e.target.value })}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={data.personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          placeholder="San Francisco, CA"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>
  );
}

export function SummaryForm() {
  const { data, updateSummary } = useResume();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>

      <textarea
        value={data.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a brief professional summary about yourself..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono text-sm"
      />
    </div>
  );
}

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResume();
  const [expanding, setExpanding] = useState<string | null>(null);

  const handleAdd = () => {
    addEducation({
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      graduationDate: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={handleAdd}
          className="px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-800"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {data.education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div className="flex justify-between items-start cursor-pointer" onClick={() => setExpanding(expanding === edu.id ? null : edu.id)}>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{edu.degree || 'Degree'}</p>
                <p className="text-sm text-gray-600">{edu.school || 'School'}</p>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            {expanding === edu.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder="School/University"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  placeholder="Degree (B.S., M.A., etc.)"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  placeholder="Field of Study"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                  placeholder="Graduation Date (e.g., May 2023)"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResume();
  const [expanding, setExpanding] = useState<string | null>(null);

  const handleAdd = () => {
    addExperience({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={handleAdd}
          className="px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-800"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {data.experience.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div className="flex justify-between items-start cursor-pointer" onClick={() => setExpanding(expanding === exp.id ? null : exp.id)}>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{exp.position || 'Position'}</p>
                <p className="text-sm text-gray-600">{exp.company || 'Company'}</p>
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            {expanding === exp.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  placeholder="Company Name"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  placeholder="Job Position"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    placeholder="Start Date"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    placeholder="End Date (or Present)"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Job description and achievements..."
                  rows={3}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono"
                />
                {exp.description && (
                  <div className="space-y-1 text-xs text-gray-600">
                    {!startsWithActionVerb(exp.description) && (
                      <p className="text-amber-600">💡 Start with a strong action verb (Built, Developed, Led, etc.)</p>
                    )}
                    {!hasNumericIndicator(exp.description) && (
                      <p className="text-amber-600">💡 Add measurable impact (numbers, percentages, metrics).</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LinksForm() {
  const { data, updateLinks } = useResume();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Links</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
        <input
          type="url"
          value={data.links.github}
          onChange={(e) => updateLinks({ github: e.target.value })}
          placeholder="https://github.com/username"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
        <input
          type="url"
          value={data.links.linkedin}
          onChange={(e) => updateLinks({ linkedin: e.target.value })}
          placeholder="https://linkedin.com/in/username"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>
  );
}
