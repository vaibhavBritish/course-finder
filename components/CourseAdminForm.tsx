"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: any;
  isEditing?: boolean;
}

const CREDENTIAL_OPTIONS = [
  "Certificate",
  "Diploma",
  "Advanced Diploma",
  "Associate Degree",
  "Bachelors",
  "Postgraduate Certificate",
  "Masters",
  "Doctorate",
];

const SUBJECT_OPTIONS = [
  "Business",
  "Data Science",
  "Information Technology",
  "Healthcare",
  "Engineering",
  "Design",
  "Development",
  "Digital Marketing",
  "Finance",
  "Skilled Trades",
  "Language Learning",
];

const DELIVERY_OPTIONS = ["Classroom", "Online", "Hybrid", "On-Campus"];
const LOAD_OPTIONS = ["Full-time", "Part-time", "Self-paced"];
const START_DATE_OPTIONS = ["January", "May", "September", "Rolling Intake"];
const IELTS_OPTIONS = ["Not Required", "5.5", "6.0", "6.5", "7.0"];
const RATING_OPTIONS = ["3.5", "4.0", "4.2", "4.5", "4.8", "5.0"];
const DURATION_OPTIONS = [
  "8 weeks",
  "12 weeks",
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
];

export default function CourseAdminForm({ initialData, isEditing = false }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const parseFeeNumbers = (feeText: string, fallbackTuition: number) => {
    const text = feeText || "";
    const domesticMatch = text.match(/Domestic:\s*\$?([\d,]+)/i);
    const internationalMatch = text.match(/International:\s*\$?([\d,]+)/i);
    const parseNum = (value?: string) => (value ? Number(value.replace(/,/g, "")) : 0);

    const domestic = parseNum(domesticMatch?.[1]) || Number(fallbackTuition || 0);
    const international = parseNum(internationalMatch?.[1]);
    return { domestic, international };
  };
  const parsedFees = parseFeeNumbers(initialData?.fee || "", Number(initialData?.tuitionAmount || 0));

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    school: initialData?.school || "",
    location: initialData?.location || "",
    subject: initialData?.subject || "",
    credential: initialData?.credential || "",
    domesticTuitionAmount: parsedFees.domestic,
    internationalTuitionAmount: parsedFees.international,
    imageUrl: initialData?.imageUrl || "",
    link: initialData?.link || "",
    description: initialData?.description || "",
    timings: initialData?.timings || "1 year",
    startDate: initialData?.startDate || "",
    applicationDeadline: initialData?.applicationDeadline || "",
    ieltsRequirement: initialData?.ieltsRequirement || "",
    delivery: Array.isArray(initialData?.delivery) ? initialData.delivery.join(", ") : "Classroom",
    load: Array.isArray(initialData?.load) ? initialData.load.join(", ") : "Full-time",
    scholarshipAvailable: Boolean(initialData?.scholarshipAvailable),
    rating: initialData?.rating ?? 4,
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const domesticTuition = Number(formData.domesticTuitionAmount || 0);
      const internationalTuition = Number(formData.internationalTuitionAmount || 0);
      const payload = {
        ...formData,
        fee:
          domesticTuition > 0 || internationalTuition > 0
            ? `Domestic: $${domesticTuition.toLocaleString()} per year | International: $${internationalTuition.toLocaleString()} per year`
            : "$0 per year",
        tuitionAmount: domesticTuition,
        delivery: formData.delivery.split(",").map((v) => v.trim()).filter(Boolean),
        load: formData.load.split(",").map((v) => v.trim()).filter(Boolean),
      };

      const url = isEditing ? `/api/admin/courses/${initialData.id}` : "/api/admin/courses";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }
      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-5xl mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      {error && <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm">{error}</div>}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Course Title</span>
          <input required name="title" value={formData.title} onChange={onChange} placeholder="Course Title" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">University / College</span>
          <input required name="school" value={formData.school} onChange={onChange} placeholder="University / College" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject Area</span>
          <select required name="subject" value={formData.subject} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            <option value="">Select Subject</option>
            {SUBJECT_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Level / Credential</span>
          <select required name="credential" value={formData.credential} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            <option value="">Select Level / Credential</option>
            {CREDENTIAL_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Campus Location</span>
          <input required name="location" value={formData.location} onChange={onChange} placeholder="City, Province" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Domestic fees per annum</span>
          <input name="domesticTuitionAmount" type="number" value={formData.domesticTuitionAmount} onChange={onChange} placeholder="e.g. 12000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">International fees per annum</span>
          <input name="internationalTuitionAmount" type="number" value={formData.internationalTuitionAmount} onChange={onChange} placeholder="e.g. 26000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
          <p className="text-[11px] text-slate-500">
            Displayed as: Domestic: ${Number(formData.domesticTuitionAmount || 0).toLocaleString()} per year | International: ${Number(formData.internationalTuitionAmount || 0).toLocaleString()} per year
          </p>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Course Rating</span>
          <select name="rating" value={String(formData.rating)} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            {RATING_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Intake / Start Date</span>
          <select name="startDate" value={formData.startDate} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            <option value="">Select Start Date</option>
            {START_DATE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Application Deadline</span>
          <input name="applicationDeadline" type="date" value={formData.applicationDeadline} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">IELTS Requirement</span>
          <select name="ieltsRequirement" value={formData.ieltsRequirement} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            <option value="">Select IELTS Requirement</option>
            {IELTS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Duration / Timings</span>
          <select name="timings" value={formData.timings} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            {DURATION_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Delivery Mode</span>
          <select name="delivery" value={formData.delivery} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            {DELIVERY_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Course Load</span>
          <select name="load" value={formData.load} onChange={onChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            {LOAD_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>
      <input name="imageUrl" value={formData.imageUrl} onChange={onChange} placeholder="Logo URL" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
      <input name="link" value={formData.link} onChange={onChange} placeholder="Program URL" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
      <textarea name="description" value={formData.description} onChange={onChange} rows={4} placeholder="Description" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" name="scholarshipAvailable" checked={formData.scholarshipAvailable} onChange={onChange} />
        Scholarship Available
      </label>

      <div className="flex gap-3">
        <button disabled={isLoading} className="bg-[#ED2B3B] text-white px-6 py-3 rounded-xl font-bold">
          {isLoading ? "Saving..." : isEditing ? "Update Course" : "Create Course"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl bg-slate-100 font-semibold text-slate-700">
          Cancel
        </button>
      </div>
    </form>
  );
}

