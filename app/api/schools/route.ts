import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toSchoolSlug } from "@/lib/school-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit") || 20)));

  try {
    const courses = await prisma.course.findMany({
      select: {
        school: true,
        location: true,
        rating: true,
        imageUrl: true,
      },
    });

    const bySchool = new Map<
      string,
      {
        name: string;
        slug: string;
        location: string;
        courseCount: number;
        ratingSum: number;
        logoUrl: string;
      }
    >();

    for (const c of courses) {
      const schoolName = (c.school || "").trim();
      if (!schoolName) continue;

      const existing = bySchool.get(schoolName);
      if (existing) {
        existing.courseCount += 1;
        existing.ratingSum += c.rating || 0;
      } else {
        bySchool.set(schoolName, {
          name: schoolName,
          slug: toSchoolSlug(schoolName),
          location: c.location || "Canada",
          courseCount: 1,
          ratingSum: c.rating || 0,
          logoUrl: c.imageUrl || "",
        });
      }
    }

    const schools = Array.from(bySchool.values())
      .map((s) => ({
        ...s,
        averageRating: s.courseCount > 0 ? Number((s.ratingSum / s.courseCount).toFixed(2)) : 0,
      }))
      .sort((a, b) => b.courseCount - a.courseCount)
      .slice(0, limit);

    return NextResponse.json({ schools });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch schools", message: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

