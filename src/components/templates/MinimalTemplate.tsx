
import React from 'react';

interface MinimalTemplateProps {
  data: any;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white font-mono text-sm">
      {/* Header */}
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-black mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-gray-600 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-black">{exp.title}</h3>
                    <span className="text-xs text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="text-gray-700">{exp.company}</p>
                    {exp.location && <span className="text-xs text-gray-600">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-xs whitespace-pre-line mt-1">
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
            <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu: any) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-black">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                    {edu.location && <p className="text-xs text-gray-600">{edu.location}</p>}
                  </div>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Skills
            </h2>
            <div className="text-gray-700">
              {skills.join(' • ')}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project: any) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-black">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-gray-600 underline">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-700 text-xs">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-xs">{project.description}</p>
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
