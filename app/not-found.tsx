import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-xs font-black tracking-[0.28em] text-rose-600 uppercase mb-3">404 Error</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-5">
          We can&apos;t find that page
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-base md:text-lg">
          The page may have been moved, renamed, or is temporarily unavailable. You can continue exploring
          programs and schools from the links below.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            href="/courses"
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold hover:bg-slate-100 transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            href="/schools"
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold hover:bg-slate-100 transition-colors"
          >
            View Schools
          </Link>
        </div>
      </section>
    </main>
  );
}

