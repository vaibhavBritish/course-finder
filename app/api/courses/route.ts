import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Search and Pagination parameters
  const q = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const skip = (page - 1) * limit;

  // Filter parameters
  const location = searchParams.get('location');
  const delivery = searchParams.get('delivery');
  const load = searchParams.get('load');
  const school = searchParams.get('school');
  const subject = searchParams.get('subject');
  const credential = searchParams.get('credential');

  // Sorting parameters
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  let filter: any = {};

  // Text search (matches title or school)
  if (q) {
    filter.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { school: { contains: q, mode: 'insensitive' } },
    ];
  }

  if (location && location !== 'All Locations') filter.location = location;
  if (delivery && delivery !== 'All Course Deliveries') filter.delivery = { has: delivery };
  if (load && load !== 'All Course Loads') filter.load = { has: load };
  if (school && school !== 'All Schools') filter.school = school;
  if (subject && subject !== 'All Subjects') filter.subject = subject;
  if (credential && credential !== 'All Credentials') filter.credential = credential;

  try {
    const isTuitionSort = sortBy === 'tuitionAmount';
    
    const [courses, totalCount] = await Promise.all([
      prisma.course.findMany({
        where: filter,
        orderBy: { [sortBy]: order as 'asc' | 'desc' },
        skip: skip,
        take: limit,
      }),
      prisma.course.count({ where: filter })
    ]);
    
    // Safety check for filter options extraction
    const allCourses = await prisma.course.findMany({ 
      select: { location: true, delivery: true, load: true, school: true, subject: true, credential: true } 
    });
    
    const extractUnique = (field: keyof typeof allCourses[0]) => {
      const values = allCourses
        .map(c => c[field])
        .flat()
        .filter((v): v is string => typeof v === 'string' && v.trim() !== '');
      return Array.from(new Set(values)).sort();
    };

    const filterOptions = {
      locations: extractUnique('location'),
      deliveries: extractUnique('delivery'),
      loads: extractUnique('load'),
      schools: extractUnique('school'),
      subjects: extractUnique('subject'),
      credentials: extractUnique('credential'),
    };

    return NextResponse.json({
      courses,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      filterOptions
    });
  } catch (error: any) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
