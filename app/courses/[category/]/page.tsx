import React from "react";

export default async function CourseCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const formattedCategory = category
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <span className="text-rose-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">
          Courses / Category
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {formattedCategory}
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Explore the best {formattedCategory.toLowerCase()} programs and certifications curated to help you master in-demand skills.
        </p>
        
        {/* Placeholder for list of courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30 grayscale pointer-events-none">
           <div className="h-64 bg-slate-200 rounded-2xl animate-pulse"></div>
           <div className="h-64 bg-slate-200 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
