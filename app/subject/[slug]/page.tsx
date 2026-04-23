import Link from "next/link";
import { notFound } from "next/navigation";

const SUBJECT_DETAILS: Record<
  string,
  { title: string; description: string; relatedSearches: string[] }
> = {
  "data-science": {
    title: "Data Science",
    description:
      "Data Science blends statistics, programming, and business context to turn raw data into actionable insights.",
    relatedSearches: ["Machine Learning", "Data Analytics", "AI Foundations"],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "Digital Marketing programs focus on SEO, paid media, content strategy, analytics, and campaign performance.",
    relatedSearches: ["SEO", "Performance Marketing", "Marketing Analytics"],
  },
  "product-management": {
    title: "Product Management",
    description:
      "Product Management develops skills in roadmap planning, stakeholder alignment, experimentation, and user research.",
    relatedSearches: ["Product Strategy", "Agile Product", "UX for PMs"],
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    description:
      "Social Media Marketing covers content calendars, audience growth, community management, and paid social optimization.",
    relatedSearches: ["Content Creation", "Community Management", "Paid Social"],
  },
};

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = SUBJECT_DETAILS[slug];
  if (!subject) notFound();

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/subjects" className="text-sm text-rose-600 font-semibold hover:underline">
          ← Back to Subjects
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 mt-4">{subject.title}</h1>
        <p className="text-slate-600 mt-3 max-w-3xl">{subject.description}</p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Related Searches</h2>
          <div className="flex flex-wrap gap-2">
            {subject.relatedSearches.map((item) => (
              <Link
                key={item}
                href={`/courses?q=${encodeURIComponent(item)}`}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

