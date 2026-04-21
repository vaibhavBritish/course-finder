import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-white text-center md:text-left w-full">
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 tracking-tight animate-fade-in">
            Start something <br className="hidden md:block" /> life-changing
          </h1>
          <p className="text-lg md:text-2xl text-zinc-200 mb-12 max-w-2xl leading-relaxed">
            Find top-rated schools, degrees and certifications to build <br className="hidden md:block" />
            in-demand skills and shape your future.
          </p>

          {/* Search Filters / Selects */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: "All Locations" },
              { label: "All Subjects" },
              { label: "All Course Loads" },
            ].map((filter, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
              >
                <div className="bg-white text-slate-900 px-6 py-4 rounded-md flex items-center justify-between shadow-xl transition-all hover:bg-zinc-50">
                  <span className="font-medium text-sm">{filter.label}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center md:justify-start">
               <button className="bg-rose-600 hover:bg-rose-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-rose-600/30 transition-all hover:scale-110 active:scale-95 group">
                 <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </button>
            </div>
          </div>

          {/* Bottom Filters */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mt-4">
            {[
              { label: "All Schools" },
              { label: "All Credentials" },
              { label: "All Course Deliveries" },
            ].map((filter, index) => (
              <div key={index} className="flex items-center gap-2 group cursor-pointer">
                <span className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{filter.label}</span>
                <svg className="w-4 h-4 text-white/50 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section (Placeholder) */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Top courses in <span className="text-rose-600">Artificial Intelligence (AI)</span>
            </h2>
            <Link href="/courses" className="text-sm font-bold text-slate-400 hover:text-rose-600 underline underline-offset-4 decoration-slate-200 hover:decoration-rose-600 transition-all">
              View All Courses
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
             <div className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
             <div className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
