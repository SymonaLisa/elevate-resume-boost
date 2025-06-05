
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Target, CheckCircle } from 'lucide-react';

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onUpdate }) => {
  const aiSuggestions = [
    "Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions that increased user engagement by 40%.",
    "Results-driven marketing professional with expertise in digital campaigns, SEO optimization, and data analytics. Successfully managed campaigns with budgets exceeding $500K, achieving 25% ROI improvement.",
    "Creative UX/UI designer passionate about user-centered design and brand development. Led design initiatives that improved user satisfaction scores by 35% and reduced bounce rates by 20%."
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-white">Professional Summary</h4>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2 border-violet-400/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 hover:text-white">
            <RefreshCw className="h-4 w-4" />
            <span>Generate</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2 border-cyan-400/50 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 hover:text-white">
            <Target className="h-4 w-4" />
            <span>Optimize</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2 border-emerald-400/50 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 hover:text-white">
            <CheckCircle className="h-4 w-4" />
            <span>ATS Check</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-gray-200">Summary</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key achievements and expertise..."
          className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
        <p className="text-sm text-gray-400">
          Tip: Include 2-3 key achievements and relevant skills for your target role
        </p>
      </div>

      <div className="bg-violet-500/10 border border-violet-400/20 p-4 rounded-lg">
        <h5 className="font-medium text-violet-200 mb-2 flex items-center space-x-2">
          <Sparkles className="h-4 w-4" />
          <span>AI Suggestions</span>
        </h5>
        <div className="space-y-2">
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onUpdate(suggestion)}
              className="block w-full text-left p-3 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors text-sm text-gray-200 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
