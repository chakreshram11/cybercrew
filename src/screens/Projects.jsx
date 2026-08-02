import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/project.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full bg-cyber-dark text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cyber-grid">
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
          <CyberBadge text="SOFTWARE & DEFENSE SUITE" type="cyan" className="mb-2" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            CYBER CREW PROJECTS
          </h1>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto mt-2">
            AI-driven vulnerability scanners, network packet analyzers, cryptographic ciphers, and Cisco HIPAA security topologies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects by name or technology..."
              className="w-full p-3.5 pl-10 rounded bg-cyber-slate border border-cyan-500/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <span className="absolute left-3.5 top-3.5 text-cyan-400 font-mono text-sm">🔍</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="flex justify-center items-center h-64 font-mono text-cyan-400 animate-pulse">
            LOADING SECURITY PROJECTS...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 font-mono text-gray-400">
            No security projects found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link to={project.path} key={project.id}>
                <CyberCard
                  title={project.name}
                  subtitle="SECURITY APP"
                  badgeText="ACTIVE"
                  badgeColor="cyan"
                >
                  <p className="text-gray-300 font-mono text-xs line-clamp-4 leading-relaxed">
                    {project.description}
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

export default Projects;
