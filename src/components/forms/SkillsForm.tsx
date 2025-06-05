
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Sparkles } from 'lucide-react';

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
        <h4 className="text-lg font-medium text-gray-800">Skills</h4>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4" />
          <span>AI Suggest</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a skill..."
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <Button onClick={addSkill} disabled={!newSkill.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {data.length > 0 && (
          <div className="space-y-2">
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2">
              {data.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
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
                  className="text-xs"
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
