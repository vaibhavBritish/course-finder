import Link from "next/link";

const SUBJECTS = [
  { slug: "data-science-courses", name: "Data Science" },
  { slug: "digital-marketing", name: "Digital Marketing" },
  { slug: "product-management", name: "Product Management" },
  { slug: "social-media-marketing", name: "Social Media Marketing" },
];

export default function SubjectsPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Popular Subjects</h1>
        <p className="text-slate-600">Browse by subject and discover top programs, schools, and career paths.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subject/${subject.slug}`}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition-shadow"
            >
              <h2 className="text-xl font-semibold text-slate-900">{subject.name}</h2>
              <p className="text-sm text-slate-500 mt-2">Explore schools, compare outcomes, and view related training options.</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

