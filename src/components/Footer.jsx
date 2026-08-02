import React from "react";
import { Link } from "react-router-dom";
import CyberBadge from "./CyberBadge";

function Footer() {
  return (
    <footer className="w-full bg-cyber-dark text-gray-400 border-t border-cyan-500/20 py-10 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 font-mono">
        {/* Col 1: Brand & Status */}
        <div className="md:col-span-1">
          <Link to="/" className="text-white text-2xl font-bold font-mono tracking-wider text-glow-cyan">
            CYBER CREW
          </Link>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            KIET Student Cybersecurity & Ethical Hacking Association. Decoding security, building defenses, and fostering awareness.
          </p>
          <div className="mt-3 inline-flex items-center gap-2">
            <CyberBadge text="ENCRYPTION: AES-256" type="cyan" />
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
            EXPLORE PORTAL
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about" className="hover:text-cyan-300 transition-colors">
                › ABOUT CYBER CREW
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-cyan-300 transition-colors">
                › SECURITY PROJECTS
              </Link>
            </li>
            <li>
              <Link to="/bugs" className="hover:text-cyan-300 transition-colors">
                › DISCOVERED BUGS
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-cyan-300 transition-colors">
                › TECH BLOGS & GUIDES
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Cyber Security Tools */}
        <div>
          <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
            SECURITY TOOLS
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/tools" className="hover:text-emerald-400 transition-colors">
                › PASSWORD ENTROPY TESTER
              </Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-emerald-400 transition-colors">
                › BASE64 / ROT13 ENCODER
              </Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-emerald-400 transition-colors">
                › SHA-256 HASH GENERATOR
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                › REPORT A VULNERABILITY
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Telemetry & Socials */}
        <div>
          <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
            CONNECT & LOCATION
          </h4>
          <p className="text-xs text-gray-400 mb-2">
            KIET Group of Institutions, Korangi, Andhra Pradesh
          </p>
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://linkedin.com/company/kiet-cybercrew"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-gray-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-gray-950 transition-all text-xs font-bold"
            >
              LINKEDIN
            </a>
            <a
              href="mailto:cyberkiet24@gmail.com"
              className="p-2 rounded bg-gray-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-gray-950 transition-all text-xs font-bold"
            >
              EMAIL
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500">
        <p>© {new Date().getFullYear()} CYBER CREW. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 sm:mt-0 text-cyan-500/70">
          SYSTEM_VERSION v2.4 // FIREWALL: PROTECTED
        </p>
      </div>
    </footer>
  );
}

export default Footer;

