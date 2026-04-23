export default function ImmigrationConsultantsPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Immigration Consultants</h1>
        <p className="text-slate-600 max-w-3xl">
          Connect with licensed immigration consultants for study permits, post-graduation pathways, and education-linked immigration planning.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">When to consult</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Before choosing a program tied to immigration outcomes</li>
            <li>When preparing study permit applications</li>
            <li>For pathways after graduation and work permits</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

