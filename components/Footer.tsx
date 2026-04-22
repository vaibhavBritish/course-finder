import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Info Banner */}
        <div className="mb-16 border-b border-white/10 pb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            CourseCompare has helped more than 5 million <br className="hidden md:block" />
            people worldwide pursue in-demand skills <br className="hidden md:block" />
            or launch new careers since 2018.
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16 text-sm">
          {/* About */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-xs border-l-2 border-rose-600 pl-3">About</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">About</Link></li>
              <li><Link href="/career-navigator" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Career Navigator</Link></li>
              <li><Link href="/write-a-review" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Write a Review</Link></li>
              <li><Link href="/training-programs" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Training Programs</Link></li>
              <li><Link href="/advertise" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Advertise With Us</Link></li>
            </ul>
          </div>

          {/* Popular Subjects */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-xs border-l-2 border-rose-600 pl-3">Popular Subjects</h3>
            <ul className="space-y-4">
              <li><Link href="/subject/data-science" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Data Science</Link></li>
              <li><Link href="/subject/digital-marketing" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Digital Marketing</Link></li>
              <li><Link href="/subject/product-management" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Product Management</Link></li>
              <li><Link href="/subject/social-media-marketing" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Social Media Marketing</Link></li>
              <li><Link href="/subjects" className="text-rose-500 hover:text-rose-400 font-bold hover:translate-x-1 transition-all inline-block flex items-center gap-1 mt-2">More Subjects <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></li>
            </ul>
          </div>

          {/* Career Guides */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-xs border-l-2 border-rose-600 pl-3">Career Guides</h3>
            <ul className="space-y-4">
              <li><Link href="/guide/data-scientist" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Become a Data Scientist</Link></li>
              <li><Link href="/guide/data-analyst" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Become a Data Analyst</Link></li>
              <li><Link href="/guide/pilot" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Become a Pilot</Link></li>
              <li><Link href="/guide/digital-marketer" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Become a Digital Marketer</Link></li>
              <li><Link href="/guides" className="text-rose-500 hover:text-rose-400 font-bold hover:translate-x-1 transition-all inline-block flex items-center gap-1 mt-2">More Guides <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></li>
            </ul>
          </div>

          {/* Immigration */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-xs border-l-2 border-rose-600 pl-3">Immigration</h3>
            <ul className="space-y-4">
              <li><Link href="/immigration/consultants" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Immigration Consultants</Link></li>
              <li><Link href="/immigration/lawyers" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">Immigration Lawyers</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-xs border-l-2 border-rose-600 pl-3">Connect</h3>
            <ul className="space-y-4">
              <li><a href="mailto:hello@coursecompare.ca" className="hover:text-rose-500 transition-colors font-medium">hello@coursecompare.ca</a></li>
              <li><a href="tel:18007501392" className="hover:text-rose-500 transition-colors font-medium">1.800.750.1392</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex-1">
            <h3 className="text-2xl font-extrabold text-white mb-2">Join Our Community</h3>
            <p className="text-slate-400 font-medium">Get info about top courses, career resources and the latest scholarship and funding opportunities.</p>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-72 bg-slate-800 border-white/10 text-white rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
              <button className="bg-white hover:bg-slate-200 text-slate-900 font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium opacity-80">
          <p>© 2026 Course Finder. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms Of Use</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
