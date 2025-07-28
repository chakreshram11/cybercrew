import React from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RoadmapStep from "../components/RoadmapStep";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Import team images (placeholders, replace with actual images)
import team1 from "../assets/blog1-1.jpeg"; // E.g., photo of Ajay or event
import team2 from "../assets/blog2-1.jpg"; // E.g., photo of Danush or event
import team3 from "../assets/blog3-1.jpg"; // E.g., photo of Durga Bhavani or event
import team4 from "../assets/groupphoto.jpg"; // E.g., photo of Cyber Jagrukta Diwas event

function About() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen bg-gray-800 text-white flex flex-col">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-200"
          aria-label="Go back to previous page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Image Scroller */}
      <div className="w-full max-w-[100vw] overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          speed={1200}
          effect="fade"
          modules={[Autoplay, EffectFade]}
          className="w-full h-64 sm:h-96 lg:h-[36rem]"
          dir="rtl"
        >
          {[
            { src: team1, alt: "Cyber Crew Event 1" },
            { src: team2, alt: "Cyber Crew Event 2" },
            { src: team3, alt: "Cyber Crew Event 3" },
            { src: team4, alt: "Cyber Crew Event 4" },
          ].map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/70"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Club Introduction */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-6 tracking-tight animate-fade-in">
          About Cyber Crew
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Welcome to Cyber Crew – where innovation meets security.
        </p>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed mt-6 max-w-3xl mx-auto">
          Cyber Crew was founded by{" "}
          <span className="text-white font-medium">Ajay</span> and{" "}
          <span className="text-white font-medium">Danush</span>, two passionate
          final-year students who shared a vision to create a community dedicated
          to cybersecurity learning and growth. With the guidance of{" "}
          <span className="text-white font-medium">Durga Bhavani</span>, a
          respected mentor from IIIT, their idea turned into reality. Today, Ajay
          is working at IIIT, while Danush has secured a position at Wipro,
          applying his skills in the industry.
        </p>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-400 mt-12 mb-4 tracking-tight">
          Our Mission
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          At Cyber Crew, our mission is simple: to foster a collaborative
          environment that empowers individuals to explore, learn, and excel in
          the world of cybersecurity. Whether you're just beginning your journey
          or looking to specialize in a specific domain, we provide the tools,
          resources, and mentorship to help you succeed.
        </p>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-400 mt-12 mb-4 tracking-tight">
          Our Vision
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          We envision a future where cybersecurity knowledge is accessible to all
          – not just those in the industry. Through awareness programs,
          hands-on workshops, and interactive sessions, we aim to build a cyber-aware
          community that stays resilient in an ever-evolving digital landscape.
        </p>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-400 mt-12 mb-4 tracking-tight">
          Join Us
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Whether you're a student, educator, or industry professional, we welcome
          you to be a part of our journey. Follow us for upcoming events,
          workshops, and insightful content. Together, let’s decode the future of cybersecurity.
        </p>
      </div>
      <div className="bg-gray-900">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-400 mt-16 mb-12 tracking-tight text-center">
          Cybersecurity Roadmap
        </h3>

        <div className="relative w-full max-w-6xl mx-auto mb-5">
  {/* Vertical line */}
  <div className="absolute left-1/2 top-0 h-full border-l-4 border-cyan-500 transform -translate-x-1/2 z-0" />

  <div className="space-y-20 relative z-10">
    {[
      {
        title: "Beginner",
        desc: "Start with networking basics, OSI model, Linux essentials, and learn what cybersecurity is all about. Explore safe browsing, phishing detection, and basic system hardening.",
        position: "left",
      },
      {
        title: "Intermediate",
        desc: "Learn about vulnerabilities like XSS, SQL Injection, and CSRF. Start using tools like Nmap, Burp Suite, and Wireshark. Practice using CTF platforms such as TryHackMe and HackTheBox.",
        position: "right",
      },
      {
        title: "Advanced",
        desc: "Dig into exploit development, reverse engineering, malware analysis, and buffer overflows. Explore tools like Ghidra, Metasploit, and build scripts for automation.",
        position: "left",
      },
      {
        title: "Expert",
        desc: "Contribute to bug bounty platforms, conduct red teaming, publish research, and aim for certifications like OSCP, CEH, or CISSP. Mentor others and contribute to the community.",
        position: "right",
      },
    ].map((step, index) => (
      <RoadmapStep key={index} step={step} index={index} />
    ))}
  </div>
</div>

      </div>
    </section>
  );
}

export default About;
