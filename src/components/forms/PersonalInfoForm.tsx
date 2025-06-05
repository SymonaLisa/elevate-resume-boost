
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
        <h4 className="text-lg font-medium text-white">Personal Information</h4>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 border-violet-400/50 bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 hover:text-white">
          <Sparkles className="h-4 w-4" />
          <span>AI Enhance</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-200">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@email.com"
            className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-200">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-gray-200">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-gray-200">Website/Portfolio</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
            className="transition-all duration-200 focus:ring-2 focus:ring-violet-400 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
