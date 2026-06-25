"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, BookOpen, AlertCircle } from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // NEW: State to hold the data pending confirmation
  const [confirmData, setConfirmData] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({
    name: "", category: "", duration: "", eligibility: "", fees_range: "", 
    description: "", career_opportunities: "", salary_insights: ""
  });
  
  const supabase = createClient();

  useEffect(() => { fetchCourses(); }, []);

  async function fetchCourses() {
    const { data } = await supabase.from("courses").select("*").order("category").order("name");
    setCourses(data || []);
  }

  const formatData = (data: any) => ({
    ...data,
    slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    career_opportunities: Array.isArray(data.career_opportunities) 
      ? data.career_opportunities 
      : data.career_opportunities.split(',').map((s: string) => s.trim()).filter(Boolean),
    salary_insights: typeof data.salary_insights === 'string' 
      ? JSON.parse(data.salary_insights || '{}') 
      : data.salary_insights
  });

  // CHANGED: Instead of saving directly, this just formats and triggers the popup
  function handleReviewBeforeSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = formatData(formData);
      setConfirmData(payload); // Show the confirmation popup
    } catch (error) {
      alert("Error parsing data. Ensure your JSON format is correct.");
      console.error(error);
    }
  }

  // NEW: This actually performs the database operation after the user confirms
  async function executeSave() {
    if (!confirmData) return;
    
    try {
      if (editingId) {
        await supabase.from("courses").update(confirmData).eq("id", editingId);
      } else {
        await supabase.from("courses").insert([confirmData]);
      }
      // Reset states
      setConfirmData(null);
      setIsFormOpen(false);
      setEditingId(null);
      fetchCourses();
    } catch (error) {
      alert("Error saving course to database.");
      console.error(error);
    }
  }

  const startEdit = (course: any) => {
    setFormData({
      ...course,
      career_opportunities: course.career_opportunities?.join(", ") || "",
      salary_insights: JSON.stringify(course.salary_insights || {})
    });
    setEditingId(course.id);
    setIsFormOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      
      {/* ------------------------------------------------------------- */}
      {/* CONFIRMATION MODAL OVERLAY */}
      {/* ------------------------------------------------------------- */}
      {confirmData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-amber-50/50">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <div>
                <h2 className="text-xl font-black text-slate-800">Review Data Before Saving</h2>
                <p className="text-sm text-slate-500 font-medium">Please verify the formatted JSON payload below.</p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto bg-slate-50">
              <pre className="text-xs bg-slate-800 text-green-400 p-4 rounded-xl overflow-x-auto font-mono shadow-inner">
                {JSON.stringify(confirmData, null, 2)}
              </pre>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-4 bg-white">
              <Button onClick={executeSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl">
                Looks Good, Save to Database
              </Button>
              <Button onClick={() => setConfirmData(null)} variant="outline" className="h-12 rounded-xl">
                Go Back & Edit
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PAGE HEADER */}
      {/* ------------------------------------------------------------- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Manage Courses</h1>
          <p className="text-slate-500 mt-1">Add, update, or remove academic programs.</p>
        </div>
        <Button onClick={() => { 
          setIsFormOpen(true); 
          setEditingId(null); 
          setFormData({ name: "", category: "", duration: "", eligibility: "", fees_range: "", description: "", career_opportunities: "", salary_insights: "" });
        }} className="bg-[#FF6138] hover:bg-[#E5502B] text-white font-bold h-12 px-6 rounded-xl shadow-md">
          <Plus className="w-5 h-5 mr-2" /> Add Course
        </Button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COURSE FORM */}
      {/* ------------------------------------------------------------- */}
      {isFormOpen && (
        <form onSubmit={handleReviewBeforeSave} className="bg-white p-8 rounded-3xl border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6138]" />
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Course Name</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. B.Tech - Mechanical" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
            <select className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
              <option value="">Select Category</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Nursing">Nursing</option>
              <option value="Allied Health Sciences">Allied Health Sciences</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Management">Management</option>
              <option value="Commerce">Commerce</option>
              <option value="Computer Applications">Computer Applications</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Duration</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. 4 Years" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Eligibility</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. 10+2 with PCM, 50% min" value={formData.eligibility} onChange={e => setFormData({...formData, eligibility: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Fees Range</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. ₹2,00,000 - ₹4,00,000/year" value={formData.fees_range} onChange={e => setFormData({...formData, fees_range: e.target.value})} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Careers (Comma Separated)</label>
            <input className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="e.g. Software Developer, Data Scientist, AI Engineer" value={formData.career_opportunities} onChange={e => setFormData({...formData, career_opportunities: e.target.value})} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Salary Insights (Valid JSON Required)</label>
            <textarea className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50 font-mono text-sm" placeholder='{"entry": "4-6 LPA", "mid": "8-15 LPA", "senior": "20-40 LPA"}' value={formData.salary_insights} onChange={e => setFormData({...formData, salary_insights: e.target.value})} rows={2} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Course Description</label>
            <textarea className="border border-slate-200 p-3 rounded-xl w-full bg-slate-50" placeholder="Detailed description of the program..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
          </div>
          
          <div className="md:col-span-2 flex gap-4 pt-4 border-t border-slate-100">
            <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 rounded-xl">
              Review & Continue
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => setIsFormOpen(false)}>Cancel</Button>
          </div>
        </form>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LIST OF COURSES */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Course Name</th>
              <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{course.name}</p>
                      <p className="text-xs text-slate-500">Slug: {course.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {course.category}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" onClick={() => startEdit(course)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={async () => { 
                      if(confirm(`Are you sure you want to delete ${course.name}?`)) {
                        await supabase.from("courses").delete().eq("id", course.id); 
                        fetchCourses(); 
                      }
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-slate-500">No courses found. Add your first one above!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}