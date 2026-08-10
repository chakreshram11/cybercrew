import React from "react";
import { useNavigate } from "react-router-dom";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";

const net1 = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348483441_deepnet1.jpg";
const net2 = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348484676_deepnet2.jpg";
const daniel = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348495451_Daniel.jpg";
const arshith = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348491828_Arshith.jpg";
const sri = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348503399_sri_karthik.jpg";

function DeepNetGaurd() {
  const navigate = useNavigate();

  const features = [
    {
      image: net1,
      title: "Real-Time AI Intrusion Detection",
      description:
        "Instantly identifies network intrusions using deep neural network classification, ensuring rapid response to anomalous traffic with minimal latency.",
    },
    {
      image: net2,
      title: "Threat Analytics Dashboard",
      description:
        "Visualizes network activity, packet inspection streams, and attack classification patterns through an intuitive real-time monitoring console.",
    },
  ];

  const team = [
    { name: "Daniel", image: daniel, linkedin: "https://www.linkedin.com/in/daniel-blesson-korukonda-0ba6a8246" },
    { name: "Arshith", image: arshith, linkedin: "https://www.linkedin.com/in/dhuba-arshith-3902a6259/" },
    { name: "Sri Karthik", image: sri, linkedin: "https://www.linkedin.com/in/srikarthikpampana/" },
  ];

  return (
    <section className="w-full bg-cyber-dark text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cyber-grid font-mono">
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

        {/* Header */}
        <div className="text-center mb-12">
          <CyberBadge text="DEEP LEARNING // IDS FIREWALL" type="red" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            DEEPNET GUARDIAN
          </h1>
          <p className="text-gray-300 font-mono text-sm max-w-3xl mx-auto mt-4 leading-relaxed bg-gray-900/80 p-5 rounded border border-cyan-500/30">
            The DeepNet Guardian Framework is a real-time Intrusion Detection System (IDS) developed by Cyber Crew at KIET. Utilizing deep learning models, it classifies network-based APTs and DDoS attacks to protect enterprise infrastructure.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-mono font-bold text-cyan-400 uppercase tracking-wider text-center mb-6">
            INTRUSION DETECTION SYSTEM MODULES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <CyberCard key={index} title={feature.title} badgeText="ACTIVE ENGINE" badgeColor="red" image={feature.image}>
                <p className="text-gray-300 font-mono text-xs leading-relaxed">
                  {feature.description}
                </p>
              </CyberCard>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="cyber-card p-6 sm:p-8 rounded-xl border border-cyan-500/30 mb-12">
          <h2 className="text-xl font-mono font-bold text-white text-center mb-8 uppercase tracking-wider">
            RESEARCH & DEVELOPMENT TEAM
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.2)] mb-3 group-hover:scale-105 transition-transform"
                />
                <h3 className="text-xs font-mono font-bold text-white mb-1 group-hover:text-cyan-300">
                  {member.name}
                </h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                >
                  [LINKEDIN]
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        <div className="text-center">
          <a
            href="https://github.com/gowthamsai117/Vulnerability-Web-Scanner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-bold text-sm uppercase tracking-wider rounded shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
          >
            EXPLORE ON GITHUB →
          </a>
        </div>
      </div>
    </section>
  );
}

export default DeepNetGaurd;
