
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: any;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 tracking-wide">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-sm">
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
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {summary && (
          <section className="border-l-4 border-amber-600 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wider border-b-2 border-amber-600 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any) => (
                <div key={exp.id} className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                      <p className="text-amber-700 font-semibold text-lg">{exp.company}</p>
                      {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                    <div className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills in two columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b border-amber-600 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id} className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-amber-700 font-medium">{edu.school}</p>
                    <div className="flex justify-between items-center mt-2">
                      {edu.location && <span className="text-gray-600 text-sm">{edu.location}</span>}
                      <span className="text-gray-600 text-sm font-medium">{edu.graduationDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b border-amber-600 pb-2">
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full text-sm font-medium shadow-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wider border-b-2 border-amber-600 pb-2">
              Key Projects & Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <div key={project.id} className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800 text-lg">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 text-sm hover:underline font-medium"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-amber-700 text-sm font-medium mb-2">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
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
