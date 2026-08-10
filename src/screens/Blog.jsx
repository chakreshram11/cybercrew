import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const { data } = await supabase.from("cyber_blogs").select("*").order("id", { ascending: false });
        if (data) {
          const formatted = data.map((b) => ({
            ...b,
            description: b.description || b.content,
            images: b.images && b.images.length > 0 ? b.images : b.image_url ? [b.image_url] : [],
          }));
          setBlogs(formatted);
        }
      } catch (err) {
        console.error("Error loading blogs from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (b) =>
      (b.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-cyber-dark min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 bg-cyber-grid font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-slate border border-cyan-500/40 text-cyan-400 font-mono font-bold rounded shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:bg-cyan-950 hover:border-cyan-400 transition-all text-xs"
            aria-label="Go back"
          >
            ← BACK
          </button>
        </div>

        <div className="text-center mb-10">
          <CyberBadge text="RESEARCH & ADVISORIES" type="cyan" className="mb-2" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            CYBER CREW BLOGS
          </h1>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto mt-2">
            In-depth cybersecurity tutorials, exploit breakdowns, network safety guides, and club awareness updates.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search blogs by topic or keyword..."
              className="w-full p-3.5 pl-10 rounded bg-cyber-slate border border-cyan-500/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <span className="absolute left-3.5 top-3.5 text-cyan-400 font-mono text-sm">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 font-mono text-cyan-400 animate-pulse">
            LOADING RESEARCH BLOGS...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12 font-mono text-gray-400">
            No research blogs found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <CyberCard
                  title={blog.title}
                  subtitle="ARTICLE // READ"
                  badgeText="PUBLISHED"
                  badgeColor="green"
                  image={blog.images?.[0]}
                >
                  <p className="text-gray-300 font-mono text-xs line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </CyberCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
