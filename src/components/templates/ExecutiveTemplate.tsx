
import React from 'react';

interface ExecutiveTemplateProps {
  data: any;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white font-serif">
      {/* Header */}
      <div className="text-center py-8 border-b-4 border-gray-800">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-gray-600 space-y-2">
          <div className="flex justify-center space-x-6 text-lg">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
          <div className="flex justify-center space-x-6">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>•</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
          {personalInfo.website && (
            <div className="text-center">{personalInfo.website}</div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center uppercase tracking-widest">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase tracking-widest">
              Leadership Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp: any) => (
                <div key={exp.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{exp.title}</h3>
                    <p className="text-xl text-gray-600 font-semibold">{exp.company}</p>
                    <div className="flex justify-center space-x-4 text-gray-500 mt-2">
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      {exp.location && <span>•</span>}
                      {exp.location && <span>{exp.location}</span>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Core Competencies */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase tracking-widest">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="text-center p-3 border border-gray-300 rounded bg-gray-50"
                >
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Additional Sections */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-widest">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="font-bold text-gray-800 text-lg">{edu.degree}</h3>
                    <p className="text-gray-600 font-semibold">{edu.school}</p>
                    <div className="text-gray-500 text-sm mt-1">
                      {edu.location && <span>{edu.location} • </span>}
                      <span>{edu.graduationDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects/Achievements */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase tracking-widest">
                Key Achievements
              </h2>
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <div key={project.id} className="text-center">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    {project.technologies && (
                      <p className="text-gray-600 text-sm font-medium mb-1">{project.technologies}</p>
                    )}
                    {project.description && (
                      <p className="text-gray-700 text-sm">{project.description}</p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm hover:underline"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
