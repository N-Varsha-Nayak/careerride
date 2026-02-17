'use client';

import { useState } from 'react';
import { useResume } from '@/app/contexts/ResumeContext';

export function SkillsForm() {
  const { data, addSkill, removeSkill } = useResume();
  const [inputs, setInputs] = useState({
    technical: '',
    soft: '',
    tools: '',
  });
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  const handleAddSkill = (category: 'technical' | 'soft' | 'tools') => {
    if (inputs[category].trim()) {
      addSkill(category, inputs[category]);
      setInputs({ ...inputs, [category]: '' });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    category: 'technical' | 'soft' | 'tools'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(category);
    }
  };

  const handleSuggestSkills = async () => {
    setLoadingSuggest(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add suggested skills
    const suggested = {
      technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
      soft: ['Team Leadership', 'Problem Solving'],
      tools: ['Git', 'Docker', 'AWS'],
    };

    Object.entries(suggested).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        if (!data.skills[category as 'technical' | 'soft' | 'tools'].includes(skill)) {
          addSkill(category as 'technical' | 'soft' | 'tools', skill);
        }
      });
    });

    setLoadingSuggest(false);
  };

  const categories: Array<{ key: 'technical' | 'soft' | 'tools'; label: string }> = [
    { key: 'technical', label: 'Technical Skills' },
    { key: 'soft', label: 'Soft Skills' },
    { key: 'tools', label: 'Tools & Technologies' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <button
          onClick={handleSuggestSkills}
          disabled={loadingSuggest}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 font-medium transition-colors"
        >
          {loadingSuggest ? '⏳ Suggesting...' : '✨ Suggest Skills'}
        </button>
      </div>

      <div className="space-y-6">
        {categories.map(({ key, label }) => (
          <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {/* Category Header */}
            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                {label} <span className="text-sm font-normal text-gray-600">({data.skills[key].length})</span>
              </h4>
            </div>

            {/* Skills Display */}
            {data.skills[key].length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {data.skills[key].map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(key, skill)}
                      className="text-gray-400 hover:text-red-600 font-semibold flex items-center justify-center w-4 h-4"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputs[key]}
                onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, key)}
                placeholder={`Add a ${label.toLowerCase()}...`}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAddSkill(key)}
                className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
        <p>
          <strong>Total Skills:</strong> {data.skills.technical.length + data.skills.soft.length + data.skills.tools.length}
        </p>
      </div>
    </div>
  );
}
