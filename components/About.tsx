"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Projects", value: "8+", icon: "🎯" },
    { label: "Internships", value: "2", icon: "💼" },
    { label: "Experience", value: "2+ Years", icon: "⏱️" },
    { label: "Technologies", value: "15+", icon: "⚡" },
  ];

  return (
    <section id="about" ref={ref} className="w-full py-32 relative flex justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-display">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-neon-gradient mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all neon-glow">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-neon-gradient p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <span className="text-5xl">AA</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center text-gray-100 mb-4">Abdul Aziz</h3>
              <p className="text-center text-gray-400 mb-6">
                Computer Science graduate from <span className="text-primary-400 font-semibold">FAST NUCES Lahore</span>
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>Lahore, Pakistan</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <a href="mailto:mughalabdulaziz4@gmail.com" className="hover:text-primary-400 transition-colors">
                    mughalabdulaziz4@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-500 text-sm">
                  <span>+92 3434489592</span>
                </div>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass p-4 rounded-lg text-center hover:border-primary-500/50 transition-all"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all">
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">Who I Am</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                I'm Abdul Aziz, a Computer Science graduate from <span className="text-primary-400 font-semibold">FAST NUCES Lahore</span> specializing in AI, ML, and automation. I've built RAG-based chatbots, YOLO vision systems, and full-stack AI apps that solve real-world problems.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                My passion lies in building intelligent systems that automate complex processes, making businesses more efficient and impactful. Whether it's developing machine learning models, crafting full-stack applications, or implementing computer vision solutions, I thrive on bringing innovative ideas to life.
              </p>
              
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-gray-100 mb-4">Education & Expertise</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-gray-400">
                    <span className="text-primary-400">📚</span>
                    <div>
                      <p className="font-semibold text-gray-200">Bachelors of Computer Science</p>
                      <p className="text-sm">FAST NUCES Lahore (Aug 2021 - July 2025)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-400">
                    <span className="text-accent-400">🎯</span>
                    <div>
                      <p className="font-semibold text-gray-200">Core Expertise</p>
                      <p className="text-sm">AI/ML, Computer Vision, Full-Stack Development, Data Science</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/resume.pdf"
                download
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-neon-gradient rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                View Full Resume
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
