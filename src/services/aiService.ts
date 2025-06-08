import { useToast } from '@/hooks/use-toast';

export interface AIGenerateRequest {
  type: 'summary' | 'experience' | 'skills' | 'optimize' | 'ats-check';
  context?: {
    jobTitle?: string;
    industry?: string;
    experience?: any[];
    skills?: string[];
    targetRole?: string;
    personalInfo?: any;
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
    // For demo purposes, we'll use context-aware responses
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
    const { context, currentContent } = request;
    
    // If user has started typing, enhance their existing content
    if (currentContent && currentContent.trim().length > 0) {
      const enhancedSummary = this.enhanceExistingSummary(currentContent, context);
      return {
        content: enhancedSummary,
        suggestions: [
          "Your summary has been enhanced with relevant details from your experience",
          "Consider adding specific metrics from your work history",
          "Highlight skills that match your target role",
          "Ensure the tone matches your industry standards"
        ]
      };
    }
    
    // Original logic for generating from scratch
    const hasExperience = context?.experience && context.experience.length > 0;
    const hasSkills = context?.skills && context.skills.length > 0;
    const name = context?.personalInfo?.fullName || 'Professional';
    
    let summary = '';
    
    if (hasExperience) {
      const experienceCount = context.experience.length;
      const recentJob = context.experience[0];
      const skills = hasSkills ? context.skills.slice(0, 3).join(', ') : 'various technologies';
      
      summary = `${experienceCount > 1 ? 'Experienced' : 'Motivated'} professional with ${experienceCount > 1 ? `${experienceCount}+ years` : 'proven experience'} in ${recentJob?.title || 'their field'}. ${recentJob?.company ? `Currently at ${recentJob.company}, ` : ''}demonstrated expertise in ${skills} and ${experienceCount > 1 ? 'leadership' : 'problem-solving'}. Track record of delivering high-quality solutions and contributing to team success through ${hasSkills && context.skills.length > 3 ? 'technical excellence' : 'dedication and innovation'}.`;
    } else if (hasSkills) {
      const skillCount = context.skills.length;
      const primarySkills = context.skills.slice(0, 3).join(', ');
      
      summary = `Skilled professional with expertise in ${primarySkills}${skillCount > 3 ? ` and ${skillCount - 3}+ other technologies` : ''}. Passionate about leveraging technical skills to create innovative solutions and drive business value. Committed to continuous learning and staying current with industry best practices.`;
    } else {
      summary = `Dedicated professional with a strong foundation in problem-solving and analytical thinking. Eager to contribute technical skills and fresh perspectives to challenging projects. Committed to continuous learning and professional growth in a dynamic environment.`;
    }
    
    return {
      content: summary,
      suggestions: [
        "Include specific metrics and achievements",
        "Mention relevant technical skills from your experience",
        "Highlight leadership or collaboration experience",
        "Add industry-specific keywords relevant to your target role"
      ]
    };
  }

  private enhanceExistingSummary(currentContent: string, context?: any): string {
    const hasExperience = context?.experience && context.experience.length > 0;
    const hasSkills = context?.skills && context.skills.length > 0;
    
    let enhanced = currentContent;
    
    // Add experience details if mentioned but not specific
    if (hasExperience && !enhanced.includes('years') && context.experience.length > 1) {
      enhanced = enhanced.replace(/professional/i, `professional with ${context.experience.length}+ years of experience`);
    }
    
    // Add company name if not mentioned
    if (hasExperience && context.experience[0]?.company && !enhanced.toLowerCase().includes(context.experience[0].company.toLowerCase())) {
      const recentJob = context.experience[0];
      if (enhanced.includes('.')) {
        enhanced = enhanced.replace('.', ` at ${recentJob.company}.`);
      }
    }
    
    // Add skills if not mentioned
    if (hasSkills && context.skills.length > 0) {
      const mentionedSkills = context.skills.filter(skill => 
        enhanced.toLowerCase().includes(skill.toLowerCase())
      );
      
      if (mentionedSkills.length === 0) {
        const topSkills = context.skills.slice(0, 3).join(', ');
        enhanced += ` Skilled in ${topSkills} with a focus on delivering high-quality solutions.`;
      }
    }
    
    return enhanced;
  }

