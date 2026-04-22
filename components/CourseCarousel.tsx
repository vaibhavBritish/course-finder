"use client";

import Link from "next/link";
import { useRef } from "react";
import CourseCard, { Course } from "./CourseCard";

interface CourseCarouselProps {
  title: string;
  category: string;
  courses: Course[];
  onOpenLeadModal: (course: Course) => void;
}

export default function CourseCarousel({ title, category, courses, onOpenLeadModal }: CourseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
  };

  if (!courses || courses.length === 0) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-light text-slate-800">
             {title}
          </h2>
          <div className="flex items-center gap-6">
            <Link 
              href={`/courses?subject=${category}`} 
              className="text-sm font-bold text-slate-400 hover:text-rose-600 underline underline-offset-4 decoration-slate-200 hover:decoration-rose-600 transition-all font-sans uppercase tracking-widest"
            >
              View All Courses
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-600 transition-all z-10 bg-white hover:shadow-lg active:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-600 transition-all z-10 bg-white hover:shadow-lg active:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar p-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
             <CourseCard key={course.id} course={course} onOpenLeadModal={onOpenLeadModal} />
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}
