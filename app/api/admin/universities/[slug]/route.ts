import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toSchoolSlug } from "@/lib/school-utils";

async function resolveSchoolName(slug: string) {
  const schools = await prisma.course.findMany({ select: { school: true }, distinct: ["school"] });
  return schools.find((s) => toSchoolSlug(s.school) === slug)?.school;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const nextName = (body.name || "").trim();
    if (!nextName) return NextResponse.json({ error: "name is required" }, { status: 400 });

    const currentName = await resolveSchoolName(slug);
    if (!currentName) return NextResponse.json({ error: "University not found" }, { status: 404 });

    const result = await prisma.course.updateMany({
      where: { school: currentName },
      data: { school: nextName },
    });

    return NextResponse.json({ ok: true, updatedCount: result.count });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to rename university" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const schoolName = await resolveSchoolName(slug);
    if (!schoolName) return NextResponse.json({ error: "University not found" }, { status: 404 });

    const result = await prisma.course.deleteMany({ where: { school: schoolName } });
    return NextResponse.json({ ok: true, deletedCourses: result.count });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete university" }, { status: 500 });
  }
}

