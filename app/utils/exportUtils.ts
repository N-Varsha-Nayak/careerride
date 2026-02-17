import { ResumeData } from '@/app/contexts/ResumeContext';

/**
 * Export resume data to plain text format
 * Suitable for text-based ATS systems and copying
 */
export function exportToText(data: ResumeData, templateStyle: string = 'modern'): string {
  const lines: string[] = [];

  // Header with contact info
  lines.push(data.personalInfo.name.toUpperCase());
  lines.push('='.repeat(60));
  
  const contactInfo = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
  ].filter(Boolean).join(' | ');
  
  lines.push(contactInfo);

  if (data.links.linkedin || data.links.github) {
    const links = [
      data.links.linkedin ? `LinkedIn: ${data.links.linkedin}` : '',
      data.links.github ? `GitHub: ${data.links.github}` : '',
    ].filter(Boolean).join(' | ');
    lines.push(links);
  }

  lines.push('');

  // Summary
  if (data.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('-'.repeat(60));
    lines.push(data.summary);
    lines.push('');
  }

  // Experience
  if (data.experience.length > 0) {
    lines.push('EXPERIENCE');
    lines.push('-'.repeat(60));
    data.experience.forEach((exp) => {
      lines.push(`${exp.position} | ${exp.company}`);
      lines.push(`${exp.startDate} - ${exp.endDate || 'Present'}`);
      lines.push(exp.description);
      lines.push('');
    });
  }

  // Education
  if (data.education.length > 0) {
    lines.push('EDUCATION');
    lines.push('-'.repeat(60));
    data.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field}`);
      lines.push(`${edu.school}`);
      lines.push(`Graduated: ${edu.graduationDate}`);
      lines.push('');
    });
  }

  // Projects
  if (data.projects.length > 0) {
    lines.push('PROJECTS');
    lines.push('-'.repeat(60));
    data.projects.forEach((proj) => {
      lines.push(`${proj.name}`);
      if (proj.technologies.length > 0) {
        lines.push(`Technologies: ${proj.technologies.join(', ')}`);
      }
      lines.push(proj.description);
      const urls = [proj.liveUrl, proj.githubUrl].filter(Boolean);
      if (urls.length > 0) {
        lines.push(`Links: ${urls.join(', ')}`);
      }
      lines.push('');
    });
  }

  // Skills
  if (data.skills && (data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0)) {
    lines.push('SKILLS');
    lines.push('-'.repeat(60));
    if (data.skills.technical.length > 0) {
      lines.push(`Technical: ${data.skills.technical.join(', ')}`);
    }
    if (data.skills.soft.length > 0) {
      lines.push(`Soft Skills: ${data.skills.soft.join(', ')}`);
    }
    if (data.skills.tools.length > 0) {
      lines.push(`Tools & Technologies: ${data.skills.tools.join(', ')}`);
    }
  }

  return lines.join('\n');
}

/**
 * Export resume data to CSV format for spreadsheet applications
 */
export function exportToCSV(data: ResumeData): string {
  const rows: string[] = [];

  // Header
  rows.push(['Field', 'Value'].map(escapeCSV).join(','));

  // Personal Info
  rows.push(['Name', data.personalInfo.name].map(escapeCSV).join(','));
  rows.push(['Email', data.personalInfo.email].map(escapeCSV).join(','));
  rows.push(['Phone', data.personalInfo.phone].map(escapeCSV).join(','));
  rows.push(['Location', data.personalInfo.location].map(escapeCSV).join(','));
  rows.push(['LinkedIn', data.links.linkedin].map(escapeCSV).join(','));
  rows.push(['GitHub', data.links.github].map(escapeCSV).join(','));

  rows.push(['', ''].map(escapeCSV).join(','));
  rows.push(['PROFESSIONAL SUMMARY', ''].map(escapeCSV).join(','));
  rows.push(['', data.summary].map(escapeCSV).join(','));

  rows.push(['', ''].map(escapeCSV).join(','));
  rows.push(['EXPERIENCE', ''].map(escapeCSV).join(','));
  rows.push(['Company', 'Position', 'Start Date', 'End Date', 'Description'].map(escapeCSV).join(','));
  data.experience.forEach((exp) => {
    rows.push(
      [exp.company, exp.position, exp.startDate, exp.endDate || 'Present', exp.description]
        .map(escapeCSV)
        .join(',')
    );
  });

  rows.push(['', ''].map(escapeCSV).join(','));
  rows.push(['EDUCATION', ''].map(escapeCSV).join(','));
  rows.push(['School', 'Degree', 'Field', 'Graduation Date'].map(escapeCSV).join(','));
  data.education.forEach((edu) => {
    rows.push(
      [edu.school, edu.degree, edu.field, edu.graduationDate]
        .map(escapeCSV)
        .join(',')
    );
  });

  rows.push(['', ''].map(escapeCSV).join(','));
  rows.push(['PROJECTS', ''].map(escapeCSV).join(','));
  rows.push(['Name', 'Description', 'Technologies', 'Live URL', 'GitHub URL'].map(escapeCSV).join(','));
  data.projects.forEach((proj) => {
    rows.push(
      [proj.name, proj.description, proj.technologies.join(', '), proj.liveUrl, proj.githubUrl]
        .map(escapeCSV)
        .join(',')
    );
  });

  rows.push(['', ''].map(escapeCSV).join(','));
  rows.push(['SKILLS', ''].map(escapeCSV).join(','));
  rows.push(['Technical', data.skills.technical.join(', ')].map(escapeCSV).join(','));
  rows.push(['Soft Skills', data.skills.soft.join(', ')].map(escapeCSV).join(','));
  rows.push(['Tools & Technologies', data.skills.tools.join(', ')].map(escapeCSV).join(','));

  return rows.join('\n');
}

/**
 * Export resume data to JSON format for backup and re-import
 */
export function exportToJSON(data: ResumeData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Generate HTML for email-friendly resume
 */
export function exportToHTML(data: ResumeData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.name} - Resume</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #1a1a1a;
      margin-bottom: 5px;
    }
    .contact-info {
      text-align: center;
      color: #666;
      margin-bottom: 20px;
      font-size: 14px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #1a1a1a;
      border-bottom: 2px solid #333;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .entry {
      margin-bottom: 15px;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      color: #1a1a1a;
    }
    .entry-subheader {
      color: #666;
      font-size: 14px;
      margin-top: 2px;
    }
    .entry-description {
      margin-top: 5px;
      color: #333;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 5px;
    }
    .tag {
      background: #f0f0f0;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>${data.personalInfo.name}</h1>
  
  <div class="contact-info">
    ${[
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
    ]
      .filter(Boolean)
      .join(' | ')}
    ${
      data.links.linkedin || data.links.github
        ? '<br>' +
          [
            data.links.linkedin ? `<a href="${data.links.linkedin}">LinkedIn</a>` : '',
            data.links.github ? `<a href="${data.links.github}">GitHub</a>` : '',
          ]
            .filter(Boolean)
            .join(' | ')
        : ''
    }
  </div>

  ${
    data.summary
      ? `<div class="section">
    <div class="section-title">Professional Summary</div>
    <p>${data.summary}</p>
  </div>`
      : ''
  }

  ${
    data.experience.length > 0
      ? `<div class="section">
    <div class="section-title">Experience</div>
    ${data.experience
      .map(
        (exp) => `
    <div class="entry">
      <div class="entry-header">
        <span>${exp.position}</span>
        <span>${exp.startDate} - ${exp.endDate || 'Present'}</span>
      </div>
      <div class="entry-subheader">${exp.company}</div>
      <div class="entry-description">${exp.description}</div>
    </div>
    `
      )
      .join('')}
  </div>`
      : ''
  }

  ${
    data.education.length > 0
      ? `<div class="section">
    <div class="section-title">Education</div>
    ${data.education
      .map(
        (edu) => `
    <div class="entry">
      <div class="entry-header">
        <span>${edu.degree} in ${edu.field}</span>
        <span>${edu.graduationDate}</span>
      </div>
      <div class="entry-subheader">${edu.school}</div>
    </div>
    `
      )
      .join('')}
  </div>`
      : ''
  }

  ${
    data.projects.length > 0
      ? `<div class="section">
    <div class="section-title">Projects</div>
    ${data.projects
      .map(
        (proj) => `
    <div class="entry">
      <div class="entry-header">
        <span>${proj.name}</span>
        <div style="display: flex; gap: 10px;">
          ${proj.liveUrl ? `<a href="${proj.liveUrl}" style="color: #0066cc; text-decoration: none;">Live</a>` : ''}
          ${proj.githubUrl ? `<a href="${proj.githubUrl}" style="color: #0066cc; text-decoration: none;">GitHub</a>` : ''}
        </div>
      </div>
      ${proj.technologies.length > 0 ? `<div class="tags">${proj.technologies.map((t) => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      <div class="entry-description">${proj.description}</div>
    </div>
    `
      )
      .join('')}
  </div>`
      : ''
  }

  ${
    (data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0)
      ? `<div class="section">
    <div class="section-title">Skills</div>
    ${data.skills.technical.length > 0 ? `<div><strong>Technical:</strong> <div class="tags">${data.skills.technical.map((skill) => `<span class="tag">${skill}</span>`).join('')}</div></div>` : ''}
    ${data.skills.soft.length > 0 ? `<div><strong>Soft Skills:</strong> <div class="tags">${data.skills.soft.map((skill) => `<span class="tag">${skill}</span>`).join('')}</div></div>` : ''}
    ${data.skills.tools.length > 0 ? `<div><strong>Tools & Technologies:</strong> <div class="tags">${data.skills.tools.map((skill) => `<span class="tag">${skill}</span>`).join('')}</div></div>` : ''}
  </div>`
      : ''
  }
</body>
</html>`;
}

/**
 * Helper function to escape CSV values
 */
function escapeCSV(value: string): string {
  if (value === undefined || value === null) return '';
  value = String(value);
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Download file helper
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate recommended filename with timestamp
 */
export function generateFilename(name: string, extension: string): string {
  const sanitized = name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
  const date = new Date().toISOString().split('T')[0];
  return `${sanitized}_resume_${date}.${extension}`;
}
