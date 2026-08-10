import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ScrollToTop from "../components/ScrollToTop";
import LiveThreatTicker from "../components/LiveThreatTicker";
import CyberQuizWidget from "../components/CyberQuizWidget";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";
import GlitchText from "../components/GlitchText";

const Logo = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348482392_cybercrewlogo.png";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [crewMembers, setCrewMembers] = useState([]);

  const phrases = useMemo(
    () => [
      "Where Innovation Meets Protection",
      "Defending Digital Frontiers @ KIET",
      "Ethical Hacking • Recon • Exploitation",
    ],
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentPhrase = phrases[index];
      setTypedText((prev) => currentPhrase.slice(0, prev.length + 1));

      if (typedText === currentPhrase) {
        setTimeout(() => {
          setTypedText("");
          setIndex((prev) => (prev + 1) % phrases.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [typedText, index, phrases]);

  useEffect(() => {
    async function loadSupabaseHomeData() {
      try {
        // 1. Crew Members
        let { data: crewData } = await supabase.from("cyber_crew_about").select("*").order("id", { ascending: true });
        if (!crewData || crewData.length === 0) {
          const { data: teamData } = await supabase.from("cyber_team").select("*").order("id", { ascending: true });
          crewData = teamData;
        }
        if (crewData) {
          setCrewMembers(crewData.map((c) => ({ src: c.avatar_url, name: c.name, role: c.role })));
        }

        // 2. Blogs
        const { data: blogData } = await supabase.from("cyber_blogs").select("*").order("id", { ascending: false });
        if (blogData) {
          setBlogs(blogData.map((b) => ({ ...b, description: b.content || b.description, images: b.image_url ? [b.image_url] : [] })));
        }

        // 3. Bugs
        const { data: bugData } = await supabase.from("cyber_bugs").select("*").order("id", { ascending: false });
        if (bugData) {
          setBugs(bugData.map((b) => ({ ...b, description: b.details || b.description, images: b.image_url ? [b.image_url] : [] })));
        }

        // 4. Projects
        const { data: projData } = await supabase.from("cyber_projects").select("*").order("id", { ascending: false });
        if (projData) {
          setProjects(projData.map((p) => ({ ...p, name: p.title || p.name, path: p.doc_url || p.path, image: p.img_url || p.image })));
        }
      } catch (err) {
        console.error("Error loading home data from Supabase:", err);
      }
    }
    loadSupabaseHomeData();
  }, []);

  return (
    <>
      <ScrollToTop />
      {/* Live Threat Ticker Bar */}
      <LiveThreatTicker />

      {/* Hero Section */}
      <div className="bg-cyber-dark min-h-[90vh] flex flex-col items-center justify-center py-12 px-4 relative bg-cyber-grid overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        <div className="flex flex-col items-center justify-center w-full max-w-5xl text-center relative z-10">
          <div className="relative mb-6">
            <img
              src={Logo}
              alt="Cyber Crew Logo"
              className="h-56 sm:h-72 md:h-80 w-auto max-w-full object-contain filter drop-shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>

          <div className="text-white space-y-4">
            <CyberBadge text="KIET CYBER CREW ACADEMY" type="cyan" className="mb-2" />
            <br />
            <GlitchText
              text="WELCOME TO CYBER CREW"
              className="text-3xl sm:text-5xl md:text-6xl font-mono text-glow-cyan"
            />

            <p className="text-lg sm:text-2xl font-mono font-bold text-cyan-300 min-h-[2.5rem] flex items-center justify-center">
              <span>{typedText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse inline-block"></span>
            </p>

            <p className="text-gray-400 font-mono text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
              A student-driven cybersecurity organization empowering researchers in vulnerability discovery, ethical hacking, and secure software development.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link to="/projects">
                <button className="cyber-button bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-bold py-3 px-6 rounded text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all">
                  EXPLORE PROJECTS
                </button>
              </Link>
              <Link to="/tools">
                <button className="cyber-button bg-cyber-slate hover:bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono font-bold py-3 px-6 rounded text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all">
                  SECURITY TOOLS
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About & Leadership Section */}
      <section className="w-full bg-cyber-slate/90 text-white py-16 border-t border-cyan-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
          <CyberBadge text="ABOUT OUR CREW" type="green" className="mb-3" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-cyan-400 mb-6 text-glow-cyan">
            MISSION & CREW LEADERSHIP
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-mono leading-relaxed max-w-3xl mx-auto">
            Cyber Crew was founded by innovative students <span className="text-cyan-300 font-bold">Ajay</span> and <span className="text-cyan-300 font-bold">Dhanush</span> at KIET. We cultivate hands-on ethical hacking skills, conduct workshops, and secure local infrastructures.
          </p>

          {/* Team Leadership Avatars */}
          {crewMembers.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-12">
              {crewMembers.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative mb-3">
                    <img
                      src={member.src || "/placeholder.jpg"}
                      alt={member.name}
                      className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover border-2 border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-gray-900 animate-pulse"></div>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400/80">{member.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive CTF Quiz Challenge Section */}
      <section className="w-full bg-cyber-dark py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20 bg-cyber-grid">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <CyberBadge text="INTERACTIVE CHALLENGE" type="amber" className="mb-2" />
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 text-glow-cyan">
            TEST YOUR CYBER SKILLS
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto mt-2">
            Try our instant CTF mini-quiz to evaluate your web security & cryptanalysis knowledge.
          </p>
        </div>
        <CyberQuizWidget />
      </section>

      {/* Latest Discovered Bugs Section */}
      {bugs.length > 0 && (
        <section className="w-full bg-cyber-slate/90 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <div>
                <CyberBadge text="VULNERABILITY RESEARCH" type="red" className="mb-2" />
                <h2 className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 text-glow-cyan">
                  BUGS WE'VE FOUND
                </h2>
              </div>
              <Link to="/bugs">
                <button className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  VIEW ALL DISCOVERED BUGS →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bugs.slice(0, 3).map((bug) => (
                <Link to={`/bug/${bug.id}`} key={bug.id}>
                  <CyberCard
                    title={bug.title}
                    subtitle="RECON // LOG"
                    badgeText={bug.status || "RESOLVED"}
                    badgeColor="green"
                    image={bug.images?.[0]}
                  >
                    <p className="line-clamp-3 text-gray-300 font-mono text-xs leading-relaxed">
                      {bug.description}
                    </p>
                  </CyberCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Research & Blogs Section */}
      {blogs.length > 0 && (
        <section className="w-full bg-cyber-dark text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20 bg-cyber-grid">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <div>
                <CyberBadge text="RESEARCH & ADVISORIES" type="cyan" className="mb-2" />
                <h2 className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 text-glow-cyan">
                  LATEST BLOGS & ARTICLES
                </h2>
              </div>
              <Link to="/blogs">
                <button className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  VIEW ALL BLOGS →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((blog) => (
                <Link to={`/blog/${blog.id}`} key={blog.id}>
                  <CyberCard
                    title={blog.title}
                    subtitle="RESEARCH ARTICLE"
                    badgeText="PUBLISHED"
                    badgeColor="purple"
                    image={blog.images?.[0]}
                  >
                    <p className="line-clamp-3 text-gray-300 font-mono text-xs leading-relaxed">
                      {blog.description}
                    </p>
                  </CyberCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section className="w-full bg-cyber-dark text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20 bg-cyber-grid">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <div>
                <CyberBadge text="PORTFOLIO // TOOLS" type="cyan" className="mb-2" />
                <h2 className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 text-glow-cyan">
                  CYBER CREW PROJECTS
                </h2>
              </div>
              <Link to="/projects">
                <button className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  VIEW ALL PROJECTS →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Link to={`/project/${project.id}`} key={project.id}>
                  <CyberCard
                    title={project.name}
                    subtitle={project.category || "ACTIVE TOOL"}
                    badgeText={project.status || "ACTIVE"}
                    badgeColor="cyan"
                    image={project.image}
                  >
                    <p className="line-clamp-4 text-gray-300 font-mono text-xs leading-relaxed">
                      {project.description}
                    </p>
                  </CyberCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
