'use client';

import { useTemplate, COLOR_THEMES, type ColorTheme } from '@/app/contexts/TemplateContext';

export function ColorPicker() {
  const { colorTheme, setColorTheme } = useTemplate();

  const colors: ColorTheme[] = ['teal', 'navy', 'burgundy', 'forest', 'charcoal'];

  return (
    <div className="pb-6 border-b border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Accent Color</h3>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColorTheme(color)}
            className="relative group transition-transform hover:scale-110"
            title={COLOR_THEMES[color].label}
          >
            {/* Color circle */}
            <div
              className={`w-8 h-8 rounded-full ring-2 transition-all ${
                colorTheme === color
                  ? 'ring-gray-900 ring-offset-2'
                  : 'ring-gray-300'
              }`}
              style={{ backgroundColor: COLOR_THEMES[color].hsl }}
            />

            {/* Checkmark for selected */}
            {colorTheme === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white drop-shadow"
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

            {/* Label on hover */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {COLOR_THEMES[color].label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
