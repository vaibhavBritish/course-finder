"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toSchoolSlug } from "@/lib/school-utils";

type Course = {
  id: string;
  title: string;
  school: string;
  subject: string;
  credential: string;
  fee: string;
  rating: number;
};

type University = {
  name: string;
  slug: string;
  count: number;
  averageRating: number;
  location: string;
};

export default function AdminCoursesPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState("all");

  const loadData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [coursesRes, uniRes] = await Promise.all([
        fetch("/api/admin/courses"),
        fetch("/api/admin/universities"),
      ]);
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (uniRes.ok) setUniversities(await uniRes.json());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) loadData();
  }, [authLoading, user]);

  const filteredCourses = useMemo(
    () => (selectedSchool === "all" ? courses : courses.filter((c) => toSchoolSlug(c.school) === selectedSchool)),
    [courses, selectedSchool]
  );

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    if (res.ok) setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const renameUniversity = async (slug: string, current: string) => {
    const nextName = prompt("Rename university to:", current)?.trim();
    if (!nextName || nextName === current) return;
    const res = await fetch(`/api/admin/universities/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nextName }),
    });
    if (res.ok) loadData();
  };

  const deleteUniversity = async (slug: string, name: string) => {
    if (!confirm(`Delete university "${name}" and all its courses?`)) return;
    const res = await fetch(`/api/admin/universities/${slug}`, { method: "DELETE" });
    if (res.ok) loadData();
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#ED2B3B] border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 mt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">Manage Universities & Courses</h1>
            <p className="text-slate-500 mt-1">Perform CRUD operations for institutions and course catalog.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/blogs" className="px-5 py-3 border border-slate-200 rounded-full text-sm font-bold text-slate-600">Manage Blogs</Link>
            <button onClick={logout} className="px-5 py-3 border border-slate-200 rounded-full text-sm font-bold text-slate-600">Sign Out</button>
            <Link href="/admin/courses/new" className="bg-[#ED2B3B] text-white px-5 py-3 rounded-full text-sm font-bold">Create Course</Link>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Universities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {universities.map((u) => (
              <div key={u.slug} className="border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900 line-clamp-2">{u.name}</p>
                <p className="text-sm text-slate-500 mt-1">{u.count} courses • ★ {u.averageRating}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSchool(u.slug)}
                    className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                      selectedSchool === u.slug
                        ? "bg-rose-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => renameUniversity(u.slug, u.name)}
                    className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUniversity(u.slug, u.name)}
                    className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 hover:bg-red-100 font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">All Universities</option>
              {universities.map((u) => (
                <option key={u.slug} value={u.slug}>{u.name}</option>
              ))}
            </select>
            <button onClick={() => setSelectedSchool("all")} className="text-sm text-slate-500 font-semibold">Reset</button>
          </div>

          {isLoading ? (
            <div className="p-8 text-slate-500">Loading...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-xs uppercase text-slate-500">Course</th>
                  <th className="px-5 py-3 text-xs uppercase text-slate-500">University</th>
                  <th className="px-5 py-3 text-xs uppercase text-slate-500">Subject</th>
                  <th className="px-5 py-3 text-xs uppercase text-slate-500">Fee</th>
                  <th className="px-5 py-3 text-xs uppercase text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-sm font-semibold text-slate-900">{course.title}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{course.school}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{course.subject}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{course.fee}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/courses/${course.id}/edit`} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">Edit</Link>
                        <button onClick={() => deleteCourse(course.id)} className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 font-semibold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">No courses found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

