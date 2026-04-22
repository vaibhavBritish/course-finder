"use client";

import BlogForm from "@/components/BlogForm";
import { useAuth } from "@/context/AuthContext";

export default function NewBlogPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#ED2B3B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 mt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-900">Create New Article</h1>
          <p className="text-slate-500 mt-1">Publish a new insight for Career Navigator.</p>
        </div>
        <BlogForm />
      </div>
    </div>
  );
}
