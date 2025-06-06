
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target, CheckCircle, Loader2, TrendingUp } from 'lucide-react';
import { aiService, AIResponse } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';

interface AIEnhancedFormProps {
  content: string;
  onContentUpdate: (content: string) => void;
  type: 'summary' | 'experience' | 'skills';
  placeholder: string;
  label: string;
}

export const AIEnhancedForm: React.FC<AIEnhancedFormProps> = ({
  content,
  onContentUpdate,
  type,
  placeholder,
  label
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isCheckingATS, setIsCheckingATS] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await aiService.generateContent({ type });
      setAiResponse(response);
      setShowSuggestions(true);
      toast({
        title: "AI Content Generated",
        description: "Review the suggestions and click to apply.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptimize = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please add some content first.",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    try {
      const response = await aiService.generateContent({ 
        type: 'optimize', 
        currentContent: content 
      });
      setAiResponse(response);
      setShowSuggestions(true);
      toast({
        title: "Content Optimized",
        description: `Optimization score: ${response.score}/100`,
      });
    } catch (error) {
      toast({
        title: "Optimization Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleATSCheck = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please add some content first.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingATS(true);
    try {
      const response = await aiService.generateContent({ 
        type: 'ats-check', 
        currentContent: content 
      });
      setAiResponse(response);
      setShowSuggestions(true);
      toast({
        title: "ATS Check Complete",
        description: `ATS Score: ${response.score}/100`,
      });
    } catch (error) {
      toast({
        title: "ATS Check Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingATS(false);
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    if (type === 'summary' && aiResponse?.content) {
      onContentUpdate(aiResponse.content);
      setShowSuggestions(false);
      toast({
        title: "Content Applied",
        description: "AI-generated content has been applied.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-200">{label}</label>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 border-violet-400/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 hover:text-white"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>Generate</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="flex items-center space-x-2 border-cyan-400/50 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 hover:text-white"
          >
            {isOptimizing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Target className="h-4 w-4" />
            )}
            <span>Optimize</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleATSCheck}
            disabled={isCheckingATS}
            className="flex items-center space-x-2 border-emerald-400/50 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 hover:text-white"
          >
            {isCheckingATS ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <span>ATS Check</span>
          </Button>
        </div>
      </div>

      <Textarea
        value={content}
        onChange={(e) => onContentUpdate(e.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
      />

      {showSuggestions && aiResponse && (
        <Card className="p-4 bg-violet-500/10 border-violet-400/20">
          {aiResponse.score && (
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4 text-violet-400" />
              <span className="text-violet-200 font-medium">
                Score: {aiResponse.score}/100
              </span>
              <Badge 
                variant={aiResponse.score >= 90 ? "default" : "secondary"}
                className="ml-2"
              >
                {aiResponse.score >= 90 ? "Excellent" : aiResponse.score >= 80 ? "Good" : "Needs Improvement"}
              </Badge>
            </div>
          )}

          {aiResponse.content && type === 'summary' && (
            <div className="mb-3">
              <h5 className="font-medium text-violet-200 mb-2 flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>AI Generated Content</span>
              </h5>
              <button
                onClick={() => handleApplySuggestion(aiResponse.content)}
                className="block w-full text-left p-3 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors text-sm text-gray-200 hover:text-white"
              >
                {aiResponse.content}
              </button>
            </div>
          )}

          {aiResponse.suggestions && aiResponse.suggestions.length > 0 && (
            <div>
              <h5 className="font-medium text-violet-200 mb-2">Suggestions for Improvement:</h5>
              <ul className="space-y-1">
                {aiResponse.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                    <span className="text-violet-400 mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {aiResponse.improvements && aiResponse.improvements.length > 0 && (
            <div className="mt-3">
              <h5 className="font-medium text-violet-200 mb-2">Recommended Improvements:</h5>
              <ul className="space-y-1">
                {aiResponse.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSuggestions(false)}
            className="mt-3 text-gray-400 hover:text-white"
          >
            Close
          </Button>
        </Card>
      )}
    </div>
  );
};
