"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "Sales Pitch Generator AI",
      description: "AI-powered platform that automatically generates professional sales pitch presentations customized for a company's product, audience, and tone. Implemented RAG architecture with Gemini AI to fetch relevant market insights and craft context-aware slides. Integrated FastAPI backend for content generation pipelines and SvelteKit frontend for live previews.",
      tech: ["SvelteKit", "FastAPI", "Gemini AI", "RAG", "LangChain", "Python"],
      category: "AI/ML",
      github: "https://github.com/mindbruster",
      demo: "#",
      year: "2024",
      achievement: "Reduced time to create sales decks from hours to minutes",
      role: "Full-stack lead - Backend APIs, RAG logic, prompt engineering",
    },
    {
      title: "myNeutron Chrome Extension",
      description: "Chrome extension that gives ChatGPT and Gemini long-term semantic memory, remembering user context across sessions. Implemented semantic search and embeddings for contextual recall. Integrated with multiple LLM APIs for cross-AI memory consistency with sleek UI overlay for in-browser context management.",
      tech: ["JavaScript", "OpenAI API", "Chrome API", "Vector Embeddings", "Semantic Search"],
      category: "Browser Extension",
      github: "https://github.com/mindbruster",
      demo: "#",
      year: "2024",
      achievement: "Enabled memory-aware conversations across AI assistants",
      role: "Core developer - Memory logic, API integration, Chrome Manifest v3",
    },
    {
      title: "Litter Detection System (PSCA)",
      description: "AI-based real-time litter detection system that identifies vehicles involved in littering using surveillance footage. Trained YOLOv8 model on custom dataset with 92% detection accuracy. Integrated ANPR for vehicle license plate extraction and automated violation flagging.",
      tech: ["YOLOv8", "OpenCV", "ANPR", "Python", "DeepSort"],
      category: "Computer Vision",
      github: "https://github.com/mindbruster",
      demo: "#",
      year: "2024",
      achievement: "92% accuracy - Deployed with Punjab Safe Cities Authority",
      role: "Lead ML engineer - Model training, ANPR integration, real-time deployment",
    },
    {
      title: "Authentication Chatbot App",
      description: "Web app combining chatbot intelligence with authentication & admin control. Integrated RAG architecture for context retrieval from stored conversation history. Implemented OAuth login with user-based access control, editable prompts, and admin dashboard for session monitoring.",
      tech: ["SvelteKit", "PostgreSQL", "RAG", "OAuth", "LangChain", "FastAPI"],
      category: "AI/ML",
      github: "https://github.com/mindbruster",
      demo: "#",
      year: "2024",
      achievement: "Enterprise-style chatbot with personalized context-aware responses",
      role: "Full-stack developer - Auth system, RAG flow, conversation storage",
    },
    {
      title: "CodeFest",
      description: "Desktop app for hosting and participating in coding competitions. Designed contest module for admins to create and manage events with practice problem bank, leaderboard scoring system, and MongoDB integration for data management.",
      tech: ["Java", "MongoDB", "Swing GUI", "OOP"],
      category: "Desktop App",
      github: "https://github.com/mindbruster",
      demo: "#",
      year: "2024",
      achievement: "Used for university coding events and practice sessions",
      role: "Solo developer - Complete backend logic and UI",
    },
    {
      title: "Flex-Break (Security Project)",
      description: "Improved university portal with GPA/CGPA calculators, quick-access tools, and student shortcuts. Discovered and responsibly reported critical login vulnerability affecting session management. Implemented UI enhancements and secure login measures post-fix.",
      tech: ["JavaScript", "HTML/CSS", "MySQL", "Security Testing"],
      category: "Security",
      github: "https://github.com/mindbruster",
      demo: "#",
      year: "2023",
      achievement: "Enhanced productivity & improved security on campus",
      role: "Frontend & security developer - Feature layer & vulnerability reporting",
    },
  ];

  return (
    <section id="projects" ref={ref} className="w-full py-32 relative flex justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-display">
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-neon-gradient mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of AI, ML, and web development projects with real-world applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group w-full max-w-md"
            >
              <div className="glass h-full w-full rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all hover:neon-glow transform hover:scale-105 flex flex-col">
                {/* Category & Year */}
                <div className="flex items-start justify-between mb-6">
                  <span className="px-3 py-1.5 bg-primary-500/20 border border-primary-500/50 rounded-lg text-sm text-primary-400 font-medium">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-100 mb-4 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Achievement */}
                {project.achievement && (
                  <div className="mb-4 p-3 bg-accent-500/10 border border-accent-500/30 rounded-lg">
                    <p className="text-accent-400 text-xs font-medium">✓ {project.achievement}</p>
                  </div>
                )}

                {/* Role */}
                {project.role && (
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs italic">Role: {project.role}</p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 bg-dark-border rounded text-xs text-gray-500 hover:text-primary-400 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
