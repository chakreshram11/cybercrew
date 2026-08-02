import React from "react";

function GlitchText({ text, className = "", tag: Tag = "h1" }) {
  return (
    <Tag className={`relative inline-block font-bold tracking-tight text-white group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 -ml-[2px] text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-glitch z-0 clip-path-glitch-1"
        style={{ textShadow: "2px 0 #ff0055" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 ml-[2px] text-emerald-400 opacity-0 group-hover:opacity-70 group-hover:animate-glitch z-0 clip-path-glitch-2"
        style={{ textShadow: "-2px 0 #00f3ff" }}
      >
        {text}
      </span>
    </Tag>
  );
}

export default GlitchText;
