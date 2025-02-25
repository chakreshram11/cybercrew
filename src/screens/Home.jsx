import React, { useState, useEffect, useMemo } from "react";
// import TextTransition, { presets } from "react-text-transition";
import Background from '../assets/background.jpg';


function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  // Memoized phrases array to avoid unnecessary re-renders
  const phrases = useMemo(
    () => [
      "Explore our amazing content...",
  "Discover more about our services...",
  "Join us and learn more!"
    ],
    []
  );

  useEffect(() => {
    // Typing animation for phrases
    const intervalId = setInterval(() => {
      const currentPhrase = phrases[index];
      setTypedText((prev) => currentPhrase.slice(0, prev.length + 1));

      if (typedText === currentPhrase) {
        // After finishing the current phrase, move to the next one
        setTypedText(""); // Reset typed text for the next phrase
        setIndex((prev) => (prev + 1) % phrases.length); // Loop back to 0 after the last phrase
      }
    }, 150); // Adjust typing speed for phrases

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [typedText, index, phrases]);

  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex items-center px-6 sm:px-12 md:px-20 lg:px-32" 
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white max-w-lg">
        <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Welcome to Cyber Crew
        </h1>
        </div>
        <div>
        <p className="text-base sm:text-lg md:text-xl">
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-cyan-400 animation typing">
            {typedText}
          </span>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
