"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogCategory } from "@/lib/blogs";

const CATEGORIES: BlogCategory[] = [
  "All",
  "Business",
  "Technology",
  "Design & Creative Arts",
  "Skilled Trades",
  "Healthcare",
  "Rankings",
  "Careers",
  "Immigration",
];

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

export default function CareerNavigatorPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blogs?published=true${activeCategory !== "All" ? `&category=${encodeURIComponent(activeCategory)}` : ""}`);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [activeCategory]);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── PAGE HEADER ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs font-bold text-[#ED2B3B] uppercase tracking-widest mb-2">Course Finder</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Career Navigator
              </h1>
              <p className="text-slate-500 mt-3 max-w-xl text-base">
                Expert insights, real student stories, and practical guidance for learners at every stage of their journey.
              </p>
            </div>
            <Link
              href="/courses"
              className="shrink-0 bg-[#ED2B3B] hover:bg-[#C4001B] text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-md shadow-red-200"
            >
              Explore Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER BAR ── */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-4 text-sm font-semibold border-b-2 transition-all ${
                  activeCategory === cat
                    ? "border-[#ED2B3B] text-[#ED2B3B]"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid gap-8">
            <div className="h-[400px] bg-white animate-pulse rounded-2xl border border-slate-100" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-72 bg-white animate-pulse rounded-2xl border border-slate-100" />)}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-slate-400 text-lg">No articles in this category yet.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-[#ED2B3B] font-bold underline underline-offset-4"
            >
              View all articles
            </button>
          </div>
        ) : (
          <>
            {/* ── FEATURED ARTICLE ── */}
            {featured && (
              <Link href={`/career-navigator/${featured.slug}`} className="group block mb-12">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto min-h-[280px]">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] || "bg-slate-100 text-slate-600"}`}>
                        {featured.category}
                      </span>
                      <span className="text-xs text-slate-400">{featured.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-snug mb-4 group-hover:text-[#ED2B3B] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed text-sm mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-8 h-8 rounded-full bg-[#ED2B3B] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {featured.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{featured.author}</p>
                        <p className="text-[11px] text-slate-400">{featured.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* ── ARTICLE GRID ── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/career-navigator/${blog.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_COLORS[blog.category] || "bg-white/80 text-slate-600"}`}>
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#ED2B3B] transition-colors line-clamp-2 font-serif">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#ED2B3B] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                            {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-slate-700">{blog.author}</p>
                            <p className="text-[10px] text-slate-400">{blog.date}</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">{blog.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── NEWSLETTER CTA ── */}
      <section className="bg-slate-100 py-16 px-6 mt-8 border-t border-slate-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold text-[#ED2B3B] uppercase tracking-widest mb-3">Stay Informed</p>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            Get career insights delivered to your inbox
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            Join 50,000+ learners who read our weekly career and education newsletter.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED2B3B]"
            />
            <button className="bg-[#ED2B3B] hover:bg-[#C4001B] text-white font-bold px-5 py-3 rounded-xl text-sm transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
