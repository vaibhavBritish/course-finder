import Link from "next/link";

const PROGRAM_TYPES = [
  "Certificate Programs",
  "Diploma Programs",
  "Bootcamps",
  "Professional Development",
  "Executive Education",
  "Industry Certifications",
];

export default function TrainingProgramsPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Training Programs</h1>
        <p className="text-slate-600 max-w-3xl">
          Explore practical training pathways designed to help learners upskill quickly and transition into in-demand careers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {PROGRAM_TYPES.map((program) => (
            <div key={program} className="bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-slate-900">{program}</h2>
              <p className="text-sm text-slate-500 mt-2">
                Compare institutions, review outcomes, and find the right program based on your goals.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/courses"
            className="inline-block bg-rose-600 hover:bg-rose-500 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    </main>
  );
}

