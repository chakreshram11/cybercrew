const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hrbyhgmhjswugkmeuzdt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYnloZ21oanN3dWdrbWV1emR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDA3OTIsImV4cCI6MjEwMTkxNjc5Mn0.gcUHWJohYlCumrrWD5etwvZsgGvAW8_w5qM1V0dX3W8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ADMIN_EMAIL = 'cyberkiet24@gmail.com';
const ADMIN_PASS = 'CyberCrewWebSiteAdminPanel@24';

async function run() {
  console.log("=== Setting Up 'About Our Crew' Section in Supabase ===");

  // 1. Authenticate Admin
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASS
  });
  if (authError) {
    console.error("Auth Failed:", authError.message);
    return;
  }
  console.log("✅ Authenticated as Admin!");

  // 2. Clear old entries
  await supabase.from('cyber_crew_about').delete().neq('id', 0);

  // 3. Define the 8 Leadership & Crew Members
  const crewMembers = [
    { name: "P. Viswam", role: "Chairman Sir", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348480618_chairman_sir.jpg", display_order: 1 },
    { name: "D. Revathi", role: "KIET Principal", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348490376_revathi_madam.jpeg", display_order: 2 },
    { name: "Y. Rama Krishna", role: "KIET-W Principal", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348490712_rk_sir.jpg", display_order: 3 },
    { name: "RamKiran", role: "Dean & Vice Principal", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348483059_dean.jpg", display_order: 4 },
    { name: "S.N.S. Somesh", role: "Cyber Coordinator", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348491079_somesh_sir.jpg", display_order: 5 },
    { name: "Dhanush", role: "Co-Founder", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348485821_dhanush.jpg", display_order: 6 },
    { name: "S. Ajay", role: "Co-Founder", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348476393_ajay_anna.jpg", display_order: 7 },
    { name: "G. Bhanu", role: "Lead Member", avatar_url: "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348477660_bhanu.jpg", display_order: 8 }
  ];

  const { data: insertedData, error: insertErr } = await supabase.from('cyber_crew_about').insert(crewMembers).select();
  if (insertErr) {
    console.error("Note:", insertErr.message);
  } else {
    console.log(`✅ Successfully inserted ${insertedData.length} 'About Our Crew' members into Supabase!`);
  }
}

run().catch(err => console.error("Script failed:", err));
