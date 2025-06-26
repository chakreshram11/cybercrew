import React from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import chitti from "../linkedin images/chittibabu.jpg"
import priya from "../linkedin images/priya.jpg"
import gopi from "../linkedin images/GOPI.jpeg"
import sai from "../linkedin images/Sai.jpg"
import chakresh from "../linkedin images/chakresh.png"
import Harsha from "../linkedin images/Harsha.jpg"
import crypto1 from "../assets/crypto1.jpg"
import crypto2 from "../assets/crypto2.jpg"
import crypto3 from "../assets/crypto3.jpg"
import crypto4 from "../assets/crypto4.jpg"

function EncryptoWeb() {
    const navigate = useNavigate();
  const features = [
    {
      image: crypto3,
      title: "Cipher Encryption & Decryption",
      description:
        "Securely encrypt and decrypt data using advanced cipher algorithms like AES and RSA, ensuring robust protection for sensitive information.",
    },
    {
      image: crypto4,
      title: "AI-Powered Chatbot",
      description:
        "Interact with an intelligent chatbot that guides users through encryption processes, answers queries, and provides real-time security tips.",
    },
    {
      image: crypto1,
      title: "Strong Password Generator",
      description:
        "Generate complex, uncrackable passwords with our Linux-based tool, customizable for length and character types to enhance security.",
    },
    {
      image: crypto2,
      title: "Subdomain Finder",
      description:
        "Discover hidden subdomains of target websites efficiently, aiding penetration testers and security researchers in vulnerability assessments.",
    },
  ];

  const team = [
    {
      name: "Chakresh",
      image: chakresh,
      linkedin: "https://www.linkedin.com/in/chakresh-ram-kudupudi-85a6a0256",
    },
    {
      name: "Sai",
      image: sai,
      linkedin: "https://www.linkedin.com/in/sri-naga-durga-sai-dangeti-2a7919272",
    },
    {
      name: "Gopal Rao",
      image: gopi,
      linkedin: "https://www.linkedin.com/in/podiya-gopala-rao-06a722329",
    },
    {
      name: "Chitti Babu",
      image: chitti,
      linkedin: "https://www.linkedin.com/in/chittibabu-bavisetti-6a444525b",
    },
    {
      name: "Harsha",
      image: Harsha,
      linkedin: "https://www.linkedin.com/in/harsha-bala-subrahmanyam-dora-b0b789288",

    },
    {
      name: "Priya",
      image: priya,
      linkedin: "https://www.linkedin.com/in/puchala-priya-29229a289",

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
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight animate-fade-in">
          EncryptoWeb
        </h1>

        {/* Overview */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            About EncryptoWeb
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            EncryptoWeb is a cutting-edge cybersecurity platform offering cipher
            encryption and decryption, an AI-powered chatbot, and Linux-based
            tools like a strong password generator and subdomain finder. Developed
            by Cyber Crew at KIET, it empowers users to secure data and explore
            web vulnerabilities with ease and precision.
          </p>
        </div>

        {/* Features Section */}
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
                  alt={`${feature.title} preview`}
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

        {/* Team Section */}
        <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
  <div
    key={index}
    className="flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
  >
    <img
      src={member.image}
      alt={member.name}
      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-cyan-400"
      loading="lazy"
    />
    <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:underline"
    >
      LinkedIn Profile
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
            href="https://github.com/chakreshram11/Kill_project"
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

export default EncryptoWeb;