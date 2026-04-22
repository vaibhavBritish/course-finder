"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CourseCard, { Course } from "@/components/CourseCard";
import CourseDrawer from "@/components/CourseDrawer";
import LeadForms from "@/components/LeadForms";

interface FilterOptions {
  locations: string[];
  deliveries: string[];
  loads: string[];
  schools: string[];
  subjects: string[];
  credentials: string[];
}

const SUBJECT_AREAS = [
  "Accounting", "Acting", "Acupuncture", "Administration", "Advertising",
  "Aerospace", "Agriculture", "Animation", "Anthropology", "Architecture",
  "Arts", "Aviation",
  "Biology", "Biomedical", "Biotechnology", "Business",
  "Chemistry", "Civil Engineering", "Commerce", "Communications",
  "Community Services", "Computer Science", "Construction", "Criminal Justice",
  "Data Science", "Dentistry", "Design", "Digital Media",
  "Early Childhood Education", "Economics", "Education", "Electrical Engineering",
  "Engineering", "Entrepreneurship", "Environmental Science",
  "Fashion", "Film", "Finance", "Fine Arts", "Forensic Science",
  "Game Design", "Geography", "Graphic Design",
  "Health Sciences", "History", "Hospitality", "Human Resources",
  "Information Technology", "Interior Design", "International Business",
  "Journalism",
  "Law", "Linguistics",
  "Management", "Marketing", "Mathematics", "Mechanical Engineering",
  "Media Studies", "Medicine", "Music",
  "Nursing", "Nutrition",
  "Performing Arts", "Pharmacy", "Philosophy", "Photography",
  "Physical Education", "Physics", "Political Science", "Psychology",
  "Real Estate",
  "Social Sciences", "Social Work", "Software Engineering",
  "Statistics", "Supply Chain",
  "Tourism",
  "Urban Planning",
  "Veterinary",
  "Web Development",
];

const SUBJECTS_PAGE_SIZE = 15;

function CoursesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  // Subject list local search + pagination
  const [subjectSearch, setSubjectSearch] = useState("");
  const [subjectPage, setSubjectPage] = useState(1);
  const filteredSubjects = SUBJECT_AREAS.filter(s =>
    s.toLowerCase().includes(subjectSearch.toLowerCase())
  );
  const visibleSubjects = subjectSearch
    ? filteredSubjects
    : filteredSubjects.slice(0, subjectPage * SUBJECTS_PAGE_SIZE);
  const hasMoreSubjects = !subjectSearch && visibleSubjects.length < filteredSubjects.length;

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const openDrawer = (course: Course) => { setSelectedCourse(course); setIsDrawerOpen(true); };

  // URL State
  const page = parseInt(searchParams.get("page") || "1");
  const q = searchParams.get("q") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const location = searchParams.get("location") || "All Locations";
  const school = searchParams.get("school") || "All Schools";
  const credential = searchParams.get("credential") || "All Credentials";

  const fetchCourses = async (isAppend = false) => {
    if (isAppend) setIsMoreLoading(true);
    else setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("limit")) params.set("limit", "12");
      const res = await fetch(`/api/courses?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (isAppend) {
          setCourses(prev => [...prev, ...data.courses]);
        } else {
          setCourses(data.courses);
        }
        setTotalCount(data.totalCount);
        if (!filterOptions) setFilterOptions(data.filterOptions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, [searchParams]);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value.startsWith("All ")) params.delete(key);
      else params.set(key, value);
    });
    params.set("page", "1");
    router.push(`/courses?${params.toString()}`);
  };

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page + 1).toString());
    router.push(`/courses?${params.toString()}`, { scroll: false });
  };

  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Search + Sort Header */}
      <div className="bg-white border-b border-slate-200 mt-20 py-6 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-slate-900 shrink-0">Explore Courses</h1>
            <div className="relative w-full max-w-xl group">
              <input
                type="text"
                placeholder="Search programs or universities..."
                value={q}
                onChange={(e) => updateFilters({ q: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#ED2B3B] transition-all text-sm"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#ED2B3B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort:</span>
              <select
                value={`${sortBy}-${order}`}
                onChange={(e) => { const [s, o] = e.target.value.split("-"); updateFilters({ sortBy: s, order: o }); }}
                className="bg-white border border-slate-200 text-slate-800 font-semibold text-sm rounded-lg py-2 px-3 focus:ring-[#ED2B3B] cursor-pointer"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="tuitionAmount-asc">Price: Low → High</option>
                <option value="tuitionAmount-desc">Price: High → Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="title-asc">A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 flex-1 w-full">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0">
          <div className="sticky top-40 space-y-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">

            {/* Subject Area with pagination */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subject Area</h3>
                {q && (
                  <button
                    onClick={() => updateFilters({ q: "" })}
                    className="text-[10px] font-bold text-[#ED2B3B] uppercase tracking-widest hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              {/* Subject search input */}
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Find a subject..."
                  value={subjectSearch}
                  onChange={(e) => { setSubjectSearch(e.target.value); setSubjectPage(1); }}
                  className="w-full pl-7 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ED2B3B] transition-all"
                />
                <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                {subjectSearch && (
                  <button
                    onClick={() => setSubjectSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                )}
              </div>
              <div className="border-b border-slate-100 mb-2" />
              <div className="space-y-0.5">
                <button
                  onClick={() => updateFilters({ q: "" })}
                  className={`flex items-center w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${!q ? "text-[#ED2B3B] font-bold bg-red-50" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  All Subjects
                </button>
                {visibleSubjects.map(s => (
                  <button
                    key={s}
                    onClick={() => updateFilters({ q: q === s ? "" : s })}
                    className={`flex items-center justify-between w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${q === s ? "text-[#ED2B3B] font-bold bg-red-50" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {s}
                    {q === s && (
                      <svg className="w-3 h-3 text-[#ED2B3B]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {/* Subject pagination */}
              {hasMoreSubjects && (
                <button
                  onClick={() => setSubjectPage(p => p + 1)}
                  className="mt-3 w-full text-center text-xs font-bold text-[#ED2B3B] py-2 border border-dashed border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Load more subjects ({SUBJECT_AREAS.length - visibleSubjects.length} remaining)
                </button>
              )}
              {!hasMoreSubjects && subjectPage > 1 && (
                <button
                  onClick={() => setSubjectPage(1)}
                  className="mt-3 w-full text-center text-xs text-slate-400 py-1 hover:text-slate-600 transition-colors"
                >
                  Show less
                </button>
              )}
            </div>

            {/* Location */}
            {filterOptions && (
              <>
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Location</h3>
                  <select
                    value={location}
                    onChange={(e) => updateFilters({ location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:ring-[#ED2B3B] focus:outline-none"
                  >
                    <option value="All Locations">All Locations</option>
                    {filterOptions.locations.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                {/* Institution */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Institution</h3>
                  <select
                    value={school}
                    onChange={(e) => updateFilters({ school: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:ring-[#ED2B3B] focus:outline-none"
                  >
                    <option value="All Schools">All Schools</option>
                    {filterOptions.schools.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Credential */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Credential</h3>
                  <div className="space-y-2">
                    {["All Credentials", ...filterOptions.credentials].map(c => (
                      <label key={c} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="credential"
                          checked={credential === c}
                          onChange={() => updateFilters({ credential: c })}
                          className="w-3.5 h-3.5 text-[#ED2B3B] focus:ring-[#ED2B3B] border-slate-300"
                        />
                        <span className={`text-sm ${credential === c ? "text-slate-900 font-semibold" : "text-slate-500"}`}>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear all */}
                {(q || location !== "All Locations" || school !== "All Schools" || credential !== "All Credentials") && (
                  <div className="border-t border-slate-100 pt-4">
                    <button
                      onClick={() => router.push("/courses")}
                      className="w-full text-center text-xs font-bold text-slate-400 hover:text-[#ED2B3B] transition-colors py-1"
                    >
                      ✕ Clear all filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>

        {/* ── MAIN GRID ── */}
        <div className="flex-1 min-w-0">
          {/* Results meta */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              Showing <span className="text-slate-900 font-bold">{courses.length}</span> of{" "}
              <span className="text-slate-900 font-bold">{totalCount}</span> results
              {q && <span className="text-slate-400"> for "<span className="text-slate-700 font-semibold">{q}</span>"</span>}
            </p>
            {totalPages > 1 && !isLoading && (
              <p className="text-xs text-slate-400 font-medium">Page {page} of {totalPages}</p>
            )}
          </div>

          {/* Loading skeletons */}
          {isLoading && courses.length === 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-72 bg-slate-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {courses.map(course => (
                    <CourseCard key={course.id} course={course} onOpenLeadModal={openDrawer} isGrid={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
                  <svg className="w-12 h-12 text-slate-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No matching courses</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">Try a broader search or different filters.</p>
                  <button onClick={() => router.push("/courses")} className="mt-6 text-[#ED2B3B] font-bold text-sm underline underline-offset-4">
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Load More + Page Info */}
              {courses.length < totalCount && (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <button
                    onClick={handleLoadMore}
                    disabled={isMoreLoading}
                    className="bg-white border border-slate-200 text-slate-900 font-bold px-10 py-3.5 rounded-full shadow-sm hover:shadow-md hover:bg-slate-50 transition-all disabled:opacity-50 inline-flex items-center gap-2 text-sm"
                  >
                    {isMoreLoading && <div className="w-4 h-4 border-2 border-[#ED2B3B] border-t-transparent rounded-full animate-spin" />}
                    {isMoreLoading ? "Loading..." : `Load more (${totalCount - courses.length} remaining)`}
                  </button>
                  <p className="text-xs text-slate-400">Page {page} of {totalPages}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <LeadForms />
      <CourseDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} course={selectedCourse} />
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-[#ED2B3B] border-t-transparent rounded-full animate-spin" /></div>}>
      <CoursesContent />
    </Suspense>
  );
}
