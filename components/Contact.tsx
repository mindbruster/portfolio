"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Github, Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Formspree or EmailJS
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={ref} className="w-full py-32 relative flex justify-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-display">
            <span className="gradient-text">Contact Me</span>
          </h2>
          <div className="w-24 h-1 bg-neon-gradient mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all">
              <h3 className="text-2xl font-semibold text-gray-100 mb-6">Let's Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have a project in mind? Want to collaborate? Or just want to say hi? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-gray-400 group">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center group-hover:bg-primary-500/30 transition-all">
                    <Phone className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-200">+92 3434489592</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center group-hover:bg-primary-500/30 transition-all">
                    <Mail className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:mughalabdulaziz4@gmail.com" className="text-gray-200 hover:text-primary-400 transition-colors">
                      mughalabdulaziz4@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center group-hover:bg-primary-500/30 transition-all">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-200">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/abdul-aziz-a6670a249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass border border-gray-700 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all transform hover:scale-110 flex items-center justify-center neon-glow"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/mindbruster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass border border-gray-700 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all transform hover:scale-110 flex items-center justify-center neon-glow"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="mailto:mughalabdulaziz4@gmail.com"
                  className="w-12 h-12 glass border border-gray-700 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all transform hover:scale-110 flex items-center justify-center neon-glow"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-neon-cyan/20 space-y-6 neon-glow">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-neon-gradient rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
