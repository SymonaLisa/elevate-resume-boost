
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: any;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8 rounded-lg mb-6">
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 tracking-wide">
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
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {summary && (
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Creative Vision
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
              Experience Journey
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={exp.id} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                          <p className="text-purple-600 font-semibold text-lg">{exp.company}</p>
                          {exp.location && <p className="text-gray-600">{exp.location}</p>}
                        </div>
                        <span className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full text-sm text-purple-700 font-medium">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700 whitespace-pre-line">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
              Creative Arsenal
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg transform hover:scale-105 transition-transform"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education & Projects in sidebar style */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Learning Path
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-purple-600 font-medium">{edu.school}</p>
                    <div className="flex justify-between items-center mt-2">
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
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Creative Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <div key={project.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 text-sm hover:underline"
                        >
                          View
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="text-purple-600 text-sm font-medium mb-1">{project.technologies}</p>
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
