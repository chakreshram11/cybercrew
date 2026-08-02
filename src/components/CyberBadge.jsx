import React from "react";

function CyberBadge({ text, type = "cyan", className = "" }) {
  const styles = {
    cyan: "bg-cyan-950/70 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(0,243,255,0.2)]",
    green: "bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(0,255,102,0.2)]",
    red: "bg-rose-950/70 text-rose-300 border-rose-500/40 shadow-[0_0_8px_rgba(255,0,85,0.2)]",
    amber: "bg-amber-950/70 text-amber-300 border-amber-500/40 shadow-[0_0_8px_rgba(255,170,0,0.2)]",
    purple: "bg-purple-950/70 text-purple-300 border-purple-500/40 shadow-[0_0_8px_rgba(157,78,221,0.2)]",
    slate: "bg-slate-900 text-gray-300 border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium border uppercase tracking-wider ${
        styles[type] || styles.cyan
      } ${className}`}
    >
      {text}
    </span>
  );
}

export default CyberBadge;
