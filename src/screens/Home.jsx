import React, { useState, useEffect, useMemo } from "react";
import Logo from "../assets/cybercrewlogo.png";
import "swiper/css";
import "swiper/css/autoplay";


function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  const phrases = useMemo(
    () => [
      "Where Innovation Meets Protection",
    ],
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentPhrase = phrases[index];
      setTypedText((prev) => currentPhrase.slice(0, prev.length + 1));

      if (typedText === currentPhrase) {
        setTypedText("");
        setIndex((prev) => (prev + 1) % phrases.length);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, [typedText, index, phrases]);

  return (
    <>
<div className="bg-gray-900 min-h-screen flex flex-col items-center">
  {/* Full-Width Image Scroller */}

  {/* Main Content with Logo and Typing Animation */}
  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-6 mt-20">
    
    {/* Left: Logo (30%) */}
    <div className="flex-[0.3] flex justify-center">
    <img 
      src={Logo} 
      alt="Cyber Crew Logo" 
      className="h-56 md:h-72 lg:h-80 max-w-full object-contain transition-transform duration-300 hover:scale-105"
    />
    </div>

    {/* Right: Typing Animation (70%) */}
    <div className="flex-[0.7] text-white text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to <span style={{ fontFamily: 'RachelaClaudie' }}> Cyber Crew </span></h1>
      <p className="text-xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mt-9">{typedText}</p>
    </div>
  </div>
  </div>
  <div className="w-full bg-gray-800 text-white flex flex-col items-center">
  <div className="max-w-4xl text-center p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Cyber Crew was founded by two innovative students, <span className="text-white font-semibold">Ajay</span> and <span className="text-white font-semibold">Dhanush</span>,
          with a vision to develop and nurture cybersecurity enthusiasts within our branch.
          Our mission is to provide a collaborative learning environment where students passionate about 
          cybersecurity can explore, research, and gain hands-on experience in various security domains.
        </p>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4">
          Beyond learning, we are committed to spreading awareness about cybersecurity threats, ethical hacking,
          and digital safety through workshops, events, and awareness programs within our college.
          Together, we aim to build a secure digital future while continuously expanding our knowledge.
        </p>
      </div>
</div>
</>

  );
}

export default Home;
