import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import CyberBadge from "../components/CyberBadge";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBlogDetails() {
      setLoading(true);
      try {
        const { data } = await supabase
          .from("cyber_blogs")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (data) {
          setBlog({
            ...data,
            description: data.description || data.content,
            content: data.content || data.description,
            images: data.images && data.images.length > 0 ? data.images : data.image_url ? [data.image_url] : [],
          });
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBlogDetails();
    }
  }, [id]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cyber-dark text-cyan-400 font-mono animate-pulse">
        LOADING RESEARCH ARTICLE...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-cyber-dark text-gray-400 font-mono p-4">
        <h2 className="text-xl text-red-400 font-bold mb-4">[ERROR 404]: RESEARCH ARTICLE NOT FOUND</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-cyan-500 text-gray-950 font-bold rounded hover:bg-cyan-400"
        >
          ← RETURN TO BLOGS LIST
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cyber-dark text-white min-h-screen p-4 sm:p-8 bg-cyber-grid font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-slate border border-cyan-500/40 text-cyan-400 font-mono font-bold rounded shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:bg-cyan-950 hover:border-cyan-400 transition-all text-xs"
            aria-label="Go back to previous page"
          >
            ← BACK
          </button>
        </div>

        <article className="cyber-card p-6 sm:p-10 rounded-xl border border-cyan-500/30">
          <div className="mb-4">
            <CyberBadge text="CYBER RESEARCH ARTICLE" type="purple" className="mb-3" />
            <h1 className="text-3xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan leading-tight">
              {blog.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 mb-6 pb-4 border-b border-gray-800">
            <span>
              AUTHOR: <span className="text-white font-bold">{blog.author || "CYBER CREW"}</span>
            </span>
            <span>•</span>
            <span>
              DATE: <span className="text-cyan-300">{blog.date ? new Date(blog.date).toLocaleDateString() : "N/A"}</span>
            </span>
          </div>

          {/* Images Gallery */}
          {blog.images?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {blog.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded border border-cyan-500/20 hover:border-cyan-400 transition-colors cursor-pointer"
                  onClick={() => openImageModal(image)}
                >
                  <img
                    src={image}
                    alt={`${blog.title} ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-cyan-300">
                    [ENLARGE VIEW 🔍]
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Article Text Content */}
          <section className="text-sm sm:text-base text-gray-200 leading-relaxed font-mono space-y-4">
            {blog.content ? (
              blog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>{blog.description}</p>
            )}
          </section>
        </article>

        {/* Modal for full-screen image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={closeImageModal}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[80vh] object-contain rounded border-2 border-cyan-500/60 shadow-[0_0_30px_rgba(0,243,255,0.4)]"
              />
              <button
                className="absolute top-2 right-2 text-white bg-gray-900 border border-cyan-400 rounded-full w-8 h-8 flex items-center justify-center font-mono hover:bg-cyan-500 hover:text-gray-950 transition-colors"
                onClick={closeImageModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
