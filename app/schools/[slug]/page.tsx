import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toSchoolSlug } from "@/lib/school-utils";

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allSchools = await prisma.course.findMany({
    select: { school: true },
    distinct: ["school"],
  });

  const schoolName = allSchools.find((s) => toSchoolSlug(s.school) === slug)?.school;
  if (!schoolName) notFound();

  const courses = await prisma.course.findMany({
    where: { school: schoolName },
    orderBy: { rating: "desc" },
    take: 24,
  });

  const schoolLocation = courses[0]?.location || "Canada";
  const averageRating =
    courses.length > 0
      ? Number((courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1))
      : 0;

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/schools" className="text-sm font-semibold text-rose-600 hover:underline">
            ← Back to schools
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl border border-slate-200 bg-white relative overflow-hidden p-2">
              {courses[0]?.imageUrl ? (
                <Image src={courses[0].imageUrl} alt={`${schoolName} logo`} fill className="object-contain p-2" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                  LOGO
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">{schoolName}</h1>
              <p className="text-slate-500 mt-1">{schoolLocation}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <span className="text-slate-700 font-medium">{courses.length} courses listed</span>
            <span className="text-rose-600 font-semibold">★ {averageRating} avg rating</span>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
            No courses found for this school.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <article key={course.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white relative overflow-hidden p-1 mb-3">
                  <Image src={course.imageUrl} alt={`${course.school} logo`} fill className="object-contain p-1" />
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">{course.subject}</p>
                <h2 className="text-lg font-semibold text-slate-900 line-clamp-2">{course.title}</h2>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{course.description || "Program details available on the school page."}</p>
                <div className="mt-4 text-sm space-y-1">
                  <p className="text-slate-700">
                    <span className="font-semibold">Credential:</span> {course.credential}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Tuition:</span> {course.fee}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Start:</span> {course.startDate}
                  </p>
                </div>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  View Program
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

