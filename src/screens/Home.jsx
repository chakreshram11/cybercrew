import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Logo from "../assets/cybercrewlogo.png";
import chairman from "../assets/chairman_sir.jpg";
import revathi from "../assets/revathi_madam.jpeg";
import ramkrishna from "../assets/rk_sir.jpg";
import dean from "../assets/dean.jpg";
import dhanush from "../assets/dhanush.jpg";
import somesh from "../assets/somesh_sir.jpg";
import ajay from "../assets/ajay_anna.jpg";
import bhanu from "../assets/bhanu.jpg"

function Home() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

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

    // Fetch bug.json
    fetch("/bug.json")
      .then((res) => {
        console.log("Fetching bug.json, status:", res.status, "URL:", res.url);
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Failed to fetch bug.json: ${res.status}, Response: ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => setBugs(data))
      .catch((err) => {
        console.error("Error loading bugs:", err);
        setBugs([]); // Fallback to empty array
        setError("Failed to load bugs.");
      });

    fetch("/project.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <>
    <ScrollToTop />
     <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-5">
  {/* Header Section */}
  <div className="flex flex-col items-center justify-center w-full max-w-6xl px-4 text-center">
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

      <section className="w-full min-h-screen bg-gray-800 text-white flex flex-col items-center py-12 md:py-16">
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
        {/* Team Images with Names */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 mt-10 mb-10">
          {[
            { src: chairman, name: "P. Viswam\n(Chairman Sir)" },
            { src: revathi, name: "D. Revathi\n(Kiet Principle)" },
            { src: ramkrishna, name: "Y. Rama Krishna\n(Kiet-w Principle)" },
            { src: dean, name: "RamKiran\n(Dean & Vice Principle)" },
            { src: somesh, name: "S.N.S.Somesh\n(Cyber Crew Coordinator)" },
            { src: dhanush, name: "Dhanush" },
            { src: ajay, name: "S. Ajay" },
            { src: bhanu, name: "G. Bhanu" },

          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={member.src}
                alt={`${member.name.replace(/\n/g, " ")}'s profile`}
                className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full object-cover border-2 border-cyan-400 shadow-lg transition-transform duration-300 hover:scale-110"
                loading="lazy"
                onError={(e) => (e.target.src = "/assets/fallback.jpg")}
              />
              <p
                className="mt-6 text -base sm:text-lg md:text-xl font-medium text-white text-center whitespace-pre-line"
              >
                {member.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
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
      <section className="w-full min-h-screen bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
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
                  <p className="text-gray-400 text-sm sm:text-base flex-1 line-clamp-3 leading-relaxed mb-4">
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
                  <span className="inline-flex items-center text-cyan-400 text-sm sm:text-base font-medium transition-colors duration-200 group-hover:text-cyan-300">
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

      {/* Projects Section */}
      <section className="bg-gray-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl text-cyan-400 text-center mb-12">All Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Link
              to={project.path}
              key={project.id}
              className="block group"
              aria-label={`Read more about ${project.name}`}
            >
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                <h3 className="text-2xl text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 text-base flex-1 mb-4">
                  {project.description}
                </p>
                <span className="inline-flex items-center text-cyan-400 text-base font-medium transition-colors duration-200 group-hover:text-cyan-300">
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
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;