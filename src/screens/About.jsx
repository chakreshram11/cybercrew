import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Import team images (replace with unique images)
import team1 from "../assets/background.jpg"; // Update with actual image
import team2 from "../assets/background.jpg"; // Update with actual image
import team3 from "../assets/background.jpg"; // Update with actual image
import team4 from "../assets/background.jpg"; // Update with actual image

function About() {
  return (
    <section className="w-full min-h-screen bg-gray-900 text-white">
      {/* Image Scroller */}
      <div className="w-full max-w-[100vw] overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1200}
          effect="fade"
          modules={[Autoplay, EffectFade]}
          className="w-full h-80 sm:h-[32rem] lg:h-[40rem]"
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
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Club Introduction */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-6 tracking-tight">
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

        <h3 className="text-2xl sm:text-3xl font-semibold text-cyan-400 mt-12 mb-4 tracking-tight">
          Our Mission
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          At Cyber Crew, our mission is simple: to foster a collaborative
          environment that empowers individuals to explore, learn, and excel in
          the world of cybersecurity. Whether you're just beginning your journey
          or looking to specialize in a specific domain, we provide the tools,
          resources, and mentorship to help you succeed.
        </p>

        <h3 className="text-2xl sm:text-3xl font-semibold text-cyan-400 mt-12 mb-4 tracking-tight">
          What We Offer
        </h3>
        <ul className="list-none text-left text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto space-y-4">
          {[
            {
              title: "Structured Learning",
              desc: "From the basics to advanced topics, we ensure a solid foundation in cybersecurity.",
            },
            {
              title: "Specialization Tracks",
              desc: "Dive deep into ethical hacking, penetration testing, cryptography, and more.",
            },
            {
              title: "Practical Experience",
              desc: "Hands-on labs, CTF challenges, and live simulations build real-world skills.",
            },
            {
              title: "Competitions & Challenges",
              desc: "Participate in cybersecurity challenges and industry-level competitions.",
            },
            {
              title: "Internships & Career Growth",
              desc: "Gain access to internships and career guidance from professionals.",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start space-x-3 transition-transform duration-300 hover:translate-x-2"
            >
              <span className="text-cyan-400">•</span>
              <div>
                <span className="text-white font-medium">{item.title}:</span>{" "}
                {item.desc}
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl sm:text-3xl font-semibold text-cyan-400 mt-12 mb-4 tracking-tight">
          Join Us
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Cyber Crew is more than a club – it's a community of curious minds,
          dedicated to the future of cybersecurity. Whether you’re a beginner or
          an experienced tech enthusiast, there’s a place for you here.
        </p>
        <p className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mt-6 max-w-3xl mx-auto">
          Let’s innovate, let’s secure, let’s grow.
        </p>
      </div>
    </section>
  );
}

export default About;   