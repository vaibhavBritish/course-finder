import Link from "next/link";

const GUIDES = [
  { slug: "data-scientist", title: "Become a Data Scientist" },
  { slug: "data-analyst", title: "Become a Data Analyst" },
  { slug: "pilot", title: "Become a Pilot" },
  { slug: "digital-marketer", title: "Become a Digital Marketer" },
];

export default function GuidesPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Career Guides</h1>
        <p className="text-slate-600">Step-by-step pathways to help you plan and grow your career.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guide/${guide.slug}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition-shadow"
            >
              <h2 className="text-xl font-semibold text-slate-900">{guide.title}</h2>
              <p className="text-sm text-slate-500 mt-2">Learn requirements, skills, certifications, and training options.</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

