import CourseAdminForm from "@/components/CourseAdminForm";

export default function NewCourseAdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 mt-20 py-12 px-6">
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Create Course</h1>
        <p className="text-slate-500 mt-1">Add a new university course to the catalog.</p>
      </div>
      <CourseAdminForm />
    </div>
  );
}

