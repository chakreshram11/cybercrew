import React from "react";

function LiveThreatTicker() {
  const tickerItems = [
    { label: "SYSTEM STATUS", val: "ALL FIREWALLS OPERATIONAL", color: "text-emerald-400" },
    { label: "ACTIVE VULN DISCOVERIES", val: "14 BUGS LOGGED & RESOLVED", color: "text-cyan-400" },
    { label: "THREAT LEVEL", val: "DEFCON 4 • STABLE", color: "text-emerald-400" },
    { label: "ENCRYPTION STANDARD", val: "AES-256-GCM / RSA-4096", color: "text-purple-400" },
    { label: "RECENT ALERT", val: "SQLi & XSS VULNERABILITIES DETECTED ON PORT 8080", color: "text-rose-400" },
    { label: "CLUB COMMUNITY", val: "KIET CYBER CREW ACADEMY", color: "text-amber-400" },
  ];

  return (
    <div className="w-full bg-cyber-dark/90 border-y border-cyan-500/20 py-2.5 px-4 overflow-hidden relative backdrop-blur-md z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Live Indicator Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-cyber-slate border border-cyan-500/40 px-3 py-1 rounded text-xs font-mono font-bold text-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          SEC_FEED // LIVE
        </div>

        {/* Ticker Content */}
        <div className="overflow-hidden w-full relative flex items-center">
          <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap flex items-center gap-8 text-xs font-mono">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2">
                <span className="text-gray-400 font-semibold">{item.label}:</span>
                <span className={`font-bold ${item.color}`}>{item.val}</span>
                <span className="text-cyan-500/40 ml-4">{"///"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveThreatTicker;
