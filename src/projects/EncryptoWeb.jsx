import React from "react";
import { useNavigate } from "react-router-dom";
import CyberCard from "../components/CyberCard";
import CyberBadge from "../components/CyberBadge";

import chitti from "../linkedin images/chittibabu.jpg";
import priya from "../linkedin images/priya.jpg";
import gopi from "../linkedin images/GOPI.jpeg";
import sai from "../linkedin images/Sai.jpg";
import chakresh from "../linkedin images/chakresh.png";
import Harsha from "../linkedin images/Harsha.jpg";
import crypto1 from "../assets/crypto1.jpg";
import crypto2 from "../assets/crypto2.jpg";
import crypto3 from "../assets/crypto3.jpg";
import crypto4 from "../assets/crypto4.jpg";

function EncryptoWeb() {
  const navigate = useNavigate();

  const features = [
    {
      image: crypto3,
      title: "Cipher Encryption & Decryption",
      description:
        "Securely encrypt and decrypt data using advanced cipher algorithms like AES and RSA, ensuring robust protection for sensitive information.",
    },
    {
      image: crypto4,
      title: "AI-Powered Chatbot",
      description:
        "Interact with an intelligent chatbot that guides users through encryption processes, answers queries, and provides real-time security tips.",
    },
    {
      image: crypto1,
      title: "Strong Password Generator",
      description:
        "Generate complex, uncrackable passwords with our Linux-based tool, customizable for length and character types to enhance security.",
    },
    {
      image: crypto2,
      title: "Subdomain Finder",
      description:
        "Discover hidden subdomains of target websites efficiently, aiding penetration testers and security researchers in vulnerability assessments.",
    },
  ];

  const team = [
    { name: "Chakresh", image: chakresh, linkedin: "https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256" },
    { name: "Sai", image: sai, linkedin: "https://www.linkedin.com/in/sri-naga-durga-sai-dangeti-2a7919272" },
    { name: "Gopal Rao", image: gopi, linkedin: "https://www.linkedin.com/in/podiya-gopala-rao-06a722329" },
    { name: "Chitti Babu", image: chitti, linkedin: "https://www.linkedin.com/in/chittibabu-bavisetti-6a444525b" },
    { name: "Harsha", image: Harsha, linkedin: "https://www.linkedin.com/in/harsha-bala-subrahmanyam-dora-b0b789288" },
    { name: "Priya", image: priya, linkedin: "https://www.linkedin.com/in/puchala-priya-29229a289" },
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
          <CyberBadge text="CRYPTOGRAPHY & AI // RECON" type="green" className="mb-3" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            ENCRYPTOWEB
          </h1>
          <p className="text-gray-300 font-mono text-sm max-w-3xl mx-auto mt-4 leading-relaxed bg-gray-900/80 p-5 rounded border border-cyan-500/30">
            EncryptoWeb is a cutting-edge cybersecurity platform offering cipher encryption and decryption, an AI-powered chatbot, and Linux-based tools like password generators and subdomain reconnaissance finders.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-mono font-bold text-cyan-400 uppercase tracking-wider text-center mb-6">
            CORE MODULES & FEATURES
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
            DEVELOPMENT TEAM
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
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
            href="https://github.com/chakreshram11/Kill_project"
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

export default EncryptoWeb;
