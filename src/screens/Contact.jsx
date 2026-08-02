import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CyberBadge from "../components/CyberBadge";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
      setErrors({ form: "Transmission failed. Check parameters and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-cyber-dark text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cyber-grid font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-left">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-slate border border-cyan-500/40 text-cyan-400 font-mono font-bold rounded shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:bg-cyan-950 hover:border-cyan-400 transition-all text-xs"
            aria-label="Go back"
          >
            ← BACK
          </button>
        </div>

        <div className="text-center mb-10">
          <CyberBadge text="ENCRYPTED TRANSMISSION CHANNEL" type="cyan" className="mb-2" />
          <h1 className="text-4xl sm:text-5xl font-mono font-bold text-cyan-400 text-glow-cyan">
            INITIATE CONTACT
          </h1>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto mt-2">
            Reach out to Cyber Crew regarding vulnerability disclosures, security partnerships, workshops, or membership inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="cyber-card p-6 sm:p-8 rounded-xl border border-cyan-500/30">
            <h2 className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              SECURE MESSAGE TRANSMITTER
            </h2>

            {success && (
              <div className="p-3 bg-emerald-950 border border-emerald-400 text-emerald-300 text-xs rounded mb-4">
                ✔ TRANSMISSION SUCCESSFUL: Cyber Crew received your message.
              </div>
            )}
            {errors.form && (
              <div className="p-3 bg-rose-950 border border-rose-500 text-rose-300 text-xs rounded mb-4">
                ✖ ERROR: {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase mb-1">
                  Full Name / Handle *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className={`w-full p-3 rounded bg-gray-900 text-white font-mono text-sm border ${
                    errors.name ? "border-rose-500" : "border-gray-700"
                  } focus:outline-none focus:border-cyan-400`}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase mb-1">
                  Secure Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@cybersec.org"
                  className={`w-full p-3 rounded bg-gray-900 text-white font-mono text-sm border ${
                    errors.email ? "border-rose-500" : "border-gray-700"
                  } focus:outline-none focus:border-cyan-400`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase mb-1">
                  Transmission Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Vulnerability Disclosure / Partnership"
                  className={`w-full p-3 rounded bg-gray-900 text-white font-mono text-sm border ${
                    errors.subject ? "border-rose-500" : "border-gray-700"
                  } focus:outline-none focus:border-cyan-400`}
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="text-rose-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase mb-1">
                  Encrypted Payload / Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detail your inquiry or security report..."
                  className={`w-full p-3 rounded bg-gray-900 text-white font-mono text-sm border ${
                    errors.message ? "border-rose-500" : "border-gray-700"
                  } focus:outline-none focus:border-cyan-400`}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded bg-cyan-500 text-gray-950 font-mono font-bold uppercase tracking-wider text-sm hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all"
              >
                {isSubmitting ? "TRANSMITTING ENCRYPTED DATA..." : "TRANSMIT MESSAGE →"}
              </button>
            </form>
          </div>

          {/* Contact Info & Location Map */}
          <div className="cyber-card p-6 sm:p-8 rounded-xl border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-mono font-bold text-white mb-4">
                HEADQUARTERS & CONTACT
              </h2>
              <p className="text-gray-300 text-xs leading-relaxed mb-6">
                Cyber Crew operates out of Kakinada Institute of Engineering and Technology (KIET). Connect via official mail or LinkedIn.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-800">
                  <span className="text-cyan-400">✉ EMAIL:</span>
                  <a href="mailto:cyberkiet24@gmail.com" className="text-gray-200 hover:text-cyan-300">
                    cyberkiet24@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-800">
                  <span className="text-cyan-400">🔗 LINKEDIN:</span>
                  <a
                    href="https://linkedin.com/company/kiet-cybercrew"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-cyan-300"
                  >
                    Cyber Crew KIET
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <h3 className="text-xs font-mono font-bold text-cyan-400 mb-2 uppercase">
                GEOGRAPHIC COORDINATES
              </h3>
              <div className="rounded overflow-hidden border border-cyan-500/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1431.527877660336!2d82.23912161786397!3d16.81359909426223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a38205e52dbce3d%3A0x794aa1538de4100f!2sKiet%20College!5e0!3m2!1sen!2sin!4v1714842017451!5m2!1sen!2sin"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="KIET Korangi Location"
                ></iframe>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                KIET Campus, KKD-Yanam Road, Korangi, East Godavari, AP - 533461
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
