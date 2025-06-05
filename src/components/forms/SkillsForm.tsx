
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Sparkles, Target } from 'lucide-react';

interface SkillsFormProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onUpdate([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onUpdate(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const popularSkills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 
    'Project Management', 'Communication', 'Leadership', 'Problem Solving',
    'Data Analysis', 'SQL', 'AWS', 'Git', 'Agile'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-white">Skills</h4>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2 border-violet-400/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 hover:text-white">
            <Sparkles className="h-4 w-4" />
            <span>AI Suggest</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2 border-cyan-400/50 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 hover:text-white">
            <Target className="h-4 w-4" />
            <span>Industry Keywords</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a skill..."
              className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Button 
            onClick={addSkill} 
            disabled={!newSkill.trim()}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {data.length > 0 && (
          <div className="space-y-2">
            <Label className="text-gray-200">Your Skills</Label>
            <div className="flex flex-wrap gap-2">
              {data.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 border border-violet-400/30 transition-colors"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/5 border border-white/20 p-4 rounded-lg">
          <Label className="text-sm font-medium text-gray-200 mb-2 block">
            Popular Skills (click to add)
          </Label>
          <div className="flex flex-wrap gap-2">
            {popularSkills
              .filter(skill => !data.includes(skill))
              .map((skill) => (
                <Button
                  key={skill}
                  onClick={() => onUpdate([...data, skill])}
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  {skill}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
