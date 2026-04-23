import Link from "next/link";

export default function ImmigrationConsultantsPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 mb-3">Immigration Support</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Immigration Consultants</h1>
        <p className="text-slate-600 max-w-4xl">
          Connect with licensed immigration consultants for study permits, post-graduation pathways, and education-linked immigration planning.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Best For</p>
            <p className="text-slate-800 mt-2 font-medium">
              Study permit applicants, international students, and graduates planning PR-friendly education pathways.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Typical Support Scope</p>
            <p className="text-slate-800 mt-2 font-medium">
              Application strategy, document readiness, submission guidance, and compliance-focused planning.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Services You Can Expect</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>Program and institution selection aligned with long-term immigration plans</li>
            <li>Study permit application preparation and review</li>
            <li>SOP/LOE guidance and document checklist validation</li>
            <li>Post-graduation work permit and transition planning</li>
            <li>PR stream eligibility mapping based on your profile</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Typical Process</h2>
          <ol className="list-decimal pl-5 text-slate-700 space-y-2">
            <li>Initial profile review (education, goals, timeline, country of residence)</li>
            <li>Program + pathway shortlisting with admissions and immigration alignment</li>
            <li>Document preparation and quality review</li>
            <li>Application submission support and follow-up planning</li>
          </ol>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Prepare Before Your Consultation</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="bg-slate-50 rounded-xl p-3">Passport and identity documents</div>
            <div className="bg-slate-50 rounded-xl p-3">Educational transcripts and credentials</div>
            <div className="bg-slate-50 rounded-xl p-3">English/French test scores (if available)</div>
            <div className="bg-slate-50 rounded-xl p-3">Resume + work history summary</div>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Need consultant support now?</h2>
          <p className="text-slate-700 mb-4">
            Submit your details and get connected with a licensed consultant matched to your case type.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/write-a-review" className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-xl">
              Request Help
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

