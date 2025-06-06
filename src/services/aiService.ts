
import { useToast } from '@/hooks/use-toast';

export interface AIGenerateRequest {
  type: 'summary' | 'experience' | 'skills' | 'optimize' | 'ats-check';
  context?: {
    jobTitle?: string;
    industry?: string;
    experience?: any[];
    skills?: string[];
    targetRole?: string;
  };
  currentContent?: string;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
  score?: number;
  improvements?: string[];
}

class AIService {
  private baseUrl = 'https://api.openai.com/v1/chat/completions';
  
  async generateContent(request: AIGenerateRequest): Promise<AIResponse> {
    // For demo purposes, we'll use predefined responses
    // In a real implementation, this would connect to an AI service
    
    switch (request.type) {
      case 'summary':
        return this.generateSummary(request);
      case 'experience':
        return this.enhanceExperience(request);
      case 'skills':
        return this.suggestSkills(request);
      case 'optimize':
        return this.optimizeContent(request);
      case 'ats-check':
        return this.performATSCheck(request);
      default:
        throw new Error('Unknown AI request type');
    }
  }

  private async generateSummary(request: AIGenerateRequest): Promise<AIResponse> {
    const summaries = [
      "Results-driven professional with 5+ years of experience in software development and project management. Proven track record of delivering scalable solutions that improved system performance by 40% and reduced operational costs by 25%. Expert in modern web technologies with strong leadership and collaboration skills.",
      "Dynamic marketing professional with expertise in digital campaigns, brand development, and data analytics. Successfully managed multi-million dollar campaigns resulting in 35% increase in customer acquisition and 50% improvement in ROI. Strong background in market research and consumer behavior analysis.",
      "Experienced financial analyst with deep expertise in investment strategies, risk assessment, and portfolio management. Track record of generating 20%+ annual returns while maintaining risk-adjusted performance metrics. Strong analytical skills with proficiency in advanced financial modeling and market analysis."
    ];
    
    const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
    
    return {
      content: randomSummary,
      suggestions: [
        "Include specific metrics and achievements",
        "Mention relevant technical skills",
        "Highlight leadership experience",
        "Add industry-specific keywords"
      ]
    };
  }

  private async enhanceExperience(request: AIGenerateRequest): Promise<AIResponse> {
    return {
      content: "Enhanced experience descriptions with quantified achievements and impact metrics",
      suggestions: [
        "Use action verbs to start bullet points",
        "Include specific numbers and percentages",
        "Focus on results and impact",
        "Align with target job requirements"
      ]
    };
  }

  private async suggestSkills(request: AIGenerateRequest): Promise<AIResponse> {
    const skillSets = {
      technical: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'SQL'],
      marketing: ['Google Analytics', 'SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'A/B Testing', 'CRM', 'Email Marketing', 'Brand Management'],
      finance: ['Financial Modeling', 'Risk Analysis', 'Excel/VBA', 'Bloomberg Terminal', 'Portfolio Management', 'Investment Analysis', 'Financial Reporting', 'Regulatory Compliance']
    };

    const randomSkillSet = Object.values(skillSets)[Math.floor(Math.random() * Object.values(skillSets).length)];
    
    return {
      content: randomSkillSet.join(', '),
      suggestions: [
        "Include both technical and soft skills",
        "Match skills to job requirements",
        "Group related skills together",
        "Use industry-standard terminology"
      ]
    };
  }

  private async optimizeContent(request: AIGenerateRequest): Promise<AIResponse> {
    return {
      content: request.currentContent || '',
      score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      improvements: [
        "Add more specific metrics and achievements",
        "Include relevant keywords for your industry",
        "Use stronger action verbs",
        "Improve formatting for better readability",
        "Ensure consistent tense throughout"
      ]
    };
  }

  private async performATSCheck(request: AIGenerateRequest): Promise<AIResponse> {
    const score = Math.floor(Math.random() * 20) + 80; // Random score between 80-100
    
    const improvements = [
      "Use standard section headings (Experience, Education, Skills)",
      "Avoid complex formatting and graphics",
      "Include relevant keywords from job posting",
      "Use simple bullet points",
      "Ensure proper file format (PDF or DOCX)"
    ];

    return {
      content: `ATS Compatibility Score: ${score}/100`,
      score,
      improvements: score < 90 ? improvements : ["Your resume is ATS-optimized!"]
    };
  }

  async analyzeJobMatch(resumeData: any, jobDescription: string): Promise<AIResponse> {
    // Simulate job match analysis
    const matchScore = Math.floor(Math.random() * 30) + 60; // Random score between 60-90
    
    return {
      content: `Job Match Score: ${matchScore}/100`,
      score: matchScore,
      suggestions: [
        "Add more relevant keywords from the job posting",
        "Highlight specific skills mentioned in the requirements",
        "Quantify achievements related to the role",
        "Adjust summary to match the position"
      ]
    };
  }
}

export const aiService = new AIService();
