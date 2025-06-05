
import React from 'react';

interface MinimalTemplateProps {
  data: any;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white font-light">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-4xl font-thin text-gray-900 mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm text-gray-600 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
        </div>
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-widest">
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-widest">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-3">
                    <p className="text-gray-600">{exp.company}</p>
                    {exp.location && <span className="text-xs text-gray-500">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-widest">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu: any) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-widest">
              Skills
            </h2>
            <div className="text-sm text-gray-700">
              {skills.join(' • ')}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-gray-900 mb-4 uppercase tracking-widest">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project: any) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-gray-500 underline">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 text-xs mb-1">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
