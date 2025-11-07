import fs from 'fs';
import path from 'path';

export function getAssignmentFiles() {
  const assignmentsDirectory = path.join(process.cwd(), 'app/assignments');
  const fileNames = fs.readdirSync(assignmentsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => ({
      slug: fileName.replace(/\.md$/, ''),
      fileName,
      path: `/assignments/${fileName.replace(/\.md$/, '')}`
    }));
}

export function getAssignmentContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'app/assignments', `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading file for slug: ${slug}`, error);
    return `# Error\n\nCould not find assignment with slug: ${slug}`;
  }
}
