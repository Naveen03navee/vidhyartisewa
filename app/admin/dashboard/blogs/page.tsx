"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, FileText, AlertCircle, UploadCloud, Loader2 } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmData, setConfirmData] = useState<any | null>(null);
  
  const topRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    title: "", slug: "", author: "", category: "", excerpt: "", content: "", image_url: ""
  });
  
  const supabase = createClient();

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    const { data, error } = await supabase.from("blogs").select("*");
    
    if (error) {
      console.error("Supabase Fetch Error:", error);
      alert("Error fetching blogs: " + error.message);
    } else {
      console.log("Blogs fetched successfully:", data);
      setBlogs(data || []);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      // Notice we are saving to the "blogs" folder to keep your storage organized
      const filePath = `blogs/${fileName}`; 

      const { error: uploadError } = await supabase.storage
        .from('website-images') 
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }

  const formatData = (data: any) => {
    // Automatically generate a URL-friendly slug if the user didn't type one
    const generatedSlug = data.slug 
      ? data.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    return {
      title: data.title,
      slug: generatedSlug,
      author: data.author,
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      image_url: data.image_url
    };
  };
  
  function handleReviewBeforeSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = formatData(formData);
      setConfirmData(payload);
    } catch (error) {
      alert("Error parsing data.");
    }
  }

  async function executeSave() {
    if (!confirmData) return;
    
    try {
      let query = supabase.from("blogs");
      
      if (editingId) {
        const { error } = await query.update(confirmData).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await query.insert([confirmData]);
        if (error) throw error;
      }
      
      setConfirmData(null);
      setIsFormOpen(false);
      setEditingId(null);
      fetchBlogs();
    } catch (error: any) {
      console.error("Supabase Error:", error);
      alert("Database Error: " + (error.message || "Check console"));
    }
  }

  const startEdit = (blog: any) => {
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      author: blog.author || "",
      category: blog.category || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image_url: blog.image_url || "",
    });
    
    setEditingId(blog.id);
    setIsFormOpen(true);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative" ref={topRef}>
      
      {/* CONFIRMATION MODAL */}
      {confirmData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-indigo-50/50">
              <AlertCircle className="w-6 h-6 text-indigo-500" />
              <div>
                <h2 className="text-xl font-black text-slate-800">Review Blog Post</h2>
                <p className="text-sm text-slate-500 font-medium">Verify your title, slug, and content before publishing.</p>
              </div>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-50">
              <pre className="text-xs bg-slate-800 text-green-400 p-4 rounded-xl overflow-x-auto font-mono shadow-inner">
                {JSON.stringify(confirmData, null, 2)}
              </pre>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-4 bg-white">
              <Button onClick={executeSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl">
                Looks Good, Publish
              </Button>
              <Button onClick={() => setConfirmData(null)} variant="outline" className="h-12 rounded-xl">Back to Edit</Button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Manage Blogs</h1>
        </div>
        <Button onClick={() => { 
          setIsFormOpen(true); setEditingId(null); 
          setFormData({ title: "", slug: "", author: "", category: "", excerpt: "", content: "", image_url: "" });
          setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-6 rounded-xl">
          <Plus className="w-5 h-5 mr-2" /> Write Post
        </Button>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleReviewBeforeSave} className="bg-white p-8 rounded-3xl border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
          
          <div className="md:col-span-2 border-b border-slate-100 pb-2 mb-2">
            <h2 className="text-xl font-bold text-slate-800">
              {editingId ? `Editing: ${formData.title || 'Post'}` : "Create New Post"}
            </h2>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Article Title</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50 text-lg font-bold" placeholder="e.g. Top 10 Engineering Colleges in 2026" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Custom Slug (Optional)</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. top-10-engineering-colleges" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
            <p className="text-[10px] text-slate-400 mt-1">Leave blank to auto-generate from title.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Career Advice" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Author Name</label>
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Jane Doe" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} required />
            </div>
          </div>

          {/* IMAGE UPLOAD UI */}
          <div className="space-y-2 md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
              <span>Cover Image URL</span>
            </label>
            <div className="flex gap-3 items-center">
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-white flex-1" placeholder="https://..." value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              <div className="relative">
                <Button type="button" disabled={isUploading} className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all">
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <UploadCloud className="w-5 h-5 mr-2" />}
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
              </div>
            </div>
            {formData.image_url && (
              <div className="mt-3 flex items-center gap-4 bg-green-50 p-3 rounded-xl border border-green-100">
                <img src={formData.image_url} alt="Upload Preview" className="h-16 w-16 object-cover rounded-lg border border-green-200 shadow-sm" />
                <p className="text-sm text-green-700 font-bold">✓ Image Ready</p>
              </div>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Short Excerpt (Shows on cards)</label>
            <textarea className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="A brief summary of the article..." value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} rows={2} required />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
              <span>Full Content</span>
              <span className="text-slate-400 font-normal normal-case">HTML tags allowed (e.g. &lt;h2&gt;, &lt;b&gt;, &lt;p&gt;)</span>
            </label>
            <textarea className="border border-slate-200 p-4 rounded-xl w-full bg-slate-50 font-mono text-sm min-h-[300px]" placeholder="<p>Start writing your blog post here...</p>" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
          </div>
          
          <div className="md:col-span-2 flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl">
              {editingId ? "Review & Update Post" : "Review & Publish Post"}
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => setIsFormOpen(false)}>Cancel</Button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Post Details</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200">
                      {blog.image_url ? (
                        <img src={blog.image_url} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="w-5 h-5 text-indigo-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 line-clamp-1">{blog.title}</p>
                      <p className="text-xs text-slate-500 mt-1">By {blog.author} • /{blog.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">{blog.category}</span>
                </td>
                <td className="p-4 flex justify-end gap-2 items-center h-full">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(blog)}>
                    <Edit className="w-4 h-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={async () => { 
                    if(confirm("Delete this blog post?")) { await supabase.from("blogs").delete().eq("id", blog.id); fetchBlogs(); }
                  }}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-500">No blog posts found. Start writing!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}