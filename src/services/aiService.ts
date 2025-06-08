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
    
    // If user has typed content, enhance and expand it
    if (currentContent && currentContent.trim().length > 0) {
      const enhancedSummary = this.enhanceUserTypedContent(currentContent, context);
      return {
        content: enhancedSummary,
        suggestions: this.getContentBasedSuggestions(currentContent, context)
      };
    }
    
    // If no content typed, generate from context
    return this.generateFromContext(context);
  }

  private enhanceUserTypedContent(currentContent: string, context?: any): string {
    const { experience, skills, personalInfo } = context || {};
    let enhanced = currentContent.trim();
    
    // Analyze what user has written to determine enhancement strategy
    const contentLower = enhanced.toLowerCase();
    const words = enhanced.split(/\s+/);
    const sentences = enhanced.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // If content is very short (1-3 words), expand it significantly
    if (words.length <= 3) {
      enhanced = this.expandShortContent(enhanced, context);
    }
    // If content is a single sentence, add complementary sentences
    else if (sentences.length === 1) {
      enhanced = this.expandSingleSentence(enhanced, context);
    }
    // If content has multiple sentences, enhance each aspect
    else {
      enhanced = this.enhanceMultipleSentences(enhanced, context);
    }
    
    return enhanced;
  }

  private expandShortContent(content: string, context?: any): string {
    const { experience, skills, personalInfo } = context || {};
    const contentLower = content.toLowerCase();
    
    // Check what the user started with and build around it
    if (contentLower.includes('developer') || contentLower.includes('engineer')) {
      const yearsExp = experience?.length > 1 ? `${experience.length}+ years` : 'proven experience';
      const topSkills = skills?.slice(0, 3).join(', ') || 'modern technologies';
      const company = experience?.[0]?.company || 'leading organizations';
      
      return `${content} with ${yearsExp} in software development. Currently contributing to innovative projects at ${company}, specializing in ${topSkills}. Proven track record of delivering scalable solutions and collaborating effectively with cross-functional teams to drive technical excellence.`;
    }
    
    if (contentLower.includes('manager') || contentLower.includes('lead')) {
      const teamSize = experience?.length > 2 ? 'multiple teams' : 'development teams';
      const industry = experience?.[0]?.company || 'technology sector';
      
      return `${content} with extensive experience leading ${teamSize} and driving strategic initiatives. Demonstrated success in ${industry}, combining technical expertise with strong leadership skills to deliver exceptional results and foster team growth.`;
    }
    
    if (contentLower.includes('designer') || contentLower.includes('creative')) {
      const designTools = skills?.filter(s => s.toLowerCase().includes('design') || s.toLowerCase().includes('figma') || s.toLowerCase().includes('adobe'))?.slice(0, 2).join(' and ') || 'industry-standard design tools';
      
      return `${content} passionate about creating intuitive and visually compelling user experiences. Proficient in ${designTools} with a strong foundation in user-centered design principles. Experienced in collaborating with development teams to bring creative visions to life.`;
    }
    
    // Generic enhancement for other content
    const skills_text = skills?.slice(0, 3).join(', ') || 'various technologies';
    const exp_context = experience?.length > 0 ? `with experience at ${experience[0].company || 'leading organizations'}` : 'with a strong professional background';
    
    return `${content} ${exp_context}. Skilled in ${skills_text} and committed to delivering high-quality results. Passionate about continuous learning and contributing to team success through collaboration and innovation.`;
  }

  private expandSingleSentence(content: string, context?: any): string {
    const { experience, skills } = context || {};
    let enhanced = content;
    
    // Add specific experience details
    if (experience?.length > 0) {
      const recentRole = experience[0];
      if (recentRole.company && !content.toLowerCase().includes(recentRole.company.toLowerCase())) {
        enhanced += ` Currently contributing to innovative projects at ${recentRole.company}.`;
      }
      
      if (recentRole.description && experience.length > 1) {
        enhanced += ` With ${experience.length}+ years of progressive experience, I have consistently delivered impactful solutions.`;
      }
    }
    
    // Add skills context if relevant
    if (skills?.length > 0 && !this.hasSkillsMentioned(content, skills)) {
      const relevantSkills = skills.slice(0, 3).join(', ');
      enhanced += ` Expertise includes ${relevantSkills} with a focus on best practices and continuous improvement.`;
    }
    
    return enhanced;
  }

  private enhanceMultipleSentences(content: string, context?: any): string {
    const { experience, skills } = context || {};
    let enhanced = content;
    
    // Check if quantified achievements are missing
    if (!/\d+(%|years|projects|teams)/.test(content) && experience?.length > 1) {
      enhanced += ` With ${experience.length}+ years of proven experience, I have successfully delivered numerous high-impact projects.`;
    }
    
    // Check if specific skills are missing
    if (skills?.length > 0 && !this.hasSkillsMentioned(content, skills)) {
      const unmentiondSkills = skills.filter(skill => 
        !content.toLowerCase().includes(skill.toLowerCase())
      ).slice(0, 2);
      
      if (unmentiondSkills.length > 0) {
        enhanced += ` Technical proficiencies include ${unmentiondSkills.join(' and ')}.`;
      }
    }
    
    // Add value proposition if missing
    if (!content.toLowerCase().includes('value') && !content.toLowerCase().includes('impact') && !content.toLowerCase().includes('results')) {
      enhanced += ` Committed to driving measurable business value through innovative solutions and collaborative leadership.`;
    }
    
    return enhanced;
  }

  private hasSkillsMentioned(content: string, skills: string[]): boolean {
    const contentLower = content.toLowerCase();
    return skills.some(skill => contentLower.includes(skill.toLowerCase()));
  }

  private getContentBasedSuggestions(content: string, context?: any): string[] {
    const suggestions: string[] = [];
    const contentLower = content.toLowerCase();
    const { experience, skills } = context || {};
    
    // Analyze what's missing and provide specific suggestions
    if (!/\d+/.test(content)) {
      suggestions.push("Consider adding specific numbers (years of experience, team size, project count)");
    }
    
    if (!/%/.test(content)) {
      suggestions.push("Include quantified achievements (e.g., 'increased efficiency by 25%')");
    }
    
    if (!/\b(led|managed|developed|created|implemented|optimized|delivered)\b/i.test(content)) {
      suggestions.push("Start sentences with strong action verbs (Led, Developed, Implemented)");
    }
    
    if (skills?.length > 0 && !this.hasSkillsMentioned(content, skills)) {
      suggestions.push(`Mention relevant skills from your profile: ${skills.slice(0, 3).join(', ')}`);
    }
    
    if (experience?.length > 0 && !contentLower.includes(experience[0]?.company?.toLowerCase() || '')) {
      suggestions.push("Consider mentioning your current/recent company to add credibility");
    }
    
    if (!contentLower.includes('passion') && !contentLower.includes('committed') && !contentLower.includes('dedicated')) {
      suggestions.push("Add personality by mentioning your passion or commitment to the field");
    }
    
    return suggestions.slice(0, 4); // Limit to most relevant suggestions
  }

  private generateFromContext(context?: any): { content: string; suggestions: string[] } {
    // ... keep existing code (original generateFromContext logic)
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
