
import React from 'react';
import { FileText, Download, Sparkles, Target, CheckCircle, FileType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 border-violet-400/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 hover:text-white transition-all duration-200">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Suggestions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-slate-800/95 backdrop-blur-lg border-white/20">
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Content
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <Target className="h-4 w-4 mr-2" />
                  Keyword Optimization
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  ATS Compatibility Check
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <FileType className="h-4 w-4 mr-2" />
                  Job Match Analysis
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-slate-800/95 backdrop-blur-lg border-white/20">
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <FileType className="h-4 w-4 mr-2" />
                  Export as DOCX
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-white/10 cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as HTML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
