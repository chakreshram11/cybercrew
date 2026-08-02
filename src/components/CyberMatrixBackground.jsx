import React, { useEffect, useRef } from "react";

function CyberMatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters for digital stream (katakana, numbers, hex)
    const chars = "010101010101ABCDEFGHJKLMNPQRSTUVWXYZ#$@%&*";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

    const draw = () => {
      // Translucent black fade to create trailing effect
      ctx.fillStyle = "rgba(5, 8, 17, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random head character highlighting in bright cyan/emerald
        if (Math.random() > 0.85) {
          ctx.fillStyle = "#00f3ff";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00f3ff";
        } else if (Math.random() > 0.5) {
          ctx.fillStyle = "rgba(0, 255, 102, 0.4)";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "rgba(0, 243, 255, 0.15)";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default CyberMatrixBackground;
