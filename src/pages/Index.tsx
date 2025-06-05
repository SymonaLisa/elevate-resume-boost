
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Resume Builder
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes with AI-powered content suggestions
            </p>
          </div>

          <TemplateSelector 
            selectedTemplate={resumeData.selectedTemplate}
            onTemplateChange={(template) => updateResumeData('selectedTemplate', template)}
          />

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">
              <ResumeBuilder 
                resumeData={resumeData}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onDataUpdate={updateResumeData}
              />
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6 sticky top-8">
              <ResumePreview 
                resumeData={resumeData}
                template={resumeData.selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
