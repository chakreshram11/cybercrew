import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CyberTerminalModal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "CYBER CREW INTERACTIVE CLI [Version 2.4.0-RELEASE]" },
    { type: "system", text: "Type 'help' to view available terminal commands." },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmdClean = inputVal.trim();
    if (!cmdClean) return;

    // Add user command entry
    const newHistory = [...history, { type: "user", text: `> ${cmdClean}` }];
    const parts = cmdClean.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let response = [];

    switch (mainCmd) {
      case "help":
        response = [
          { type: "output", text: "AVAILABLE COMMANDS:" },
          { type: "output", text: "  help         - Display this manual" },
          { type: "output", text: "  scan <url>   - Perform simulated security scan on a URL" },
          { type: "output", text: "  bugs         - List security bugs discovered by Cyber Crew" },
          { type: "output", text: "  projects     - List active security projects" },
          { type: "output", text: "  tools        - Navigate to Security Tools page" },
          { type: "output", text: "  crew         - Display Cyber Crew founders and leadership" },
          { type: "output", text: "  status       - Show system firewall & telemetry status" },
          { type: "output", text: "  whoami       - Check clearance level" },
          { type: "output", text: "  clear        - Clear terminal logs" },
          { type: "output", text: "  exit         - Close terminal modal" },
        ];
        break;

      case "scan":
        const target = args[0] || "target-app.local";
        response = [
          { type: "system", text: `[+] INITIATING SYN RECON SCAN ON: ${target}...` },
          { type: "output", text: "  [1/4] Port 80 (HTTP) ........ OPEN" },
          { type: "output", text: "  [2/4] Port 443 (HTTPS) ....... OPEN [TLS 1.3]" },
          { type: "output", text: "  [3/4] Port 22 (SSH) .......... FILTERED" },
          { type: "output", text: "  [4/4] Checking headers ....... MISSING CSP & HSTS" },
          { type: "emerald", text: "[✔] SCAN COMPLETE: 2 low risk findings detected. System posture stable." },
        ];
        break;

      case "bugs":
        response = [
          { type: "output", text: "DISCOVERED VULNERABILITIES & BUGS:" },
          { type: "amber", text: "  [CRITICAL] IDOR in User Profile - KIET Portal" },
          { type: "amber", text: "  [HIGH] Stored XSS in Comment System" },
          { type: "amber", text: "  [HIGH] Broken Access Control in Admin Endpoint" },
          { type: "output", text: "Type 'bugs' page link or navigate to /bugs for full reports." },
        ];
        break;

      case "projects":
        response = [
          { type: "output", text: "CYBER CREW PROJECTS:" },
          { type: "cyan", text: "  1. WebScanner         - Automated Web Vulnerability Finder" },
          { type: "cyan", text: "  2. Encrypto Web       - AI-Powered Threat Analysis" },
          { type: "cyan", text: "  3. Emoji Cipher       - Cryptographic Emoji Encrypter" },
          { type: "cyan", text: "  4. DeepNetGuard       - Enterprise Network Firewall" },
          { type: "cyan", text: "  5. Secure Hospital Net - HIPAA Compliant Cisco Topology" },
        ];
        break;

      case "tools":
        navigate("/tools");
        onClose();
        return;

      case "crew":
        response = [
          { type: "cyan", text: "FOUNDERS: S. Ajay & Dhanush" },
          { type: "output", text: "MENTOR: Durga Bhavani (IIIT)" },
          { type: "output", text: "COORDINATOR: S.N.S. Somesh" },
          { type: "emerald", text: "STATUS: Active Student Security Team @ KIET" },
        ];
        break;

      case "status":
        response = [
          { type: "emerald", text: "FIREWALL: ACTIVE [0 DRIPPED PACKETS]" },
          { type: "cyan", text: "DEFCON: LEVEL 4 (NORMAL READINESS)" },
          { type: "output", text: "LATENCY: 12ms | UPTIME: 99.98%" },
        ];
        break;

      case "whoami":
        response = [
          { type: "cyan", text: "USER CLEARANCE: GUEST_ETHICAL_HACKER" },
          { type: "output", text: "IP ADDRESS: 127.0.0.1 (LOCAL_LOOPBACK)" },
        ];
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        response = [
          { type: "rose", text: `Command not recognized: '${mainCmd}'. Type 'help' for manual.` },
        ];
        break;
    }

    setHistory([...newHistory, ...response]);
    setInputVal("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-cyber-dark border border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.25)] flex flex-col overflow-hidden h-[32rem]">
        {/* Terminal Header Bar */}
        <div className="bg-gray-900 px-4 py-3 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose}></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="ml-3 font-mono text-xs font-bold text-cyan-400">
              root@cybercrew-terminal:~#
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-cyan-400 font-mono text-sm px-2 py-0.5 rounded hover:bg-gray-800"
          >
            [ESC / CLOSE]
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-2 bg-cyber-dark text-gray-200">
          {history.map((item, index) => {
            let color = "text-gray-300";
            if (item.type === "system") color = "text-cyan-400 font-bold";
            if (item.type === "user") color = "text-cyan-300 font-semibold";
            if (item.type === "emerald") color = "text-emerald-400 font-bold";
            if (item.type === "amber") color = "text-amber-400";
            if (item.type === "rose") color = "text-rose-400";
            if (item.type === "cyan") color = "text-cyan-300";

            return (
              <div key={index} className={color}>
                {item.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommand} className="bg-gray-900 border-t border-cyan-500/30 p-3 flex items-center gap-2">
          <span className="text-cyan-400 font-mono font-bold text-sm">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none placeholder-gray-600"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded bg-cyan-500 text-gray-950 font-mono font-bold text-xs uppercase hover:bg-cyan-400 transition-colors"
          >
            RUN
          </button>
        </form>
      </div>
    </div>
  );
}

export default CyberTerminalModal;
