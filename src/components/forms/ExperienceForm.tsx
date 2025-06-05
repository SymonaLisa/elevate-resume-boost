
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onUpdate }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdate([...data, newExperience]);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-800">Work Experience</h4>
        <Button onClick={addExperience} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center bg-gray-50">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addExperience} variant="outline">
            Add Your First Experience
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((experience) => (
            <Card key={experience.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h5 className="font-medium text-gray-800">Experience Entry</h5>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Enhance</span>
                  </Button>
                  <Button
                    onClick={() => removeExperience(experience.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={experience.title}
                    onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Tech Corp Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label>Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="• Developed scalable web applications using React and Node.js&#10;• Led team of 3 developers to deliver projects 20% ahead of schedule&#10;• Implemented CI/CD pipelines reducing deployment time by 50%"
                  className="min-h-[100px] mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use bullet points to highlight key achievements and quantify results when possible
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
