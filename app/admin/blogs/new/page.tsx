"use client";

import BlogForm from "@/components/BlogForm";

export default function NewBlogPage() {
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
