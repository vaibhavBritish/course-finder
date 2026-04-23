import Link from "next/link";
import { notFound } from "next/navigation";

type GuideConfig = {
  title: string;
  intro: string;
  salary: string;
  outlook: string;
  steps: string[];
  skills: string[];
  tools: string[];
  certifications: string[];
  nextCourses: string[];
};

const GUIDE_DETAILS: Record<string, GuideConfig> = {
  "data-scientist": {
    title: "Become a Data Scientist",
    intro: "Data Scientists combine coding, statistics, and business understanding to solve complex problems.",
    salary: "$124,693 average annual salary in Canada (varies by region and seniority).",
    outlook: "Strong demand across technology, finance, healthcare, retail, and public sector analytics teams.",
    steps: [
      "Build foundations in statistics, Python, and SQL.",
      "Learn machine learning and model evaluation.",
      "Develop a portfolio of real-world projects.",
      "Earn certifications and apply for entry-level roles.",
    ],
    skills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Storytelling"],
    tools: ["Pandas", "scikit-learn", "Tableau / Power BI", "Jupyter", "Cloud Platforms"],
    certifications: [
      "Azure Data Scientist Associate",
      "AWS Certified Machine Learning – Specialty",
      "Google Professional Data Engineer",
    ],
    nextCourses: ["Data Science", "Machine Learning", "Data Engineering", "Python"],
  },
  "data-analyst": {
    title: "Become a Data Analyst",
    intro: "Data Analysts convert data into clear insights that help teams make better decisions.",
    salary: "$70,676 average annual salary in Canada for analyst-level roles.",
    outlook: "Consistent hiring across marketing, operations, finance, product, and business intelligence teams.",
    steps: [
      "Master spreadsheets, SQL, and BI dashboards.",
      "Practice cleaning and transforming datasets.",
      "Create reporting portfolios and case studies.",
      "Apply for analyst roles and grow into senior tracks.",
    ],
    skills: ["SQL", "Excel", "Data Cleaning", "Dashboarding", "Business Communication"],
    tools: ["Excel", "Power BI", "Tableau", "Google Looker Studio", "SQL IDEs"],
    certifications: [
      "Google Data Analytics Certificate",
      "Microsoft Power BI Data Analyst Associate",
      "Tableau Desktop Specialist",
    ],
    nextCourses: ["Data Analytics", "Business Analysis", "SQL", "Excel"],
  },
  pilot: {
    title: "Become a Pilot",
    intro: "Pilots complete flight training, licensing, and practical flying hours before entering commercial roles.",
    salary: "Pilot earnings vary widely by aircraft type, route category, and hours flown.",
    outlook: "Steady demand in regional and commercial aviation with opportunities in training and charter operations.",
    steps: [
      "Start with a certified flight training school.",
      "Complete private and commercial pilot licensing.",
      "Accumulate required flight hours.",
      "Pursue airline or specialized aviation pathways.",
    ],
    skills: ["Aviation Safety", "Navigation", "Weather Interpretation", "Crew Communication", "Decision Making"],
    tools: ["Flight Simulators", "Navigation Systems", "Aviation Checklists", "Airspace Charts"],
    certifications: [
      "Private Pilot Licence (PPL)",
      "Commercial Pilot Licence (CPL)",
      "Airline Transport Pilot Licence (ATPL) pathway",
    ],
    nextCourses: ["Pilot Training", "Aviation", "Commercial Pilot Licence", "ATPL"],
  },
  "digital-marketer": {
    title: "Become a Digital Marketer",
    intro: "Digital Marketers plan and optimize online campaigns across SEO, paid media, and social channels.",
    salary: "Compensation varies by channel specialization (SEO, paid media, lifecycle, social).",
    outlook: "Growing demand as companies prioritize measurable acquisition, retention, and ecommerce growth.",
    steps: [
      "Learn core channels: SEO, paid ads, email, and social.",
      "Practice campaign strategy and analytics reporting.",
      "Build case studies with measurable outcomes.",
      "Specialize in growth, content, or performance marketing.",
    ],
    skills: ["SEO", "Paid Ads", "Content Strategy", "Email Marketing", "Analytics"],
    tools: ["Google Ads", "GA4", "Meta Ads Manager", "Ahrefs / SEMrush", "HubSpot / Mailchimp"],
    certifications: [
      "Google Ads Certifications",
      "Meta Certified Digital Marketing Associate",
      "HubSpot Inbound Marketing Certification",
    ],
    nextCourses: ["Digital Marketing", "Social Media Marketing", "SEO", "Marketing Analytics"],
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

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Salary Snapshot</p>
            <p className="text-slate-800 mt-2 font-medium">{guide.salary}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Career Outlook</p>
            <p className="text-slate-800 mt-2 font-medium">{guide.outlook}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Step-by-Step Path</h2>
          <ol className="list-decimal pl-5 text-slate-700 space-y-2">
            {guide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {guide.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Tools & Platforms</h2>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              {guide.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Recommended Certifications</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            {guide.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Explore Related Courses</h2>
          <div className="flex flex-wrap gap-2">
            {guide.nextCourses.map((course) => (
              <Link
                key={course}
                href={`/courses?q=${encodeURIComponent(course)}`}
                className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-sm font-semibold hover:bg-rose-100"
              >
                {course}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

