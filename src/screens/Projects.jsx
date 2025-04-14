import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/project.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <section className="w-full bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight animate-fade-in">
        Our Projects
      </h1>
      {projects.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-300 text-lg font-medium animate-pulse">
            Loading projects...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Link
              to={project.path}
              key={project.id}
              className="block group"
              aria-label={`Explore ${project.name}`}
            >
              <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-[20rem]">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 line-clamp-2 leading-tight">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base flex-1 line-clamp-4 leading-relaxed">
                  {project.description}
                </p>
                <span className="inline-flex items-center mt-3 text-cyan-400 text-sm sm:text-base font-medium transition-colors duration-200 group-hover:text-cyan-300">
                  Read More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </section>
  );
}

export default Projects;