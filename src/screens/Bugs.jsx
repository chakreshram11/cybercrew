import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";

function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/Bug.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch bug.json: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBugs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bugs:", err);
        setLoading(false);
      });
  }, []);

  const filteredBugs = bugs.filter(
    (bug) =>
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-cyber-dark min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 bg-cyber-grid">
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
          <CyberBadge text="VULNERABILITY REPOSITORY" type="red" className="mb-2" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            BUGS WE'VE FOUND
          </h1>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto mt-2">
            Documented vulnerabilities, IDORs, access control flaws, and security exploits identified by Cyber Crew researchers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vulnerabilities by title or keyword..."
              className="w-full p-3.5 pl-10 rounded bg-cyber-slate border border-cyan-500/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <span className="absolute left-3.5 top-3.5 text-cyan-400 font-mono text-sm">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 font-mono text-cyan-400 animate-pulse">
            LOADING VULNERABILITY LOGS...
          </div>
        ) : filteredBugs.length === 0 ? (
          <div className="text-center py-12 font-mono text-gray-400">
            No vulnerability logs found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBugs.map((bug) => (
              <Link to={`/bug/${bug.id}`} key={bug.id || bug.title}>
                <CyberCard
                  title={bug.title}
                  subtitle="SECURITY RECON"
                  badgeText="RESOLVED"
                  badgeColor="green"
                  image={bug.images?.[0]}
                >
                  <p className="text-gray-300 font-mono text-xs line-clamp-3 leading-relaxed mb-3">
                    {bug.description}
                  </p>
                  {bug.students?.length > 0 && (
                    <div className="pt-2 border-t border-gray-800 text-[11px] font-mono text-cyan-300">
                      Founders/Researchers:{" "}
                      <span className="text-white font-semibold">
                        {bug.students.map((s) => s.name).join(", ")}
                      </span>
                    </div>
                  )}
                </CyberCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Bugs;
