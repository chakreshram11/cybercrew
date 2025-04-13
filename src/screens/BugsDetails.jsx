import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

function BugsDetails() {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/bug.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedBug = data.find((b) => b.id === id);
        setBug(selectedBug);
      })
      .catch((err) => console.error("Error fetching bug:", err));
  }, [id]);

  // Function to open the modal with the clicked image
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (!bug)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <article className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4 animate-fade-in">
          {bug.title}
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          {bug.date && (
            <>
              {new Date(bug.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </>
          )}
        </p>
        <hr className="border-gray-600 mb-6" />
        {bug.students?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {bug.students.map((student, index) => (
              <div key={index} className="text-center">
                <img
                  src={student.photo}
                  alt={`${student.name}'s profile`}
                  className="w-full h-64 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImageModal(student.photo)}
                  loading="lazy"
                />
                <p className="mt-2 text-white font-semibold">{student.name}</p>
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  aria-label={`Visit ${student.name}'s LinkedIn profile`}
                >
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        )}
        <section className="text-lg text-gray-300 leading-relaxed tracking-wide space-y-4">
          {bug.content ? (
            <Markdown>{bug.content}</Markdown>
          ) : (
            <p className="mb-4">{bug.description}</p>
          )}
        </section>
      </article>

      {/* Modal for full-screen image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in-fast"
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
              aria-label="Close image modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BugsDetails;