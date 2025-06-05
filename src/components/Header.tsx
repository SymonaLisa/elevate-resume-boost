
import React from 'react';
import { FileText, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-violet-500 to-cyan-500 p-3 rounded-xl shadow-lg">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                ResumeFlow AI
              </h2>
              <p className="text-sm text-gray-400">Professional Resume Builder</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2 border-white/20 text-white hover:bg-white/10">
              <Sparkles className="h-4 w-4" />
              <span>AI Suggestions</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
