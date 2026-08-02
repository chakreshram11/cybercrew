import React from "react";

function CyberCard({
  children,
  className = "",
  badgeText = "SECURE",
  badgeColor = "cyan", // cyan, green, red, amber, purple
  title,
  subtitle,
  image,
  onClick,
}) {
  const badgeClasses = {
    cyan: "bg-cyan-950/80 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(0,243,255,0.2)]",
    green: "bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(0,255,102,0.2)]",
    red: "bg-rose-950/80 text-rose-400 border-rose-500/50 shadow-[0_0_10px_rgba(255,0,85,0.2)]",
    amber: "bg-amber-950/80 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(255,170,0,0.2)]",
    purple: "bg-purple-950/80 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(157,78,221,0.2)]",
  };

  const dotClasses = {
    cyan: "bg-cyan-400 animate-pulse",
    green: "bg-emerald-400 animate-pulse",
    red: "bg-rose-500 animate-ping",
    amber: "bg-amber-400 animate-pulse",
    purple: "bg-purple-400 animate-pulse",
  };

  return (
    <div
      onClick={onClick}
      className={`cyber-card group relative flex flex-col overflow-hidden p-5 rounded-lg border border-cyan-500/20 bg-cyber-slate/90 hover:border-cyan-400/60 transition-all duration-300 ${className}`}
    >
      {/* Top Laser Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Tech Corner Marker Overlays */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400/60"></div>
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400/60"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400/60"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400/60"></div>

      {/* Image Preview Container if image is provided */}
      {image && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded border border-gray-800 group-hover:border-cyan-500/40 transition-colors">
          <img
            src={image}
            alt={title || "Card preview"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-slate via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity"></div>
        </div>
      )}

      {/* Top Header Row with Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {subtitle && (
          <span className="text-xs font-mono tracking-wider text-cyan-400/80 uppercase">
            {subtitle}
          </span>
        )}
        {badgeText && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-full border ${
              badgeClasses[badgeColor] || badgeClasses.cyan
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[badgeColor] || dotClasses.cyan}`}></span>
            {badgeText}
          </div>
        )}
      </div>

      {/* Card Title */}
      {title && (
        <h3 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
      )}

      {/* Body Content */}
      <div className="flex-1 text-gray-300 text-sm leading-relaxed">
        {children}
      </div>

      {/* Bottom Scan Beam Highlight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default CyberCard;
