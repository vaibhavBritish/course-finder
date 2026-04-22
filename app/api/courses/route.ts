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
  const subjectQuery = subject && subject !== 'All Subjects' ? subject.trim() : '';
  const stopWords = new Set(['and', 'or', 'of', 'the', 'in', 'to', 'for', 'with', 'online', 'program', 'programs']);
  const subjectTokens = subjectQuery
    ? subjectQuery
        .split(/[\s/&,-]+/)
        .map((token) => token.trim())
        .filter((token) => token.length >= 2 && !stopWords.has(token.toLowerCase()))
    : [];
  const normalizedSubject = subjectQuery.toLowerCase();
  const domainKeywordMap: Record<string, string[]> = {
    business: ['business', 'management', 'commerce', 'entrepreneurship', 'marketing', 'accounting', 'finance'],
    beauty: ['beauty', 'cosmetology', 'aesthetics', 'hairstyling', 'spa', 'wellness'],
    'creative arts': ['design', 'media', 'film', 'animation', 'photography', 'creative', 'arts'],
    culinary: ['culinary', 'hospitality', 'cooking', 'food', 'baking', 'restaurant'],
    data: ['data', 'analytics', 'statistics', 'machine learning', 'ai', 'computer science'],
    design: ['design', 'graphic', 'ux', 'ui', 'interior', 'product'],
    development: ['development', 'software', 'web', 'programming', 'computer science', 'engineering'],
    'digital marketing': ['marketing', 'digital', 'seo', 'social media', 'branding', 'advertising'],
    finance: ['finance', 'accounting', 'banking', 'economics', 'investment', 'bookkeeping'],
    health: ['health', 'healthcare', 'nursing', 'medical', 'public health', 'life sciences'],
    'information technology': ['information technology', 'it', 'network', 'cloud', 'cybersecurity', 'software'],
    'project management': ['project', 'management', 'operations', 'agile', 'scrum', 'business'],
    'skilled trades': ['trades', 'engineering', 'construction', 'automotive', 'technician', 'industrial'],
    language: ['language', 'english', 'french', 'communication', 'linguistics'],
  };

  const filters: any[] = [];

  // Text search (matches title or school)
  if (q) {
    filters.push({
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { school: { contains: q, mode: 'insensitive' } },
      ],
    });
  }

  if (location && location !== 'All Locations') filters.push({ location });
  if (delivery && delivery !== 'All Course Deliveries') filters.push({ delivery: { has: delivery } });
  if (load && load !== 'All Course Loads') filters.push({ load: { has: load } });
  if (school && school !== 'All Schools') filters.push({ school });
  if (credential && credential !== 'All Credentials') filters.push({ credential });

  // Fuzzy subject matching so submenu values like "Online MBA Programs" still return results.
  if (subjectQuery) {
    const subjectClauses = [
      { subject: { contains: subjectQuery, mode: 'insensitive' } },
      { title: { contains: subjectQuery, mode: 'insensitive' } },
      ...subjectTokens.flatMap((token) => ([
        { subject: { contains: token, mode: 'insensitive' } },
        { title: { contains: token, mode: 'insensitive' } },
      ])),
    ];

    filters.push({ OR: subjectClauses });
  }

  const filter = filters.length ? { AND: filters } : {};

  try {
    let [courses, totalCount] = await Promise.all([
      prisma.course.findMany({
        where: filter,
        orderBy: { [sortBy]: order as 'asc' | 'desc' },
        skip: skip,
        take: limit,
      }),
      prisma.course.count({ where: filter })
    ]);

    // Subject-aware fallback: fetch related results based on subject/title tokens.
    if (totalCount === 0 && subjectQuery) {
      const relatedWhere = {
        OR: [
          { subject: { contains: subjectQuery, mode: 'insensitive' as const } },
          { title: { contains: subjectQuery, mode: 'insensitive' as const } },
          ...subjectTokens.flatMap((token) => ([
            { subject: { contains: token, mode: 'insensitive' as const } },
            { title: { contains: token, mode: 'insensitive' as const } },
          ])),
        ],
      };

      const relatedCourses = await prisma.course.findMany({
        where: relatedWhere,
        orderBy: { rating: 'desc' },
        take: Math.min(limit, 2),
      });

      if (relatedCourses.length > 0) {
        courses = relatedCourses;
        totalCount = relatedCourses.length;
      } else {
        const domainKeywords = Object.entries(domainKeywordMap).reduce<string[]>(
          (acc, [key, values]) => (normalizedSubject.includes(key) ? [...acc, ...values] : acc),
          []
        );
        const expandedTokens = Array.from(new Set([...subjectTokens, ...domainKeywords]));

        if (expandedTokens.length > 0) {
          const broadenedCourses = await prisma.course.findMany({
            where: {
              OR: expandedTokens.flatMap((token) => ([
                { subject: { contains: token, mode: 'insensitive' as const } },
                { title: { contains: token, mode: 'insensitive' as const } },
              ])),
            },
            orderBy: { rating: 'desc' },
            take: Math.min(limit, 3),
          });

          if (broadenedCourses.length > 0) {
            courses = broadenedCourses;
            totalCount = broadenedCourses.length;
          }
        }

        // Final fallback: still real courses only (no synthetic records).
        if (totalCount === 0) {
          const hash = subjectQuery.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
          const offset = hash % 25;
          const realCourses = await prisma.course.findMany({
            orderBy: { rating: 'desc' },
            skip: offset,
            take: Math.min(limit, 2),
          });
          courses = realCourses;
          totalCount = realCourses.length;
        }
      }
    }
    
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
