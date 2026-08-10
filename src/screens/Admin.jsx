import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  FaPlus, FaSignOutAlt, FaFolder, FaBug,
  FaNewspaper, FaUsers,
  FaArrowLeft, FaLock, FaFilePdf, FaTrash, FaEdit, FaGithub, FaUserShield, FaImages, FaClock
} from "react-icons/fa";
import CyberBadge from "../components/CyberBadge";

const SESSION_DURATION = 900; // 15 Minutes session time (in seconds)

function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  // Session Time & Idle Logout State (Persists across browser page reloads)
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedExpiry = sessionStorage.getItem("admin_session_expiry");
    if (storedExpiry) {
      const remaining = Math.floor((parseInt(storedExpiry, 10) - Date.now()) / 1000);
      return Math.max(0, remaining);
    }
    return SESSION_DURATION;
  });

  // Auth State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Account Security Credentials State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // CyberCrew Section Data States
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [team, setTeam] = useState([]);
  const [crewMembers, setCrewMembers] = useState([]);
  const [aboutGallery, setAboutGallery] = useState([]);

  // Team Roster for instant 1-click selection across Projects & Bugs
  const teamRoster = React.useMemo(() => {
    const map = new Map();
    [...team, ...crewMembers].forEach((m) => {
      if (m.name && !map.has(m.name)) {
        map.set(m.name, {
          name: m.name,
          role: m.role || "Team Member",
          avatar_url: m.avatar_url || m.image || m.photo || "",
          linkedin_url: m.linkedin_url || m.linkedin || "",
        });
      }
    });
    return Array.from(map.values());
  }, [team, crewMembers]);

  // Modal / Form States for CRUD
  const [modalType, setModalType] = useState(null); // 'project' | 'blog' | 'bug' | 'tool' | 'team' | 'crew' | 'ticker'
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});

  // Auto Sign-out & Redirect to Homepage on Page Reload / Refresh
  useEffect(() => {
    const wasReloaded = sessionStorage.getItem("admin_was_reloaded") === "true";
    sessionStorage.removeItem("admin_was_reloaded");

    if (wasReloaded) {
      supabase.auth.signOut();
      sessionStorage.clear();
      setSession(null);
      navigate("/");
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("admin_was_reloaded", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [navigate]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAutoLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    sessionStorage.clear();
    alert("⌛ Admin session expired due to inactivity. Redirecting to Homepage.");
    navigate("/");
  }, [navigate]);

  // Session Timeout & Auto-Logout Effect (Persists across browser refreshes)
  useEffect(() => {
    if (!session) return;

    // Ensure initial expiry timestamp exists in sessionStorage
    let storedExpiry = sessionStorage.getItem("admin_session_expiry");
    if (!storedExpiry || parseInt(storedExpiry, 10) <= Date.now()) {
      storedExpiry = (Date.now() + SESSION_DURATION * 1000).toString();
      sessionStorage.setItem("admin_session_expiry", storedExpiry);
      setTimeLeft(SESSION_DURATION);
    } else {
      const initialRemaining = Math.max(0, Math.floor((parseInt(storedExpiry, 10) - Date.now()) / 1000));
      setTimeLeft(initialRemaining);
      if (initialRemaining <= 0) {
        handleAutoLogout();
        return;
      }
    }

    // Reset session timer & expiry timestamp on user activity
    const resetTimer = () => {
      const newExpiry = (Date.now() + SESSION_DURATION * 1000).toString();
      sessionStorage.setItem("admin_session_expiry", newExpiry);
      setTimeLeft(SESSION_DURATION);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetTimer));

    const timerInterval = setInterval(() => {
      const expStr = sessionStorage.getItem("admin_session_expiry");
      if (expStr) {
        const remaining = Math.floor((parseInt(expStr, 10) - Date.now()) / 1000);
        if (remaining <= 0) {
          clearInterval(timerInterval);
          handleAutoLogout();
          return;
        }
        setTimeLeft(remaining);
      } else {
        clearInterval(timerInterval);
        handleAutoLogout();
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [session, handleAutoLogout]);

  useEffect(() => {
    if (session) {
      fetchAllData();
    }
  }, [session]);

  const fetchAllData = async () => {
    setLoading(true);
    setMsg("");

    try {
      // 1. Projects
      const { data: projData } = await supabase.from("cyber_projects").select("*").order("id", { ascending: false });
      if (projData) setProjects(projData);

      // 2. Blogs
      const { data: blogData } = await supabase.from("cyber_blogs").select("*").order("id", { ascending: false });
      if (blogData) setBlogs(blogData);

      // 3. Bugs
      const { data: bugData } = await supabase.from("cyber_bugs").select("*").order("id", { ascending: false });
      if (bugData) setBugs(bugData);

      // 4. Team
      const { data: teamData } = await supabase.from("cyber_team").select("*").order("id", { ascending: true });
      if (teamData) setTeam(teamData);

      // 5. About Our Crew (Leadership & Mentors)
      let { data: crewData } = await supabase.from("cyber_crew_about").select("*").order("id", { ascending: true });
      if (!crewData || crewData.length === 0) {
        const { data: teamData } = await supabase.from("cyber_team").select("*").order("id", { ascending: true });
        crewData = teamData;
      }
      if (crewData) setCrewMembers(crewData);

      // 6. About Page Header Scroller Gallery
      const { data: aboutGalData } = await supabase.from("cyber_about_gallery").select("*").order("id", { ascending: false });
      if (aboutGalData) setAboutGallery(aboutGalData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auth Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);

    if (error) {
      setMsg(`[AUTH ERROR]: ${error.message}`);
    } else {
      setSession(data.session);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    sessionStorage.clear();
    navigate("/");
  };

  // Password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setMsg("Passwords do not match!");
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);
    if (error) setMsg(`Password update failed: ${error.message}`);
    else {
      setMsg("✅ Admin Password Updated Successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // Upload file helper for images & PDF documents
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `uploads/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error } = await supabase.storage.from("cybercrew-assets").upload(fileName, file, { upsert: true });
      if (error) alert(`Upload Error: ${error.message}`);
      else {
        const { data: publicData } = supabase.storage.from("cybercrew-assets").getPublicUrl(data.path);
        callback(publicData.publicUrl);
      }
    } catch (err) {
      alert(`Upload Failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Save (Create / Update) Handler
  const handleSaveItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    let table = "";
    if (modalType === "project") table = "cyber_projects";
    if (modalType === "blog") table = "cyber_blogs";
    if (modalType === "bug") table = "cyber_bugs";
    if (modalType === "tool") table = "cyber_tools";
    if (modalType === "team") table = "cyber_team";
    if (modalType === "crew") table = "cyber_crew_about";
    if (modalType === "about_photos") table = "cyber_about_gallery";
    if (modalType === "ticker") table = "cyber_ticker";

    let payload = { ...formData };
    if (table === "cyber_projects") {
      if (payload.image_url && !payload.img_url) {
        payload.img_url = payload.image_url;
      }
      delete payload.image_url;
    }
    if (table === "cyber_team" || table === "cyber_crew_about") {
      if (payload.linkedin && !payload.linkedin_url) {
        payload.linkedin_url = payload.linkedin;
      }
      delete payload.linkedin;
    }
    let error;

    if (editingId) {
      const res = await supabase.from(table).update(payload).eq("id", editingId);
      error = res.error;
    } else {
      const res = await supabase.from(table).insert([payload]);
      error = res.error;
    }

    // Fallback if 'cyber_crew_about' table or 'images'/'students' column is not created in table schema yet
    if (error && error.message.includes("cyber_crew_about")) {
      table = "cyber_team";
      if (editingId) {
        const res = await supabase.from(table).update(payload).eq("id", editingId);
        error = res.error;
      } else {
        const res = await supabase.from(table).insert([payload]);
        error = res.error;
      }
    }

    if (error && (
      error.message.includes("github_url") ||
      error.message.includes("image_url") ||
      error.message.includes("linkedin") ||
      error.message.includes("images") ||
      error.message.includes("students") ||
      error.message.includes("capabilities") ||
      error.message.includes("team")
    )) {
      const cleanPayload = { ...payload };
      delete cleanPayload.image_url;
      delete cleanPayload.github_url;
      delete cleanPayload.linkedin;
      delete cleanPayload.linkedin_url;
      delete cleanPayload.capabilities_heading;
      delete cleanPayload.capabilities;
      delete cleanPayload.team;
      delete cleanPayload.images;
      delete cleanPayload.students;

      if (editingId) {
        const res = await supabase.from(table).update(cleanPayload).eq("id", editingId);
        error = res.error;
      } else {
        const res = await supabase.from(table).insert([cleanPayload]);
        error = res.error;
      }
    }

    setSaving(false);
    if (error) {
      setMsg(`Save failed: ${error.message}`);
    } else {
      setModalType(null);
      fetchAllData();
    }
  };

  // Delete Handler
  const handleDeleteItem = async (table, id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setLoading(true);
      let { error } = await supabase.from(table).delete().eq("id", id);
      if (error && error.message.includes("cyber_crew_about")) {
        const res = await supabase.from("cyber_team").delete().eq("id", id);
        error = res.error;
      }
      if (error) setMsg(`Delete failed: ${error.message}`);
      else fetchAllData();
    }
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center font-mono text-cyan-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest animate-pulse">Initializing CyberCrew Admin Telemetry...</p>
        </div>
      </div>
    );
  }

  // Helper renderer for gallery images manager in any modal form
  const renderGalleryManager = (titleLabel = "Gallery Images") => (
    <div className="pt-2 border-t border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-cyan-400">{titleLabel}</label>
        <label className="cursor-pointer text-[11px] font-bold text-cyan-400 hover:underline">
          + Add Gallery Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileUpload(e, (url) => {
                const existing = Array.isArray(formData.images) ? formData.images : [];
                setFormData({
                  ...formData,
                  images: [...existing, url],
                  img_url: formData.img_url || url,
                  image_url: formData.image_url || url,
                });
              })
            }
            className="hidden"
          />
        </label>
      </div>

      {Array.isArray(formData.images) && formData.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative group rounded overflow-hidden border border-gray-800 bg-black">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-16 object-cover" />
              <button
                type="button"
                onClick={() => {
                  const filtered = formData.images.filter((_, i) => i !== idx);
                  setFormData({
                    ...formData,
                    images: filtered,
                    img_url: filtered[0] || "",
                    image_url: filtered[0] || "",
                  });
                }}
                className="absolute top-1 right-1 bg-red-600/80 text-white rounded p-0.5 text-[9px] hover:bg-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // --- LOGIN SCREEN ---
  if (!session) {
    return (
      <div className="min-h-[85vh] bg-cyber-dark flex items-center justify-center p-4 font-mono">
        <div className="cyber-card w-full max-w-md p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-gray-950/90 text-center shadow-[0_0_30px_rgba(0,243,255,0.15)]">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-cyan-400 mb-6 transition-colors">
            <FaArrowLeft /> RETURN TO LIVE PORTAL
          </a>

          <div className="mb-6">
            <CyberBadge text="ADMIN ACCESS ONLY" type="red" className="mb-2" />
            <h1 className="text-2xl font-bold text-cyan-400 tracking-wider text-glow-cyan">CYBER CREW ADMIN</h1>
            <p className="text-xs text-gray-400 mt-1">Enter your admin email and password to log in</p>
          </div>

          {msg && (
            <div className="mb-4 p-3 rounded-lg bg-gray-900 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              {msg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                placeholder="admin@cybercrew.org"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full cyber-button py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs uppercase tracking-wider rounded transition-all"
            >
              {authLoading ? "AUTHENTICATING..." : "LOG IN TO ADMIN PANEL →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-cyber-dark text-gray-200 font-mono p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-gray-400 hover:text-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-colors">
                <FaArrowLeft /> View Live Site
              </a>
              <span className="text-gray-600">/</span>
              <h1 className="text-2xl font-bold text-cyan-400 text-glow-cyan tracking-wider">CYBER CREW CONTROL CENTER</h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">Full CRUD Management: Create, Read, Update, Delete for all Images, Galleries, Documents & Matter</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-gray-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold shadow-[0_0_10px_rgba(0,243,255,0.2)]">
              <FaClock className="text-cyan-400 animate-pulse" />
              <span>SESSION: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
            </span>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
          {[
            { id: "projects", label: "Projects", icon: FaFolder, count: projects.length },
            { id: "blogs", label: "Blogs", icon: FaNewspaper, count: blogs.length },
            { id: "bugs", label: "Bug Reports", icon: FaBug, count: bugs.length },
            { id: "crew", label: "About Our Crew", icon: FaUserShield, count: crewMembers.length },
            { id: "team", label: "Team Members", icon: FaUsers, count: team.length },
            { id: "about_photos", label: "About Page Photos", icon: FaImages, count: aboutGallery.length },
            { id: "security", label: "Account Security", icon: FaLock, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold transition-all ${
                  active
                    ? "bg-cyan-500 text-gray-950 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                    : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                }`}
              >
                <Icon className="text-sm" /> {tab.label} {tab.count !== null && <span className="text-[10px] px-1.5 py-0.5 bg-black/40 rounded">{tab.count}</span>}
              </button>
            );
          })}
        </div>

        {msg && (
          <div className="mb-6 p-4 rounded bg-gray-900 border border-cyan-500/40 text-cyan-400 text-xs font-semibold flex items-center justify-between shadow-lg">
            <span>{msg}</span>
            <button onClick={() => setMsg("")} className="text-gray-500 hover:text-white font-bold px-2">✕</button>
          </div>
        )}

        {/* --- TAB 1: PROJECTS --- */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Projects Portfolio</h2>
                <p className="text-xs text-gray-400">Manage security tools, demo apps, matter descriptions, images & PDF docs</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ status: "Active", category: "Web Security", images: [] });
                  setModalType("project");
                }}
                className="cyber-button px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-xs font-bold rounded flex items-center gap-2"
              >
                <FaPlus /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((item) => (
                <div key={item.id} className="cyber-card p-4 border border-gray-800 rounded flex flex-col justify-between">
                  <div>
                    {item.img_url ? (
                      <img src={item.img_url} alt={item.title} className="w-full h-40 object-cover rounded mb-3 border border-gray-800" />
                    ) : (
                      <div className="w-full h-40 bg-gray-900 rounded mb-3 border border-gray-800 flex items-center justify-center text-xs text-gray-600">No Image Uploaded</div>
                    )}
                    <h3 className="font-bold text-cyan-400 text-base">{item.title}</h3>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">{item.category || "General"} · {item.status || "Active"}</p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.doc_url && <span className="text-[10px] text-cyan-300 flex items-center gap-1"><FaFilePdf /> PDF Attached</span>}
                      {item.github_url && <a href={item.github_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-400 flex items-center gap-1 hover:underline"><FaGithub /> Git Repo</a>}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("project"); }} className="flex-1 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs rounded hover:bg-cyan-500/20 flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteItem("cyber_projects", item.id, item.title)} className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 text-xs rounded hover:bg-red-500/20 flex items-center justify-center gap-1"><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 2: BLOGS --- */}
        {activeTab === "blogs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Security Articles & Blogs</h2>
                <p className="text-xs text-gray-400">Create, edit, view & delete security research articles, full matter text & cover images</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ author: "CYBER CREW", date: new Date().toISOString().split("T")[0], images: [] });
                  setModalType("blog");
                }}
                className="cyber-button px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-xs font-bold rounded flex items-center gap-2"
              >
                <FaPlus /> Add Blog Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogs.map((item) => (
                <div key={item.id} className="cyber-card p-4 border border-gray-800 rounded flex flex-col justify-between">
                  <div>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover rounded mb-3 border border-gray-800" />
                    ) : (
                      <div className="w-full h-40 bg-gray-900 rounded mb-3 border border-gray-800 flex items-center justify-center text-xs text-gray-600">No Cover Image</div>
                    )}
                    <h3 className="font-bold text-cyan-400 text-base">{item.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Author: {item.author || "CYBER CREW"} · {item.date}</p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{item.content}</p>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("blog"); }} className="flex-1 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs rounded hover:bg-cyan-500/20 flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteItem("cyber_blogs", item.id, item.title)} className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 text-xs rounded hover:bg-red-500/20 flex items-center justify-center gap-1"><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: BUGS --- */}
        {activeTab === "bugs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Discovered Vulnerability Reports</h2>
                <p className="text-xs text-gray-400">Manage vulnerability details, proof-of-concept screenshots, severity & target matter</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    severity: "High",
                    status: "Resolved & Patched",
                    target: "kietgroup.info",
                    images: [],
                    students: []
                  });
                  setModalType("bug");
                }}
                className="cyber-button px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold rounded flex items-center gap-2"
              >
                <FaPlus /> Add Bug Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bugs.map((item) => (
                <div key={item.id} className="cyber-card p-4 border border-gray-800 rounded flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-amber-400 text-base">{item.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-900 border border-amber-500/40 text-amber-400 font-bold">{item.severity}</span>
                    </div>
                    <p className="text-xs text-gray-400">Target: <span className="text-gray-200">{item.target}</span> · Status: <span className="text-emerald-400">{item.status || "Resolved"}</span></p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">{item.details}</p>

                    {item.image_url && (
                      <img src={item.image_url} alt={item.title} className="w-full h-36 object-cover rounded mt-3 border border-gray-800" />
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("bug"); }} className="flex-1 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs rounded hover:bg-amber-500/20 flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteItem("cyber_bugs", item.id, item.title)} className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 text-xs rounded hover:bg-red-500/20 flex items-center justify-center gap-1"><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: ABOUT OUR CREW --- */}
        {activeTab === "crew" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">About Our Crew Leadership & Mentors</h2>
                <p className="text-xs text-gray-400">Manage Chairman Sir, Principals, Dean, Cyber Coordinator, Co-Founders & Lead Members</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ role: "Lead Member", images: [] });
                  setModalType("crew");
                }}
                className="cyber-button px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 text-xs font-bold rounded flex items-center gap-2"
              >
                <FaPlus /> Add Crew Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {crewMembers.map((item) => (
                <div key={item.id} className="cyber-card p-4 border border-gray-800 rounded flex flex-col justify-between text-center">
                  <div>
                    {item.avatar_url ? (
                      <img src={item.avatar_url} alt={item.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-emerald-500/40 shadow-lg" />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-gray-900 border-2 border-gray-800 flex items-center justify-center text-xs text-gray-600">No Photo</div>
                    )}
                    <h3 className="font-bold text-emerald-400 text-base">{item.name}</h3>
                    <p className="text-xs text-gray-300 font-mono mt-0.5">{item.role}</p>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("crew"); }} className="flex-1 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs rounded hover:bg-emerald-500/20 flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteItem("cyber_crew_about", item.id, item.name)} className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 text-xs rounded hover:bg-red-500/20 flex items-center justify-center gap-1"><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 6: TEAM --- */}
        {activeTab === "team" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Team Members & Community</h2>
                <p className="text-xs text-gray-400">Manage student team profiles, roles, avatar photo uploads & social links</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ images: [] });
                  setModalType("team");
                }}
                className="cyber-button px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-xs font-bold rounded flex items-center gap-2"
              >
                <FaPlus /> Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {team.map((item) => (
                <div key={item.id} className="cyber-card p-4 border border-gray-800 rounded flex flex-col justify-between">
                  <div>
                    {item.avatar_url ? (
                      <img src={item.avatar_url} alt={item.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-cyan-500/40" />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-900 border-2 border-gray-800 flex items-center justify-center text-xs text-gray-600">No Photo</div>
                    )}
                    <h3 className="font-bold text-cyan-400 text-center text-base">{item.name}</h3>
                    <p className="text-xs text-gray-400 text-center mt-0.5">{item.role}</p>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("team"); }} className="flex-1 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs rounded hover:bg-cyan-500/20 flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteItem("cyber_team", item.id, item.name)} className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 text-xs rounded hover:bg-red-500/20 flex items-center justify-center gap-1"><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 7: ABOUT PAGE SCROLLER PHOTOS --- */}
        {activeTab === "about_photos" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">About Page Header Image Scroller</h2>
                <p className="text-xs text-gray-400">Manage, upload, edit, and delete event scroller photos shown on the /about page top header</p>
              </div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "Cyber Crew Event" });
                  setModalType("about_photos");
                }}
                className="cyber-button px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-xs font-bold rounded flex items-center gap-2"
              >
                <FaPlus /> Add Scroller Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aboutGallery.map((item) => (
                <div key={item.id} className="cyber-card p-4 border border-gray-800 rounded flex flex-col justify-between">
                  <div>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover rounded mb-3 border border-gray-800" />
                    ) : (
                      <div className="w-full h-40 bg-gray-900 rounded mb-3 border border-gray-800 flex items-center justify-center text-xs text-gray-600">No Photo Uploaded</div>
                    )}
                    <h3 className="font-bold text-cyan-400 text-base">{item.title || "Cyber Crew Event"}</h3>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalType("about_photos"); }} className="flex-1 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs rounded hover:bg-cyan-500/20 flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                    <button onClick={() => handleDeleteItem("cyber_about_gallery", item.id, item.title || "Photo")} className="flex-1 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 text-xs rounded hover:bg-red-500/20 flex items-center justify-center gap-1"><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 8: SECURITY --- */}
        {activeTab === "security" && (
          <div className="max-w-xl mx-auto">
            <div className="cyber-card p-6 border border-gray-800 rounded">
              <h3 className="text-base font-bold text-white mb-1">Update Admin Password</h3>
              <p className="text-xs text-gray-400 mb-4">Change the password used for admin login.</p>
              <form onSubmit={handleUpdatePassword} className="space-y-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password (min 6 chars)"
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white"
                />
                <button type="submit" disabled={saving} className="cyber-button px-4 py-2 bg-cyan-500 text-gray-950 font-bold text-xs rounded">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL FOR CREATE & UPDATE ITEMS --- */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="cyber-card max-w-xl w-full p-6 bg-gray-950 border border-cyan-500/40 rounded-xl space-y-4 my-8">
            <h3 className="text-lg font-bold text-cyan-400">
              {editingId ? "Edit & Update" : "Create New"} {modalType.toUpperCase()}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3 text-left">
              {/* 1. PROJECT EDITOR */}
              {modalType === "project" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Project Title *</label>
                    <input type="text" placeholder="Title *" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Category & Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Category (e.g. Web Security)" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                      <input type="text" placeholder="Status (e.g. Active)" value={formData.status || "Active"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Description / Project Overview Matter</label>
                    <textarea placeholder="Full project explanation..." value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Git / GitHub Repository URL</label>
                    <input type="text" placeholder="e.g. https://github.com/cybercrew/webscanner" value={formData.github_url || ""} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Cover Image Upload</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, img_url: url }))} className="text-xs text-gray-400" />
                    {formData.img_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={formData.img_url} alt="Cover" className="w-10 h-10 object-cover rounded border border-cyan-500/40" />
                          <span className="text-[10px] text-cyan-400 font-bold">✓ Cover Image Attached</span>
                        </div>
                        <button type="button" onClick={() => setFormData({ ...formData, img_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove Image ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Capabilities Section Editor */}
                  <div className="pt-3 border-t border-gray-800 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-cyan-400 mb-1">Project Capabilities Section Heading</label>
                      <input type="text" placeholder="e.g. CORE SCANNING CAPABILITIES" value={formData.capabilities_heading || "CORE PROJECT CAPABILITIES"} onChange={(e) => setFormData({ ...formData, capabilities_heading: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white font-bold" />
                    </div>

                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-cyan-400">Capabilities Modules Matter & Images</label>
                      <button
                        type="button"
                        onClick={() => {
                          const existing = Array.isArray(formData.capabilities) ? formData.capabilities : [];
                          setFormData({
                            ...formData,
                            capabilities: [...existing, { title: "New Capability", description: "", image: "" }]
                          });
                        }}
                        className="text-[11px] font-bold text-cyan-400 hover:underline"
                      >
                        + Add Capability Module
                      </button>
                    </div>

                    {Array.isArray(formData.capabilities) && formData.capabilities.length > 0 && (
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {formData.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="p-3 bg-gray-900 rounded border border-gray-800 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Module Heading / Title"
                                value={cap.title || ""}
                                onChange={(e) => {
                                  const updated = [...formData.capabilities];
                                  updated[cIdx].title = e.target.value;
                                  setFormData({ ...formData, capabilities: updated });
                                }}
                                className="flex-1 bg-gray-950 text-xs text-cyan-300 font-bold px-2 py-1 border border-gray-800 rounded"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = formData.capabilities.filter((_, i) => i !== cIdx);
                                  setFormData({ ...formData, capabilities: updated });
                                }}
                                className="text-red-400 text-xs px-1 hover:text-red-300 font-bold"
                              >
                                ✕
                              </button>
                            </div>

                            <textarea
                              placeholder="Module Capability Description Matter..."
                              value={cap.description || ""}
                              onChange={(e) => {
                                const updated = [...formData.capabilities];
                                updated[cIdx].description = e.target.value;
                                setFormData({ ...formData, capabilities: updated });
                              }}
                              rows={2}
                              className="w-full bg-gray-950 text-xs text-gray-300 p-2 border border-gray-800 rounded"
                            />

                            <div className="flex items-center gap-2 text-[11px]">
                              {cap.image || cap.image_url ? (
                                <img src={cap.image || cap.image_url} alt={cap.title} className="w-10 h-10 object-cover rounded border border-cyan-400" />
                              ) : (
                                <span className="text-gray-500 text-[10px]">No Module Image</span>
                              )}
                              <label className="cursor-pointer text-cyan-400 hover:underline font-bold">
                                Upload Module Image
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (url) => {
                                    const updated = [...formData.capabilities];
                                    updated[cIdx].image = url;
                                    updated[cIdx].image_url = url;
                                    setFormData({ ...formData, capabilities: updated });
                                  })}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Research Team Editor */}
                  <div className="pt-3 border-t border-gray-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-emerald-400">Project Research Team</label>

                      {teamRoster.length > 0 && (
                        <select
                          onChange={(e) => {
                            const selectedName = e.target.value;
                            if (!selectedName) return;
                            const found = teamRoster.find((m) => m.name === selectedName);
                            if (found) {
                              const existing = Array.isArray(formData.team) ? formData.team : [];
                              setFormData({
                                ...formData,
                                team: [
                                  ...existing,
                                  { name: found.name, image: found.avatar_url, photo: found.avatar_url, linkedin: found.linkedin_url }
                                ]
                              });
                            }
                            e.target.value = "";
                          }}
                          className="bg-gray-900 border border-cyan-500/40 text-cyan-300 text-xs rounded px-2 py-1 focus:outline-none"
                        >
                          <option value="">⚡ Quick Add Member from Team Members...</option>
                          {teamRoster.map((m, idx) => (
                            <option key={idx} value={m.name}>
                              + {m.name} ({m.role})
                            </option>
                          ))}
                        </select>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const existing = Array.isArray(formData.team) ? formData.team : [];
                          setFormData({
                            ...formData,
                            team: [...existing, { name: "New Team Member", image: "", linkedin: "" }]
                          });
                        }}
                        className="text-[11px] font-bold text-emerald-400 hover:underline"
                      >
                        + Add Custom Member
                      </button>
                    </div>

                    {Array.isArray(formData.team) && formData.team.length > 0 && (
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {formData.team.map((member, tIdx) => (
                          <div key={tIdx} className="p-3 bg-gray-900 rounded border border-gray-800 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Member Name (e.g. Gowtham)"
                                value={member.name || ""}
                                onChange={(e) => {
                                  const updated = [...formData.team];
                                  updated[tIdx].name = e.target.value;
                                  setFormData({ ...formData, team: updated });
                                }}
                                className="flex-1 bg-gray-950 text-xs text-white font-bold px-2 py-1 border border-gray-800 rounded"
                              />
                              <input
                                type="text"
                                placeholder="LinkedIn URL"
                                value={member.linkedin || member.linkedin_url || ""}
                                onChange={(e) => {
                                  const updated = [...formData.team];
                                  updated[tIdx].linkedin = e.target.value;
                                  updated[tIdx].linkedin_url = e.target.value;
                                  setFormData({ ...formData, team: updated });
                                }}
                                className="flex-1 bg-gray-950 text-xs text-cyan-300 px-2 py-1 border border-gray-800 rounded"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = formData.team.filter((_, i) => i !== tIdx);
                                  setFormData({ ...formData, team: updated });
                                }}
                                className="text-red-400 text-xs px-1 hover:text-red-300 font-bold"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-[11px]">
                              {member.image || member.photo ? (
                                <img src={member.image || member.photo} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-cyan-400" />
                              ) : (
                                <span className="text-gray-500 text-[10px]">Linked from Roster</span>
                              )}
                              <label className="cursor-pointer text-cyan-400 hover:underline font-bold">
                                Upload Photo (Optional)
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (url) => {
                                    const updated = [...formData.team];
                                    updated[tIdx].image = url;
                                    updated[tIdx].photo = url;
                                    setFormData({ ...formData, team: updated });
                                  })}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {renderGalleryManager("Project Screenshots Gallery")}

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Documentation PDF Upload</label>
                    <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, doc_url: url }))} className="text-xs text-gray-400" />
                    {formData.doc_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <span className="text-[10px] text-cyan-400 font-bold">✓ PDF Document Attached</span>
                        <button type="button" onClick={() => setFormData({ ...formData, doc_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove PDF ✕
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 2. BLOG EDITOR */}
              {modalType === "blog" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Article Title *</label>
                    <input type="text" placeholder="Title *" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Author</label>
                      <input type="text" placeholder="Author" value={formData.author || ""} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Date</label>
                      <input type="date" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Article Content / Full Matter Text</label>
                    <textarea placeholder="Write full article matter..." value={formData.content || ""} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={5} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Article Cover Image Upload</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, image_url: url }))} className="text-xs text-gray-400" />
                    {formData.image_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={formData.image_url} alt="Blog Cover" className="w-10 h-10 object-cover rounded border border-cyan-500/40" />
                          <span className="text-[10px] text-cyan-400 font-bold">✓ Cover Image Attached</span>
                        </div>
                        <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove Image ✕
                        </button>
                      </div>
                    )}
                  </div>
                  {renderGalleryManager("Multiple Article Gallery Images")}
                </>
              )}

              {/* 3. BUG EDITOR */}
              {modalType === "bug" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Vulnerability Title *</label>
                    <input type="text" placeholder="e.g. FTP Vulnerability" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Target System / Domain</label>
                    <input type="text" placeholder="e.g. kietgroup.info" value={formData.target || ""} onChange={(e) => setFormData({ ...formData, target: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Severity</label>
                      <select value={formData.severity || "High"} onChange={(e) => setFormData({ ...formData, severity: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white">
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Status</label>
                      <input type="text" placeholder="e.g. Resolved & Patched" value={formData.status || "Resolved & Patched"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Vulnerability Details / Technical Matter</label>
                    <textarea placeholder="Detailed vulnerability explanation..." value={formData.details || ""} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={4} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Upload Primary Proof-of-Concept Screenshot Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, image_url: url }))} className="text-xs text-gray-400" />
                    {formData.image_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={formData.image_url} alt="Main POC" className="w-10 h-10 object-cover rounded border border-cyan-500/40" />
                          <span className="text-[10px] text-cyan-400 font-bold">✓ Main Screenshot Attached</span>
                        </div>
                        <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove Image ✕
                        </button>
                      </div>
                    )}
                  </div>
                  {renderGalleryManager("Proof-of-Concept Screenshots Gallery")}

                  {/* Security Researchers & Contributors Manager */}
                  <div className="pt-2 border-t border-gray-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-emerald-400">Security Researchers & Contributors</label>

                      {teamRoster.length > 0 && (
                        <select
                          onChange={(e) => {
                            const selectedName = e.target.value;
                            if (!selectedName) return;
                            const found = teamRoster.find((m) => m.name === selectedName);
                            if (found) {
                              const existing = Array.isArray(formData.students) ? formData.students : [];
                              setFormData({
                                ...formData,
                                students: [
                                  ...existing,
                                  { name: found.name, photo: found.avatar_url, linkedin: found.linkedin_url }
                                ]
                              });
                            }
                            e.target.value = "";
                          }}
                          className="bg-gray-900 border border-cyan-500/40 text-cyan-300 text-xs rounded px-2 py-1 focus:outline-none"
                        >
                          <option value="">⚡ Quick Add Researcher from Team Members...</option>
                          {teamRoster.map((m, idx) => (
                            <option key={idx} value={m.name}>
                              + {m.name} ({m.role})
                            </option>
                          ))}
                        </select>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const existing = Array.isArray(formData.students) ? formData.students : [];
                          setFormData({ ...formData, students: [...existing, { name: "New Researcher", photo: "", linkedin: "" }] });
                        }}
                        className="text-[11px] font-bold text-emerald-400 hover:underline"
                      >
                        + Add Custom Researcher
                      </button>
                    </div>

                    {Array.isArray(formData.students) && formData.students.length > 0 && (
                      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                        {formData.students.map((student, sIdx) => (
                          <div key={sIdx} className="p-2 bg-gray-900 rounded border border-gray-800 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Researcher Name (e.g. Chakresh Ram)"
                                value={student.name || ""}
                                onChange={(e) => {
                                  const updated = [...formData.students];
                                  updated[sIdx].name = e.target.value;
                                  setFormData({ ...formData, students: updated });
                                }}
                                className="flex-1 bg-gray-950 text-xs text-white px-2 py-1 border border-gray-800 rounded font-bold"
                              />
                              <input
                                type="text"
                                placeholder="LinkedIn URL"
                                value={student.linkedin || student.linkedin_url || ""}
                                onChange={(e) => {
                                  const updated = [...formData.students];
                                  updated[sIdx].linkedin = e.target.value;
                                  updated[sIdx].linkedin_url = e.target.value;
                                  setFormData({ ...formData, students: updated });
                                }}
                                className="flex-1 bg-gray-950 text-xs text-cyan-300 px-2 py-1 border border-gray-800 rounded"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = formData.students.filter((_, i) => i !== sIdx);
                                  setFormData({ ...formData, students: updated });
                                }}
                                className="text-red-400 text-xs px-1 hover:text-red-300 font-bold"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-[11px]">
                              {student.photo ? (
                                <img src={student.photo} alt={student.name} className="w-8 h-8 rounded-full object-cover border border-cyan-400" />
                              ) : (
                                <span className="text-gray-500 text-[10px]">Linked from Roster</span>
                              )}
                              <label className="cursor-pointer text-cyan-400 hover:underline font-bold">
                                Upload Photo (Optional)
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (url) => {
                                    const updated = [...formData.students];
                                    updated[sIdx].photo = url;
                                    setFormData({ ...formData, students: updated });
                                  })}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 5. ABOUT OUR CREW EDITOR */}
              {modalType === "crew" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Crew Member Name *</label>
                    <input type="text" placeholder="e.g. P. Viswam, D. Revathi, RamKiran..." value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Role / Designation *</label>
                    <input type="text" placeholder="e.g. Chairman Sir, KIET Principal, Cyber Coordinator..." value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">LinkedIn Profile URL</label>
                    <input type="text" placeholder="https://www.linkedin.com/in/..." value={formData.linkedin_url || formData.linkedin || ""} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value, linkedin: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-cyan-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Avatar Photo Upload</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, avatar_url: url }))} className="text-xs text-gray-400" />
                    {formData.avatar_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={formData.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-emerald-500/40" />
                          <span className="text-[10px] text-emerald-400 font-bold">✓ Avatar Photo Attached</span>
                        </div>
                        <button type="button" onClick={() => setFormData({ ...formData, avatar_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove Photo ✕
                        </button>
                      </div>
                    )}
                  </div>
                  {renderGalleryManager("Crew Profile & Event Gallery")}
                </>
              )}

              {/* 6. TEAM EDITOR */}
              {modalType === "team" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Member Name *</label>
                    <input type="text" placeholder="Member Name *" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Role / Designation</label>
                    <input type="text" placeholder="Role / Title" value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">LinkedIn Profile URL</label>
                    <input type="text" placeholder="https://www.linkedin.com/in/..." value={formData.linkedin_url || formData.linkedin || ""} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value, linkedin: e.target.value })} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-cyan-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Avatar Photo Upload</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, avatar_url: url }))} className="text-xs text-gray-400" />
                    {formData.avatar_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={formData.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-cyan-500/40" />
                          <span className="text-[10px] text-cyan-400 font-bold">✓ Avatar Photo Attached</span>
                        </div>
                        <button type="button" onClick={() => setFormData({ ...formData, avatar_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove Photo ✕
                        </button>
                      </div>
                    )}
                  </div>
                  {renderGalleryManager("Team Member Gallery")}
                </>
              )}

              {/* 7. ABOUT PAGE SCROLLER PHOTOS EDITOR */}
              {modalType === "about_photos" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Photo Title / Caption *</label>
                    <input type="text" placeholder="e.g. Cyber Crew Event 2025" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Header Scroller Photo Upload *</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, image_url: url }))} className="text-xs text-gray-400" />
                    {formData.image_url && (
                      <div className="flex items-center justify-between mt-2 p-2 bg-gray-900 rounded border border-gray-800">
                        <div className="flex items-center gap-2">
                          <img src={formData.image_url} alt="Scroller Preview" className="w-16 h-10 object-cover rounded border border-cyan-500/40" />
                          <span className="text-[10px] text-cyan-400 font-bold">✓ Scroller Photo Attached</span>
                        </div>
                        <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })} className="text-xs text-red-400 hover:text-red-300 font-bold px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded">
                          Remove Photo ✕
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-800">
                <button type="button" onClick={() => setModalType(null)} className="flex-1 py-2 bg-gray-800 text-gray-300 text-xs rounded font-bold">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="flex-1 py-2 bg-cyan-500 text-gray-950 text-xs rounded font-bold">{saving ? "Saving..." : "Save Item"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
