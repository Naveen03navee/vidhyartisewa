"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, UploadCloud, Loader2, UserPlus } from "lucide-react";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", bio: "", image_url: "" });
  
  const topRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => { fetchTeam(); }, []);

  async function fetchTeam() {
    // Ordering by 'id' to prevent errors if 'created_at' doesn't exist
    const { data, error } = await supabase.from("team_members").select("*").order("id", { ascending: false });
    if (error) {
        console.error("Fetch Error:", error);
    } else {
        setTeam(data || []);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fileName = `team_${Date.now()}.png`;
      const { error } = await supabase.storage.from('website-images').upload(`team/${fileName}`, file);
      if (error) throw error;
      const { data } = supabase.storage.from('website-images').getPublicUrl(`team/${fileName}`);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: any) { alert("Upload failed: " + err.message); } finally { setIsUploading(false); }
  }

  async function executeSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingId) {
        await supabase.from("team_members").update(formData).eq("id", editingId);
      } else {
        await supabase.from("team_members").insert([formData]);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: "", role: "", bio: "", image_url: "" });
      fetchTeam();
    } catch (err: any) {
      alert("Error saving: " + err.message);
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto" ref={topRef}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">Team & CEO</h1>
        <Button onClick={() => { setIsFormOpen(true); setEditingId(null); setFormData({name: "", role: "", bio: "", image_url: ""}); }}>
          <UserPlus className="mr-2"/> Add Member
        </Button>
      </div>

      {isFormOpen && (
        <form onSubmit={executeSave} className="bg-white p-8 rounded-3xl border mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl">
          <input className="border p-3 rounded-xl" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input className="border p-3 rounded-xl" placeholder="Role/Designation" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
          <div className="flex gap-2">
            <input className="border p-3 rounded-xl flex-1" placeholder="Image URL" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
            <input type="file" onChange={handleImageUpload} className="hidden" id="f" />
            <label htmlFor="f" className="cursor-pointer bg-slate-100 p-3 rounded-xl"><UploadCloud/></label>
          </div>
          <textarea className="border p-3 rounded-xl md:col-span-2" placeholder="Short Bio" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
          <Button type="submit" className="md:col-span-2 bg-green-600">Save Member</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
            <img src={m.image_url} className="w-24 h-24 rounded-full object-cover mb-4 bg-slate-100"/>
            <h3 className="font-bold text-lg">{m.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{m.role}</p>
            <div className="mt-auto flex gap-2">
               <Button variant="outline" size="icon" onClick={() => { setFormData(m); setEditingId(m.id); setIsFormOpen(true); topRef.current?.scrollIntoView({behavior:'smooth'}); }}><Edit className="w-4 h-4"/></Button>
               <Button variant="destructive" size="icon" onClick={async () => { if(confirm("Delete member?")) { await supabase.from("team_members").delete().eq("id", m.id); fetchTeam(); } }}><Trash2 className="w-4 h-4"/></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}