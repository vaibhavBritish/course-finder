export default function ImmigrationLawyersPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Immigration Lawyers</h1>
        <p className="text-slate-600 max-w-3xl">
          Work with immigration lawyers for complex applications, appeals, legal strategy, and case-specific representation.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Common legal support areas</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Refusals and appeals</li>
            <li>Judicial review guidance</li>
            <li>Complex case documentation</li>
            <li>Program-specific legal advice</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

