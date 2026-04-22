import Link from "next/link";
import Image from "next/image";

const STATS = [
  { value: "500+", label: "Accredited Institutions" },
  { value: "3M+", label: "Annual Learners" },
  { value: "$50M+", label: "Unlocked in Scholarships & Funding" },
  { value: "5M+", label: "Learners Who Gained In-Demand Skills" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Smarter School Search",
    body: "Admissions teams are just a click away. Compare programs, explore verified student reviews, and assess learning outcomes, job placements, and tuition costs—all in one place. With rich, up-to-date data at your fingertips, finding the right path has never been easier.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Canada's Most Trusted Education Network",
    body: "We partner with leading colleges, universities, and training providers to deliver high-impact programs backed by real-world results. From industry-embedded learning to government-funded upskilling and hands-on training, CourseFind keeps you connected with institutions shaping Canada's future workforce.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "More Ways to Fund Your Future",
    body: "Find scholarships, grants, and financial aid while you search. Get matched with the right program and connect directly with admissions teams to access funding that fits your ambitions—not just your budget.",
  },
];

const TEAM = [
  { name: "Michael Hartley", role: "Founder & CEO", initial: "MH", color: "bg-rose-600", photo: "/team/team_robert_furtado.png" },
  { name: "Sofia Marchetti", role: "Director of Partner Success", initial: "SM", color: "bg-indigo-600", photo: "/team/team_amanda_mirizzi.png" },
  { name: "Arjun Sharma", role: "Growth Marketing Manager", initial: "AS", color: "bg-emerald-600", photo: "/team/team_shubhendu_jha.png" },
  { name: "Elena Vasquez", role: "Managing Editor", initial: "EV", color: "bg-amber-600", photo: "/team/team_jessica_aftimus.png" },
  { name: "Catherine Blake", role: "Fractional CMO", initial: "CB", color: "bg-violet-600", photo: "/team/team_kerri_mcallister.png" },
  { name: "David Chen", role: "Creative Director, Paid Media", initial: "DC", color: "bg-cyan-600", photo: "/team/team_james_zhao.png" },
  { name: "Kevin Liu", role: "Director of Paid Acquisition", initial: "KL", color: "bg-slate-700", photo: "/team/team_steven_zhang.png" },
  { name: "Marco Petrov", role: "Paid Media Strategist", initial: "MP", color: "bg-orange-600", photo: "/team/team_ivan_pavkovic.png" },
  { name: "Hannah Clarke", role: "Partnership Manager", initial: "HC", color: "bg-teal-600", photo: "/team/team_megan_ewers.png" },
  { name: "Imani Williams", role: "Learning Advisor", initial: "IW", color: "bg-pink-600", photo: "/team/team_nicole_jackson.png" },
  { name: "Priya Nair", role: "Senior Web Developer", initial: "PN", color: "bg-blue-600", photo: "/team/team_amanpreet_kaur.png" },
  { name: "Thomas Reid", role: "Contributing Editor", initial: "TR", color: "bg-zinc-600", photo: "/team/team_shane_schick.png" },
  { name: "Laura Mitchell", role: "Contributing Writer", initial: "LM", color: "bg-rose-400", photo: "/team/team_jennifer_brown.png" },
  { name: "Natalie Gros", role: "Contributing Writer", initial: "NG", color: "bg-lime-600", photo: "/team/team_rosalind_stefanac.png" },
  { name: "Patrick Donovan", role: "Contributing Writer", initial: "PD", color: "bg-sky-600", photo: null },
  { name: "Rachel Goldstein", role: "Contributing Writer", initial: "RG", color: "bg-fuchsia-600", photo: "/team/team_daina_goldfinger.png" },
  { name: "Maya Thompson", role: "Marketing Coordinator & Data Analyst", initial: "MT", color: "bg-yellow-600", photo: "/team/team_aya_kinsey.png" },
  { name: "Olivia Park", role: "Editorial Intern", initial: "OP", color: "bg-red-400", photo: "/team/team_cassandra_dixon.png" },
];

