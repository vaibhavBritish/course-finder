import Link from "next/link";

export default function AdvertisePage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Advertise With Us</h1>
        <p className="text-slate-600 max-w-3xl">
          Reach motivated learners actively searching for schools, courses, and career pathways across Canada.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Partnership Opportunities</h2>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li>Featured school and course placements</li>
            <li>Sponsored content and editorial partnerships</li>
            <li>Lead generation campaigns</li>
            <li>Co-branded webinars and events</li>
          </ul>
          <p className="text-sm text-slate-500">
            To discuss media kits and pricing, contact our partnerships team.
          </p>
          <a
            href="mailto:hello@coursecompare.ca"
            className="inline-block bg-rose-600 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-lg"
          >
            Contact Partnerships
          </a>
        </div>

        <div className="mt-6">
          <Link href="/about" className="text-rose-600 font-semibold hover:underline">
            Learn more about Course Finder →
          </Link>
        </div>
      </section>
    </main>
  );
}

