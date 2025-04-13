import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/cybercrewlogo.png";

function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [bugs, setBugs] = useState([]);

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
    fetch("/Blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));

      fetch("/bug.json")
      .then((res) => res.json())
      .then((data) => setBugs(data))
      .catch((err) => console.error("Error loading bugs:", err));
  }, []);

  

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-16">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center w-full max-w-5xl px-4 text-center">
          <img
            src={Logo}
            alt="Cyber Crew Logo"
            className="h-64 sm:h-80 md:h-96 lg:h-112 w-auto max-w-full object-contain mb-10 -mt-12 transition-transform duration-300 hover:scale-105"
          />
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              WELCOME TO CYBER CREW
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400">
              {typedText}
            </p>
          </div>
        </div>
      </div>

      <section className="w-full bg-gray-800 text-white flex flex-col items-center py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-6 tracking-tight">
            About Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-7 sm:leading-8 max-w-3xl mx-auto">
            Cyber Crew was founded by two innovative students,{" "}
            <span className="text-white font-medium">Ajay</span> and{" "}
            <span className="text-white font-medium">Dhanush</span>, with a vision
            to develop and nurture cybersecurity enthusiasts within our branch. Our
            mission is to provide a collaborative learning environment where
            students passionate about cybersecurity can explore, research, and gain
            hands-on experience in various security domains.
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-7 sm:leading-8 max-w-3xl mx-auto mt-6">
            Beyond learning, we are committed to spreading awareness about
            cybersecurity threats, ethical hacking, and digital safety through
            workshops, events, and awareness programs within our college. Together,
            we aim to build a secure digital future while continuously expanding our
            knowledge.
          </p>
        </div>
      </section>

      {/* Blog Section
      <section className="w-full bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight">
          Latest Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="block group"
              aria-label={`Read more about ${blog.title}`}
            >
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[28rem]">
                <div className="relative w-full h-48">
                  <img
                    src={blog.images?.[0] || "/placeholder.jpg"}
                    alt={`${blog.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base flex-1 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                  <span className="inline-flex items-center mt-4 text-cyan-400 text-sm sm:text-base font-medium transition-colors duration-200 group-hover:text-cyan-300">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      {/* Blog Section */}
<section className="w-full bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight">
    Latest Blogs
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {blogs.map((blog) => (
      <Link
        to={`/blog/${blog.id}`}
        key={blog.id}
        className="block group"
        aria-label={`Read more about ${blog.title}`}
      >
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[28rem]">
          <div className="relative w-full h-56">
            <img
              src={blog.images?.[0] || "/placeholder.jpg"}
              alt={`${blog.title} preview`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 line-clamp-2 leading-tight">
              {blog.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base flex-1 line-clamp-2 leading-relaxed">
              {blog.description}
            </p>
            <span className="inline-flex items-center mt-2 text-cyan-400 text-sm sm:text-base font-medium transition-colors duration-200 group-hover:text-cyan-300">
              Read More
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* Bug Section */}
<section className="w-full bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight animate-fade-in">
    Bugs We’ve Found
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {bugs.map((bug) => (
      <Link
        to={`/bug/${bug.id}`}
        key={bug.id}
        className="block group"
        aria-label={`Read more about ${bug.title}`}
      >
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[28rem]">
          <div className="relative w-full h-48">
            <img
              src={bug.images?.[0] || "/placeholder.jpg"}
              alt={`${bug.title} preview`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 line-clamp-2 leading-tight">
              {bug.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base flex-1 line-clamp-3 leading-relaxed">
              {bug.description}
              {bug.students?.length > 0 && (
                <>
                  {" Found by "}
                  <span className="text-white font-medium">
                    {bug.students.map((s) => s.name).join(", ")}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
    </>
  );
}

export default Home;