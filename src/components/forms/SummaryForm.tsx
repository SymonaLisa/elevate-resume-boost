
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onUpdate }) => {
  const aiSuggestions = [
    "Experienced software engineer with 5+ years developing scalable web applications...",
    "Results-driven marketing professional with expertise in digital campaigns...",
    "Creative designer passionate about user-centered design and brand development..."
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-800">Professional Summary</h4>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Generate</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Enhance</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key achievements and expertise..."
          className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-200"
        />
        <p className="text-sm text-gray-500">
          Tip: Include 2-3 key achievements and relevant skills for your target role
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-blue-800 mb-2">AI Suggestions</h5>
        <div className="space-y-2">
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onUpdate(suggestion)}
              className="block w-full text-left p-2 bg-white rounded border hover:bg-blue-50 transition-colors text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
