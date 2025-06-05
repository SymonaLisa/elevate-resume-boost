
import React from 'react';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

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
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
        <div className="text-sm text-gray-500">
          Template: {template.charAt(0).toUpperCase() + template.slice(1)}
        </div>
      </div>
      
      <div className="bg-white border rounded-lg p-6 shadow-sm h-[calc(100vh-200px)] overflow-y-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};
