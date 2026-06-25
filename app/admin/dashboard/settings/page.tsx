"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ contact_email: "", phone: "", address: "", facebook_url: "", instagram_url: "" });
  const supabase = createClient();

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from("site_settings").select("*").single();
      if (data) setSettings(data);
    }
    loadSettings();
  }, []);

  async function handleSave() {
    // .upsert updates if it exists, inserts if it doesn't
    const { error } = await supabase.from("site_settings").upsert({ id: 1, ...settings });
    if (!error) alert("Settings Saved!");
    else alert("Error saving settings");
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-8">Site Settings</h1>
      <div className="bg-white p-8 rounded-3xl border grid grid-cols-1 md:grid-cols-2 gap-6">
        <input className="border p-3 rounded-xl" placeholder="Contact Email" value={settings.contact_email} onChange={e => setSettings({...settings, contact_email: e.target.value})} />
        <input className="border p-3 rounded-xl" placeholder="Phone Number" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
        <input className="border p-3 rounded-xl col-span-2" placeholder="Office Address" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
        <input className="border p-3 rounded-xl" placeholder="Facebook URL" value={settings.facebook_url} onChange={e => setSettings({...settings, facebook_url: e.target.value})} />
        <input className="border p-3 rounded-xl" placeholder="Instagram URL" value={settings.instagram_url} onChange={e => setSettings({...settings, instagram_url: e.target.value})} />
        <Button onClick={handleSave} className="col-span-2 bg-indigo-600 h-12 text-lg">Update Global Settings</Button>
      </div>
    </div>
  );
}