import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";
import { FaFilePdf, FaGithub } from "react-icons/fa";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProjectDetails() {
      setLoading(true);
      try {
        // Fetch master team roster for dynamic photo & linkedin lookup
        const { data: teamData } = await supabase.from("cyber_team").select("*");
        const { data: crewData } = await supabase.from("cyber_crew_about").select("*");
        const rosterMap = new Map();
        [...(teamData || []), ...(crewData || [])].forEach((m) => {
          if (m.name) {
            rosterMap.set(m.name.toLowerCase(), {
              photo: m.avatar_url || m.image || m.photo,
              linkedin: m.linkedin_url || m.linkedin,
            });
          }
        });

        const { data } = await supabase
          .from("cyber_projects")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (data) {
          const resolvedTeam = (data.team || []).map((member) => {
            const nameKey = (typeof member === "string" ? member : member.name || "").toLowerCase();
            const rosterInfo = rosterMap.get(nameKey) || {};
            return {
              name: typeof member === "string" ? member : member.name,
              image: (typeof member === "object" && (member.image || member.photo)) || rosterInfo.photo || "/placeholder.jpg",
              linkedin: (typeof member === "object" && (member.linkedin || member.linkedin_url)) || rosterInfo.linkedin || "",
            };
          });

          setProject({
            ...data,
            name: data.title || data.name,
            description: data.description,
            image: data.img_url || data.image,
            images: data.images && data.images.length > 0 ? data.images : data.img_url ? [data.img_url] : [],
            capabilities_heading: data.capabilities_heading || "CORE SCANNING CAPABILITIES",
            capabilities: data.capabilities || [],
            team: resolvedTeam,
          });
        }
      } catch (err) {
        console.error("Error loading project details from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProjectDetails();
    }
  }, [id]);

  const openImageModal = (image) => {
    if (image && image !== "/placeholder.jpg") {
      setSelectedImage(image);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cyber-dark text-cyan-400 font-mono animate-pulse">
        LOADING PROJECT DETAILS...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-cyber-dark text-gray-400 font-mono p-4">
        <h2 className="text-xl text-red-400 font-bold mb-4">[ERROR 404]: PROJECT NOT FOUND</h2>
        <button
          onClick={() => navigate("/projects")}
          className="px-4 py-2 bg-cyan-500 text-gray-950 font-bold rounded hover:bg-cyan-400"
        >
          ← RETURN TO PROJECTS SUITE
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cyber-dark text-white min-h-screen p-4 sm:p-8 bg-cyber-grid font-mono">
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

        {/* Header Section */}
        <div className="text-center mb-10">
          <CyberBadge text={project.category || "AUTOMATED SCANNER // WEB SEC"} type="cyan" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan uppercase">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-gray-300 font-mono text-sm max-w-4xl mx-auto mt-4 leading-relaxed bg-gray-900/80 p-5 rounded border border-cyan-500/30 text-left">
              {project.description}
            </p>
          )}
        </div>

        {/* Core Capabilities Section */}
        {project.capabilities?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-mono font-bold text-cyan-400 uppercase tracking-wider text-center mb-6">
              {project.capabilities_heading || "CORE SCANNING CAPABILITIES"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.capabilities.map((cap, index) => (
                <CyberCard
                  key={index}
                  title={cap.title}
                  badgeText="ACTIVE MODULE"
                  badgeColor="green"
                  image={cap.image || cap.image_url}
                >
                  <p className="text-gray-300 font-mono text-xs leading-relaxed">
                    {cap.description}
                  </p>
                </CyberCard>
              ))}
            </div>
          </div>
        )}

        {/* Project Screenshots Gallery */}
        {project.images?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-mono font-bold text-cyan-400 uppercase tracking-wider text-center mb-6">
              PROJECT SCREENSHOTS & INTERFACE GALLERY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded border border-cyan-500/20 hover:border-cyan-400 transition-colors cursor-pointer"
                  onClick={() => openImageModal(image)}
                >
                  <img
                    src={image}
                    alt={`${project.name} Screenshot ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-cyan-300">
                    [ENLARGE VIEW 🔍]
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Research Team Section */}
        {project.team?.length > 0 && (
          <div className="cyber-card p-6 sm:p-8 rounded-xl border border-cyan-500/30 mb-12">
            <h2 className="text-xl font-mono font-bold text-white text-center mb-8 uppercase tracking-wider">
              PROJECT RESEARCH TEAM
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {project.team.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <img
                    src={member.image || member.photo || "/placeholder.jpg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.2)] mb-3 group-hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => openImageModal(member.image || member.photo)}
                  />
                  <h3 className="text-xs font-mono font-bold text-white mb-1 group-hover:text-cyan-300">
                    {member.name}
                  </h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                    >
                      [LINKEDIN]
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub & PDF Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-bold text-sm uppercase tracking-wider rounded shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
            >
              <FaGithub className="text-base" /> EXPLORE ON GITHUB →
            </a>
          )}

          {project.doc_url && project.doc_url.startsWith("http") && (
            <a
              href={project.doc_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 border border-cyan-500/50 text-cyan-400 font-mono font-bold text-sm uppercase tracking-wider rounded hover:bg-cyan-500 hover:text-gray-950 transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]"
            >
              <FaFilePdf className="text-base" /> TECHNICAL PDF DOC →
            </a>
          )}
        </div>

        {/* Modal for full-screen image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={closeImageModal}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[80vh] object-contain rounded border-2 border-cyan-500/60 shadow-[0_0_30px_rgba(0,243,255,0.4)]"
              />
              <button
                className="absolute top-2 right-2 text-white bg-gray-900 border border-cyan-400 rounded-full w-8 h-8 flex items-center justify-center font-mono hover:bg-cyan-500 hover:text-gray-950 transition-colors"
                onClick={closeImageModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
