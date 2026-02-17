'use client';

import { ResumeData } from '@/app/contexts/ResumeContext';
import { useTemplate, COLOR_THEMES } from '@/app/contexts/TemplateContext';

interface ResumePreviewProps {
  data: ResumeData;
  minimal?: boolean;
}

export function ResumePreview({ data, minimal = false }: ResumePreviewProps) {
  const { template, colorTheme } = useTemplate();
  const accentColor = COLOR_THEMES[colorTheme].hsl;

  const hasAnyData =
    data.personalInfo.name ||
    data.summary ||
    data.education.length > 0 ||
    data.experience.length > 0 ||
    data.projects.length > 0 ||
    data.skills;

  if (!hasAnyData && !minimal) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 mb-2">📄</div>
          <p className="text-sm text-gray-600">Your resume will appear here</p>
        </div>
      </div>
    );
  }

  // Template styles with color support
  const getStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: 'flex',
          sidebar: 'w-1/3 p-6 text-white',
          sidebarBg: accentColor,
          main: 'w-2/3 p-8',
          header: 'mb-6',
          sectionTitleColor: accentColor,
          sectionTitle: 'text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b-2',
          nameSize: 'text-3xl',
          nameWeight: 'font-bold',
          spacing: 'mb-5',
          skillBadgeBg: accentColor,
        };
      case 'minimal':
        return {
          container: '',
          sidebar: '',
          sidebarBg: '',
          main: '',
          header: 'mb-4',
          sectionTitleColor: accentColor,
          sectionTitle: 'text-xs font-semibold uppercase tracking-wide mb-2',
          nameSize: 'text-2xl',
          nameWeight: 'font-semibold',
          spacing: 'mb-4',
          skillBadgeBg: 'bg-gray-100',
        };
      case 'classic':
      default:
        return {
          container: 'border-l-4',
          containerBorder: accentColor,
          sidebar: '',
          sidebarBg: '',
          main: '',
          header: 'border-b-2 pb-4 mb-6',
          headerBorder: accentColor,
          sectionTitleColor: accentColor,
          sectionTitle: 'text-sm font-semibold tracking-wide uppercase mb-3 border-b pb-2',
          nameSize: 'text-3xl',
          nameWeight: 'font-bold',
          spacing: 'mb-6',
          skillBadgeBg: 'bg-gray-100',
        };
    }
  };

  const styles = getStyles();

  // Modern template with sidebar layout
  if (template === 'modern') {
    return (
      <div
        className={`${minimal ? '' : 'bg-white rounded-lg border border-gray-200'} text-gray-900 flex`}
      >
        {/* Sidebar */}
        <div
          className="w-1/3 p-8 text-white"
          style={{ backgroundColor: accentColor }}
        >
          <div className="mb-6">
            {data.personalInfo.name && (
              <h1 className="text-2xl font-bold mb-4">{data.personalInfo.name}</h1>
            )}
            <div className="space-y-2 text-xs">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              {data.links.github && (
                <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                  {data.links.github}
                </a>
              )}
              {data.links.linkedin && (
                <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                  {data.links.linkedin}
                </a>
              )}
            </div>
          </div>

          {/* Sidebar Skills */}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-white pb-2">Skills</h2>
              <div className="space-y-3 text-xs">
                {data.skills.technical.length > 0 && (
                  <div>
                    <p className="font-semibold mb-1">Technical</p>
                    <div className="space-y-1">
                      {data.skills.technical.map((skill, idx) => (
                        <div key={idx}>{skill}</div>
                      ))}
                    </div>
                  </div>
                )}
                {data.skills.soft.length > 0 && (
                  <div>
                    <p className="font-semibold mb-1">Soft Skills</p>
                    <div className="space-y-1">
                      {data.skills.soft.map((skill, idx) => (
                        <div key={idx}>{skill}</div>
                      ))}
                    </div>
                  </div>
                )}
                {data.skills.tools.length > 0 && (
                  <div>
                    <p className="font-semibold mb-1">Tools</p>
                    <div className="space-y-1">
                      {data.skills.tools.map((skill, idx) => (
                        <div key={idx}>{skill}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8 space-y-5">
          {/* Summary */}
          {data.summary && (
            <div>
              <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Experience
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 text-xs">{exp.position}</h3>
                      <span className="text-xs text-gray-600">
                        {exp.startDate}
                        {exp.endDate && ` – ${exp.endDate}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
                    {exp.description && <p className="text-xs text-gray-700">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 text-xs">
                        {edu.degree} in {edu.field}
                      </h3>
                      <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                    </div>
                    <p className="text-xs text-gray-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-xs flex-1">{project.name}</h3>
                      <div className="flex gap-2 flex-shrink-0">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 text-xs"
                            title="Live URL"
                          >
                            🔗
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 text-xs"
                            title="GitHub"
                          >
                            💻
                          </a>
                        )}
                      </div>
                    </div>
                    {project.description && <p className="text-xs text-gray-700 mt-1">{project.description}</p>}
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Classic and Minimal templates
  return (
    <div
      className={`${minimal ? '' : 'bg-white rounded-lg border border-gray-200 p-12'} text-gray-900`}
      style={
        template === 'classic'
          ? { borderLeft: `4px solid ${accentColor}` }
          : {}
      }
    >
      {/* Header */}
      <div
        className={styles.header}
        style={
          template === 'classic'
            ? { borderBottomColor: accentColor }
            : {}
        }
      >
        {data.personalInfo.name && (
          <h1 className={`${styles.nameSize} ${styles.nameWeight} tracking-tight mb-2`}>
            {data.personalInfo.name}
          </h1>
        )}
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.links.github && (
            <a
              href={data.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 hover:underline"
            >
              GitHub
            </a>
          )}
          {data.links.linkedin && (
            <a
              href={data.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={styles.spacing}>
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className={styles.spacing}>
          <h2
            className={styles.sectionTitle}
            style={{ color: accentColor, borderBottomColor: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-xs">{exp.position}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate}
                    {exp.endDate && ` – ${exp.endDate}`}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
                {exp.description && <p className="text-xs text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className={styles.spacing}>
          <h2
            className={styles.sectionTitle}
            style={{ color: accentColor, borderBottomColor: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-xs">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className={styles.spacing}>
          <h2
            className={styles.sectionTitle}
            style={{ color: accentColor, borderBottomColor: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 text-xs flex-1">{project.name}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 text-xs"
                        title="Live URL"
                      >
                        🔗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 text-xs"
                        title="GitHub"
                      >
                        💻
                      </a>
                    )}
                  </div>
                </div>
                {project.description && <p className="text-xs text-gray-700 mt-1">{project.description}</p>}
                {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
        <div>
          <h2
            className={styles.sectionTitle}
            style={{ color: accentColor, borderBottomColor: accentColor }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {data.skills.technical.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Technical</p>
                <div className="flex flex-wrap gap-1">
                  {data.skills.technical.map((skill, idx) => (
                    <span key={idx} className="inline-block bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {data.skills.soft.map((skill, idx) => (
                    <span key={idx} className="inline-block bg-green-100 text-green-900 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.tools.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Tools & Technologies</p>
                <div className="flex flex-wrap gap-1">
                  {data.skills.tools.map((skill, idx) => (
                    <span key={idx} className="inline-block bg-purple-100 text-purple-900 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
