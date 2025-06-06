
import { toast } from '@/hooks/use-toast';

interface ExportData {
  personalInfo: any;
  summary: string;
  experience: any[];
  education: any[];
  skills: string[];
  projects: any[];
  selectedTemplate: string;
}

export const exportToPDF = async (resumeData: ExportData) => {
  try {
    // Create a new window with the resume content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Pop-up blocked');
    }

    const htmlContent = generateHTMLContent(resumeData);
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
          <meta charset="utf-8">
          <style>
            ${getPrintStyles()}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
    
    toast({
      title: "PDF Export Ready",
      description: "Print dialog opened. Choose 'Save as PDF' to download.",
    });
  } catch (error) {
    console.error('PDF export error:', error);
    toast({
      title: "Export Error",
      description: "Failed to export PDF. Please try again.",
      variant: "destructive",
    });
  }
};

export const exportToHTML = (resumeData: ExportData) => {
  try {
    const htmlContent = generateHTMLContent(resumeData);
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
          <style>
            ${getWebStyles()}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.fullName || 'resume'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML Export Complete",
      description: "Your resume has been downloaded as an HTML file.",
    });
  } catch (error) {
    console.error('HTML export error:', error);
    toast({
      title: "Export Error",
      description: "Failed to export HTML. Please try again.",
      variant: "destructive",
    });
  }
};

export const exportToWord = (resumeData: ExportData) => {
  try {
    const wordContent = generateWordContent(resumeData);
    const blob = new Blob([wordContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.fullName || 'resume'}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Word Export Complete",
      description: "Your resume has been downloaded as a Word document.",
    });
  } catch (error) {
    console.error('Word export error:', error);
    toast({
      title: "Export Error",
      description: "Failed to export Word document. Please try again.",
      variant: "destructive",
    });
  }
};

