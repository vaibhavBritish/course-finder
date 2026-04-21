"use client";

import React, { useState } from "react";
import Link from "next/link";

const categories = [
  "BUSINESS",
  "BEAUTY",
  "CREATIVE ARTS & MEDIA",
  "CULINARY ARTS",
  "DATA SCIENCE",
  "DESIGN",
  "DEVELOPMENT",
  "DIGITAL MARKETING",
  "FINANCE",
  "HEALTH CARE",
  "INFORMATION TECHNOLOGY",
  "PROJECT MANAGEMENT",
  "SKILLED TRADES",
  "LANGUAGE LEARNING",
];

const Navbar = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Main Navbar - Increased height and removed py-4 from nav to use flex-stretch */}
      <nav className="bg-slate-950/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 h-20">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between h-full gap-4">
          {/* Logo - Centered vertically manually */}
          <div className="flex items-center gap-2 py-4">
            <Link href="/" className="flex items-center text-2xl font-bold tracking-tight group">
              <span className="text-white group-hover:text-rose-500 transition-colors duration-500">Course</span>
              <span className="text-rose-600 italic">Compare</span>
              <div className="ml-2 w-3 h-3 bg-rose-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(225,29,72,0.5)]"></div>
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
                onMouseEnter={() => link === "COURSES" && setIsCoursesOpen(true)}
                onMouseLeave={() => {
                   if (link === "COURSES") {
                     setIsCoursesOpen(false);
                     setHoveredIndex(null);
                   }
                }}
              >
                <Link
                  href={link === "COURSES" ? "#" : `/${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-[11px] font-black text-slate-400 group-hover:text-white transition-all duration-300 tracking-[0.2em] relative h-full flex items-center px-1"
                >
                  {link}
                  {/* Underline helper */}
                  <span className="absolute bottom-4 left-0 w-0 h-px bg-rose-600 group-hover:w-full transition-all duration-500"></span>
                </Link>

                {/* Courses Dropdown */}
                {link === "COURSES" && isCoursesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-72 pt-1">
                    {/* Invisible Bridge to catch mouse movement and prevent dismissal */}
                    <div className="absolute -top-10 left-0 w-full h-10 bg-transparent pointer-events-auto" />
                    
                    {/* Caret with Drop Animation */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-in zoom-in-50 slide-in-from-top-4 duration-300">
                      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-rose-600"></div>
                    </div>
                    
                    {/* Dropdown Menu */}
                    <div className="bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-4 border-rose-600 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 origin-top mt-2">
                      <div className="flex flex-col py-1 relative">
                        {/* Magnetic Hover Background */}
                        {hoveredIndex !== null && (
                          <div 
                            className="absolute left-0 w-full bg-zinc-50 border-y border-zinc-100 transition-all duration-300 ease-out z-0"
                            style={{ 
                              top: `${hoveredIndex * 52 + 4}px`, 
                              height: '52px' 
                            }}
                          />
                        )}

                        {categories.map((category, idx) => (
                          <Link
                            key={category}
                            href={`/courses/${category.toLowerCase().replace(/ /g, "-")}`}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onClick={() => setIsCoursesOpen(false)}
                            className="relative z-10 flex items-center justify-between px-8 py-4 group/item transition-all duration-200"
                            style={{ 
                              animationDelay: `${idx * 40}ms`,
                              animation: 'fadeInAndSlideIn 0.5s ease-out forwards'
                            }}
                          >
                            <span className={`text-[11px] font-black tracking-widest transition-colors duration-300 ${hoveredIndex === idx ? 'text-rose-600' : 'text-slate-900'}`}>
                              {category}
                            </span>
                            <div className="flex items-center gap-2 overflow-hidden">
                               <svg 
                                className={`w-3 h-3 transition-all duration-300 transform ${hoveredIndex === idx ? 'translate-x-0 opacity-100 text-rose-600' : '-translate-x-4 opacity-0 text-slate-400'}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
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
                className="w-full bg-slate-900 text-white text-xs rounded-full py-3.5 pl-12 pr-28 border border-white/5 focus:outline-none focus:border-rose-600/50 focus:ring-4 focus:ring-rose-600/10 transition-all placeholder:text-slate-500 font-medium"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-6 rounded-full transition-all shadow-lg shadow-rose-600/20 active:scale-95 z-20">
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Stats Bar with subtle glow */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-2 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex items-center gap-8 text-[10px] md:text-xs">
          <div className="flex items-center gap-3 group cursor-pointer">
             <span className="text-lg grayscale group-hover:grayscale-0 transition-all duration-500">🇨🇦</span>
             <span className="text-slate-300 font-bold border-b border-rose-600 pb-0.5 leading-none group-hover:text-white transition-colors">
               Canadian unemployment
             </span>
          </div>

          <div className="flex items-center gap-6 text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-black text-white">6.7%</span>
              <span className="text-[9px] uppercase tracking-tighter opacity-60">March 2026</span>
            </div>

            <div className="w-px h-3 bg-white/10"></div>

            <div className="flex items-center gap-2 group/stat">
              <div className="bg-emerald-500/10 p-1 rounded-full group-hover/stat:bg-emerald-500/20 transition-colors">
                <svg 
                  className="w-2.5 h-2.5 text-emerald-400 group-hover/stat:scale-125 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <span className="font-black text-white">0.2</span>
              <span className="text-[9px] uppercase tracking-tighter opacity-60">Monthly Change</span>
            </div>
          </div>
        </div>
      </div>

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
