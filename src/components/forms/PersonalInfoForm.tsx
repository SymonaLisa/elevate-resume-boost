
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersonalInfoFormProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  onUpdate: (data: any) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onUpdate }) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-800">Personal Information</h4>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4" />
          <span>AI Enhance</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@email.com"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>
    </div>
  );
};
