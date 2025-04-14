import React from "react";
// import { Link } from "react-router-dom";

function EncryptoWeb() {
  const features = [
    {
      image: "/projects/encrypto-cipher.jpg",
      title: "Cipher Encryption & Decryption",
      description:
        "Securely encrypt and decrypt data using advanced cipher algorithms like AES and RSA, ensuring robust protection for sensitive information.",
    },
    {
      image: "/projects/encrypto-chatbot.jpg",
      title: "AI-Powered Chatbot",
      description:
        "Interact with an intelligent chatbot that guides users through encryption processes, answers queries, and provides real-time security tips.",
    },
    {
      image: "/projects/encrypto-password.jpg",
      title: "Strong Password Generator",
      description:
        "Generate complex, uncrackable passwords with our Linux-based tool, customizable for length and character types to enhance security.",
    },
    {
      image: "/projects/encrypto-subdomain.jpg",
      title: "Subdomain Finder",
      description:
        "Discover hidden subdomains of target websites efficiently, aiding penetration testers and security researchers in vulnerability assessments.",
    },
  ];

  const team = [
    {
      name: "Ajay",
      image: "/founders/ajay.jpg",
      linkedin: "https://linkedin.com/in/ajay",
      github: "https://github.com/ajay",
    },
    {
      name: "Dhanush",
      image: "/founders/dhanush.jpg",
      linkedin: "https://linkedin.com/in/dhanush",
      github: "https://github.com/dhanush",
    },
    {
      name: "Priya",
      image: "/founders/priya.jpg",
      linkedin: "https://linkedin.com/in/priya",
      github: "https://github.com/priya",
    },
    {
      name: "Rahul",
      image: "/founders/rahul.jpg",
      linkedin: "https://linkedin.com/in/rahul",
      github: "https://github.com/rahul",
    },
    {
      name: "Sneha",
      image: "/founders/sneha.jpg",
      linkedin: "https://linkedin.com/in/sneha",
      github: "https://github.com/sneha",
    },
    {
      name: "Vikram",
      image: "/founders/vikram.jpg",
      linkedin: "https://linkedin.com/in/vikram",
      github: "https://github.com/vikram",
    },
  ];

  return (
    <section className="w-full bg-gray-900 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={member.image}
                  alt={`${member.name}, EncryptoWeb founder`}
                  className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
                />
                <h3 className="text-xl font-medium text-white mb-2">
                  {member.name}
                </h3>
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.867 0-2.153 1.459-2.153 2.968v5.699h-3v-11h2.879v1.526h.04c.401-.758 1.379-1.559 2.837-1.559 3.035 0 3.604 2.001 3.604 4.604v6.429z" />
                    </svg>
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    aria-label={`Visit ${member.name}'s GitHub profile`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5Uploaded file 'EncryptoWeb.jsx' successfully.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.906-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </div>
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
            href="https://github.com/cybercrew/encrypto-web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Visit EncryptoWeb's GitHub repository"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default EncryptoWeb;