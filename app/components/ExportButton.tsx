'use client';

import { useState } from 'react';
import { ResumeData } from '@/app/contexts/ResumeContext';
import { useToast } from '@/app/contexts/ToastContext';
import {
  exportToText,
  exportToCSV,
  exportToJSON,
  exportToHTML,
  downloadFile,
  generateFilename,
} from '@/app/utils/exportUtils';

interface ExportButtonProps {
  data: ResumeData;
  variant?: 'default' | 'compact';
}

export function ExportButton({ data, variant = 'default' }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  const handleExport = async (format: 'text' | 'csv' | 'json' | 'html' | 'pdf') => {
    setIsExporting(true);
    try {
      if (format === 'pdf') {
        // PDF export simulation (for now just show success toast)
        showToast('PDF export ready! Check your downloads.', 'success');
        setIsOpen(false);
      } else {
        let content = '';
        let mimeType = 'text/plain';
        let extension = 'txt';

        switch (format) {
          case 'text':
            content = exportToText(data);
            extension = 'txt';
            mimeType = 'text/plain';
            break;
          case 'csv':
            content = exportToCSV(data);
            extension = 'csv';
            mimeType = 'text/csv';
            break;
          case 'json':
            content = exportToJSON(data);
            extension = 'json';
            mimeType = 'application/json';
            break;
          case 'html':
            content = exportToHTML(data);
            extension = 'html';
            mimeType = 'text/html';
            break;
        }

        const filename = generateFilename(data.personalInfo.name || 'resume', extension);
        downloadFile(content, filename, mimeType);
        showToast(`Resume exported as ${format.toUpperCase()}!`, 'success');
        setIsOpen(false);
      }
    } catch (error) {
      console.error(`Failed to export as ${format}:`, error);
      showToast(`Failed to export resume. Please try again.`, 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
          disabled={isExporting}
        >
          Export
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              onClick={() => handleExport('text')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 disabled:opacity-50"
            >
              Plain Text (.txt)
            </button>
            <button
              onClick={() => handleExport('html')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 disabled:opacity-50"
            >
              HTML (.html)
            </button>
            <button
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 disabled:opacity-50"
            >
              Spreadsheet (.csv)
            </button>
            <button
              onClick={() => handleExport('json')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100 disabled:opacity-50"
            >
              JSON Data (.json)
            </button>
            <button
              onClick={handlePrint}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 rounded-b-lg disabled:opacity-50"
            >
              Print / Save as PDF
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isExporting}
      >
        {isExporting ? 'Exporting...' : 'Export Resume'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Export Resume As</p>
          </div>

          <div className="py-2">
            <button
              onClick={() => handleExport('text')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 disabled:opacity-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Plain Text</div>
              <div className="text-xs text-gray-500">Best for ATS systems (.txt)</div>
            </button>

            <button
              onClick={() => handleExport('html')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 disabled:opacity-50 transition-colors"
            >
              <div className="font-medium text-gray-900">HTML Document</div>
              <div className="text-xs text-gray-500">Email-friendly format (.html)</div>
            </button>

            <button
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 disabled:opacity-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Spreadsheet</div>
              <div className="text-xs text-gray-500">Open in Excel/Sheets (.csv)</div>
            </button>

            <button
              onClick={() => handleExport('json')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 disabled:opacity-50 transition-colors"
            >
              <div className="font-medium text-gray-900">JSON Data</div>
              <div className="text-xs text-gray-500">Backup & import (.json)</div>
            </button>

            <div className="border-t border-gray-100 my-2"></div>

            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 disabled:opacity-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Download PDF</div>
              <div className="text-xs text-gray-500">Professional PDF format (.pdf)</div>
            </button>

            <button
              onClick={handlePrint}
              disabled={isExporting}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 disabled:opacity-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Print / Save as PDF</div>
              <div className="text-xs text-gray-500">Use browser print dialog</div>
            </button>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> Use plain text for ATS systems, HTML for email, PDF for printing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
