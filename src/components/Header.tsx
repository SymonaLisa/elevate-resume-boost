
import React from 'react';
import { FileText, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">ResumeAI</h2>
              <p className="text-sm text-gray-500">Professional Resume Builder</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Suggestions</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
