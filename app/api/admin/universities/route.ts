import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toSchoolSlug } from "@/lib/school-utils";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: { school: true, location: true, rating: true },
    });

    const map = new Map<string, { name: string; slug: string; location: string; count: number; ratingSum: number }>();
    for (const c of courses) {
      const name = c.school.trim();
      const existing = map.get(name);
      if (existing) {
        existing.count += 1;
        existing.ratingSum += c.rating || 0;
      } else {
        map.set(name, {
          name,
          slug: toSchoolSlug(name),
          location: c.location || "Canada",
          count: 1,
          ratingSum: c.rating || 0,
        });
      }
    }

    const universities = Array.from(map.values())
      .map((u) => ({ ...u, averageRating: u.count ? Number((u.ratingSum / u.count).toFixed(1)) : 0 }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json(universities);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch universities" }, { status: 500 });
  }
}

