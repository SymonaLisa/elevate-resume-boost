
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onUpdate }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    onUpdate([...data, newProject]);
  };

  const updateProject = (id: string, field: string, value: string) => {
    const updated = data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    onUpdate(updated);
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-800">Projects</h4>
        <Button onClick={addProject} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center bg-gray-50">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <Button onClick={addProject} variant="outline">
            Add Your First Project
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h5 className="font-medium text-gray-800">Project Entry</h5>
                <Button
                  onClick={() => removeProject(project.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <Input
                    value={project.technologies}
                    onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label>Project Link</Label>
                <div className="flex space-x-2">
                  <Input
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="flex-1"
                  />
                  {project.link && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Developed a full-stack e-commerce platform with user authentication, payment processing, and inventory management..."
                  className="min-h-[80px]"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
