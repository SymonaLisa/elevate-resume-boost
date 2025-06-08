
import React from 'react';
import { AIEnhancedForm } from './AIEnhancedForm';

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
  resumeData?: any; // Add resume data as context
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onUpdate, resumeData }) => {
  return (
    <div className="space-y-6">
      <AIEnhancedForm
        content={data}
        onContentUpdate={onUpdate}
        type="summary"
        placeholder="Write a compelling professional summary that highlights your key achievements and expertise. Focus on your unique value proposition and what sets you apart from other candidates..."
        label="Professional Summary"
        context={{
          personalInfo: resumeData?.personalInfo,
          experience: resumeData?.experience,
          skills: resumeData?.skills,
          education: resumeData?.education
        }}
      />
      
      <div className="bg-blue-500/10 border border-blue-400/20 p-4 rounded-lg">
        <h5 className="font-medium text-blue-200 mb-2">Professional Summary Tips:</h5>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>• Keep it concise (3-4 sentences)</li>
          <li>• Include quantified achievements</li>
          <li>• Mention relevant skills and experience</li>
          <li>• Tailor to your target role</li>
          <li>• Use action-oriented language</li>
        </ul>
      </div>
    </div>
  );
};
