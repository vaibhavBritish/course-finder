"use client";

import { useEffect, useMemo, useState } from "react";

type ReviewTarget = "school" | "immigration-specialist";
type RatingField = "overall" | "instructors" | "curriculum" | "jobAssistance";

type SchoolEntry = {
  name: string;
  slug: string;
};

const RATING_LABELS: Record<RatingField, string> = {
  overall: "Overall Experience*",
  instructors: "Instructors",
  curriculum: "Curriculum",
  jobAssistance: "Job Assistance",
};

export default function WriteAReviewPage() {
  const [reviewTarget, setReviewTarget] = useState<ReviewTarget>("school");
  const [schools, setSchools] = useState<SchoolEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    school: "",
    course: "",
    location: "",
    title: "",
    experience: "",
    overall: 0,
    instructors: 0,
    curriculum: 0,
    jobAssistance: 0,
    jobAssistanceNA: false,
    name: "",
    anonymous: false,
    email: "",
    certification: false,
  });

  useEffect(() => {
    let mounted = true;
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/schools?limit=100");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && Array.isArray(data.schools)) {
          setSchools(data.schools);
        }
      } catch {
        // Keep page functional without schools API.
      }
    };
    fetchSchools();
    return () => {
      mounted = false;
    };
  }, []);

  const selectedSchoolName = useMemo(
    () => schools.find((s) => s.slug === form.school)?.name || "",
    [schools, form.school]
  );

  const handleRating = (field: RatingField, value: number) => {
    if (field === "jobAssistance" && form.jobAssistanceNA) return;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder submit flow until backend endpoint is added.
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thanks! Your review draft has been captured.");
    }, 800);
  };

  const StarRating = ({ field }: { field: RatingField }) => {
    const value = form[field];
    const isNA = field === "jobAssistance" && form.jobAssistanceNA;

    return (
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-800">{RATING_LABELS[field]}</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleRating(field, n)}
              disabled={isNA}
              className={`text-2xl leading-none transition-colors ${
                n <= value ? "text-amber-400" : "text-slate-300"
              } ${isNA ? "opacity-40 cursor-not-allowed" : "hover:text-amber-500"}`}
              aria-label={`${RATING_LABELS[field]} ${n} stars`}
            >
              ★
            </button>
          ))}
          <span className="text-sm text-slate-500 min-w-8">{isNA ? "NA" : value}</span>
          {field === "jobAssistance" && (
            <label className="ml-2 inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.jobAssistanceNA}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    jobAssistanceNA: e.target.checked,
                    jobAssistance: e.target.checked ? 0 : prev.jobAssistance,
                  }))
                }
                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
              />
              NA
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Write a Review</h1>
          <p className="text-slate-600 mt-3">
            Tell us about your learning experience for a chance to win a $500 Amazon gift card.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-7">
          <div>
            <p className="text-sm font-semibold text-slate-800 mb-3">I would like to write a review for</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setReviewTarget("school")}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                  reviewTarget === "school"
                    ? "bg-rose-600 border-rose-600 text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:border-rose-400"
                }`}
              >
                A School
              </button>
              <button
                type="button"
                onClick={() => setReviewTarget("immigration-specialist")}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                  reviewTarget === "immigration-specialist"
                    ? "bg-rose-600 border-rose-600 text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:border-rose-400"
                }`}
              >
                An Immigration Specialist
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">School Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-sm font-semibold text-slate-700">Select School*</span>
                <select
                  required
                  value={form.school}
                  onChange={(e) => setForm((prev) => ({ ...prev, school: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school.slug} value={school.slug}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-semibold text-slate-700">Select Course</span>
                <input
                  value={form.course}
                  onChange={(e) => setForm((prev) => ({ ...prev, course: e.target.value }))}
                  placeholder="Course name"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Location</span>
                <input
                  value={form.location}
                  onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Province"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="space-y-1 block">
              <span className="text-sm font-semibold text-slate-700">Title of your review*</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder={
                  reviewTarget === "school"
                    ? `Example: Why I recommend ${selectedSchoolName || "this school"}`
                    : "Example: Great consultation experience"
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-sm font-semibold text-slate-700">Tell us about your experience*</span>
              <textarea
                required
                value={form.experience}
                onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
                rows={6}
                placeholder="Share details that would help future students make a better decision."
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </label>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-sm font-semibold text-slate-800 mb-4">Rating</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <StarRating field="overall" />
              <StarRating field="instructors" />
              <StarRating field="curriculum" />
              <StarRating field="jobAssistance" />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-sm font-semibold text-slate-700">Name*</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <label className="inline-flex items-center gap-2 text-sm text-slate-600 pt-1">
                  <input
                    type="checkbox"
                    checked={form.anonymous}
                    onChange={(e) => setForm((prev) => ({ ...prev, anonymous: e.target.checked }))}
                    className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                  Review anonymously?
                </label>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-semibold text-slate-700">Email*</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                required
                type="checkbox"
                checked={form.certification}
                onChange={(e) => setForm((prev) => ({ ...prev, certification: e.target.checked }))}
                className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
              />
              <span>
                I certify that this review is based on my own experience, that I am an applicant, student or
                graduate of this school, and that I have not been offered any incentive or payment originating from
                this school to write this review. I understand that CourseCompare has a zero-tolerance policy on fake
                reviews.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-rose-600 hover:bg-rose-500 disabled:opacity-70 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
