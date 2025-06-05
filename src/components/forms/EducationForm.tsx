
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onUpdate }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    onUpdate([...data, newEducation]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updated);
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-800">Education</h4>
        <Button onClick={addEducation} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center bg-gray-50">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addEducation} variant="outline">
            Add Your Education
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((education) => (
            <Card key={education.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h5 className="font-medium text-gray-800">Education Entry</h5>
                <Button
                  onClick={() => removeEducation(education.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>School *</Label>
                  <Input
                    value={education.school}
                    onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                    placeholder="Stanford University"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={education.location}
                    onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                    placeholder="Stanford, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Date</Label>
                  <Input
                    type="month"
                    value={education.graduationDate}
                    onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
