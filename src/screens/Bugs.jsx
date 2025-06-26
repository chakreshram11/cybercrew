import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
    setLoading(true);
    fetch("/Bug.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch bug.json: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBugs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bugs:", err);
        setError("Failed to load bugs. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-gray-900 min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-left">
          <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-full px-4 py-2 ml-3 text-2xl font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
          aria-label="Go back to previous page" >

          ←
        </button>
      </div>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight animate-fade-in">
          Bugs we've Found
        </h1>
        {bugs.length === 0 ? (
          <div className="flex justify-center  items-center h-64">
            <p className="text-gray-300 text-lg font-medium animate-pulse">
              Loading bugs...
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {bugs.map((bug) => (
              <Link
                to={`/bug/${bug.id}`}
                key={bug.id || bug.title}
                className="block group"
                aria-label={`Read more about ${bug.title}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  {bug.images?.[0] && (
                    <div className="w-full sm:w-48 flex-shrink-0">
                      <div className="relative w-full h-48 sm:h-36 rounded-lg overflow-hidden">
                        <img
                          src={bug.images[0]}
                          alt={`${bug.title} preview`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-200">
                      {bug.title}
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed line-clamp-3">
                      {bug.description}{" "}
                      {bug.students?.length > 0 && (
                        <span>
                          Found by{" "}
                          <span className="text-white font-medium">
                            {bug.students.map((s) => s.name).join(", ")}
                          </span>
                        </span>
                      )}
                    </p>
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

export default Bugs;