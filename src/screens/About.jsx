import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RoadmapStep from "../components/RoadmapStep";
import CyberBadge from "../components/CyberBadge";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Import team images
import team1 from "../assets/blog1-1.jpeg";
import team2 from "../assets/blog2-1.jpg";
import team3 from "../assets/blog3-1.jpg";
import team4 from "../assets/groupphoto.jpg";

function About() {
  const navigate = useNavigate();
  const [activeTier, setActiveTier] = useState(null);

  const roadmapSteps = [
    {
      phase: "FOUNDATIONS & NETWORKING",
      tier: "TIER 1 // ENTRY LEVEL",
      title: "Core IT Foundations & Linux Mastery",
      desc: "Establish fundamental knowledge in computer networking architectures, operating system internals, command-line administration, and security principles.",
      topics: [
        "OSI Model & TCP/IP Protocol Stack",
        "Linux CLI & Bash Scripting",
        "Python Automation for Security",
        "Cryptography & SSL/TLS Basics",
        "Hardware & System Architecture",
      ],
      tools: ["Linux / Terminal", "Wireshark", "Python", "Git"],
      cert: "CompTIA Security+ / Network+",
      position: "left",
    },
    {
      phase: "WEB SEC & RECONNAISSANCE",
      tier: "TIER 2 // INTERMEDIATE",
      title: "Vulnerability Analysis & Web Security",
      desc: "Master offensive recon techniques, web application penetration testing, OWASP Top 10 vulnerabilities, and security auditing frameworks.",
      topics: [
        "OWASP Top 10 (SQLi, XSS, CSRF, IDOR)",
        "Active & Passive Port Scanning",
        "Directory Enumeration & Subdomain Recon",
        "HTTP Request Manipulation",
        "CTF Basics (TryHackMe / PicoCTF)",
      ],
      tools: ["Burp Suite Pro", "Nmap", "Gobuster", "Hydra"],
      cert: "eJPT / CEH Practical",
      position: "right",
    },
    {
      phase: "EXPLOITATION & REVERSE ENG",
      tier: "TIER 3 // ADVANCED",
      title: "Exploit Development & Binary Analysis",
      desc: "Deep dive into x86/x64 assembly, memory corruption vulnerabilities, binary reverse engineering, and automated exploit scripting.",
      topics: [
        "Buffer Overflows & Shellcode Crafting",
        "Disassembly with Ghidra & IDA Free",
        "Network Packet Crafting & Spoofing",
        "Privilege Escalation (Linux & Windows)",
        "Malware Behavior Analysis",
      ],
      tools: ["Ghidra", "Metasploit", "gdb / pwntools", "Impacket"],
      cert: "OSCP (OffSec Certified)",
      position: "left",
    },
    {
      phase: "RED TEAMING & THREAT RESEARCH",
      tier: "TIER 4 // EXPERT",
      title: "Red Team Ops & Bug Bounty Research",
      desc: "Conduct real-world penetration testing, enterprise Active Directory exploitation, active bug bounty hunting, and contribute security research to the community.",
      topics: [
        "Active Directory Attacks (Kerberoasting, DCSync)",
        "EDR / Antivirus Evasion Tactics",
        "Bug Bounty Hunting on HackerOne / Bugcrowd",
        "Responsible Vulnerability Disclosure",
        "Security Advisory Publishing & Mentorship",
      ],
      tools: ["BloodHound", "Cobalt Strike", "Covenant", "Burp Enterprise"],
      cert: "OSEP / CRTO / CISSP",
      position: "right",
    },
  ];

  const filteredSteps = activeTier
    ? roadmapSteps.filter((s, idx) => idx === activeTier - 1)
    : roadmapSteps;

  return (
    <section className="w-full min-h-screen bg-cyber-dark text-white flex flex-col bg-cyber-grid relative font-mono">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-cyber-slate border border-cyan-500/40 text-cyan-400 font-mono font-bold rounded shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:bg-cyan-950 hover:border-cyan-400 transition-all text-xs"
          aria-label="Go back"
        >
          ← BACK
        </button>
      </div>

      {/* Image Scroller */}
      <div className="w-full max-w-[100vw] overflow-hidden border-b border-cyan-500/20">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          speed={1200}
          effect="fade"
          modules={[Autoplay, EffectFade]}
          className="w-full h-64 sm:h-96 lg:h-[32rem]"
          dir="rtl"
        >
          {[
            { src: team1, alt: "Cyber Crew Event 1" },
            { src: team2, alt: "Cyber Crew Event 2" },
            { src: team3, alt: "Cyber Crew Event 3" },
            { src: team4, alt: "Cyber Crew Event 4" },
          ].map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/40 via-transparent to-cyber-dark"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Club Introduction */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <CyberBadge text="COMMUNITY & VISION" type="cyan" className="mb-3" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-cyan-400 mb-6 text-glow-cyan">
          ABOUT CYBER CREW
        </h2>
        <p className="text-base sm:text-lg text-gray-300 font-mono leading-relaxed max-w-3xl mx-auto">
          Welcome to Cyber Crew – where innovation meets digital protection.
        </p>

        <div className="my-8 p-6 sm:p-8 rounded-xl bg-cyber-slate/90 border border-cyan-500/30 text-left font-mono space-y-4 shadow-[0_0_20px_rgba(0,243,255,0.15)]">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Cyber Crew was founded by <span className="text-cyan-400 font-bold">Ajay</span> and <span className="text-cyan-400 font-bold">Dhanush</span>, two passionate final-year security students who shared a vision to build a community dedicated to cybersecurity research and hands-on vulnerability analysis.
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Guided by <span className="text-emerald-400 font-bold">Durga Bhavani</span> (mentor from IIIT), Cyber Crew has grown into KIET's flagship security association. Ajay is currently continuing security research at IIIT, while Dhanush serves as a Security Professional at Wipro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-10">
          <div className="cyber-card p-6">
            <CyberBadge text="OUR MISSION" type="green" className="mb-2" />
            <h3 className="text-xl font-mono font-bold text-white mb-2">PRACTICAL DEFENSES</h3>
            <p className="text-gray-300 font-mono text-xs leading-relaxed">
              Empowering students to excel in ethical hacking, web application penetration testing, reverse engineering, and threat intelligence.
            </p>
          </div>

          <div className="cyber-card p-6">
            <CyberBadge text="OUR VISION" type="purple" className="mb-2" />
            <h3 className="text-xl font-mono font-bold text-white mb-2">CYBER AWARENESS</h3>
            <p className="text-gray-300 font-mono text-xs leading-relaxed">
              Making security knowledge accessible through interactive workshops, CTF competitions, and bug bounty initiatives across academic institutions.
            </p>
          </div>
        </div>
      </div>

      {/* Cyber Crew Professional Roadmap Section */}
      <div className="bg-cyber-slate/90 py-16 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 text-center mb-10">
          <CyberBadge text="PROFESSIONAL CURRICULUM" type="amber" className="mb-2" />
          <h3 className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 text-glow-cyan">
            CYBERSECURITY SKILL ROADMAP
          </h3>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto mt-2">
            A structured 4-tier cybersecurity pathway designed to take members from basic IT foundations to advanced Red Teaming & Security Research.
          </p>

          {/* Interactive Tier Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTier(null)}
              className={`px-4 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
                activeTier === null
                  ? "bg-cyan-500 text-gray-950 shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-cyan-500/40"
              }`}
            >
              ALL PHASES
            </button>
            {roadmapSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTier(idx + 1)}
                className={`px-4 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
                  activeTier === idx + 1
                    ? "bg-cyan-500 text-gray-950 shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                    : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-cyan-500/40"
                }`}
              >
                TIER 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Vertical Beam Center Line */}
          <div className="absolute left-1/2 top-0 h-full border-l-2 border-cyan-500/40 transform -translate-x-1/2 z-0 hidden md:block" />

          <div className="space-y-12 relative z-10">
            {filteredSteps.map((step, index) => (
              <RoadmapStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
