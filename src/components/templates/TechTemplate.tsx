
import React from 'react';
import { Github, ExternalLink, Code, Database, Globe } from 'lucide-react';

interface TechTemplateProps {
  data: any;
}

export const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white font-mono">
      {/* Header */}
      <div className="bg-black p-6 border-l-4 border-green-400">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-4">~ {personalInfo.fullName || 'developer'}</span>
        </div>
        
        <h1 className="text-3xl font-bold text-green-400 mb-2">
          $ whoami
        </h1>
        <div className="text-xl text-white mb-4">
          {personalInfo.fullName || 'Your Name'}
        </div>
        
        <div className="space-y-1 text-sm text-gray-300">
          {personalInfo.email && (
            <div className="flex items-center space-x-2">
              <span className="text-green-400">email:</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <span className="text-green-400">phone:</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-2">
              <span className="text-green-400">location:</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-2">
              <span className="text-green-400">linkedin:</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center space-x-2">
              <span className="text-green-400">website:</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-lg font-bold text-green-400 mb-3 flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>$ cat about.md</span>
            </h2>
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <p className="text-gray-200 leading-relaxed">{summary}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-green-400 mb-3 flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>$ ls skills/</span>
            </h2>
            <div className="bg-gray-800 p-4 rounded">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skills.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-400">{'>'}</span>
                    <span className="text-gray-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-green-400 mb-3 flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>$ git log --experience</span>
            </h2>
            <div className="space-y-4">
              {experience.map((exp: any) => (
                <div key={exp.id} className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
                      <p className="text-yellow-400 font-semibold">{exp.company}</p>
                      {exp.location && <p className="text-gray-400 text-sm">{exp.location}</p>}
                    </div>
                    <span className="text-gray-400 text-sm bg-gray-700 px-2 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-200 text-sm whitespace-pre-line mt-3 pl-4 border-l-2 border-gray-600">
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
            <h2 className="text-lg font-bold text-green-400 mb-3 flex items-center space-x-2">
              <Github className="h-5 w-5" />
              <span>$ ls projects/</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project: any) => (
                <div key={project.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-yellow-400">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-blue-400 text-sm mb-2">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-200 text-sm">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-green-400 mb-3">$ cat education.log</h2>
            <div className="bg-gray-800 p-4 rounded space-y-3">
              {education.map((edu: any) => (
                <div key={edu.id} className="border-l-2 border-purple-400 pl-4">
                  <h3 className="font-bold text-purple-400">{edu.degree}</h3>
                  <p className="text-yellow-400">{edu.school}</p>
                  <div className="flex justify-between text-gray-400 text-sm">
                    {edu.location && <span>{edu.location}</span>}
                    <span>{edu.graduationDate}</span>
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
