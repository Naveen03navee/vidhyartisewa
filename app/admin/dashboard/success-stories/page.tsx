"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, AlertCircle, UploadCloud, Loader2, Star, Briefcase } from "lucide-react";

export default function AdminSuccessStoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmData, setConfirmData] = useState<any | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  
  // 1. Updated state to match your EXACT database schema
  const [formData, setFormData] = useState({
    name: "", 
    college: "", 
    course: "", 
    year: "", 
    rating: "5", 
    text: "", // The actual story content
    placement_company: "", // Handled separately in UI, combined for DB
    placement_package: "", // Handled separately in UI, combined for DB
    image_url: ""
  });
  
  const supabase = createClient();

  useEffect(() => { fetchStories(); }, []);

  async function fetchStories() {
    const { data } = await supabase.from("success_stories").select("*").order("created_at", { ascending: false });
    setStories(data || []);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fileName = `story_${Date.now()}.png`;
      const { error } = await supabase.storage.from('website-images').upload(`stories/${fileName}`, file);
      if (error) throw error;
      const { data } = supabase.storage.from('website-images').getPublicUrl(`stories/${fileName}`);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: any) { alert("Upload failed"); } finally { setIsUploading(false); }
  }

  // 2. Prepares the data for Supabase, packaging the JSON string
  const formatData = (data: typeof formData) => ({
    name: data.name,
    college: data.college,
    course: data.course,
    year: data.year,
    rating: data.rating,
    text: data.text,
    image_url: data.image_url,
    // Turn the two separate inputs back into the JSON string your DB expects
    placement: JSON.stringify({ company: data.placement_company, package: data.placement_package })
  });
  
  function handleReviewBeforeSave(e: React.FormEvent) {
    e.preventDefault();
    setConfirmData(formatData(formData));
  }

  async function executeSave() {
    if (!confirmData) return;
    try {
      if (editingId) {
        await supabase.from("success_stories").update(confirmData).eq("id", editingId);
      } else {
        await supabase.from("success_stories").insert([confirmData]);
      }
      setIsFormOpen(false); 
      setConfirmData(null); 
      fetchStories();
    } catch (err: any) { alert(err.message); }
  }

  // 3. Helper to open form and parse existing data
  const handleEdit = (s: any) => {
    let company = "";
    let pkg = "";
    
    // Safely parse the placement JSON string if it exists
    if (s.placement) {
      try {
        const p = JSON.parse(s.placement);
        company = p.company || "";
        pkg = p.package || "";
      } catch (e) { console.error("Could not parse placement data", e); }
    }

    setFormData({
      name: s.name || "",
      college: s.college || "",
      course: s.course || "",
      year: s.year || "",
      rating: s.rating || "5",
      text: s.text || "",
      image_url: s.image_url || "",
      placement_company: company,
      placement_package: pkg
    });
    
    setEditingId(s.id);
    setIsFormOpen(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({ name: "", college: "", course: "", year: "", rating: "5", text: "", placement_company: "", placement_package: "", image_url: "" });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto" ref={topRef}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">Success Stories</h1>
        <Button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="mr-2"/> Add Story
        </Button>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleReviewBeforeSave} className="bg-white p-8 rounded-3xl border mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl">
          <div className="col-span-2 md:col-span-1 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Student Name</label>
            <input className="border p-3 rounded-xl w-full" placeholder="e.g. Priya Patel" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          
          <div className="col-span-2 md:col-span-1 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">College</label>
            <input className="border p-3 rounded-xl w-full" placeholder="e.g. Bangalore Technological Institute" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Course</label>
            <input className="border p-3 rounded-xl w-full" placeholder="e.g. B.Tech CSE" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Passing Year</label>
              <input className="border p-3 rounded-xl w-full" placeholder="e.g. 2022" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Rating (1-5)</label>
              <input type="number" min="1" max="5" className="border p-3 rounded-xl w-full" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} />
            </div>
          </div>

          {/* Placement JSON fields */}
          <div className="col-span-2 grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Placed Company</label>
              <input className="border p-3 rounded-xl w-full bg-white" placeholder="e.g. Amazon" value={formData.placement_company} onChange={e => setFormData({...formData, placement_company: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1">Package</label>
              <input className="border p-3 rounded-xl w-full bg-white" placeholder="e.g. 18 LPA" value={formData.placement_package} onChange={e => setFormData({...formData, placement_package: e.target.value})} />
            </div>
          </div>

          <div className="col-span-2 space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Student Image</label>
             <div className="flex gap-2">
              <input className="border p-3 rounded-xl flex-1 bg-slate-50" placeholder="Image URL (Upload or paste link)" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              <input type="file" onChange={handleImageUpload} className="hidden" id="file" />
              <label htmlFor="file" className="cursor-pointer bg-slate-100 p-3 rounded-xl hover:bg-slate-200 transition flex items-center justify-center min-w-[50px]">
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5"/>}
              </label>
            </div>
          </div>

          <div className="col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Story Content</label>
            <textarea className="border p-3 rounded-xl w-full min-h-[120px]" placeholder="Student's success story..." value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} required />
          </div>

          <Button type="submit" className="col-span-2 bg-green-600 hover:bg-green-700 h-12 text-lg">
            Review & Save Story
          </Button>
        </form>
      )}

      {/* CONFIRMATION MODAL (Optional refinement - just executing immediately for speed here based on your previous logic) */}
      {confirmData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Save?</h3>
            <p className="text-slate-500 mb-6">Are you sure you want to save this success story to the database?</p>
            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={() => setConfirmData(null)}>Cancel</Button>
              <Button className="bg-green-600" onClick={executeSave}>Yes, Save Now</Button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE VIEW */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-sm font-bold text-slate-500">Student Info</th>
              <th className="p-4 text-sm font-bold text-slate-500 hidden md:table-cell">Placement</th>
              <th className="p-4 text-sm font-bold text-slate-500 hidden lg:table-cell">Course/Year</th>
              <th className="p-4 text-sm font-bold text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.length === 0 ? (
               <tr><td colSpan={4} className="p-8 text-center text-slate-500">No success stories found.</td></tr>
            ) : stories.map((s) => {
              
              // Safe parse for display in table
              let company = "N/A";
              let pkg = "";
              if (s.placement) {
                try {
                  const p = JSON.parse(s.placement);
                  company = p.company || "N/A";
                  pkg = p.package || "";
                } catch(e) {}
              }

              return (
                <tr key={s.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-4">
                    <img 
                      src={s.image_url || "https://ui-avatars.com/api/?name=" + (s.name || "S") + "&background=random"} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                      alt={s.name}
                    />
                    <div>
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{s.college}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-medium">{s.rating}/5</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 hidden md:table-cell">
                    <div className="font-semibold text-slate-800">{company}</div>
                    {pkg && <div className="text-xs text-emerald-600 font-bold bg-emerald-50 w-fit px-2 py-0.5 rounded-full mt-1">{pkg}</div>}
                  </td>
                  
                  <td className="p-4 hidden lg:table-cell">
                    <div className="text-sm font-medium">{s.course}</div>
                    <div className="text-xs text-slate-500">Class of {s.year}</div>
                  </td>

                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}>
                      <Edit className="w-4 h-4 text-blue-500"/>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={async () => { 
                      if(confirm("Are you sure you want to delete this story?")) {
                        await supabase.from("success_stories").delete().eq("id", s.id); 
                        fetchStories(); 
                      }
                    }}>
                      <Trash2 className="w-4 h-4 text-red-500"/>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}