import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("/Blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedBlog = data.find((b) => b.id === id);
        setBlog(selectedBlog);
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blog)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <article className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">{blog.title}</h1>
        <p className="text-gray-400 text-lg mb-4">
          By <span className="text-white font-semibold">{blog.author}</span> | {new Date(blog.date).toLocaleDateString()}
        </p>
        <hr className="border-gray-600 mb-6" />
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto max-h-96 object-cover rounded mb-6"
        />
        <section className="text-lg text-gray-300 leading-relaxed tracking-wide space-y-4">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </section>
      </article>
    </div>
  );
}

export default BlogDetails;