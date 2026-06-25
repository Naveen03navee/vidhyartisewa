"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Building, AlertCircle, UploadCloud, Loader2 } from "lucide-react";

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmData, setConfirmData] = useState<any | null>(null);
  
  // Reference to scroll to the top of the form area
  const topRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "", location: "", type: "", rating: "", established: "", accreditation: "", website: "",
    course_slugs: "", facilities: "", description: "", image_url: "",
    place_avg: "", place_high: "", place_rate: "", place_companies: ""
  });
  
  const supabase = createClient();

  useEffect(() => { fetchColleges(); }, []);

  async function fetchColleges() {
    const { data } = await supabase.from("colleges").select("*").order("name");
    setColleges(data || []);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `college_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `colleges/${fileName}`; 

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

  const formatData = (data: any) => ({
    name: data.name,
    location: data.location,
    type: data.type,
    rating: parseFloat(data.rating) || 0,
    established: parseInt(data.established) || null,
    accreditation: data.accreditation || null,
    website: data.website || null,
    description: data.description,
    image_url: data.image_url,
    slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    
    courses: data.course_slugs ? data.course_slugs.split(',').map((s: string) => s.trim().toLowerCase()).filter(Boolean) : [],
    facilities: data.facilities ? data.facilities.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      
    placement_stats: {
      average_package: data.place_avg || "",
      highest_package: data.place_high || "",
      placement_rate: data.place_rate || "",
      companies: data.place_companies ? data.place_companies.split(',').map((s: string) => s.trim()).filter(Boolean) : []
    }
  });
  
  function handleReviewBeforeSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = formatData(formData);
      setConfirmData(payload);
    } catch (error) {
      alert("Error parsing data.");
      console.error(error);
    }
  }

  async function executeSave() {
    if (!confirmData) return;
    
    try {
      let query = supabase.from("colleges");
      
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
      fetchColleges();
    } catch (error: any) {
      console.error("Supabase Operation Failed:", error);
      alert("Database Error: " + (error.message || "Check console for details"));
    }
  }

  // UPDATED: Pre-fills data AND smoothly scrolls to the top
  const startEdit = (college: any) => {
    const pStats = college.placement_stats || {};
    
    setFormData({
      name: college.name || "",
      location: college.location || "",
      type: college.type || "",
      rating: college.rating || "",
      established: college.established || "",
      accreditation: college.accreditation || "",
      website: college.website || "",
      course_slugs: college.courses?.join(", ") || "",
      facilities: college.facilities?.join(", ") || "",
      description: college.description || "",
      image_url: college.image_url || "",
      
      place_avg: pStats.average_package || "",
      place_high: pStats.highest_package || "",
      place_rate: pStats.placement_rate || "",
      place_companies: Array.isArray(pStats.companies) ? pStats.companies.join(", ") : ""
    });
    
    setEditingId(college.id);
    setIsFormOpen(true);
    
    // Smooth scroll to top
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative" ref={topRef}>
      
      {/* CONFIRMATION MODAL */}
      {confirmData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-amber-50/50">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <div>
                <h2 className="text-xl font-black text-slate-800">Review Data Before Saving</h2>
                <p className="text-sm text-slate-500 font-medium">Notice how perfect the JSON looks now? The system built it for you!</p>
              </div>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-50">
              <pre className="text-xs bg-slate-800 text-green-400 p-4 rounded-xl overflow-x-auto font-mono shadow-inner">
                {JSON.stringify(confirmData, null, 2)}
              </pre>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-4 bg-white">
              <Button onClick={executeSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl">
                Looks Good, Save
              </Button>
              <Button onClick={() => setConfirmData(null)} variant="outline" className="h-12 rounded-xl">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Manage Colleges</h1>
        </div>
        <Button onClick={() => { 
          setIsFormOpen(true); setEditingId(null); 
          setFormData({ 
            name: "", location: "", type: "", rating: "", established: "", accreditation: "", website: "",
            course_slugs: "", facilities: "", description: "", image_url: "",
            place_avg: "", place_high: "", place_rate: "", place_companies: ""
          });
          // Smooth scroll to top for Add as well
          setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }} className="bg-[#FF6138] hover:bg-[#E5502B] text-white font-bold h-12 px-6 rounded-xl">
          <Plus className="w-5 h-5 mr-2" /> Add College
        </Button>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleReviewBeforeSave} className="bg-white p-8 rounded-3xl border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl relative overflow-hidden">
          
          {/* Visual Indicator of Add vs Edit */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6138]" />
          <div className="md:col-span-2 border-b border-slate-100 pb-2 mb-2">
            <h2 className="text-xl font-bold text-slate-800">
              {editingId ? `Editing: ${formData.name || 'College'}` : "Add New College"}
            </h2>
            <p className="text-sm text-slate-500">
              {editingId ? "Update the details below and save your changes." : "Fill out the details below to create a new college entry."}
            </p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">College Name</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Bangalore Institute" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Bangalore, Karnataka" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Institution Type</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Medical College" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Rating</label>
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. 4.5" type="number" step="0.1" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Est. Year</label>
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. 2005" type="number" value={formData.established} onChange={e => setFormData({...formData, established: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Accreditation</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. AICTE Approved" value={formData.accreditation} onChange={e => setFormData({...formData, accreditation: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Official Website</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. https://www.college.edu" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
          </div>

          {/* IMAGE UPLOAD UI */}
          <div className="space-y-2 md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
              <span>College Logo / Image URL</span>
            </label>
            <div className="flex gap-3 items-center">
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-white flex-1" placeholder="https://..." value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              <div className="relative">
                <Button type="button" disabled={isUploading} className="h-12 px-6 rounded-xl bg-[#FF6138] hover:bg-[#E5502B] text-white font-bold transition-all">
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <UploadCloud className="w-5 h-5 mr-2" />}
                  {isUploading ? "Uploading..." : "Upload File"}
                </Button>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
              </div>
            </div>
            {formData.image_url && (
              <div className="mt-3 flex items-center gap-4 bg-green-50 p-3 rounded-xl border border-green-100">
                <img src={formData.image_url} alt="Upload Preview" className="h-16 w-16 object-cover rounded-lg border border-green-200 shadow-sm" />
                <div>
                  <p className="text-sm text-green-700 font-bold">✓ Image Uploaded Successfully!</p>
                  <p className="text-xs text-green-600 truncate max-w-md">{formData.image_url}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Offered Course Slugs (Comma Separated)</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. btech-mechanical, mbbs" value={formData.course_slugs} onChange={e => setFormData({...formData, course_slugs: e.target.value})} />
            <p className="text-[10px] text-amber-600 mt-1">Must exactly match Course Slugs to show on brochures!</p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Facilities (Comma Separated)</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Labs, Hostel, Wi-Fi" value={formData.facilities} onChange={e => setFormData({...formData, facilities: e.target.value})} />
          </div>

          {/* PLACEMENT UI */}
          <div className="md:col-span-2 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-blue-800 uppercase border-b border-blue-100 pb-2">Placement Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-white" placeholder="Avg Package (e.g. 5 LPA)" value={formData.place_avg} onChange={e => setFormData({...formData, place_avg: e.target.value})} />
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-white" placeholder="High Package (e.g. 15 LPA)" value={formData.place_high} onChange={e => setFormData({...formData, place_high: e.target.value})} />
              <input className="border border-slate-200 p-3 rounded-xl w-full bg-white" placeholder="Placement Rate (e.g. 85%)" value={formData.place_rate} onChange={e => setFormData({...formData, place_rate: e.target.value})} />
            </div>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-white" placeholder="Top Recruiting Companies (Comma Separated: TCS, Wipro, Google)" value={formData.place_companies} onChange={e => setFormData({...formData, place_companies: e.target.value})} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="About the college..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
          </div>
          
          <div className="md:col-span-2 flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl">
              {editingId ? "Review & Update" : "Review & Save"}
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
              <th className="p-4">College</th>
              <th className="p-4">Location</th>
              <th className="p-4">Accreditation</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => (
              <tr key={college.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200">
                      {college.image_url ? (
                        <img src={college.image_url} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Building className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <span className="font-bold text-slate-800">{college.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-500 text-sm">{college.location}</td>
                <td className="p-4 text-slate-500 text-sm">
                  {college.accreditation ? (
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold">{college.accreditation}</span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(college)}>
                    <Edit className="w-4 h-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={async () => { 
                    if(confirm("Delete college?")) { await supabase.from("colleges").delete().eq("id", college.id); fetchColleges(); }
                  }}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
            {colleges.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No colleges found. Add your first one above!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}