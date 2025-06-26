import React from "react";
import { useNavigate } from "react-router-dom";
import net1 from "../assets/deepnet1.jpg";
import net2 from "../assets/deepnet2.jpg";
import daniel from "../linkedin images/Daniel.jpg";
import arshith from "../linkedin images/Arshith.jpg";
import sri from "../linkedin images/sri karthik.jpg";

function DeepNetGaurd() {
    const navigate = useNavigate();
  const features = [
    {
      image: net1,
      title: "Real-Time Threat Detection",
      description:
        "Instantly identify network intrusions using deep learning models, ensuring rapid response to cyber threats with minimal latency.",
    },
    {
      image: net2,
      title: "Deep Learning Dashboard",
      description:
        "Visualize network activity and threat patterns through an intuitive dashboard, powered by advanced analytics for proactive monitoring.",
    },
  ];

  const team = [
    {
      name: "Daniel",
      image: daniel,
      linkedin:
        "https://www.linkedin.com/in/daniel-blesson-korukonda-0ba6a8246",
    },
    {
      name: "Arshith",
      image: arshith,
      linkedin: "https://www.linkedin.com/in/dhuba-arshith-3902a6259/",
    },
    {
      name: "Sri Karthik",
      image: sri,
      linkedin: "https://www.linkedin.com/in/srikarthikpampana/",
    },
  ];

  return (
    <section className="w-full bg-gray-900 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-full px-4 py-2 ml-3 text-2xl font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
          aria-label="Go back to previous page" >

          ←
        </button>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight">
          DeepNet Guardian
        </h1>

        {/* Overview */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            About DeepNet Guardian
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            The DeepNet Guardian Framework is a real-time Intrusion Detection
            System (IDS) developed by Cyber Crew at KIET. Utilizing deep learning
            models, it detects and mitigates cyber threats with high accuracy,
            classifying network-based attacks to ensure robust network security
            and operational efficiency.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 rounded-md object-cover mb-4 transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-white mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-base text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
                />
                <h3 className="text-xl font-medium text-white mb-2">
                  {member.name}
                </h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-9 19H7V9h3v10zm-1.5-11.3c-.97 0-1.75-.78-1.75-1.75S7.53 4.2 8.5 4.2s1.75.78 1.75 1.75S9.47 7.7 8.5 7.7zM20 19h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V19h-3V9h2.89v1.37h.04c.4-.76 1.37-1.56 2.83-1.56 3.03 0 3.59 1.99 3.59 4.58V19z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Project GitHub Link */}
         <div className="text-center">
           <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
             Explore the Project
           </h2>
           <a
             href="https://github.com/gowthamsai117/Vulnerability-Web-Scanner"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
             aria-label="Visit WebScanner's GitHub repository"
           >
             View on GitHub
           </a>
         </div> 
      </div>
    </section>
  );
}

export default DeepNetGaurd;
