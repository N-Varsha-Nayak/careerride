'use client';

import { useState } from 'react';
import { useResume } from '@/app/contexts/ResumeContext';

export function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResume();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
    };
    addProject(newProject);
    setExpandedId(newProject.id);
  };

  const handleAddTech = (projectId: string) => {
    const tech = techInput[projectId]?.trim();
    if (tech) {
      const project = data.projects.find((p) => p.id === projectId);
      if (project) {
        updateProject(projectId, {
          technologies: Array.from(new Set([...project.technologies, tech])),
        });
        setTechInput({ ...techInput, [projectId]: '' });
      }
    }
  };

  const handleRemoveTech = (projectId: string, tech: string) => {
    const project = data.projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(projectId, {
        technologies: project.technologies.filter((t) => t !== tech),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, projectId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech(projectId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={handleAddProject}
          className="px-3 py-1 text-xs bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-3">
        {data.projects.map((proj) => (
          <div key={proj.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Header - Click to expand */}
            <button
              onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-start transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {proj.name || '(Untitled Project)'}
                </p>
                {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                  <p className="text-xs text-gray-600 truncate mt-1">
                    {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
              <span className="ml-4 text-lg text-gray-400">
                {expandedId === proj.id ? '−' : '+'}
              </span>
            </button>

            {/* Expanded Content */}
            {expandedId === proj.id && (
              <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                    placeholder="Project name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <span className="text-xs text-gray-500">
                      {proj.description.length}/200
                    </span>
                  </div>
                  <textarea
                    value={proj.description}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        updateProject(proj.id, { description: e.target.value });
                      }
                    }}
                    placeholder="Describe what this project does..."
                    rows={2}
                    maxLength={200}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                  />
                  {proj.description.length > 0 && proj.description.length < 20 && (
                    <p className="text-xs text-amber-600 mt-1">💡 Add more detail (20+ characters)</p>
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tech Stack
                  </label>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          <span>{tech}</span>
                          <button
                            onClick={() => handleRemoveTech(proj.id, tech)}
                            className="text-blue-500 hover:text-blue-900 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput[proj.id] || ''}
                      onChange={(e) => setTechInput({ ...techInput, [proj.id]: e.target.value })}
                      onKeyDown={(e) => handleKeyDown(e, proj.id)}
                      placeholder="e.g., React, TypeScript"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      onClick={() => handleAddTech(proj.id)}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Live URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={proj.liveUrl}
                    onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={proj.githubUrl}
                    onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    removeProject(proj.id);
                    setExpandedId(null);
                  }}
                  className="w-full px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 font-medium transition-colors"
                >
                  🗑️ Delete Project
                </button>
              </div>
            )}
          </div>
        ))}

        {data.projects.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-sm">No projects yet. Click "Add Project" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
