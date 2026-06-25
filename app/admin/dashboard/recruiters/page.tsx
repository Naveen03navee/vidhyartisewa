"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, UploadCloud, Loader2, Building2 } from "lucide-react";

export default function AdminRecruitersPage() {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "", 
    domain: "",
    image_url: ""
  });
  
  const supabase = createClient();

  useEffect(() => { fetchRecruiters(); }, []);

  async function fetchRecruiters() {
    const { data } = await supabase.from("recruiters").select("*").order("created_at", { ascending: false });
    setRecruiters(data || []);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fileName = `recruiter_${Date.now()}.png`;
      const { error } = await supabase.storage.from('website-images').upload(`recruiters/${fileName}`, file);
      if (error) throw error;
      const { data } = supabase.storage.from('website-images').getPublicUrl(`recruiters/${fileName}`);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: any) { alert("Upload failed"); } finally { setIsUploading(false); }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingId) {
        await supabase.from("recruiters").update(formData).eq("id", editingId);
      } else {
        await supabase.from("recruiters").insert([formData]);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: "", domain: "", image_url: "" });
      fetchRecruiters();
    } catch (err: any) { alert(err.message); }
  }

  const handleEdit = (r: any) => {
    setFormData({ name: r.name || "", domain: r.domain || "", image_url: r.image_url || "" });
    setEditingId(r.id);
    setIsFormOpen(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto" ref={topRef}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
          <Building2 className="w-8 h-8 text-amber-600" /> Recruiting Companies
        </h1>
        <Button onClick={() => { setIsFormOpen(true); setEditingId(null); setFormData({name: "", domain: "", image_url: ""}); }} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="mr-2"/> Add Recruiter
        </Button>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Company Name</label>
            <input className="border p-3 rounded-xl w-full" placeholder="e.g. TCS" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Website Domain (Optional)</label>
            <input className="border p-3 rounded-xl w-full" placeholder="e.g. tcs.com" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} />
          </div>

          <div className="col-span-2 space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Company Logo</label>
             <div className="flex gap-2">
              <input className="border p-3 rounded-xl flex-1 bg-slate-50" placeholder="Image URL (Upload logo image)" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} required />
              <input type="file" onChange={handleImageUpload} className="hidden" id="file" />
              <label htmlFor="file" className="cursor-pointer bg-slate-100 p-3 rounded-xl hover:bg-slate-200 transition flex items-center justify-center min-w-[50px]">
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5"/>}
              </label>
            </div>
          </div>

          <div className="col-span-2 flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">Save Company</Button>
          </div>
        </form>
      )}

      {/* LIST VIEW */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-sm font-bold text-slate-500">Logo</th>
              <th className="p-4 text-sm font-bold text-slate-500">Company Details</th>
              <th className="p-4 text-sm font-bold text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.length === 0 ? (
               <tr><td colSpan={3} className="p-8 text-center text-slate-500">No companies added yet.</td></tr>
            ) : recruiters.map((r) => (
              <tr key={r.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="w-20 h-12 rounded-xl bg-slate-50 border flex items-center justify-center p-2 overflow-hidden">
                    <img src={r.image_url} className="max-w-full max-h-full object-contain" alt={r.name}/>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-bold text-slate-900">{r.name}</p>
                  {r.domain && <p className="text-xs text-slate-400">{r.domain}</p>}
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}><Edit className="w-4 h-4 text-blue-500"/></Button>
                  <Button variant="ghost" size="icon" onClick={async () => { 
                    if(confirm("Delete this recruiter?")) {
                      await supabase.from("recruiters").delete().eq("id", r.id); 
                      fetchRecruiters(); 
                    }
                  }}><Trash2 className="w-4 h-4 text-red-500"/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}