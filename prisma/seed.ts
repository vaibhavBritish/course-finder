import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Helper to get logo URL
function getUniversityLogo(university: string) {
  const normalizedName = university.trim();
  const logos: Record<string, string> = {
    'University of Toronto': 'utoronto.ca',
    'University of British Columbia': 'ubc.ca',
    'York University': 'yorku.ca',
    'Simon Fraser University': 'sfu.ca',
    'McGill University': 'mcgill.ca',
    'University of Waterloo': 'uwaterloo.ca',
    'Western University': 'uwo.ca',
    "Queen's University": 'queensu.ca',
    'Dalhousie University': 'dal.ca',
    'University of Manitoba': 'umanitoba.ca',
    'McMaster University': 'mcmaster.ca',
    'University of Ottawa': 'uottawa.ca',
    'University of Alberta': 'ualberta.ca',
    'University of Calgary': 'ucalgary.ca',
    'Concordia University': 'concordia.ca',
    'Université de Montréal': 'umontreal.ca',
    'Laval University': 'ulaval.ca',
  };
  
  const domain = logos[normalizedName] || `${normalizedName.toLowerCase().replace(/[^a-z]/g, '')}.ca`;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
}

async function main() {
  console.log('Reading CSV and seeding courses...');
  
  const csvPath = path.join(process.cwd(), 'public', 'canada_courses_real.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf8');
  
  // Simple CSV parser (handles basic quotes)
  const lines = fileContent.split('\n');
  const headers = lines[0].split(',');
  
  // Clear existing
  await prisma.course.deleteMany({});
  
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Regex to handle commas inside quotes
    const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
    if (!matches) continue;
    
    // Clean quotes
    const values = matches.map(val => val.replace(/^"|"$/g, '').trim());
    
    // id,university,program_name,degree_type,category,city,province,duration,tuition_cad,ielts_requirement,intake,application_deadline,description,program_url
    const [
      id, university, program_name, degree_type, category, city, province, 
      duration, tuition_cad, ielts_req, intake, app_deadline, description, program_url
    ] = values;
    
    const tuitionNum = Number(tuition_cad || 0);
    
    await prisma.course.create({
      data: {
        title: program_name || 'Unknown Course',
        school: university || 'Unknown University',
        location: `${city}, ${province}`,
        delivery: ['Classroom', 'On-Campus'],
        load: ['Full-time'],
        subject: category || 'General',
        credential: degree_type || 'Diploma',
        fee: `$${tuitionNum.toLocaleString()}`,
        tuitionAmount: tuitionNum,
        imageUrl: getUniversityLogo(university),
        link: program_url || '#',
        description: description || '',
        timings: duration || 'Varies',
        startDate: intake || 'September',
        additionalStartDates: Math.floor(Math.random() * 2),
        scholarshipAvailable: Math.random() > 0.6,
        rating: 4.0 + Math.random() * 1.0,
        ieltsRequirement: ielts_req || '6.5',
        applicationDeadline: app_deadline || 'Varies',
      }
    });
    count++;
  }
  
  console.log(`Seeded ${count} courses from CSV!`);

  // Seed Blogs
  console.log('Seeding blogs...');
  const { BLOGS } = require('../lib/blogs');
  
  await prisma.blog.deleteMany({});
  
  for (const blog of BLOGS) {
    await prisma.blog.create({
      data: {
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        author: blog.author,
        authorRole: blog.authorRole,
        date: blog.date,
        readTime: blog.readTime,
        coverImage: blog.coverImage,
        tags: blog.tags,
        relatedSubjects: blog.relatedSubjects,
        content: blog.content,
        published: true,
      }
    });
  }
  console.log(`Seeded ${BLOGS.length} blogs!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
