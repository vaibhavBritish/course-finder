"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BlogCategory } from "@/lib/blogs";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-slate-50 animate-pulse rounded-xl" />,
});

const CATEGORIES: BlogCategory[] = [
  "Business",
  "Technology",
  "Design & Creative Arts",
  "Skilled Trades",
  "Healthcare",
  "Rankings",
  "Careers",
  "Immigration",
];

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    category: initialData?.category || "Technology",
    author: initialData?.author || "Michael Hartley",
    authorRole: initialData?.authorRole || "Founder & CEO",
    coverImage: initialData?.coverImage || "",
    content: initialData?.content || "",
    published: initialData?.published !== undefined ? initialData.published : true,
    tags: initialData?.tags?.join(", ") || "",
    relatedSubjects: initialData?.relatedSubjects?.join(", ") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

    // Auto-generate slug from title if not editing
    if (name === "title" && !isEditing) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        relatedSubjects: formData.relatedSubjects.split(",").map((s: string) => s.trim()).filter(Boolean),
      };

      const url = isEditing ? `/api/blogs/${initialData.id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Article Title"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Slug</label>
          <input
            required
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="article-slug-url"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Excerpt</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          placeholder="Short summary for the listing page..."
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none text-slate-900"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Author Role</label>
          <input
            name="authorRole"
            value={formData.authorRole}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cover Image URL</label>
        <input
          required
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tags (comma separated)</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="AI, Career, Canada"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Related Subjects (for sidebar)</label>
          <input
            name="relatedSubjects"
            value={formData.relatedSubjects}
            onChange={handleChange}
            placeholder="Computer Science, Data Science"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ED2B3B] outline-none placeholder:text-slate-500 text-slate-900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Content</label>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden min-h-[400px]">
          <QuillEditor
            theme="snow"
            value={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
              ],
            }}
            placeholder="Write your article here..."
            className="h-[350px] text-slate-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
          className="w-4 h-4 text-[#ED2B3B] focus:ring-[#ED2B3B] border-slate-300 rounded"
        />
        <label htmlFor="published" className="text-sm font-medium text-slate-700">Published</label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-[#ED2B3B] hover:bg-[#C4001B] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-red-100 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : isEditing ? "Update Article" : "Create Article"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
