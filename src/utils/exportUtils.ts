
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
    // Create a new window with the resume content for PDF export
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Pop-up blocked. Please allow pop-ups for this site.');
    }

    const htmlContent = generateATSOptimizedHTML(resumeData);
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${getATSOptimizedPrintStyles()}
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 1000);
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    toast({
      title: "PDF Export Ready",
      description: "Print dialog opened. Choose 'Save as PDF' to download your ATS-optimized resume.",
    });
  } catch (error) {
    console.error('PDF export error:', error);
    toast({
      title: "Export Error",
      description: "Failed to export PDF. Please check if pop-ups are enabled.",
      variant: "destructive",
    });
  }
};

export const exportToHTML = (resumeData: ExportData) => {
  try {
    const htmlContent = generateATSOptimizedHTML(resumeData);
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
          <meta name="description" content="Professional resume for ${resumeData.personalInfo.fullName}">
          <meta name="keywords" content="resume, CV, ${resumeData.skills.join(', ')}">
          <style>
            ${getATSOptimizedWebStyles()}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
    
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(resumeData.personalInfo.fullName || 'resume').replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML Export Complete",
      description: "Your ATS-optimized resume has been downloaded as an HTML file.",
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
    const wordContent = generateATSWordContent(resumeData);
    const blob = new Blob([wordContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(resumeData.personalInfo.fullName || 'resume').replace(/\s+/g, '_')}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Word Export Complete",
      description: "Your ATS-compatible resume has been downloaded as a Word document.",
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

// Generate ATS-optimized HTML structure
const generateATSOptimizedHTML = (data: ExportData): string => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  
  return `
    <div class="resume-container">
      <!-- Header Section -->
      <header class="resume-header">
        <h1 class="candidate-name">${personalInfo.fullName || 'Your Name'}</h1>
        <div class="contact-info">
          ${personalInfo.email ? `<div class="contact-item">
            <span class="contact-label">Email:</span>
            <span class="contact-value">${personalInfo.email}</span>
          </div>` : ''}
          ${personalInfo.phone ? `<div class="contact-item">
            <span class="contact-label">Phone:</span>
            <span class="contact-value">${personalInfo.phone}</span>
          </div>` : ''}
          ${personalInfo.location ? `<div class="contact-item">
            <span class="contact-label">Location:</span>
            <span class="contact-value">${personalInfo.location}</span>
          </div>` : ''}
          ${personalInfo.linkedin ? `<div class="contact-item">
            <span class="contact-label">LinkedIn:</span>
            <span class="contact-value">${personalInfo.linkedin}</span>
          </div>` : ''}
          ${personalInfo.website ? `<div class="contact-item">
            <span class="contact-label">Website:</span>
            <span class="contact-value">${personalInfo.website}</span>
          </div>` : ''}
        </div>
      </header>

      ${summary ? `
        <section class="resume-section">
          <h2 class="section-title">Professional Summary</h2>
          <div class="section-content">
            <p class="summary-text">${summary}</p>
          </div>
        </section>
      ` : ''}

      ${experience.length > 0 ? `
        <section class="resume-section">
          <h2 class="section-title">Professional Experience</h2>
          <div class="section-content">
            ${experience.map(exp => `
              <div class="experience-item">
                <h3 class="job-title">${exp.title}</h3>
                <div class="company-info">
                  <span class="company-name">${exp.company}</span>
                  ${exp.location ? `<span class="job-location">${exp.location}</span>` : ''}
                </div>
                <div class="employment-dates">
                  <span class="start-date">${exp.startDate}</span> - 
                  <span class="end-date">${exp.current ? 'Present' : exp.endDate}</span>
                </div>
                ${exp.description ? `<div class="job-description">
                  ${exp.description.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '').join('')}
                </div>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      ${skills.length > 0 ? `
        <section class="resume-section">
          <h2 class="section-title">Skills</h2>
          <div class="section-content">
            <div class="skills-list">
              ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      ${education.length > 0 ? `
        <section class="resume-section">
          <h2 class="section-title">Education</h2>
          <div class="section-content">
            ${education.map(edu => `
              <div class="education-item">
                <h3 class="degree-title">${edu.degree}</h3>
                <div class="school-info">
                  <span class="school-name">${edu.school}</span>
                  ${edu.location ? `<span class="school-location">${edu.location}</span>` : ''}
                </div>
                <div class="graduation-date">${edu.graduationDate}</div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      ${projects.length > 0 ? `
        <section class="resume-section">
          <h2 class="section-title">Projects</h2>
          <div class="section-content">
            ${projects.map(project => `
              <div class="project-item">
                <h3 class="project-title">${project.name}</h3>
                ${project.technologies ? `<div class="project-technologies">${project.technologies}</div>` : ''}
                ${project.description ? `<div class="project-description">${project.description}</div>` : ''}
                ${project.link ? `<div class="project-link"><a href="${project.link}" target="_blank">${project.link}</a></div>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;
};

// ATS-optimized Word content (RTF format)
const generateATSWordContent = (data: ExportData): string => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  
  let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 \\froman Times New Roman;}{\\f1 \\fswiss Arial;}}';
  rtfContent += '\\f0\\fs24 ';
  
  // Header
  rtfContent += `{\\b\\fs32\\qc ${personalInfo.fullName || 'Your Name'}}\\par\\par`;
  rtfContent += '\\qc ';
  if (personalInfo.email) rtfContent += `${personalInfo.email} `;
  if (personalInfo.phone) rtfContent += `| ${personalInfo.phone} `;
  if (personalInfo.location) rtfContent += `| ${personalInfo.location}`;
  rtfContent += '\\par';
  if (personalInfo.linkedin) rtfContent += `${personalInfo.linkedin}\\par`;
  if (personalInfo.website) rtfContent += `${personalInfo.website}\\par`;
  rtfContent += '\\par\\ql ';
  
  // Summary
  if (summary) {
    rtfContent += '{\\b\\fs28 PROFESSIONAL SUMMARY}\\par';
    rtfContent += '\\line ';
    rtfContent += `${summary}\\par\\par`;
  }
  
  // Experience
  if (experience.length > 0) {
    rtfContent += '{\\b\\fs28 PROFESSIONAL EXPERIENCE}\\par';
    rtfContent += '\\line ';
    experience.forEach(exp => {
      rtfContent += `{\\b\\fs24 ${exp.title}}\\par`;
      rtfContent += `{\\b ${exp.company}}`;
      if (exp.location) rtfContent += ` | ${exp.location}`;
      rtfContent += '\\par';
      rtfContent += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\\par`;
      if (exp.description) {
        const descriptions = exp.description.split('\n').filter(line => line.trim());
        descriptions.forEach(desc => {
          rtfContent += `\\bullet ${desc}\\par`;
        });
      }
      rtfContent += '\\par';
    });
  }
  
  // Skills
  if (skills.length > 0) {
    rtfContent += '{\\b\\fs28 SKILLS}\\par';
    rtfContent += '\\line ';
    rtfContent += `${skills.join(' | ')}\\par\\par`;
  }
  
  // Education
  if (education.length > 0) {
    rtfContent += '{\\b\\fs28 EDUCATION}\\par';
    rtfContent += '\\line ';
    education.forEach(edu => {
      rtfContent += `{\\b ${edu.degree}}\\par`;
      rtfContent += `${edu.school}`;
      if (edu.location) rtfContent += ` | ${edu.location}`;
      rtfContent += '\\par';
      rtfContent += `${edu.graduationDate}\\par\\par`;
    });
  }
  
  // Projects
  if (projects.length > 0) {
    rtfContent += '{\\b\\fs28 PROJECTS}\\par';
    rtfContent += '\\line ';
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

// ATS-optimized print styles
const getATSOptimizedPrintStyles = (): string => `
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  body { 
    font-family: 'Times New Roman', 'Georgia', serif; 
    font-size: 11pt; 
    line-height: 1.3; 
    color: #000; 
    background: white;
  }
  
  .resume-container { 
    max-width: 8.5in; 
    margin: 0 auto; 
    padding: 0.5in; 
    background: white;
  }
  
  .resume-header { 
    text-align: center; 
    margin-bottom: 0.3in; 
    border-bottom: 1pt solid #000;
    padding-bottom: 0.1in;
  }
  
  .candidate-name { 
    font-size: 18pt; 
    font-weight: bold; 
    margin-bottom: 0.1in; 
    text-transform: uppercase;
  }
  
  .contact-info { 
    font-size: 10pt; 
    line-height: 1.2;
  }
  
  .contact-item { 
    display: inline-block; 
    margin: 0 0.2in;
  }
  
  .resume-section { 
    margin-bottom: 0.2in; 
    page-break-inside: avoid;
  }
  
  .section-title { 
    font-size: 12pt; 
    font-weight: bold; 
    text-transform: uppercase; 
    border-bottom: 0.5pt solid #000; 
    margin-bottom: 0.1in;
    padding-bottom: 0.05in;
  }
  
  .experience-item, .education-item, .project-item { 
    margin-bottom: 0.15in; 
    page-break-inside: avoid;
  }
  
  .job-title, .degree-title, .project-title { 
    font-size: 11pt; 
    font-weight: bold; 
    margin-bottom: 0.05in;
  }
  
  .company-name, .school-name { 
    font-weight: bold; 
  }
  
  .employment-dates, .graduation-date { 
    font-style: italic; 
    font-size: 10pt; 
    margin-bottom: 0.05in;
  }
  
  .job-description p, .project-description { 
    margin-bottom: 0.05in; 
    text-align: justify;
  }
  
  .skills-list { 
    line-height: 1.4;
  }
  
  .skill-item { 
    display: inline; 
  }
  
  .skill-item:not(:last-child):after { 
    content: ' | '; 
  }
  
  @page { 
    margin: 0.5in; 
  }
  
  @media print { 
    body { 
      -webkit-print-color-adjust: exact; 
      print-color-adjust: exact;
    }
    .resume-container { 
      padding: 0; 
      margin: 0;
    }
  }
`;

// ATS-optimized web styles
const getATSOptimizedWebStyles = (): string => `
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  body { 
    font-family: 'Arial', 'Helvetica', sans-serif; 
    font-size: 14px; 
    line-height: 1.5; 
    color: #333; 
    background: #f8f9fa; 
    padding: 2rem;
  }
  
  .resume-container { 
    max-width: 800px; 
    margin: 0 auto; 
    background: white; 
    padding: 2rem; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .resume-header { 
    text-align: center; 
    margin-bottom: 2rem; 
    border-bottom: 2px solid #007acc; 
    padding-bottom: 1rem;
  }
  
  .candidate-name { 
    font-size: 2.5rem; 
    font-weight: bold; 
    margin-bottom: 0.5rem; 
    color: #007acc;
  }
  
  .contact-info { 
    font-size: 0.9rem; 
    color: #666;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .resume-section { 
    margin-bottom: 2rem;
  }
  
  .section-title { 
    font-size: 1.4rem; 
    font-weight: bold; 
    margin-bottom: 1rem; 
    color: #007acc; 
    border-bottom: 2px solid #007acc; 
    padding-bottom: 0.3rem;
  }
  
  .experience-item, .education-item, .project-item { 
    margin-bottom: 1.5rem; 
    padding: 1rem; 
    background: #f8f9fa; 
    border-radius: 5px; 
    border-left: 4px solid #007acc;
  }
  
  .job-title, .degree-title, .project-title { 
    font-size: 1.2rem; 
    font-weight: bold; 
    margin-bottom: 0.5rem; 
    color: #333;
  }
  
  .company-name, .school-name { 
    font-weight: 600; 
    color: #007acc; 
    font-size: 1.1rem;
  }
  
  .employment-dates, .graduation-date { 
    font-style: italic; 
    color: #666; 
    margin-bottom: 0.5rem;
    background: #e9ecef;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    display: inline-block;
  }
  
  .job-description p, .project-description { 
    margin-bottom: 0.5rem; 
    line-height: 1.6;
  }
  
  .skills-list { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 0.5rem;
  }
  
  .skill-item { 
    background: #007acc; 
    color: white; 
    padding: 0.3rem 0.8rem; 
    border-radius: 20px; 
    font-size: 0.9rem; 
    font-weight: 500;
  }
  
  a { 
    color: #007acc; 
    text-decoration: none; 
  }
  
  a:hover { 
    text-decoration: underline; 
  }
`;
