"use client";

import { useEffect } from "react";
import type { Course } from "./CourseCard";

interface CourseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export default function CourseDrawer({ isOpen, onClose, course }: CourseDrawerProps) {
  
  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header content and Close Button */}
        <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex-none relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-white shadow-sm p-1.5 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <p className="text-sm font-bold text-slate-500 mb-1">You are interested in</p>
          <div className="flex gap-4 mt-4">
             <div className="w-12 h-12 relative flex-none rounded-md bg-white shadow-sm border border-slate-100 overflow-hidden">
                <img src={course.imageUrl} alt="logo" className="w-full h-full object-cover" />
             </div>
             <div>
                <p className="text-xs font-bold text-[#ED2B3B] uppercase tracking-wide mb-1">{course.school}</p>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{course.title}</h3>
             </div>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <p className="text-sm text-slate-600 mb-8 font-medium">Enter your contact details for a course package and funding options.</p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Your Full Name*</label>
              <input type="text" placeholder="Your Full Name" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#ED2B3B] focus:border-[#ED2B3B] transition-all font-medium text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Your Email Address*</label>
              <input type="email" placeholder="Your Email Address" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#ED2B3B] focus:border-[#ED2B3B] transition-all font-medium text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">International Phone</label>
              <div className="flex">
                <select className="bg-slate-100 border border-slate-200 text-slate-600 font-bold rounded-l-lg px-3 focus:outline-none border-r-0 cursor-pointer">
                   <option value="+91">+91</option>
                   <option value="+1">+1</option>
                   <option value="+44">+44</option>
                </select>
                <input type="tel" placeholder="81234 56789" className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-r-lg py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#ED2B3B] focus:border-[#ED2B3B] transition-all font-medium text-sm" />
              </div>
            </div>

            <div className="flex items-start mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center h-5">
                 <input id="organization" type="checkbox" className="w-4 h-4 text-[#ED2B3B] bg-white border-slate-300 rounded focus:ring-[#ED2B3B] focus:ring-2" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="organization" className="font-bold text-slate-700 block">Is Organization</label>
                <span className="text-slate-500 text-xs">Training for multiple employees?</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-8 leading-relaxed">
              By submitting your email address, you acknowledge and agree to CourseCompare.ca's Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
        
        {/* Sticky Footer */}
        <div className="p-6 border-t border-slate-100 bg-white">
           <button type="submit" className="w-full bg-[#ED2B3B] hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/30 transition-all uppercase tracking-widest text-sm active:scale-[0.98]">
             Send a message
           </button>
        </div>
      </div>
    </>
  );
}
