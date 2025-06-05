
import React, { useState } from 'react';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { ResumePreview } from '@/components/ResumePreview';
import { Header } from '@/components/Header';
import { TemplateSelector } from '@/components/TemplateSelector';

const Index = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    selectedTemplate: 'modern'
  });

  const [activeSection, setActiveSection] = useState('personal');

  const updateResumeData = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Resume Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes with AI-powered content suggestions
          </p>
        </div>

        <TemplateSelector 
          selectedTemplate={resumeData.selectedTemplate}
          onTemplateChange={(template) => updateResumeData('selectedTemplate', template)}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ResumeBuilder 
              resumeData={resumeData}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onDataUpdate={updateResumeData}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <ResumePreview 
              resumeData={resumeData}
              template={resumeData.selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
