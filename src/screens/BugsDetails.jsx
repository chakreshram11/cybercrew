import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { supabase } from "../lib/supabase";
import CyberBadge from "../components/CyberBadge";

function BugsDetails() {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBugDetails() {
      setLoading(true);
      setError(null);

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
          .from("cyber_bugs")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (data) {
          const resolvedStudents = (data.students || []).map((student) => {
            const nameKey = (typeof student === "string" ? student : student.name || "").toLowerCase();
            const rosterInfo = rosterMap.get(nameKey) || {};
            return {
              name: typeof student === "string" ? student : student.name,
              photo: (typeof student === "object" && student.photo) || rosterInfo.photo || "/placeholder.jpg",
              linkedin: (typeof student === "object" && (student.linkedin || student.linkedin_url)) || rosterInfo.linkedin || "",
            };
          });

          setBug({
            ...data,
            description: data.details || data.description,
            content: data.details || data.content || data.description,
            images: data.images && data.images.length > 0 ? data.images : data.image_url ? [data.image_url] : [],
            students: resolvedStudents,
            date: data.date || data.created_at,
          });
        } else {
          setError(`Vulnerability Advisory with ID "${id}" not found.`);
        }
      } catch (err) {
        console.error("Error fetching bug details:", err);
        setError("Failed to load vulnerability details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBugDetails();
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-cyber-dark text-cyan-400 font-mono animate-pulse">
        LOADING VULNERABILITY REPORT...
      </div>
    );

  if (error || !bug)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-cyber-dark text-rose-400 font-mono p-4">
        <p className="mb-4 font-bold">{error || "Vulnerability Report Not Found"}</p>
        <button
          onClick={() => navigate("/bugs")}
          className="px-4 py-2 bg-cyan-500 text-gray-950 font-bold rounded hover:bg-cyan-400"
        >
          ← RETURN TO BUGS LIST
        </button>
      </div>
    );

  return (
    <div className="bg-cyber-dark text-white min-h-screen p-4 sm:p-8 bg-cyber-grid font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-slate border border-cyan-500/40 text-cyan-400 font-mono font-bold rounded shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:bg-cyan-950 hover:border-cyan-400 transition-all text-xs"
            aria-label="Go back"
          >
            ← BACK
          </button>
        </div>

        <article className="cyber-card p-6 sm:p-10 rounded-xl border border-rose-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <CyberBadge text="VULNERABILITY REPORT // LOG" type="red" />
            <CyberBadge text={`STATUS: ${bug.status || "RESOLVED & PATCHED"}`} type="green" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan leading-tight mb-3">
            {bug.title || "Untitled Vulnerability"}
          </h1>

          <p className="text-xs font-mono text-gray-400 mb-6 pb-4 border-b border-gray-800">
            DISCOVERY DATE:{" "}
            <span className="text-cyan-300 font-bold">
              {bug.date
                ? new Date(bug.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </span>
          </p>

          {/* Proof of Concept Screenshots Gallery */}
          {bug.images?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4">
                PROOFS OF CONCEPT & SCREENSHOTS:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bug.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded border border-cyan-500/20 hover:border-cyan-400 transition-colors cursor-pointer"
                    onClick={() => openImageModal(image)}
                  >
                    <img
                      src={image || "/placeholder.jpg"}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-cyan-300">
                      [ENLARGE POC 🔍]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bug Details Content / Markdown */}
          <section className="text-sm sm:text-base text-gray-200 leading-relaxed font-mono space-y-4 mb-8 bg-gray-900/80 p-5 rounded border border-gray-800">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              VULNERABILITY DETAILS & IMPACT ANALYSIS:
            </h3>
            {bug.content ? (
              <Markdown>{bug.content}</Markdown>
            ) : (
              <p className="text-gray-300 leading-relaxed">{bug.description}</p>
            )}
          </section>

          {/* Contributors / Security Researchers */}
          {bug.students?.length > 0 && (
            <div className="pt-6 border-t border-gray-800">
              <h2 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4">
                SECURITY RESEARCHERS & CONTRIBUTORS:
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {bug.students.map((student, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-3 rounded bg-gray-900 border border-gray-800 hover:border-cyan-500/40 transition-colors"
                  >
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover border border-cyan-500/40 mb-2 cursor-pointer"
                      onClick={() => openImageModal(student.photo)}
                    />
                    <span className="text-xs font-mono font-bold text-white mb-1">
                      {student.name}
                    </span>
                    {student.linkedin && (
                      <a
                        href={student.linkedin}
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
        </article>

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

export default BugsDetails;