  private async enhanceExperience(request: AIGenerateRequest): Promise<AIResponse> {
    const { context, currentContent } = request;
    
    let enhancedContent = currentContent || '';
    const suggestions = [
      "Start each bullet point with strong action verbs (Led, Developed, Implemented)",
      "Quantify achievements with specific numbers and percentages",
      "Focus on impact and results rather than just responsibilities",
      "Align descriptions with requirements from your target job posting"
    ];

    if (currentContent && currentContent.length > 0) {
      // Add context-specific suggestions based on content
      if (!currentContent.includes('%') && !currentContent.match(/\d+/)) {
        suggestions.unshift("Add specific metrics (e.g., 'increased efficiency by 25%')");
      }
      if (!currentContent.match(/\b(led|managed|developed|implemented|created|designed|optimized)\b/i)) {
        suggestions.unshift("Use stronger action verbs to start your bullet points");
      }
    }
    
    return {
      content: enhancedContent,
      suggestions
    };
  }

  private async suggestSkills(request: AIGenerateRequest): Promise<AIResponse> {
    const { context } = request;
    const existingSkills = context?.skills || [];
    const experience = context?.experience || [];
    
    // Determine likely skill categories based on existing data
    let suggestedSkills: string[] = [];
    
    // Analyze existing experience for skill suggestions
    const jobTitles = experience.map(exp => exp.title?.toLowerCase() || '').join(' ');
    const descriptions = experience.map(exp => exp.description?.toLowerCase() || '').join(' ');
    const allText = (jobTitles + ' ' + descriptions).toLowerCase();
    
    if (allText.includes('software') || allText.includes('developer') || allText.includes('engineer')) {
      suggestedSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'SQL', 'AWS', 'TypeScript'];
    } else if (allText.includes('marketing') || allText.includes('digital')) {
      suggestedSkills = ['Google Analytics', 'SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'A/B Testing', 'CRM', 'Adobe Creative Suite'];
    } else if (allText.includes('finance') || allText.includes('analyst')) {
      suggestedSkills = ['Excel/VBA', 'Financial Modeling', 'Risk Analysis', 'Bloomberg Terminal', 'SQL', 'Python', 'PowerBI', 'Financial Reporting'];
    } else if (allText.includes('design') || allText.includes('ui') || allText.includes('ux')) {
      suggestedSkills = ['Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'CSS', 'HTML'];
    } else if (allText.includes('data') || allText.includes('analytics')) {
      suggestedSkills = ['Python', 'R', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Machine Learning', 'Statistics'];
    } else {
      // Generic professional skills
      suggestedSkills = ['Microsoft Office', 'Project Management', 'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management', 'Analytical Thinking'];
    }
    
    // Filter out existing skills
    const newSkills = suggestedSkills.filter(skill => 
      !existingSkills.some(existing => 
        existing.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(existing.toLowerCase())
      )
    );
    
    const skillsToShow = newSkills.length > 0 ? newSkills.slice(0, 6) : suggestedSkills.slice(0, 6);
    
    return {
      content: skillsToShow.join(', '),
      suggestions: [
        "Include both technical and soft skills relevant to your target role",
        "Match skills to specific job requirements you're applying for",
        "Group related skills together (e.g., 'Programming Languages: JavaScript, Python')",
        "Use industry-standard terminology and certifications",
        "Consider adding skill proficiency levels if relevant"
      ]
    };
  }

  private async optimizeContent(request: AIGenerateRequest): Promise<AIResponse> {
    const { currentContent } = request;
    
    if (!currentContent) {
      return {
        content: '',
        score: 0,
        improvements: ["Add content to optimize"]
      };
    }
    
    let score = 70; // Base score
    const improvements: string[] = [];
    
    // Analyze content for scoring
    const hasNumbers = /\d+/.test(currentContent);
    const hasPercentages = /%/.test(currentContent);
    const hasActionVerbs = /\b(led|managed|developed|implemented|created|designed|optimized|increased|reduced|improved)\b/i.test(currentContent);
    const wordCount = currentContent.split(/\s+/).length;
    const hasMetrics = /\b(increase|decrease|improve|reduce|grow|save|generate)\w*\s+by\s+\d+/i.test(currentContent);
    
    // Scoring logic
    if (hasNumbers) score += 5;
    if (hasPercentages) score += 5;
    if (hasActionVerbs) score += 10;
    if (hasMetrics) score += 10;
    if (wordCount > 20 && wordCount < 100) score += 5;
    
    // Generate specific improvements
    if (!hasNumbers && !hasPercentages) {
      improvements.push("Add specific metrics and quantified achievements");
    }
    if (!hasActionVerbs) {
      improvements.push("Use stronger action verbs (Led, Developed, Implemented, Optimized)");
    }
    if (wordCount < 10) {
      improvements.push("Expand with more detailed descriptions of your impact");
    }
    if (wordCount > 150) {
      improvements.push("Consider condensing for better readability");
    }
    if (!hasMetrics) {
      improvements.push("Include specific results (e.g., 'increased sales by 25%')");
    }
    
    // Always include these general improvements
    improvements.push("Ensure consistent tense throughout", "Include relevant keywords for your target role");
    
    return {
      content: currentContent,
      score: Math.min(score, 100),
      improvements: improvements.slice(0, 5) // Limit to 5 improvements
    };
  }

  private async performATSCheck(request: AIGenerateRequest): Promise<AIResponse> {
    const { currentContent } = request;
    
    if (!currentContent) {
      return {
        content: 'ATS Compatibility Score: 0/100',
        score: 0,
        improvements: ["Add content to check ATS compatibility"]
      };
    }
    
    let score = 80; // Base ATS score
    const improvements: string[] = [];
    
    // ATS-specific checks
    const hasStandardHeadings = /\b(experience|education|skills|summary)\b/i.test(currentContent);
    const hasComplexFormatting = /[^\w\s.,;:()\-]/.test(currentContent);
    const hasKeywords = currentContent.split(/\s+/).length > 10;
    const hasBulletPoints = /[•\-\*]/.test(currentContent);
    
    if (hasStandardHeadings) score += 5;
    if (!hasComplexFormatting) score += 5;
    if (hasKeywords) score += 5;
    if (hasBulletPoints) score += 5;
    
    // Generate ATS-specific improvements
    if (hasComplexFormatting) {
      improvements.push("Remove special characters and complex formatting");
    }
    if (!hasKeywords) {
      improvements.push("Include more relevant keywords from the job posting");
    }
    
    // Standard ATS improvements
    improvements.push(
      "Use standard section headings (Experience, Education, Skills)",
      "Avoid tables, text boxes, and graphics",
      "Use simple bullet points for lists",
      "Save in ATS-friendly format (PDF or DOCX)",
      "Include relevant keywords naturally in context"
    );

    return {
      content: `ATS Compatibility Score: ${Math.min(score, 100)}/100`,
      score: Math.min(score, 100),
      improvements: score < 95 ? improvements.slice(0, 4) : ["Your content is ATS-optimized!"]
    };
  }

  async analyzeJobMatch(resumeData: any, jobDescription: string): Promise<AIResponse> {
    // Enhanced job match analysis based on actual resume data
    const { experience, skills, summary } = resumeData;
    
    let matchScore = 60; // Base score
    
    // Analyze skills overlap
    if (skills && skills.length > 0) {
      const skillsText = skills.join(' ').toLowerCase();
      const jobText = jobDescription.toLowerCase();
      
      // Simple keyword matching (in real implementation, use more sophisticated NLP)
      const commonWords = skillsText.split(' ').filter(word => 
        word.length > 3 && jobText.includes(word)
      );
      
      matchScore += Math.min(commonWords.length * 3, 25);
    }
    
    // Analyze experience relevance
    if (experience && experience.length > 0) {
      matchScore += Math.min(experience.length * 2, 10);
    }
    
    return {
      content: `Job Match Score: ${Math.min(matchScore, 100)}/100`,
      score: Math.min(matchScore, 100),
      suggestions: [
        "Add relevant keywords from the job posting to your summary",
        "Highlight specific skills mentioned in the job requirements",
        "Quantify achievements that relate to the role's responsibilities",
        "Tailor your professional summary to match the position",
        "Include industry-specific terminology used in the job description"
      ]
    };
  }
}

export const aiService = new AIService();
