"use client";

import { useState } from "react";

export default function LeadForms() {
  const [activeForm, setActiveForm] = useState<"education" | "immigration" | null>(null);

  const programs = [
    "Business Immigration",
    "Citizenship Application",
    "Extend Your Stay in Canada",
    "Family Sponsorship",
    "Hiring Foreign Workers",
    "Immigration to Canada",
    "Initial Consultation",
    "Other Programs",
    "Permanent Residence",
    "Renewals & Appeals",
    "Settlement Services",
    "Study Permit",
    "Visitor Visa or Super Visa",
    "Work Permit"
  ];

  return (
    <section className="py-24 bg-rose-600 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,100 C20,0 50,100 100,0 L100,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {!activeForm ? (
          <div className="text-center w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center group cursor-pointer hover:-translate-y-2 transition-transform duration-500" onClick={() => setActiveForm("education")}>
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Enrollment starts here</h2>
              <p className="text-slate-500 mb-8 text-center leading-relaxed">Let us help you find top-rated schools and certifications to shape your future.</p>
              <button className="bg-slate-900 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-xs">Find My Program</button>
            </div>

            <div className="flex-1 bg-rose-900 p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center group cursor-pointer hover:-translate-y-2 transition-transform duration-500" onClick={() => setActiveForm("immigration")}>
               <div className="w-20 h-20 bg-rose-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Immigration Help</h2>
              <p className="text-rose-200 mb-8 text-center leading-relaxed">Reach millions of students on Canada’s leading education marketing platform.</p>
              <button className="bg-white text-rose-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-xs">Reach Students Now</button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-500">
            <button 
              onClick={() => setActiveForm(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 p-2 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              {activeForm === "education" ? "You are interested in" : "You need help with"}
            </h3>
            <p className="text-slate-500 mb-8">
              {activeForm === "education" ? "Enter your contact details for an admissions package and funding information." : "Enter your contact details for immigration information."}
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {activeForm === "immigration" && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">I need assistance with:*</label>
                    <select className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium">
                      <option value="">Select a program...</option>
                      {programs.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Country of Residence*</label>
                      <input type="text" placeholder="Country" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">I am interested in*</label>
                      <input type="text" placeholder="Interest" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium" />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Full Name*</label>
                  <input type="text" placeholder="Jane Doe" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Email*</label>
                  <input type="email" placeholder="jane@example.com" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">International Phone</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 font-bold">+1</span>
                  <input type="tel" placeholder="123 456 7890" className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-r-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium" />
                </div>
              </div>

              {activeForm === "education" && (
                <div className="flex items-center mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <input id="organization" type="checkbox" className="w-5 h-5 text-rose-600 border-slate-300 rounded focus:ring-rose-500 focus:ring-2" />
                  <label htmlFor="organization" className="ml-3 text-sm font-bold text-slate-700">Is Organization / Training for multiple employees?</label>
                </div>
              )}

              <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                By submitting your email address, you acknowledge and agree to CourseCompare.ca's Terms of Service and Privacy Policy.
              </p>

              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_15px_30px_rgba(225,29,72,0.4)] transition-all uppercase tracking-widest text-sm mt-4 active:scale-[0.98]">
                Get Information
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
