"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const categoryMenu: Record<string, string[]> = {
  "Business": [
    "Online MBA Programs",
    "MBA",
    "Business",
    "Accounting",
    "Bookkeeping",
    "Business Analysis",
    "Change Management",
    "Entrepreneurship",
    "Human Resources",
    "Hospitality and Tourism",
    "Leadership & Management",
    "Payroll",
    "Sales Training",
    "Supply Chain Management",
  ],
  "Beauty": [
    "Makeup Artistry",
    "Esthetics",
    "Hair Styling",
    "Nail Technician",
    "Barbering",
    "Cosmetology",
    "Medical Aesthetics",
    "Beauty Business",
  ],
  "Creative Arts & Media": [
    "Graphic Design",
    "Interior Design",
    "Photography",
    "Film & Video",
    "Animation",
    "Music Production",
    "Journalism",
    "Content Creation",
  ],
  "Culinary Arts": [
    "Culinary Arts",
    "Baking & Pastry",
    "Restaurant Management",
    "Food Safety",
    "Catering",
    "Hospitality Culinary",
  ],
  "Data Science": [
    "Data Science",
    "Data Analytics",
    "Business Intelligence",
    "Machine Learning",
    "Artificial Intelligence",
    "Statistics",
    "Data Engineering",
  ],
  "Design": [
    "UX/UI Design",
    "Product Design",
    "Graphic Design",
    "Web Design",
    "Interior Design",
    "Fashion Design",
    "Design Thinking",
  ],
  "Development": [
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "Mobile App Development",
    "Software Engineering",
    "QA Testing",
    "DevOps",
  ],
  "Digital Marketing": [
    "Digital Marketing",
    "SEO",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "PPC Advertising",
    "Marketing Analytics",
    "Brand Strategy",
  ],
  "Finance": [
    "Finance",
    "Financial Planning",
    "Investment Management",
    "FinTech",
    "Banking",
    "Risk Management",
    "Taxation",
  ],
  "Health Care": [
    "Healthcare Administration",
    "Nursing",
    "Medical Office Assistant",
    "Pharmacy Assistant",
    "Personal Support Worker",
    "Health Informatics",
    "Public Health",
  ],
  "Information Technology": [
    "Cybersecurity",
    "Cloud Computing",
    "Network Administration",
    "IT Support",
    "Systems Administration",
    "Database Administration",
    "IT Project Management",
  ],
  "Project Management": [
    "Project Management",
    "PMP Preparation",
    "Agile & Scrum",
    "Construction Project Management",
    "IT Project Management",
    "Program Management",
  ],
  "Skilled Trades": [
    "Electrician",
    "Plumbing",
    "HVAC",
    "Welding",
    "Automotive Service",
    "Carpentry",
    "Heavy Equipment",
  ],
  "Language Learning": [
    "English Language",
    "IELTS Preparation",
    "French Language",
    "Business English",
    "Academic Writing",
    "Communication Skills",
  ],
};

const categories = Object.keys(categoryMenu);
const rankingsMenu = [
  "Acting Schools",
  "BBA and BCom Degrees",
  "Online BBA and BCom",
  "Beauty Schools",
  "Business Schools",
  "Coding Bootcamps",
  "Colleges in Ontario",
  "Online Computer Science Degrees",
  "Co-op Programs",
  "Culinary Schools",
  "Cybersecurity Certifications",
  "Data Analytics Certifications",
  "Data Science Bootcamps",
  "Digital Marketing Certifications",
  "Early Childhood Education (ECE) Programs",
  "Engineering Schools",
  "Executive MBA (EMBA)",
  "Film Schools",
  "Flight Schools",
  "Massage Therapy Schools",
  "Medical Schools",
  "Nursing Schools",
  "OHS Programs",
  "Online MBA Programs",
  "Online Universities",
  "Part-time MBAs",
  "Trade Schools",
  "Truck Driving Schools",
];
const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

