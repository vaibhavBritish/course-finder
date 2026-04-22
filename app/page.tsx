"use client";

import Image from "next/image";
import CourseCarousel from "@/components/CourseCarousel";
import CourseCard, { Course } from "@/components/CourseCard";
import CourseDrawer from "@/components/CourseDrawer";
import LeadForms from "@/components/LeadForms";
import Link from "next/link";
import { useState, useEffect } from "react";

interface FilterOptions {
  locations: string[];
  deliveries: string[];
  loads: string[];
  schools: string[];
  subjects: string[];
  credentials: string[];
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const openDrawer = (course: Course) => {
    setSelectedCourse(course);
    setIsDrawerOpen(true);
  };
  
  // Selected temp filters (before applying)
  const [tempFilters, setTempFilters] = useState({
    location: "All Locations",
    delivery: "All Course Deliveries",
    load: "All Course Loads",
    school: "All Schools",
    subject: "All Subjects",
    credential: "All Credentials"
  });

  // Active filters (to determine view)
  const [activeFilters, setActiveFilters] = useState(tempFilters);
  const [isFilteredView, setIsFilteredView] = useState(false);

  const fetchCourses = async (filtersToApply: any) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      // Fetch all courses for the carousel view so subject filtering works client-side
      params.append("limit", "500");
      if (filtersToApply.location !== "All Locations") params.append("location", filtersToApply.location);
      if (filtersToApply.delivery !== "All Course Deliveries") params.append("delivery", filtersToApply.delivery);
      if (filtersToApply.load !== "All Course Loads") params.append("load", filtersToApply.load);
      if (filtersToApply.school !== "All Schools") params.append("school", filtersToApply.school);
      if (filtersToApply.subject !== "All Subjects") params.append("subject", filtersToApply.subject);
      if (filtersToApply.credential !== "All Credentials") params.append("credential", filtersToApply.credential);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`/api/courses?${params.toString()}`, { signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses);
        if (!filterOptions) {
          setFilterOptions(data.filterOptions);
        }
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(activeFilters);
  }, [activeFilters]);

  const handleApplyFilters = () => {
    const hasFilters = Object.entries(tempFilters).some(([key, val]) => {
      return !val.startsWith("All ");
    });
    setIsFilteredView(hasFilters);
    setActiveFilters(tempFilters);
  };

  const getCoursesBySubject = (subject: string) => {
    return courses.filter(c => c.subject.includes(subject));
  };

  return (
    <main className="flex-1 bg-slate-50 dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-auto pt-40 pb-20 min-h-[650px] flex flex-col justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Students working"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center md:text-left w-full mt-10">
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 tracking-tight text-white animate-in slide-in-from-bottom-8 duration-700">
            Start something <br className="hidden md:block" /> life-changing
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-12 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-10 duration-700 delay-100 fill-mode-both">
            Find top-rated schools, degrees and certifications to build in-demand skills and shape your future.
          </p>

          {/* Functional Filters */}
          {filterOptions && (
            <div className="flex flex-wrap gap-3 mb-4 animate-in slide-in-from-bottom-12 duration-700 delay-200 fill-mode-both bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
              {[
                { label: "Locations", key: "location", options: ["All Locations", ...filterOptions.locations] },
                { label: "Course Deliveries", key: "delivery", options: ["All Course Deliveries", ...filterOptions.deliveries] },
                { label: "Course Loads", key: "load", options: ["All Course Loads", ...filterOptions.loads] },
                { label: "Schools", key: "school", options: ["All Schools", ...filterOptions.schools] },
                { label: "Subjects", key: "subject", options: ["All Subjects", ...filterOptions.subjects] },
                { label: "Credentials", key: "credential", options: ["All Credentials", ...filterOptions.credentials] }
              ].map((filterConfig) => (
                <div key={filterConfig.key} className="relative flex-1 md:flex-none min-w-[200px] group">
                  <span className="absolute top-2 left-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10 pointer-events-none">{filterConfig.label}</span>
                  <select 
                    value={(tempFilters as any)[filterConfig.key]}
                    onChange={(e) => setTempFilters({...tempFilters, [filterConfig.key]: e.target.value})}
                    className="w-full bg-white text-slate-900 pt-7 pb-3 px-4 rounded-xl shadow-sm border-0 focus:ring-2 focus:ring-rose-500 appearance-none font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    {filterConfig.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              ))}
              
               <button 
                onClick={handleApplyFilters}
                className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(225,29,72,0.3)] transition-all active:scale-95 group font-bold tracking-widest uppercase text-sm flex-1 md:flex-none min-w-[200px]"
              >
                {isLoading ? "Searching..." : "Apply filter"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {isLoading && courses.length === 0 ? (
          <div className="py-32 text-center text-slate-500 font-bold uppercase tracking-widest">
            <div className="w-16 h-16 border-4 border-[#ED2B3B] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            Loading Courses...
          </div>
        ) : isFilteredView ? (
          // Grid View for applied filters
          <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
             <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-200 dark:border-white/10">
               <h2 className="text-3xl font-bold dark:text-white">
                 Found <span className="text-rose-600">{courses.length}</span> Results
               </h2>
               <button onClick={() => { setIsFilteredView(false); setTempFilters({ location: "All Locations", delivery: "All Course Deliveries", load: "All Course Loads", school: "All Schools", subject: "All Subjects", credential: "All Credentials" }); setActiveFilters({ location: "All Locations", delivery: "All Course Deliveries", load: "All Course Loads", school: "All Schools", subject: "All Subjects", credential: "All Credentials" }); }} className="text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors underline underline-offset-4">
                 Clear Filters
               </button>
             </div>
             {courses.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map(course => (
                     <CourseCard key={course.id} course={course} onOpenLeadModal={openDrawer} isGrid={true} />
                  ))}
               </div>
             ) : (
               <div className="text-center py-20 bg-slate-100 dark:bg-slate-900 rounded-3xl">
                 <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Courses Found</h3>
                 <p className="text-slate-500">We couldn't find any programs matching those specific filters. Try broadening your search.</p>
               </div>
             )}
          </section>
        ) : (
          // Standard Category View
          <div className="animate-in fade-in duration-1000 border-t border-slate-100">
            <CourseCarousel title="Top courses in Computing & Information Technology" category="IT" courses={getCoursesBySubject("IT")} onOpenLeadModal={openDrawer} />
            
            {/* Mid Banner */}
            <section className="bg-[#ED2B3B] py-24 px-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,100 L100,0 L100,100 Z" fill="currentColor" /></svg>
              </div>
              <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">Education that works — <br className="hidden md:block"/>wherever the future takes you</h2>
                <p className="text-xl text-rose-100 mb-10 max-w-2xl mx-auto font-medium">Course Finder is Canada’s marketplace for education, empowering millions each year with tools they trust to navigate higher education and the future of work.</p>
                <Link href="/courses" className="inline-block bg-white text-[#ED2B3B] font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">View All Courses</Link>
              </div>
            </section>

            <CourseCarousel title="Top courses in Business & Management" category="Business" courses={getCoursesBySubject("Business")} onOpenLeadModal={openDrawer} />
            <CourseCarousel title="Top courses in Engineering & Applied Sciences" category="Engineering" courses={getCoursesBySubject("Engineering")} onOpenLeadModal={openDrawer} />
            
            {/* Trusted Banner */}
            <section className="py-20 bg-slate-900 text-center px-6">
              <h3 className="text-slate-400 font-semibold tracking-widest uppercase text-sm mb-12 border-b border-slate-800 pb-12 w-full max-w-xs mx-auto">Trusted by millions of learners in over 100 countries</h3>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-20">Find the right school with help from <span className="text-[#ED2B3B] italic">real students</span></h2>
            </section>

            <CourseCarousel title="Top courses in Health & Life Sciences" category="Health" courses={getCoursesBySubject("Health")} onOpenLeadModal={openDrawer} />
            <CourseCarousel title="Top courses in Arts & Social Sciences" category="Arts" courses={getCoursesBySubject("Arts")} onOpenLeadModal={openDrawer} />
          </div>
        )}
      </div>

      <LeadForms />

      {/* Global Course Side-Drawer Map */}
      <CourseDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} course={selectedCourse} />
    </main>
  );
}
