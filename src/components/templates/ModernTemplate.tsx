
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: any;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center space-x-2 col-span-2">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any) => (
                <div key={exp.id} className="border-l-4 border-blue-200 pl-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                    <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-3">
                    <p className="text-blue-600 font-semibold text-lg">{exp.company}</p>
                    {exp.location && <span className="text-gray-600">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education & Projects */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    <div className="flex justify-between items-center">
                      {edu.location && <span className="text-gray-600 text-sm">{edu.location}</span>}
                      <span className="text-gray-600 text-sm">{edu.graduationDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          View
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="text-blue-600 text-sm font-medium mb-1">{project.technologies}</p>
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
    </div>
  );
};
