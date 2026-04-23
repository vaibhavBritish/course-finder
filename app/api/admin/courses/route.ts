import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return NextResponse.json(courses);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = ["title", "school", "subject", "credential", "fee", "location"];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    }

    const created = await prisma.course.create({
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

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create course" }, { status: 500 });
  }
}

