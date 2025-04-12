import React from 'react';
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import team images
import team1 from "../assets/background.jpg";
import team2 from "../assets/background.jpg";
import team3 from "../assets/background.jpg";
import team4 from "../assets/background.jpg";

function About() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Image Scroller */}
      <div className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full"
        >
          <SwiperSlide>
            <img src={team1} alt="Team Member 1" className="w-full h-72 md:h-96 object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={team2} alt="Team Member 2" className="w-full h-72 md:h-96 object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={team3} alt="Team Member 3" className="w-full h-72 md:h-96 object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={team4} alt="Team Member 4" className="w-full h-72 md:h-96 object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Club Introduction */}
      <div className="max-w-4xl text-center p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
          About Cyber Crew
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Welcome to Cyber Crew – where innovation meets security .
        </p>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4">
          Cyber Crew was founded by <span className="text-white font-semibold">Ajay</span> and <span className="text-white font-semibold">Danush</span>, two passionate final-year students who shared a vision to create a community dedicated to cybersecurity learning and growth.
          With the guidance of <span className="text-white font-semibold">Durga Bhavani</span>, a respected mentor from IIIT, their idea turned into reality. Today, Ajay is working at IIIT, while Danush has secured a position at Wipro, applying his skills in the industry.
        </p>
        
        <h3 className="text-2xl font-bold text-cyan-400 mt-6">Our Mission</h3>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-2">
          At Cyber Crew, our mission is simple: to foster a collaborative environment that empowers individuals to explore, learn, and excel in the world of cybersecurity.
          Whether you're just beginning your journey or looking to specialize in a specific domain, we provide the tools, resources, and mentorship to help you succeed.
        </p>

        <h3 className="text-2xl font-bold text-cyan-400 mt-6">What We Offer</h3>
        <ul className="list-disc text-left text-lg md:text-xl text-gray-300 leading-relaxed mt-2 px-8">
          <li><span className="text-white font-semibold">Structured Learning:</span> From the basics to advanced topics, we ensure a solid foundation in cybersecurity.</li>
          <li><span className="text-white font-semibold">Specialization Tracks:</span> Dive deep into ethical hacking, penetration testing, cryptography, and more.</li>
          <li><span className="text-white font-semibold">Practical Experience:</span> Hands-on labs, CTF challenges, and live simulations build real-world skills.</li>
          <li><span className="text-white font-semibold">Competitions & Challenges:</span> Participate in cybersecurity challenges and industry-level competitions.</li>
          <li><span className="text-white font-semibold">Internships & Career Growth:</span> Gain access to internships and career guidance from professionals.</li>
        </ul>
        
        <h3 className="text-2xl font-bold text-cyan-400 mt-6">Join Us</h3>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-2">
          Cyber Crew is more than a club – it's a community of curious minds, dedicated to the future of cybersecurity.
          Whether you’re a beginner or an experienced tech enthusiast, there’s a place for you here.
        </p>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-2 font-bold text-cyan-300">
          Let’s innovate, let’s secure, let’s grow.
        </p>
      </div>
    </div>
  );
}

export default About;
