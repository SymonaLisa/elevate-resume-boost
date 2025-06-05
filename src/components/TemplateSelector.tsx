
import React from 'react';
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean design with accent colors',
      preview: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      description: 'Traditional layout for corporate roles',
      preview: 'bg-gradient-to-br from-gray-600 to-gray-800'
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Bold design for creative industries',
      preview: 'bg-gradient-to-br from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Template</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="p-4">
              <div className={`h-32 rounded-lg mb-3 ${template.preview} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm">
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-white bg-opacity-60 rounded w-3/4"></div>
                    <div className="h-1.5 bg-white bg-opacity-40 rounded w-1/2"></div>
                    <div className="h-1 bg-white bg-opacity-40 rounded w-2/3"></div>
                    <div className="mt-3 space-y-1">
                      <div className="h-1 bg-white bg-opacity-30 rounded w-full"></div>
                      <div className="h-1 bg-white bg-opacity-30 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
