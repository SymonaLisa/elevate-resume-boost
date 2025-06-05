
import React from 'react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { Card } from '@/components/ui/card';
import { User, FileText, Briefcase, GraduationCap, Zap, Code } from 'lucide-react';

interface ResumeBuilderProps {
  resumeData: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataUpdate: (section: string, data: any) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resumeData,
  activeSection,
  onSectionChange,
  onDataUpdate
}) => {
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'projects', label: 'Projects', icon: Code }
  ];

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(data) => onDataUpdate('personalInfo', data)}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            data={resumeData.summary}
            onUpdate={(data) => onDataUpdate('summary', data)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(data) => onDataUpdate('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(data) => onDataUpdate('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(data) => onDataUpdate('skills', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onUpdate={(data) => onDataUpdate('projects', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Build Your Resume</h3>
      
      {/* Section Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Form */}
      <Card className="p-6">
        {renderActiveForm()}
      </Card>
    </div>
  );
};
