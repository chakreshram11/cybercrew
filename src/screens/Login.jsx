import React from "react";
import { Link } from "react-router-dom";
import CyberBadge from "../components/CyberBadge";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-cyber-dark text-white p-6 bg-cyber-grid font-mono">
      <div className="cyber-card p-8 rounded-xl border border-cyan-500/40 text-center max-w-md w-full shadow-[0_0_30px_rgba(0,243,255,0.2)]">
        <CyberBadge text="CLEARANCE LEVEL 4" type="amber" className="mb-4" />
        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 mb-2 text-glow-cyan">
          MEMBER AUTHENTICATION
        </h1>
        <div className="w-12 h-1 bg-cyan-400 mx-auto mb-4 rounded-full"></div>

        <p className="text-sm text-gray-300 mb-3">
          Cyber Crew member & admin clearance portal is undergoing security upgrades. 🚀
        </p>

        <p className="text-xs text-gray-500 mb-6 border-t border-b border-gray-800 py-3">
          SECURITY NOTICE: Unauthorized access attempts are monitored and logged to system telemetry.
        </p>

        <Link to="/">
          <button className="cyber-button bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-bold py-2.5 px-6 rounded text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all">
            RETURN TO HOMEPAGE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;

