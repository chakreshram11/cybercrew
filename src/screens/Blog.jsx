import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/Blogs.json") // ✅ Ensure Blogs.json is accessible
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8">
          All Blogs
        </h1>

        {blogs.map((blog) => (
  <div key={blog.id || blog.title} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
    <img
      src={blog.image} // Load from JSON image URL
      alt={blog.title}
      className="w-full h-40 object-cover rounded-md mb-4"
    />
    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
    <p className="text-gray-400 line-clamp-3">{blog.description}</p>
    <Link to={`/blog/${blog.id}`} className="text-cyan-400 mt-3 block">
      Read More →
    </Link>
  </div>
))}

      </div>
    </div>
  );
}

export default Blog;