type SchoolEntry = {
  name: string;
  slug: string;
  location: string;
  courseCount: number;
  averageRating: number;
  logoUrl?: string;
};

const Navbar = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isSchoolsOpen, setIsSchoolsOpen] = useState(false);
  const [isRankingsOpen, setIsRankingsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [schools, setSchools] = useState<SchoolEntry[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/schools?limit=18");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && Array.isArray(data.schools)) {
          setSchools(data.schools);
        }
      } catch {
        // Keep nav usable even if schools API fails.
      }
    };
    fetchSchools();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Main Navbar - Increased height and removed py-4 from nav to use flex-stretch */}
      <nav className="bg-slate-50/95 backdrop-blur-md px-4 md:px-8 h-20">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between h-full gap-4">
          {/* Logo - Centered vertically manually */}
          <div className="flex items-center gap-2 py-4">
            <Link href="/" className="flex items-center text-3xl font-extrabold tracking-tighter group">
              <span className="text-slate-900 transition-colors duration-500">Course</span>
              <span className="text-[#D90038]">finder</span>
              <div className="ml-2 relative flex items-center justify-center">
                <div className="w-5 h-5 bg-[#D90038] rounded-full"></div>
                <svg className="absolute -bottom-2 -right-3 w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l1.5 8 8 1.5-8 1.5-1.5 8-1.5-8-8-1.5 8-1.5z" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop - Using items-stretch to make links fill height */}
          <div className="hidden lg:flex items-stretch gap-8">
            {[
              "ABOUT",
              "CAREER NAVIGATOR",
              "COURSES",
              "SCHOOLS",
              "RANKINGS",
              "WRITE A REVIEW",
            ].map((link) => (
              <div
                key={link}
                className="relative group h-full flex items-center"
                onMouseEnter={() => {
                  if (link === "COURSES") setIsCoursesOpen(true);
                  if (link === "SCHOOLS") setIsSchoolsOpen(true);
                  if (link === "RANKINGS") setIsRankingsOpen(true);
                }}
                onMouseLeave={() => {
                   if (link === "COURSES") {
                     setIsCoursesOpen(false);
                     setActiveCategory(null);
                   }
                   if (link === "SCHOOLS") {
                     setIsSchoolsOpen(false);
                   }
                   if (link === "RANKINGS") {
                     setIsRankingsOpen(false);
                   }
                }}
              >
                <Link
                  href={
                    link === "COURSES"
                      ? "/courses"
                      : link === "RANKINGS"
                        ? "#"
                        : link === "SCHOOLS"
                        ? "/schools"
                        : `/${link.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="text-[11px] font-black text-slate-500 group-hover:text-slate-900 transition-all duration-300 tracking-[0.2em] relative h-full flex items-center px-1"
                >
                  {link}
                  {/* Underline helper */}
                  <span className="absolute bottom-4 left-0 w-0 h-px bg-rose-600 group-hover:w-full transition-all duration-500"></span>
                </Link>

                {/* Courses Dropdown */}
                {link === "COURSES" && isCoursesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-64 pt-1">
                    {/* Invisible Bridge to catch mouse movement and prevent dismissal */}
                    <div className="absolute -top-10 left-0 w-full h-10 bg-transparent pointer-events-auto" />
                    
                    {/* Caret with Drop Animation */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-in zoom-in-50 slide-in-from-top-4 duration-300">
                      <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-rose-600"></div>
                    </div>
                    
                    {/* Dropdown Menu */}
                    <div className="bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200 border-t-4 border-t-rose-600 overflow-visible animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 origin-top mt-2">
                      <div className="relative flex flex-col py-1">
                        {categories.map((category, idx) => (
                          <div
                            key={category}
                            className="relative"
                            onMouseEnter={() => setActiveCategory(category)}
                          >
                            <Link
                              href={`/courses/${category.toLowerCase().replace(/ /g, "-")}`}
                              onClick={() => {
                                setIsCoursesOpen(false);
                                setActiveCategory(null);
                              }}
                              className={`flex items-center justify-between px-5 py-2.5 transition-colors duration-150 ${
                                activeCategory === category
                                  ? "bg-rose-50 text-rose-700"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              <span className="text-[11px] font-bold tracking-[0.12em] uppercase">
                                {category}
                              </span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>

                            {activeCategory === category && (
                              <div
                                className={`absolute left-full ml-0 w-72 bg-white rounded-lg border border-slate-200 shadow-xl py-2 max-h-[calc(100vh-120px)] overflow-y-auto ${
                                  idx >= categories.length - 4 ? "bottom-0" : "top-0"
                                }`}
                              >
                                {categoryMenu[category].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/courses?subject=${encodeURIComponent(item)}`}
                                    onClick={() => {
                                      setIsCoursesOpen(false);
                                      setActiveCategory(null);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-rose-700 transition-colors"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Schools Dropdown */}
                {link === "SCHOOLS" && isSchoolsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-80 pt-1">
                    <div className="absolute -top-8 left-0 w-full h-8 bg-transparent pointer-events-auto" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                      <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-rose-600"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200 border-t-4 border-t-rose-600 mt-2 overflow-hidden">
                      <div className="max-h-[420px] overflow-y-auto py-1">
                        {schools.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-slate-500">No schools available</div>
                        ) : (
                          schools.map((school) => (
                            <Link
                              key={school.slug}
                              href={`/schools/${school.slug}`}
                              onClick={() => setIsSchoolsOpen(false)}
                              className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-md border border-slate-200 bg-white relative overflow-hidden p-1 shrink-0">
                                  {school.logoUrl ? (
                                    <img
                                      src={school.logoUrl}
                                      alt={`${school.name} logo`}
                                      className="w-full h-full object-contain"
                                      loading="lazy"
                                      referrerPolicy="no-referrer"
                                      onError={(e) => {
                                        const target = e.currentTarget;
                                        if (target.src.endsWith("/favicon.ico")) return;
                                        target.src = "/favicon.ico";
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-400 font-semibold">
                                      LOGO
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-slate-800 line-clamp-1">{school.name}</p>
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                    {school.courseCount} courses • {school.location}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                      <div className="border-t border-slate-100 p-3">
                        <Link
                          href="/schools"
                          onClick={() => setIsSchoolsOpen(false)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 tracking-wider uppercase"
                        >
                          View all schools
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rankings Dropdown */}
                {link === "RANKINGS" && isRankingsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-96 pt-1">
                    <div className="absolute -top-8 left-0 w-full h-8 bg-transparent pointer-events-auto" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                      <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-rose-600"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200 border-t-4 border-t-rose-600 mt-2 overflow-hidden">
                      <div className="max-h-[430px] overflow-y-auto py-2">
                        <div className="px-4 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          Rankings
                        </div>
                        {rankingsMenu.map((item) => (
                          <Link
                            key={item}
                            href={`/rankings/${toSlug(item)}`}
                            onClick={() => setIsRankingsOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-rose-700 transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Section - Centered vertically manualmente */}
          <div className="flex items-center flex-1 max-w-sm ml-auto relative group/search py-4">
            <div className="relative w-full overflow-hidden rounded-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                <svg
                  className="w-4 h-4 text-slate-400 group-focus-within/search:text-rose-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-slate-100 text-slate-900 text-xs rounded-full py-3.5 pl-12 pr-28 border border-slate-200 focus:outline-none focus:border-rose-600/50 focus:ring-4 focus:ring-rose-600/10 transition-all placeholder:text-slate-500 font-medium"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-6 rounded-full transition-all shadow-lg shadow-rose-600/20 active:scale-95 z-20">
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar ends here */}

      <style jsx global>{`
        @keyframes fadeInAndSlideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