const PUBLICATIONS = [
  "The Globe and Mail", "Toronto Star", "Global News",
  "National Post", "National Institutes of Health (NIH)",
  "C.D. Howe Institute", "University Affairs", "MoneySense",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-slate-100 text-slate-900">
        <div className="absolute inset-0">
          <Image
            src="/about-hero.png"
            alt="Education hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-slate-100/70 to-rose-100/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8 pb-28 md:pt-10 md:pb-36">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED2B3B] animate-pulse"></span>
            Canada's Education Marketplace
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.05] mb-8 text-slate-900">
            Education that works —<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-rose-400">wherever the future takes you</span>
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl leading-relaxed">
            Course Finder is Canada's marketplace for education, trusted by millions to find top-rated schools and in-demand programs backed by real employment data and verified student ratings and reviews.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/courses" className="bg-[#ED2B3B] hover:bg-[#C4001B] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-red-900/30 text-sm">
              Explore Programs
            </Link>
            <Link href="/schools" className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold px-8 py-3.5 rounded-full transition-all text-sm">
              Browse Schools
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
            Changing lives through education
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-100">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-6">
                <p className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{s.value}</p>
                <p className="text-sm text-slate-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION TAGLINE ── */}
      <section className="bg-[#ED2B3B] py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Level Up for the Future of Work
          </h2>
          <p className="text-rose-100 mt-4 text-lg font-light">
            From AI to aviation, healthcare to the trades, tech to design — we connect learners with high-quality programs and funding.
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl bg-[#ED2B3B]/10 text-[#ED2B3B] flex items-center justify-center mb-6 group-hover:bg-[#ED2B3B] group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL EXCELLENCE ── */}
      <section className="bg-slate-100 text-slate-900 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-[#ED2B3B] font-bold uppercase tracking-widest mb-4">Editorial Excellence & Trusted Insights</p>
            <h2 className="text-4xl font-serif font-bold leading-snug mb-6">
              Data-driven rankings. <br />Independent reporting.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Course Finder is committed to rigorous research, independent reporting, and data-driven rankings to help learners navigate a fast-changing education and job market with confidence. Our outcomes-based rankings—powered by proprietary learner data—set national benchmarks amid rising tuition, rapid technological change, and evolving workforce demands.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Built on real employment data, labour market trends, and verified student outcomes, our editorial products surface what matters most: <span className="text-slate-900 font-medium">programs that deliver results</span>.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Featured in & cited by</p>
            <div className="grid grid-cols-2 gap-3">
              {PUBLICATIONS.map((pub) => (
                <div key={pub} className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                  {pub}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6 leading-relaxed">
              Our reporting has influenced programs at colleges and universities across Canada, and been cited by the National Institutes of Health and C.D. Howe Institute.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA SPLIT ── */}
      <section className="bg-white py-20 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-serif font-bold text-slate-900">Take the next step</h2>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 flex flex-col items-start">
            <div className="w-12 h-12 bg-[#ED2B3B]/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#ED2B3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">For Learners</p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Find the right program, compare top schools, and take control of your future.</h3>
            <Link href="/courses" className="mt-auto inline-block bg-[#ED2B3B] hover:bg-[#C4001B] text-white font-bold px-6 py-3 rounded-full text-sm transition-all">
              Find Programs
            </Link>
          </div>
          <div className="bg-slate-100 rounded-2xl p-10 flex flex-col items-start border border-slate-200">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">For Education Partners</p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Join Canada's marketplace for education and connect with motivated learners.</h3>
            <Link href="/contact" className="mt-auto inline-block bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-full text-sm transition-all">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold text-[#ED2B3B] uppercase tracking-widest mb-3">Our Team</p>
            <h2 className="text-4xl font-serif font-bold text-slate-900">The people behind Course Finder</h2>
          </div>

          {/* CEO highlight */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden shadow-xl shadow-rose-100 relative">
              <Image src="/team/team_robert_furtado.png" alt="Michael Hartley" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-0.5">Michael Hartley</h3>
              <p className="text-sm text-[#ED2B3B] font-semibold mb-4">Founder & CEO</p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                Michael is the founder and CEO of Course Finder, Canada's marketplace for education, helping millions of learners in over 100 countries develop in-demand skills, advance their careers and navigate an evolving job market. Under his leadership, Course Finder has become a trusted resource for students, institutions and employers, delivering data-driven insights into enrollment trends, workforce development and the changing economy.
              </p>
            </div>
          </div>

          {/* Rest of team grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {TEAM.slice(1).map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-slate-100 p-5 text-center hover:shadow-md transition-shadow group">
                <div className="w-24 h-24 rounded-2xl mx-auto mb-4 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className={`w-full h-full ${member.color} flex items-center justify-center text-white text-lg font-bold`}>
                      {member.initial}
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-900 leading-snug">{member.name}</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-tight">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-[#ED2B3B] py-20 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
          Career moves start here
        </h2>
        <p className="text-rose-100 text-lg mb-10 max-w-xl mx-auto">
          How learners found their path with Course Finder. Start your journey today.
        </p>
        <Link href="/courses" className="inline-block bg-white text-[#ED2B3B] font-bold px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
          Explore All Courses
        </Link>
      </section>

    </main>
  );
}
