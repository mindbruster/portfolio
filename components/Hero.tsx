"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Github, Mail, Download } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  const [typingText, setTypingText] = useState("");
  const roles = ["AI Engineer.", "Full-Stack Developer.", "Innovator.", "Problem Solver."];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex < currentRole.length) {
      setTimeout(() => {
        setTypingText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (isDeleting && charIndex > 0) {
      setTimeout(() => {
        setTypingText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 100);
    } else if (charIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (charIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12 text-center"
        >
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-6 py-3 glass rounded-full neon-glow"
          >
            <span className="text-primary-400 text-sm font-medium">
              👋 Welcome to my Portfolio
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold">
              <span className="block text-gray-100">Hi, I'm</span>
              <span className="block gradient-text">Abdul Aziz</span>
            </h1>

            {/* Animated Role Text */}
            <div className="h-12 md:h-16">
              <span className="text-3xl md:text-5xl font-semibold text-gray-100">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            Building intelligent systems for automation, analytics, and real-world impact.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-5 justify-center items-center"
          >
            <Link
              href="#projects"
              className="px-10 py-4 bg-neon-gradient rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              View Projects
            </Link>
            <Link
              href="/resume.pdf"
              download
              className="px-10 py-4 border-2 border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500/10 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 glass"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </Link>
            <Link
              href="#contact"
              className="px-10 py-4 border-2 border-accent-500 text-accent-400 rounded-lg font-semibold hover:bg-accent-500/10 transition-all transform hover:scale-105 glass inline-flex items-center justify-center"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-8"
          >
            <a
              href="https://www.linkedin.com/in/abdul-aziz-a6670a249/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 glass border border-gray-700 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all transform hover:scale-110 flex items-center justify-center neon-glow"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/mindbruster"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 glass border border-gray-700 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all transform hover:scale-110 flex items-center justify-center neon-glow"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:mughalabdulaziz4@gmail.com"
              className="w-14 h-14 glass border border-gray-700 rounded-full hover:border-primary-500 hover:text-primary-400 transition-all transform hover:scale-110 flex items-center justify-center neon-glow"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
