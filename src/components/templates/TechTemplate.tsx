
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Code } from 'lucide-react';

interface TechTemplateProps {
  data: any;
}

export const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white font-mono">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <Code className="h-8 w-8" />
            <h1 className="text-3xl font-bold">
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
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
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        {summary && (
          <section className="border border-emerald-200 rounded-lg p-4 bg-emerald-50">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-emerald-600">//</span>
              <span className="ml-2">About</span>
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-emerald-600">//</span>
              <span className="ml-2">Skills</span>
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {skills.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <span className="text-emerald-400 mr-2">{'>'}</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-emerald-600">//</span>
              <span className="ml-2">Experience</span>
            </h2>
            <div className="space-y-4">
              {experience.map((exp: any, index: number) => (
                <div key={exp.id} className="border-l-4 border-emerald-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{exp.title}</h3>
                      <p className="text-emerald-600 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="bg-emerald-100 px-3 py-1 rounded text-sm text-emerald-700">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-emerald-600">//</span>
              <span className="ml-2">Projects</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project: any) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 text-sm hover:underline"
                      >
                        View &rarr;
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <div className="text-emerald-600 text-sm mb-2 font-mono">
                      [{project.technologies}]
                    </div>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-emerald-600">//</span>
              <span className="ml-2">Education</span>
            </h2>
            <div className="space-y-3">
              {education.map((edu: any) => (
                <div key={edu.id} className="flex justify-between items-start bg-gray-50 p-3 rounded">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-emerald-600">{edu.school}</p>
                    {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
