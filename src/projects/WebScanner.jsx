import React from "react";
import { useNavigate } from "react-router-dom";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";
const Webscanner = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/assets/1786348491517_Webscanner.png";
const Pradeep = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348499337_Pradeep.jpg";
const Sanjay = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348501914_Sanjay.jpg";
const Thabitha = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348504515_Thabitha.jpg";
const sahithya = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348500699_Sahithya.jpg";
const Gowtham = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348497854_Gowtham.jpg";
const jyothi = "https://hrbyhgmhjswugkmeuzdt.supabase.co/storage/v1/object/public/cybercrew-assets/team/1786348498687_Jyothi.jpg";

function WebScanner() {
  const navigate = useNavigate();

  const features = [
    {
      image: Webscanner,
      title: "Vulnerability Scanning Engine",
      description:
        "Performs automated, real-time scans to detect web application vulnerabilities like XSS, SQLi, and security misconfigurations.",
    },
  ];

  const team = [
    { name: "Gowtham", image: Gowtham, linkedin: "https://www.linkedin.com/in/gowtham-satya-sai-m" },
    { name: "Pradeep", image: Pradeep, linkedin: "https://www.linkedin.com/in/gopisetti-pradeep-5aa4a0250" },
    { name: "Sanjay", image: Sanjay, linkedin: "https://www.linkedin.com/in/mudigondasanjay" },
    { name: "Jyothi", image: jyothi, linkedin: "https://www.linkedin.com/in/telegareddy-jyothirmai-686750286" },
    { name: "Thabitha", image: Thabitha, linkedin: "https://www.linkedin.com/in/thabitha-gogulamanda-3a3960288" },
    { name: "Naga Lakshmi", image: sahithya, linkedin: "https://www.linkedin.com/in/siramalasiramala" },
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
          <CyberBadge text="AUTOMATED SCANNER // WEB SEC" type="cyan" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            WEBSCANNER
          </h1>
          <p className="text-gray-300 font-mono text-sm max-w-3xl mx-auto mt-4 leading-relaxed bg-gray-900/80 p-5 rounded border border-cyan-500/30">
            WebScanner is an advanced cybersecurity tool designed to identify vulnerabilities in web applications. Leveraging cutting-edge scanning algorithms, it detects XSS, SQL injection, and header misconfigurations to empower developers with immediate remediation data.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-mono font-bold text-cyan-400 uppercase tracking-wider text-center mb-6">
            CORE SCANNING CAPABILITIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <CyberCard key={index} title={feature.title} badgeText="ACTIVE MODULE" badgeColor="green" image={feature.image}>
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
            PROJECT RESEARCH TEAM
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
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

export default WebScanner;
