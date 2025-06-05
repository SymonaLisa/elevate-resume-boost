
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
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-cyan-950 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute top-64 right-20 w-40 h-40 bg-gradient-to-br from-violet-400/15 to-purple-500/15 rounded-full filter blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 right-1/3 w-24 h-24 bg-gradient-to-br from-pink-400/25 to-rose-500/25 rounded-full filter blur-xl animate-pulse animation-delay-3000"></div>
        
        {/* Animated lines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        {/* Radial gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-violet-500/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ResumeFlow AI
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Craft stunning, professional resumes with AI-powered insights and modern templates designed to impress recruiters
            </p>
          </div>

          <TemplateSelector 
            selectedTemplate={resumeData.selectedTemplate}
            onTemplateChange={(template) => updateResumeData('selectedTemplate', template)}
          />

          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/[0.12] hover:border-white/30 transition-all duration-500">
              <ResumeBuilder 
                resumeData={resumeData}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onDataUpdate={updateResumeData}
              />
            </div>
            
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-8 hover:bg-white/[0.12] hover:border-white/30 transition-all duration-500">
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
