import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/cybercrewlogo.png";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const phrases = useMemo(() => ["Where Innovation Meets Protection"], []);

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

  useEffect(() => {
    fetch("/Blogs.json") // Fetch from JSON file
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-6 mt-20">
    <div className="flex-[0.3] flex justify-center">
      <img
        src={Logo}
        alt="Cyber Crew Logo"
        className="h-72 md:h-80 lg:h-96 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>

    <div className="flex-[0.7] text-white text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-serif">
        WELCOME TO CYBER CREW
      </h1>
      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mt-9">
        {typedText}
      </p>
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

      {/* Blog Section */}
          <div className="w-full bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-8">Latest Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="block">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 cursor-pointer">
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
              </div>
              <h3 className="text-2xl font-semibold text-white mt-4 mb-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{blog.description}</p>
              <span className="inline-flex items-center text-cyan-400 mt-4 font-semibold transition-all hover:text-cyan-300">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;
