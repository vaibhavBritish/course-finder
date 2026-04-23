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

const FAQS = [
  {
    q: "What qualifications do I need to become a data scientist?",
    a: "Most pathways start with a degree or diploma in computer science, statistics, engineering, or related disciplines. Practical skills in Python, SQL, and machine learning are also essential.",
  },
  {
    q: "Where do data scientists work?",
    a: "Data scientists work across technology, banking, healthcare, consulting, retail, government, and startups—anywhere organizations rely on data-driven decisions.",
  },
  {
    q: "How much do data scientists make?",
    a: "In Canada, salaries vary by role and experience, with strong compensation across data analyst, data engineer, and machine learning tracks.",
  },
  {
    q: "What makes a good data scientist?",
    a: "A strong data scientist combines technical depth, analytical thinking, communication skills, and the ability to translate insights into business impact.",
  },
];

const SALARIES = [
  ["Data Analyst", "$70,676"],
  ["Business Analyst", "$74,479"],
  ["Business Intelligence Developer", "$94,253"],
  ["Data Engineer", "$99,149"],
  ["Data Scientist", "$124,693"],
  ["Data Architect", "$125,977"],
  ["Big Data Engineer", "$128,631"],
  ["Machine Learning Engineer", "$150,186"],
];

const RESOURCES = [
  {
    category: "Data Science",
    title: "Best Data Science Bootcamps of 2026",
    author: "CourseCompare",
  },
  {
    category: "Data Science",
    title: "Best Master's in Data Science Degrees of 2026",
    author: "CourseCompare",
  },
  {
    category: "Technology",
    title: "Computer Science Degree vs Coding Bootcamp",
    author: "Daina Goldfinger",
  },
  {
    category: "Careers",
    title: "How to Become a Data Scientist",
    author: "Shaohua Zhang",
  },
];

export default function DataScienceSubjectPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    location: "All Locations",
    delivery: "All Course Deliveries",
    load: "All Course Loads",
    school: "All Schools",
    subject: "Data Science",
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
      case "delivery-asc":
      case "load-asc":
      case "duration-asc":
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
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Data Science</h1>
        <p className="text-sm text-slate-500 mt-2">
          By: CourseCompare • Last updated April 19, 2026
        </p>
        <p className="text-slate-600 mt-4 max-w-4xl">
          Compare top-rated data science courses, certificates, degrees, and diplomas with leading education providers.
          Check back regularly for new learning options.
        </p>

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
            <option>Data Science</option>
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
          <p className="text-slate-700 leading-relaxed">
            Data science has become one of the most in-demand fields in Canada as organizations rely on analytics,
            machine learning, and predictive modelling for strategic decisions. From banks and retailers to health-care
            systems and startups, employers need talent that can transform data into action.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="text-slate-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Certification</h2>
          <p className="text-slate-700 leading-relaxed">
            In-demand skills include big data analytics, Python, SQL, and machine learning. Popular certifications
            include AWS and Google Cloud machine learning/data engineering tracks, and Microsoft Azure Data Scientist.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tuition & Completion Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-500">Degree (avg tuition)</p>
              <p className="text-lg font-bold text-slate-900 mt-1">$32,468</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-500">Diploma (avg tuition)</p>
              <p className="text-lg font-bold text-slate-900 mt-1">$13,757</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-500">Certificate (avg tuition)</p>
              <p className="text-lg font-bold text-slate-900 mt-1">$6,394</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-500">Non-certificate (avg tuition)</p>
              <p className="text-lg font-bold text-slate-900 mt-1">$4,124</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Last updated: April 19, 2026</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Careers & Salaries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 font-semibold text-slate-700">Role</th>
                  <th className="py-2 font-semibold text-slate-700">Average Salary</th>
                </tr>
              </thead>
              <tbody>
                {SALARIES.map(([role, salary]) => (
                  <tr key={role} className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">{role}</td>
                    <td className="py-2 text-slate-900 font-semibold">{salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Data Analytics",
              "Artificial Intelligence (AI)",
              "Data Engineering",
              "Computer Science",
              "Software Engineering",
              "Data Visualization",
              "Information Technology (IT)",
            ].map((subject) => (
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
            {RESOURCES.map((resource) => (
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

