import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/Blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="bg-gray-900 min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight animate-fade-in">
          All Blogs
        </h1>
        {blogs.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-300 text-lg font-medium animate-pulse">
              Loading blogs...
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog.id}`}
                key={blog.id || blog.title}
                className="block group"
                aria-label={`Read more about ${blog.title}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  {blog.images?.[0] && (
                    <div className="w-full sm:w-48 flex-shrink-0">
                      <div className="relative w-full h-48 sm:h-36 rounded-lg overflow-hidden">
                        <img
                          src={blog.images[0]}
                          alt={`${blog.title} preview`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-200">
                      {blog.title}
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>
                    <span className="inline-flex items-center mt-3 text-cyan-400 text-sm sm:text-base font-medium group-hover:text-cyan-300 transition-colors duration-200">
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
        )}
      </div>
    </section>
  );
}

export default Blog;