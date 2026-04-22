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
    <main className="flex-1 bg-slate-50">
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
          <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100/70 via-transparent to-white/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center md:text-left w-full mt-10">
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 tracking-tight text-slate-900 animate-in slide-in-from-bottom-8 duration-700">
            Start something <br className="hidden md:block" /> life-changing
          </h1>
          <p className="text-lg md:text-2xl text-slate-700 mb-12 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-10 duration-700 delay-100 fill-mode-both">
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
             <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-200">
               <h2 className="text-3xl font-bold text-slate-900">
                 Found <span className="text-rose-600">{courses.length}</span> Results
               </h2>
               <button onClick={() => { setIsFilteredView(false); setTempFilters({ location: "All Locations", delivery: "All Course Deliveries", load: "All Course Loads", school: "All Schools", subject: "All Subjects", credential: "All Credentials" }); setActiveFilters({ location: "All Locations", delivery: "All Course Deliveries", load: "All Course Loads", school: "All Schools", subject: "All Subjects", credential: "All Credentials" }); }} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors underline underline-offset-4">
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
              <div className="text-center py-20 bg-slate-100 rounded-3xl">
                 <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Courses Found</h3>
                 <p className="text-slate-500">We couldn't find any programs matching those specific filters. Try broadening your search.</p>
               </div>
             )}
          </section>
        ) : (
          // Standard Category View
          <div className="animate-in fade-in duration-1000 border-t border-slate-100">
            {/* Impact Stats Section */}
            <section className="py-24 px-6 bg-white border-b border-slate-100">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  <div className="space-y-2">
                    <p className="text-4xl md:text-5xl font-serif font-black text-slate-900">500+</p>
                    <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">Accredited Institutions</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl md:text-5xl font-serif font-black text-slate-900">3M+</p>
                    <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">Annual Learners</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl md:text-5xl font-serif font-black text-[#ED2B3B]">$50M+</p>
                    <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">Unlocked in Funding</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl md:text-5xl font-serif font-black text-slate-900">5M+</p>
                    <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">Skills Gained</p>
                  </div>
                </div>
              </div>
            </section>

            <CourseCarousel title="Top courses in Computing & Information Technology" category="IT" courses={getCoursesBySubject("IT")} onOpenLeadModal={openDrawer} />
            
            {/* Smarter School Search & Network Section */}
            <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">Level Up for the <br/><span className="text-[#ED2B3B] italic">Future of Work</span></h2>
                    <h3 className="text-xl font-bold text-slate-800">Smarter School Search</h3>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                      Admissions teams are just a click away. Compare programs, explore verified student reviews, and assess learning outcomes, job placements, and tuition costs—all in one place.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Verified Reviews</h4>
                      <p className="text-sm text-slate-500">Real student experiences to guide your decision.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Funding Access</h4>
                      <p className="text-sm text-slate-500">Match with scholarships and grants instantly.</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden relative shadow-2xl">
                    <Image 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                      alt="Education Network" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-10">
                      <div className="text-white space-y-2">
                        <p className="text-sm font-bold uppercase tracking-widest text-rose-400">Trusted Network</p>
                        <h4 className="text-2xl font-bold">Canada's Most Trusted Education Network</h4>
                        <p className="text-slate-300 text-sm">Partnering with leading colleges, universities, and training providers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mid Banner - Enhanced */}
            <section className="bg-[#ED2B3B] py-32 px-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,100 L100,0 L100,100 Z" fill="currentColor" /></svg>
              </div>
              <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">Changing lives through education</h2>
                <p className="text-xl text-rose-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                  From AI to aviation, healthcare to the trades, tech to design, and business to creative industries and beyond, we connect learners with high-quality programs and funding to prepare them for the future of work.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/courses" className="bg-white text-[#ED2B3B] font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                    Explore Programs
                  </Link>
                  <Link href="/career-navigator" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm transition-all">
                    Career Navigator
                  </Link>
                </div>
              </div>
            </section>

            <CourseCarousel title="Top courses in Business & Management" category="Business" courses={getCoursesBySubject("Business")} onOpenLeadModal={openDrawer} />
            
            {/* Funding Section */}
            <section className="py-32 px-6 bg-white">
              <div className="max-w-5xl mx-auto text-center space-y-8">
                <div className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
                  Financial Aid & Scholarships
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">More Ways to Fund Your Future</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Find scholarships, grants, and financial aid while you search. Get matched with the right program and connect directly with admissions teams to access funding that fits your ambitions—not just your budget.
                </p>
                <div className="pt-8">
                   <Link href="/about" className="text-rose-600 font-bold border-b-2 border-rose-600 pb-1 hover:text-rose-700 transition-colors">
                     Learn about scholarship opportunities →
                   </Link>
                </div>
              </div>
            </section>

            <CourseCarousel title="Top courses in Engineering & Applied Sciences" category="Engineering" courses={getCoursesBySubject("Engineering")} onOpenLeadModal={openDrawer} />
            
            {/* Editorial Excellence Section */}
            <section className="py-40 bg-slate-100 text-slate-900 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-600/5 blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/5 blur-[120px]"></div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Editorial Excellence & <span className="text-rose-500 italic">Trusted Insights</span></h2>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        Course Finder is committed to rigorous research, independent reporting, and data-driven rankings to help learners navigate a fast-changing education and job market with confidence.
                      </p>
                    </div>
                    
                    <div className="space-y-6 text-slate-600">
                      <p>
                        Our outcomes-based rankings—powered by proprietary learner data—set national benchmarks amid rising tuition, rapid technological change, and evolving workforce demands. Built on real employment data, labour market trends, and verified student outcomes, our editorial products surface what matters most: programs that deliver results.
                      </p>
                      <p>
                        Our reporting has been featured in <span className="text-slate-900 font-bold italic">The Globe and Mail</span>, <span className="text-slate-900 font-bold italic">Toronto Star</span>, <span className="text-slate-900 font-bold italic">Global News</span>, and cited by organizations including the <span className="text-slate-900 font-bold italic">National Institutes of Health (NIH)</span> and the <span className="text-slate-900 font-bold italic">C.D. Howe Institute</span>.
                      </p>
                    </div>

                    <div className="pt-10 border-t border-white/10 flex flex-wrap gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                       <span className="text-xl font-serif font-black italic">The Globe and Mail</span>
                       <span className="text-xl font-serif font-black italic">Toronto Star</span>
                       <span className="text-xl font-serif font-black italic">Global News</span>
                       <span className="text-xl font-serif font-black italic">National Post</span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm p-10 md:p-16 rounded-[40px] border border-white/10 space-y-12">
                    <div className="space-y-6">
                      <div className="w-16 h-1 w-rose-600"></div>
                      <h3 className="text-3xl font-serif font-bold">Innovation in Decision-Making</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Through UX innovation, proprietary data analytics, and human-centered digital design, we make complex education and career decisions clearer and more actionable.
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 bg-rose-600/20 text-rose-500 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Proprietary Data</h4>
                          <p className="text-sm text-slate-500">Rankings built on real employment data and labour market trends.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Career Navigator</h4>
                          <p className="text-sm text-slate-500">Expert insights and real student stories for every stage of the journey.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