const generateHTMLContent = (data: ExportData): string => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  
  return `
    <div class="resume-container">
      <header class="resume-header">
        <h1>${personalInfo.fullName || 'Your Name'}</h1>
        <div class="contact-info">
          ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
          ${personalInfo.linkedin ? `<span>${personalInfo.linkedin}</span>` : ''}
          ${personalInfo.website ? `<span>${personalInfo.website}</span>` : ''}
        </div>
      </header>

      ${summary ? `
        <section class="resume-section">
          <h2>Professional Summary</h2>
          <p>${summary}</p>
        </section>
      ` : ''}

      ${experience.length > 0 ? `
        <section class="resume-section">
          <h2>Experience</h2>
          ${experience.map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <h3>${exp.title}</h3>
                <span class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div class="company">${exp.company}</div>
              ${exp.location ? `<div class="location">${exp.location}</div>` : ''}
              ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${education.length > 0 ? `
        <section class="resume-section">
          <h2>Education</h2>
          ${education.map(edu => `
            <div class="education-item">
              <div class="education-header">
                <h3>${edu.degree}</h3>
                <span class="date">${edu.graduationDate}</span>
              </div>
              <div class="school">${edu.school}</div>
              ${edu.location ? `<div class="location">${edu.location}</div>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${skills.length > 0 ? `
        <section class="resume-section">
          <h2>Skills</h2>
          <div class="skills-list">
            ${skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </section>
      ` : ''}

      ${projects.length > 0 ? `
        <section class="resume-section">
          <h2>Projects</h2>
          ${projects.map(project => `
            <div class="project-item">
              <h3>${project.name}</h3>
              ${project.technologies ? `<div class="technologies">${project.technologies}</div>` : ''}
              ${project.description ? `<div class="description">${project.description}</div>` : ''}
              ${project.link ? `<div class="link"><a href="${project.link}" target="_blank">${project.link}</a></div>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}
    </div>
  `;
};

const generateWordContent = (data: ExportData): string => {
  // Generate RTF content that can be opened by Word
  const { personalInfo, summary, experience, education, skills, projects } = data;
  
  let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
  rtfContent += '\\f0\\fs24 ';
  
  // Header
  rtfContent += `{\\b\\fs32 ${personalInfo.fullName || 'Your Name'}}\\par\\par`;
  rtfContent += `${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.location || ''}\\par`;
  if (personalInfo.linkedin) rtfContent += `${personalInfo.linkedin}\\par`;
  if (personalInfo.website) rtfContent += `${personalInfo.website}\\par`;
  rtfContent += '\\par';
  
  // Summary
  if (summary) {
    rtfContent += '{\\b PROFESSIONAL SUMMARY}\\par';
    rtfContent += `${summary}\\par\\par`;
  }
  
  // Experience
  if (experience.length > 0) {
    rtfContent += '{\\b EXPERIENCE}\\par';
    experience.forEach(exp => {
      rtfContent += `{\\b ${exp.title}} - ${exp.company}\\par`;
      rtfContent += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\\par`;
      if (exp.location) rtfContent += `${exp.location}\\par`;
      if (exp.description) rtfContent += `${exp.description}\\par`;
      rtfContent += '\\par';
    });
  }
  
  // Education
  if (education.length > 0) {
    rtfContent += '{\\b EDUCATION}\\par';
    education.forEach(edu => {
      rtfContent += `{\\b ${edu.degree}} - ${edu.school}\\par`;
      rtfContent += `${edu.graduationDate}\\par`;
      if (edu.location) rtfContent += `${edu.location}\\par`;
      rtfContent += '\\par';
    });
  }
  
  // Skills
  if (skills.length > 0) {
    rtfContent += '{\\b SKILLS}\\par';
    rtfContent += `${skills.join(', ')}\\par\\par`;
  }
  
  // Projects
  if (projects.length > 0) {
    rtfContent += '{\\b PROJECTS}\\par';
    projects.forEach(project => {
      rtfContent += `{\\b ${project.name}}\\par`;
      if (project.technologies) rtfContent += `Technologies: ${project.technologies}\\par`;
      if (project.description) rtfContent += `${project.description}\\par`;
      if (project.link) rtfContent += `${project.link}\\par`;
      rtfContent += '\\par';
    });
  }
  
  rtfContent += '}';
  return rtfContent;
};

const getPrintStyles = (): string => `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; color: #000; }
  .resume-container { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
  .resume-header { text-align: center; margin-bottom: 1em; border-bottom: 2px solid #000; padding-bottom: 0.5em; }
  .resume-header h1 { font-size: 24pt; font-weight: bold; margin-bottom: 0.5em; }
  .contact-info { font-size: 10pt; }
  .contact-info span { margin: 0 0.5em; }
  .resume-section { margin-bottom: 1.5em; }
  .resume-section h2 { font-size: 14pt; font-weight: bold; margin-bottom: 0.5em; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 0.2em; }
  .experience-item, .education-item, .project-item { margin-bottom: 1em; }
  .experience-header, .education-header { display: flex; justify-content: space-between; align-items: baseline; }
  .experience-header h3, .education-header h3 { font-size: 12pt; font-weight: bold; }
  .date { font-size: 10pt; font-style: italic; }
  .company, .school { font-size: 11pt; font-weight: bold; margin-bottom: 0.2em; }
  .location { font-size: 10pt; color: #666; margin-bottom: 0.2em; }
  .description { font-size: 11pt; margin-top: 0.3em; }
  .skills-list { display: flex; flex-wrap: wrap; gap: 0.5em; }
  .skill { background: #f0f0f0; padding: 0.2em 0.5em; border-radius: 3px; font-size: 10pt; }
  .technologies { font-size: 10pt; font-style: italic; color: #666; margin-bottom: 0.2em; }
  .link a { color: #0066cc; text-decoration: underline; }
  @media print { 
    body { -webkit-print-color-adjust: exact; }
    .resume-container { padding: 0; }
  }
`;

const getWebStyles = (): string => `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.6; color: #333; background: #f5f5f5; padding: 2rem; }
  .resume-container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
  .resume-header { text-align: center; margin-bottom: 2rem; border-bottom: 3px solid #007acc; padding-bottom: 1rem; }
  .resume-header h1 { font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem; color: #007acc; }
  .contact-info { font-size: 0.9rem; color: #666; }
  .contact-info span { margin: 0 1rem; }
  .resume-section { margin-bottom: 2rem; }
  .resume-section h2 { font-size: 1.3rem; font-weight: bold; margin-bottom: 1rem; text-transform: uppercase; color: #007acc; border-bottom: 2px solid #007acc; padding-bottom: 0.3rem; }
  .experience-item, .education-item, .project-item { margin-bottom: 1.5rem; padding: 1rem; background: #f9f9f9; border-radius: 5px; }
  .experience-header, .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; }
  .experience-header h3, .education-header h3 { font-size: 1.1rem; font-weight: bold; color: #333; }
  .date { font-size: 0.9rem; font-style: italic; color: #666; background: #e0e0e0; padding: 0.2rem 0.5rem; border-radius: 3px; }
  .company, .school { font-size: 1rem; font-weight: 600; color: #007acc; margin-bottom: 0.3rem; }
  .location { font-size: 0.9rem; color: #666; margin-bottom: 0.3rem; }
  .description { font-size: 0.95rem; margin-top: 0.5rem; }
  .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill { background: #007acc; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem; }
  .technologies { font-size: 0.9rem; font-style: italic; color: #666; margin-bottom: 0.3rem; }
  .link a { color: #007acc; text-decoration: none; }
  .link a:hover { text-decoration: underline; }
`;
