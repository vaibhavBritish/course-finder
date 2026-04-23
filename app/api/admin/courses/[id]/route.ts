import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title: body.title,
        school: body.school,
        location: body.location,
        delivery: Array.isArray(body.delivery) ? body.delivery : ["Classroom"],
        load: Array.isArray(body.load) ? body.load : ["Full-time"],
        subject: body.subject,
        credential: body.credential,
        fee: body.fee,
        tuitionAmount: Number(body.tuitionAmount || 0),
        imageUrl: body.imageUrl || "https://www.google.com/s2/favicons?domain=coursefinder.ca&sz=256",
        link: body.link || "#",
        description: body.description || "",
        timings: body.timings || "",
        startDate: body.startDate || "",
        additionalStartDates: Number(body.additionalStartDates || 0),
        scholarshipAvailable: Boolean(body.scholarshipAvailable),
        rating: Number(body.rating || 0),
        ieltsRequirement: body.ieltsRequirement || "",
        applicationDeadline: body.applicationDeadline || "",
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete course" }, { status: 500 });
  }
}

