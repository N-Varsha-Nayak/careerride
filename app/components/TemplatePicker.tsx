'use client';

import { useTemplate, type TemplateType } from '@/app/contexts/TemplateContext';

const templates: Array<{ id: TemplateType; name: string; description: string }> = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column layout with serif headings and horizontal rules',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column with colored sidebar, perfect for tech professionals',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean single-column design with generous whitespace',
  },
];

export function TemplatePicker() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="mb-6 pb-6 border-b border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Template</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setTemplate(tmpl.id)}
            className={`relative group transition-all ${
              template === tmpl.id
                ? 'ring-2 ring-blue-500'
                : 'ring-1 ring-gray-200 hover:ring-gray-300'
            } rounded-lg overflow-hidden`}
          >
            {/* Template Preview */}
            <div className="w-full h-32 bg-white p-3 flex flex-col justify-between">
              {tmpl.id === 'classic' && (
                <>
                  <div className="h-2 bg-gray-900 mb-1" />
                  <div className="space-y-1 flex-1">
                    <div className="h-1 bg-gray-300 w-full" />
                    <div className="h-1 bg-gray-300 w-3/4" />
                    <div className="h-px bg-gray-300 w-full my-1" />
                    <div className="h-1 bg-gray-300 w-full" />
                  </div>
                </>
              )}
              {tmpl.id === 'modern' && (
                <div className="flex gap-2 h-full">
                  <div className="w-1/3 bg-gray-800 rounded" />
                  <div className="flex-1 space-y-1 py-2">
                    <div className="h-1 bg-gray-300 w-full" />
                    <div className="h-1 bg-gray-300 w-3/4" />
                  </div>
                </div>
              )}
              {tmpl.id === 'minimal' && (
                <div className="space-y-2">
                  <div className="h-2 bg-gray-900" />
                  <div className="space-y-1">
                    <div className="h-1 bg-gray-300 w-full" />
                    <div className="h-1 bg-gray-300 w-full" />
                    <div className="h-1 bg-gray-300 w-2/3" />
                  </div>
                </div>
              )}
            </div>

            {/* Label */}
            <div className="bg-gray-50 px-3 py-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-900">{tmpl.name}</p>
            </div>

            {/* Checkmark for selected */}
            {template === tmpl.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {/* Tooltip on hover */}
            <div className="absolute bottom-100 left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              {tmpl.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
