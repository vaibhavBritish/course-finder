import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    const where: any = {};
    if (category && category !== "All") {
      where.category = category;
    }
    if (published === "true") {
      where.published = true;
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || "",
        category: data.category,
        author: data.author,
        authorRole: data.authorRole || "",
        date: data.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: data.readTime || "5 min read",
        coverImage: data.coverImage,
        tags: data.tags || [],
        relatedSubjects: data.relatedSubjects || [],
        content: data.content,
        published: data.published !== undefined ? data.published : true,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
