
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Geometric background elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-500/8 to-blue-600/8 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full filter blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Subtle diagonal lines */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Resume Builder
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes with AI-powered content suggestions
            </p>
          </div>

          <TemplateSelector 
            selectedTemplate={resumeData.selectedTemplate}
            onTemplateChange={(template) => updateResumeData('selectedTemplate', template)}
          />

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 hover:bg-white/[0.07] transition-all duration-300">
              <ResumeBuilder 
                resumeData={resumeData}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onDataUpdate={updateResumeData}
              />
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 sticky top-8 hover:bg-white/[0.07] transition-all duration-300">
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
