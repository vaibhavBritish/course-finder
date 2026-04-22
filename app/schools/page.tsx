import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { toSchoolSlug } from "@/lib/school-utils";

export default async function SchoolsPage() {
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
      averageRating: s.courseCount > 0 ? Number((s.ratingSum / s.courseCount).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.courseCount - a.courseCount);

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Schools & Colleges</h1>
          <p className="text-slate-500">Browse institutions and view their available programs.</p>
        </div>

        {schools.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
            No schools available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schools.map((school) => (
              <Link
                key={school.slug}
                href={`/schools/${school.slug}`}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white relative overflow-hidden mb-4 p-2">
                  {school.logoUrl ? (
                    <Image src={school.logoUrl} alt={`${school.name} logo`} fill className="object-contain p-2" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                      LOGO
                    </div>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-slate-900 line-clamp-2">{school.name}</h2>
                <p className="text-sm text-slate-500 mt-2 line-clamp-1">{school.location}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">{school.courseCount} courses</span>
                  <span className="text-rose-600 font-semibold">★ {school.averageRating}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
