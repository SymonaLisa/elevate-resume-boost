
import React from 'react';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';

interface ResumePreviewProps {
  resumeData: any;
  template: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'tech':
        return <TechTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Live Preview</h3>
        <div className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
          {template.charAt(0).toUpperCase() + template.slice(1)} Template
        </div>
      </div>
      
      <div className="bg-white border border-white/20 rounded-2xl p-6 shadow-2xl h-[calc(100vh-250px)] overflow-y-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};
