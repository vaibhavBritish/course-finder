"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CourseCard, { Course } from "@/components/CourseCard";

interface FilterOptions {
  locations: string[];
  deliveries: string[];
  loads: string[];
  schools: string[];
  subjects: string[];
  credentials: string[];
}

type SubjectConfig = {
  title: string;
  author: string;
  updatedAt: string;
  intro: string;
  about: string;
  faqs: Array<{ q: string; a: string }>;
  certifications: string[];
  relatedSubjects: string[];
  resources: Array<{ category: string; title: string; author: string }>;
};

export default function SubjectHubPage({ config }: { config: SubjectConfig }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    location: "All Locations",
    delivery: "All Course Deliveries",
    load: "All Course Loads",
    school: "All Schools",
    subject: config.title,
    credential: "All Credentials",
  });

  const [sortValue, setSortValue] = useState("startDate-asc");

  const sortConfig = useMemo(() => {
    switch (sortValue) {
      case "tuitionAmount-asc":
      case "tuitionAmount-desc":
      case "rating-desc":
      case "createdAt-desc":
        return sortValue;
      default:
        return "createdAt-desc";
    }
  }, [sortValue]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("subject", filters.subject);
        params.set("limit", "18");

        if (filters.location !== "All Locations") params.set("location", filters.location);
        if (filters.delivery !== "All Course Deliveries") params.set("delivery", filters.delivery);
        if (filters.load !== "All Course Loads") params.set("load", filters.load);
        if (filters.school !== "All Schools") params.set("school", filters.school);
        if (filters.credential !== "All Credentials") params.set("credential", filters.credential);

        const [sortBy, order] = sortConfig.split("-");
        params.set("sortBy", sortBy);
        params.set("order", order);

        const res = await fetch(`/api/courses?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        setCourses(data.courses || []);
        setTotalCount(data.totalCount || 0);
        if (data.filterOptions) setFilterOptions(data.filterOptions);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [filters, sortConfig]);

  const updateFilter = (name: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex-1 bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{config.title}</h1>
        <p className="text-sm text-slate-500 mt-2">
          By: {config.author} • Last updated {config.updatedAt}
        </p>
        <p className="text-slate-600 mt-4 max-w-4xl">{config.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" value={filters.location} onChange={(e) => updateFilter("location", e.target.value)}>
            <option>All Locations</option>
            {filterOptions?.locations.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" value={filters.delivery} onChange={(e) => updateFilter("delivery", e.target.value)}>
            <option>All Course Deliveries</option>
            {filterOptions?.deliveries.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" value={filters.load} onChange={(e) => updateFilter("load", e.target.value)}>
            <option>All Course Loads</option>
            {filterOptions?.loads.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" value={filters.school} onChange={(e) => updateFilter("school", e.target.value)}>
            <option>All Schools</option>
            {filterOptions?.schools.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" value={filters.subject} onChange={(e) => updateFilter("subject", e.target.value)}>
            <option>{config.title}</option>
            {filterOptions?.subjects.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" value={filters.credential} onChange={(e) => updateFilter("credential", e.target.value)}>
            <option>All Credentials</option>
            {filterOptions?.credentials.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-600">Sort By:</span>
          <select
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
          >
            <option value="startDate-asc">Sort by course start date</option>
            <option value="delivery-asc">Sort by course delivery</option>
            <option value="tuitionAmount-asc">Sort by tuition</option>
            <option value="load-asc">Sort by course load</option>
            <option value="duration-asc">Sort by duration</option>
            <option value="rating-desc">Sort by rating</option>
          </select>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 bg-white rounded-2xl border border-slate-100 animate-pulse" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-slate-900">There are no courses that match your criteria</h2>
              <p className="text-slate-500 mt-2">Try broadening your filters to discover more options.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Showing <span className="font-semibold text-slate-800">{courses.length}</span> of{" "}
                <span className="font-semibold text-slate-800">{totalCount}</span> results
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} onOpenLeadModal={() => {}} isGrid />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">About</h2>
          <p className="text-slate-700 leading-relaxed">{config.about}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            {config.faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="text-slate-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Certification</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            {config.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {config.relatedSubjects.map((subject) => (
              <Link
                key={subject}
                href={`/courses?q=${encodeURIComponent(subject)}`}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm hover:bg-slate-200"
              >
                {subject}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Rankings & Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.resources.map((resource) => (
              <article key={resource.title} className="border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide">{resource.category}</p>
                <h3 className="font-semibold text-slate-900 mt-1">{resource.title}</h3>
                <p className="text-sm text-slate-500 mt-1">By: {resource.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

