import { prisma } from "@/lib/prisma";
import CourseAdminForm from "@/components/CourseAdminForm";
import { notFound } from "next/navigation";

export default async function EditCourseAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-slate-50 mt-20 py-12 px-6">
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Edit Course</h1>
        <p className="text-slate-500 mt-1">Update course details and metadata.</p>
      </div>
      <CourseAdminForm initialData={course} isEditing />
    </div>
  );
}

