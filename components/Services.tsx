"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const services = [
    {
      icon: "🤖",
      title: "AI Model Development",
      description: "Custom machine learning models with TensorFlow, PyTorch, and scikit-learn. From predictive analytics to computer vision solutions.",
    },
    {
      icon: "💻",
      title: "Web Apps & Dashboards",
      description: "Full-stack web applications with modern frameworks. Scalable, responsive, and user-friendly interfaces with real-time data.",
    },
    {
      icon: "👁️",
      title: "Computer Vision Systems",
      description: "Real-time object detection, image recognition, and ANPR systems using YOLO and state-of-the-art CV models.",
    },
    {
      icon: "💬",
      title: "Chatbots & Automations",
      description: "RAG-based conversational agents with intelligent context management and natural language understanding for automation.",
    },
  ];

  return (
    <section id="services" ref={ref} className="w-full py-32 relative flex justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-display">
            <span className="gradient-text">Services</span>
          </h2>
          <div className="w-24 h-1 bg-neon-gradient mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI and web development services to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full glass rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all hover:neon-glow transform hover:scale-105">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-12 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all neon-glow-purple">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4 text-center">
              Ready to Work Together?
            </h3>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto text-center">
              Let's discuss how I can help bring your vision to life with AI and cutting-edge technology.
            </p>
            <Link
              href="#contact"
              className="inline-block px-10 py-4 bg-neon-gradient rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
