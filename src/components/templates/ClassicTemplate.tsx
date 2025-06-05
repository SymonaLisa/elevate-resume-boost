
import React from 'react';

interface ClassicTemplateProps {
  data: any;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-center space-x-4">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
          <div className="flex justify-center space-x-4">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>•</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
          {personalInfo.website && (
            <div>{personalInfo.website}</div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.title}</h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="italic text-gray-700">{exp.company}</p>
                    {exp.location && <span className="text-sm text-gray-600">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm whitespace-pre-line ml-4">
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
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu: any) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="italic text-gray-700">{edu.school}</p>
                    {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  </div>
                  <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Core Competencies
            </h2>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {skills.map((skill: string, index: number) => (
                <span key={index} className="text-gray-700">
                  • {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Notable Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project: any) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm text-gray-600 underline">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="italic text-gray-700 text-sm mb-1">{project.technologies}</p>
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
