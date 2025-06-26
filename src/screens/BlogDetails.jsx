import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedBlog = data.find((b) => b.id === id);
        setBlog(selectedBlog);
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  // Function to open the modal with the clicked image
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (!blog)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="mb-8 text-left">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-full px-4 py-2 ml-3 text-2xl font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
          aria-label="Go back to previous page" >

          ←
        </button>
      </div>
      <article className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">{blog.title}</h1>
        <p className="text-gray-400 text-lg mb-4">
          By <span className="text-white font-semibold">{blog.author}</span> |{" "}
          {new Date(blog.date).toLocaleDateString()}
        </p>
        <hr className="border-gray-600 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {blog.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${blog.title} ${index + 1}`}
              className="w-full h-64 object-cover items-center rounded-md cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openImageModal(image)}
            />
          ))}
        </div>
        <section className="text-lg text-gray-300 leading-relaxed tracking-wide space-y-4">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </section>
      </article>

      {/* Modal for full-screen image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl w-full mx-4">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition"
              onClick={closeImageModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;