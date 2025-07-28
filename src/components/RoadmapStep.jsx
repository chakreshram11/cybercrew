import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const RoadmapStep = ({ step, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15,
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

  return (
    <div
      className={`flex flex-col md:flex-row items-center ${
        step.position === "left" ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="md:w-1/2 px-6 text-right md:text-left"
      >
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 transition duration-300">
          <h4 className="text-lg sm:text-xl font-semibold text-cyan-300">
            {index + 1}. {step.title}
          </h4>
          <p className="text-gray-300 mt-2">{step.desc}</p>
        </div>
      </motion.div>

      {/* Timeline dot */}
      <div className="w-10 h-10 rounded-full bg-cyan-500 border-4 border-white z-10 mx-4 hidden md:flex items-center justify-center">
        <span className="text-sm font-bold text-gray-900">{index + 1}</span>
      </div>

      <div className="md:w-1/2"></div>
    </div>
  );
};

export default RoadmapStep;