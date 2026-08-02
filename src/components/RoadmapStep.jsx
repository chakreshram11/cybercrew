import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CyberBadge from "./CyberBadge";

const RoadmapStep = ({ step, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  const badgeColors = ["cyan", "green", "purple", "red"];
  const badgeColor = badgeColors[index % badgeColors.length];

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center relative ${
        step.position === "left" ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className="w-full md:w-[46%] px-2 sm:px-4"
      >
        <div className="cyber-card p-6 rounded-xl border border-cyan-500/30 bg-cyber-slate/90 shadow-[0_0_20px_rgba(0,243,255,0.15)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all">
          {/* Top Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
              PHASE 0{index + 1} {"//"} {step.phase || "CURRICULUM"}
            </span>
            <CyberBadge text={step.tier || `TIER ${index + 1}`} type={badgeColor} />
          </div>

          {/* Title */}
          <h4 className="text-xl sm:text-2xl font-mono font-bold text-white mb-2 text-glow-cyan">
            {step.title}
          </h4>

          {/* Description */}
          <p className="text-gray-300 font-mono text-xs sm:text-sm leading-relaxed mb-4">
            {step.desc}
          </p>

          {/* Core Competencies & Topics */}
          {step.topics && (
            <div className="mb-4">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                CORE COMPETENCIES:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {step.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[11px] font-mono text-gray-300"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Certifications Row */}
          <div className="pt-3 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {step.tools && (
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">ESSENTIAL TOOLS:</span>
                <span className="text-cyan-300 font-bold">{step.tools.join(" • ")}</span>
              </div>
            )}

            {step.cert && (
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">TARGET CERTS:</span>
                <span className="text-emerald-400 font-bold">{step.cert}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Center Timeline Node Indicator */}
      <div className="w-12 h-12 rounded-full bg-cyber-dark border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.5)] z-20 my-4 md:my-0 hidden md:flex items-center justify-center relative shrink-0">
        <span className="text-sm font-mono font-bold text-cyan-400">0{index + 1}</span>
        <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-30"></span>
      </div>

      <div className="w-full md:w-[46%]"></div>
    </div>
  );
};

export default RoadmapStep;
