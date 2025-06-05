
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
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant layout',
      preview: 'bg-gradient-to-br from-slate-500 to-slate-700'
    },
    {
      id: 'tech',
      name: 'Tech Professional',
      description: 'Perfect for software developers',
      preview: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Sophisticated design for leadership roles',
      preview: 'bg-gradient-to-br from-amber-600 to-orange-700'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">Choose Your Template</h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/10 backdrop-blur-lg border-white/20 ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-violet-400 shadow-xl scale-105 bg-white/20' 
                : 'hover:bg-white/15'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="p-4">
              <div className={`h-24 rounded-lg mb-3 ${template.preview} relative overflow-hidden shadow-lg`}>
                <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm">
                  <div className="p-2 space-y-1">
                    <div className="h-1.5 bg-white bg-opacity-60 rounded w-3/4"></div>
                    <div className="h-1 bg-white bg-opacity-40 rounded w-1/2"></div>
                    <div className="h-0.5 bg-white bg-opacity-40 rounded w-2/3"></div>
                    <div className="mt-2 space-y-0.5">
                      <div className="h-0.5 bg-white bg-opacity-30 rounded w-full"></div>
                      <div className="h-0.5 bg-white bg-opacity-30 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-white text-sm">{template.name}</h4>
              <p className="text-xs text-gray-300">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
