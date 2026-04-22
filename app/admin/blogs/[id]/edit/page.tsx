"use client";

import { useState, useEffect, use } from "react";
import BlogForm from "@/components/BlogForm";
import { useAuth } from "@/context/AuthContext";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 mt-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#ED2B3B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 mt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Article not found</h2>
          <p className="text-slate-500 mt-2">The article you're trying to edit doesn't exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 mt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-900">Edit Article</h1>
          <p className="text-slate-500 mt-1">Modify your published content.</p>
        </div>
        <BlogForm initialData={blog} isEditing={true} />
      </div>
    </div>
  );
}
