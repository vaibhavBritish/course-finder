import Link from "next/link";

export default function ImmigrationLawyersPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 mb-3">Legal Immigration Services</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Immigration Lawyers</h1>
        <p className="text-slate-600 max-w-4xl">
          Work with immigration lawyers for complex applications, appeals, legal strategy, and case-specific representation.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Best For</p>
            <p className="text-slate-800 mt-2 font-medium">
              Refusals, inadmissibility concerns, legal disputes, urgent hearings, and high-stakes immigration decisions.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Representation Scope</p>
            <p className="text-slate-800 mt-2 font-medium">
              Case assessment, legal opinion, procedural fairness responses, appeal strategy, and tribunal/court representation.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Common Legal Support Areas</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Refusals and appeals</li>
            <li>Judicial review guidance</li>
            <li>Complex case documentation</li>
            <li>Program-specific legal advice</li>
            <li>Procedural fairness letters and legal responses</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">How Legal Engagement Typically Works</h2>
          <ol className="list-decimal pl-5 text-slate-700 space-y-2">
            <li>Case intake and legal-risk assessment</li>
            <li>Evidence strategy and timeline review</li>
            <li>Submission drafting and legal documentation</li>
            <li>Representation in appeals or review processes where applicable</li>
          </ol>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Bring These to Your First Consultation</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="bg-slate-50 rounded-xl p-3">All refusal/decision letters</div>
            <div className="bg-slate-50 rounded-xl p-3">Prior submitted applications and forms</div>
            <div className="bg-slate-50 rounded-xl p-3">Supporting identity and status documents</div>
            <div className="bg-slate-50 rounded-xl p-3">Timeline notes and communication history</div>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Need legal immigration advice?</h2>
          <p className="text-slate-700 mb-4">
            Share your case details to get matched with a legal professional for a focused consultation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/write-a-review" className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-xl">
              Request Legal Help
            </Link>
            <a href="mailto:hello@coursecompare.ca" className="bg-white border border-slate-300 text-slate-800 font-semibold px-5 py-2.5 rounded-xl">
              Email Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

