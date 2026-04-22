import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-700",
  Healthcare: "bg-emerald-100 text-emerald-700",
  Immigration: "bg-amber-100 text-amber-700",
  Business: "bg-violet-100 text-violet-700",
  "Design & Creative Arts": "bg-pink-100 text-pink-700",
  "Skilled Trades": "bg-orange-100 text-orange-700",
  Rankings: "bg-rose-100 text-rose-700",
  Careers: "bg-cyan-100 text-cyan-700",
};

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    select: { slug: true }
  });
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug }
  });
  
  if (!blog) notFound();

  // Fetch related courses based on blog's relatedSubjects
  let relatedCourses: { id: string; title: string; school: string; fee: string; credential: string; imageUrl: string }[] = [];
  try {
    const orConditions = blog.relatedSubjects.map((s) => ({
      OR: [
        { title: { contains: s, mode: "insensitive" as const } },
        { subject: { contains: s, mode: "insensitive" as const } },
        { description: { contains: s, mode: "insensitive" as const } },
      ],
    }));
    relatedCourses = await (prisma as any).course.findMany({
      where: { OR: orConditions },
      take: 4,
      select: {
        id: true,
        title: true,
        school: true,
        fee: true,
        credential: true,
        imageUrl: true,
      },
    });
  } catch {
    // silently fail — relevant programs are non-critical
  }

  // Other articles for "More Reading"
  const moreArticles = await prisma.blog.findMany({
    where: { 
      slug: { not: slug },
      published: true 
    },
    take: 2,
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-slate-50 mt-20">
      {/* ── ARTICLE HEADER ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/career-navigator" className="hover:text-[#ED2B3B] transition-colors font-medium">
              Career Navigator
            </Link>
            <span>/</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${CATEGORY_COLORS[blog.category] || "bg-slate-100 text-slate-600"}`}>
              {blog.category}
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight max-w-4xl mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ED2B3B] flex items-center justify-center text-white text-sm font-bold shrink-0">
                {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{blog.author}</p>
                <p className="text-xs text-slate-400">{blog.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {blog.readTime}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 ml-auto">
              {blog.tags.map(tag => (
                <span key={tag} className="text-[11px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COVER IMAGE ── */}
      <div className="relative h-64 md:h-[420px] w-full">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
      </div>

      {/* ── CONTENT + SIDEBAR ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article content */}
          <article className="flex-1 min-w-0">
            <div
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-[#ED2B3B] prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-[#ED2B3B] prose-blockquote:bg-red-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                prose-strong:text-slate-800
                prose-li:text-slate-600
                [&_.lead]:text-xl [&_.lead]:text-slate-700 [&_.lead]:font-light [&_.lead]:leading-relaxed [&_.lead]:mb-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Author bio card */}
            <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex gap-5 items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#ED2B3B] flex items-center justify-center text-white text-lg font-bold shrink-0">
                {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-0.5">{blog.author}</p>
                <p className="text-xs text-[#ED2B3B] font-semibold mb-2">{blog.authorRole} at Course Finder</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  An expert voice on Canadian education, career pathways, and workforce development. Helping learners navigate complex decisions with data-driven insights.
                </p>
              </div>
            </div>

            {/* More reading */}
            {moreArticles.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">More from Career Navigator</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {moreArticles.map(a => (
                    <Link key={a.slug} href={`/career-navigator/${a.slug}`} className="group flex gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                        <Image src={a.coverImage} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="min-w-0">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${CATEGORY_COLORS[a.category] || "bg-slate-100 text-slate-500"}`}>
                          {a.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug line-clamp-2 group-hover:text-[#ED2B3B] transition-colors">{a.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{a.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-6">

              {/* Relevant Programs */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-[#ED2B3B] px-5 py-4">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">Relevant Programs</h3>
                  <p className="text-red-100 text-xs mt-0.5">Programs related to this article</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {relatedCourses.length > 0 ? relatedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses?q=${encodeURIComponent(course.title.slice(0, 30))}`}
                      className="flex gap-3 p-4 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-10 shrink-0 relative rounded-lg overflow-hidden bg-white border border-slate-100">
                        <Image src={course.imageUrl} alt={course.school} fill className="object-contain p-1" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-0.5">{course.school}</p>
                        <p className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#ED2B3B] transition-colors">{course.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">{course.credential}</span>
                          <span className="text-[11px] font-bold text-[#ED2B3B]">{course.fee}</span>
                        </div>
                      </div>
                    </Link>
                  )) : (
                    <div className="p-5 text-center">
                      <p className="text-sm text-slate-400">Browse all programs</p>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    href="/courses"
                    className="block w-full text-center bg-[#ED2B3B] hover:bg-[#C4001B] text-white text-sm font-bold py-2.5 rounded-xl transition-all"
                  >
                    Browse All Programs
                  </Link>
                </div>
              </div>

              {/* Get Package CTA */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Ready to start?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Get personalized program recommendations and funding options tailored to your goals.
                </p>
                <Link
                  href="/courses"
                  className="block w-full text-center bg-white text-slate-900 text-sm font-bold py-2.5 rounded-xl hover:bg-slate-100 transition-all"
                >
                  Find My Program
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
