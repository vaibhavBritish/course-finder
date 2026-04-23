import Link from "next/link";
import { notFound } from "next/navigation";

const GUIDE_DETAILS: Record<string, { title: string; intro: string; steps: string[] }> = {
  "data-scientist": {
    title: "Become a Data Scientist",
    intro: "Data Scientists combine coding, statistics, and business understanding to solve complex problems.",
    steps: [
      "Build foundations in statistics, Python, and SQL.",
      "Learn machine learning and model evaluation.",
      "Develop a portfolio of real-world projects.",
      "Earn certifications and apply for entry-level roles.",
    ],
  },
  "data-analyst": {
    title: "Become a Data Analyst",
    intro: "Data Analysts convert data into clear insights that help teams make better decisions.",
    steps: [
      "Master spreadsheets, SQL, and BI dashboards.",
      "Practice cleaning and transforming datasets.",
      "Create reporting portfolios and case studies.",
      "Apply for analyst roles and grow into senior tracks.",
    ],
  },
  pilot: {
    title: "Become a Pilot",
    intro: "Pilots complete flight training, licensing, and practical flying hours before entering commercial roles.",
    steps: [
      "Start with a certified flight training school.",
      "Complete private and commercial pilot licensing.",
      "Accumulate required flight hours.",
      "Pursue airline or specialized aviation pathways.",
    ],
  },
  "digital-marketer": {
    title: "Become a Digital Marketer",
    intro: "Digital Marketers plan and optimize online campaigns across SEO, paid media, and social channels.",
    steps: [
      "Learn core channels: SEO, paid ads, email, and social.",
      "Practice campaign strategy and analytics reporting.",
      "Build case studies with measurable outcomes.",
      "Specialize in growth, content, or performance marketing.",
    ],
  },
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDE_DETAILS[slug];
  if (!guide) notFound();

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/guides" className="text-sm text-rose-600 font-semibold hover:underline">
          ← Back to Guides
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 mt-4">{guide.title}</h1>
        <p className="text-slate-600 mt-3 max-w-3xl">{guide.intro}</p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Suggested Path</h2>
          <ol className="list-decimal pl-5 text-slate-700 space-y-2">
            {guide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

