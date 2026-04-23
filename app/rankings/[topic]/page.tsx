import Link from "next/link";

const rankingTopics = [
  "Acting Schools",
  "BBA and BCom Degrees",
  "Online BBA and BCom",
  "Beauty Schools",
  "Business Schools",
  "Coding Bootcamps",
  "Colleges in Ontario",
  "Online Computer Science Degrees",
  "Co-op Programs",
  "Culinary Schools",
  "Cybersecurity Certifications",
  "Data Analytics Certifications",
  "Data Science Bootcamps",
  "Digital Marketing Certifications",
  "Early Childhood Education (ECE) Programs",
  "Engineering Schools",
  "Executive MBA (EMBA)",
  "Film Schools",
  "Flight Schools",
  "Massage Therapy Schools",
  "Medical Schools",
  "Nursing Schools",
  "OHS Programs",
  "Online MBA Programs",
  "Online Universities",
  "Part-time MBAs",
  "Trade Schools",
  "Truck Driving Schools",
];

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const slugToTopic = new Map(rankingTopics.map((topic) => [toSlug(topic), topic]));

export default async function RankingTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const topicName = slugToTopic.get(topic) || topic.replace(/-/g, " ");

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="text-sm font-semibold text-rose-600 hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">{topicName} Rankings</h1>
        <p className="text-slate-600 mt-3 max-w-3xl">
          Explore top options, compare programs, and review outcomes for {topicName.toLowerCase()}.
        </p>

        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Ranking content is loading</h2>
          <p className="text-slate-600">
            This topic page is ready. We can now plug in dynamic ranking data and school/program cards for{" "}
            {topicName}.
          </p>
        </div>
      </section>
    </main>
  );
}

