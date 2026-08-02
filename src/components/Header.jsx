import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CyberTerminalModal from "./CyberTerminalModal";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const location = useLocation();

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "ABOUT", path: "/about" },
    { label: "BLOGS", path: "/blogs" },
    { label: "BUGS", path: "/bugs" },
    { label: "PROJECTS", path: "/projects" },
    { label: "TOOLS", path: "/tools" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-cyber-dark/85 backdrop-blur-md text-white border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8 py-3.5">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f3ff]"></span>
              <span
                className="text-white text-2xl font-bold tracking-wider font-mono group-hover:text-cyan-400 transition-colors"
                style={{ fontFamily: "RachelaClaudie" }}
              >
                Cyber Crew
              </span>
            </Link>

            {/* System Status Indicator Pill */}
            <div className="hidden lg:flex items-center gap-1.5 ml-4 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              STATUS: ONLINE
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center">
            <ul className="flex space-x-6 lg:space-x-8 text-sm font-mono font-bold tracking-wider">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`transition-all duration-200 py-1 border-b-2 ${
                        isActive
                          ? "text-cyan-400 border-cyan-400 text-glow-cyan"
                          : "text-gray-300 border-transparent hover:text-cyan-300 hover:border-cyan-500/40"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Terminal & Login Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-slate border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold hover:bg-cyan-950 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all duration-200"
              title="Open Cyber Terminal CLI"
            >
              <span className="text-emerald-400 font-bold">{">_"}</span> CLI TERMINAL
            </button>

            <Link to="/login">
              <button className="cyber-button bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono font-bold text-xs py-1.5 px-4 rounded transition-all duration-200 shadow-[0_0_12px_rgba(0,243,255,0.3)]">
                LOGIN
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="p-1.5 text-xs font-mono font-bold text-cyan-400 bg-cyber-slate border border-cyan-500/40 rounded"
            >
              {">_"} CLI
            </button>
            <button
              className="text-white text-2xl focus:outline-none p-1"
              aria-label="Toggle Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div
          className={`md:hidden fixed top-16 left-0 w-full bg-cyber-dark/95 border-b border-cyan-500/30 p-6 transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 font-mono font-bold">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-gray-200 hover:text-cyan-400 text-base"
                  onClick={handleMenuClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/login" onClick={handleMenuClose}>
                <button className="cyber-button bg-cyan-500 text-gray-950 font-mono font-bold py-2 px-6 rounded text-sm">
                  LOGIN PORTAL
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Terminal CLI Modal */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </>
  );
}

export default Header;

