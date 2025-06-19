import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ form: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
       <div className="mb-8 text-left">
        <button 
          onClick={() => navigate(-1)} 
          className="border-4 border-sky-500 bg-gray-900 rounded-lg bg-white p-2 pl-3 pr-3 ml-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Back
        </button>
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 text-center mb-12 tracking-tight animate-fade-in">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
              Send Us a Message
            </h2>
            {success && (
              <p className="text-green-400 mb-4 animate-fade-in">
                Message sent successfully! We’ll get back to you soon.
              </p>
            )}
            {errors.form && (
              <p className="text-red-400 mb-4">{errors.form}</p>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-sm sm:text-base"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  placeholder="Your Name"
                  aria-label="Your Name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 text-sm sm:text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  placeholder="your.email@example.com"
                  aria-label="Your Email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-300 mb-2 text-sm sm:text-base"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                    errors.subject ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  placeholder="Subject of your message"
                  aria-label="Subject"
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-2 text-sm sm:text-base"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                    errors.message ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-y`}
                  placeholder="Your message here..."
                  aria-label="Your Message"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-md bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-colors duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
                aria-label="Send Message"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Have questions or want to collaborate with Cyber Crew? Reach out to
              us via email or connect on social media.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-cyan-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:cyberkiet24@gmail.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  aria-label="Email Cyber Crew"
                >
                  cyberkiet24@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-cyan-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.867-3.063-1.867 0-2.153 1.459-2.153 2.968v5.699h-3v-11h2.879v1.526h.04c.401-.758 1.379-1.559 2.837-1.559 3.035 0 3.604 2.001 3.604 4.604v6.429z" />
                </svg>
                <a
                  href="https://linkedin.com/company/kiet-cybercrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  aria-label="Visit Cyber Crew's LinkedIn"
                >
                  Cyber Crew LinkedIn
                </a>
              </div>
            </div>
            {/* KIET Korangi Location */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Our Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1431.527877660336!2d82.23912161786397!3d16.81359909426223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a38205e52dbce3d%3A0x794aa1538de4100f!2sKiet%20College!5e0!3m2!1sen!2sin!4v1714842017451!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="KIET Korangi Location"
                className="rounded-md"
              ></iframe>
              <p className="text-gray-300 mt-4 text-sm sm:text-base">
                Kakinada Institute of Engineering and Technology, KKD-Yanam Road,
                Korangi, Tallarevu Mandal, East Godavari District, Andhra Pradesh, PIN-533461
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;