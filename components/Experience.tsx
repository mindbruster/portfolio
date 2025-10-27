"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      title: "AI/ML Intern",
      company: "Vanar",
      duration: "Aug 2025 - Oct 2025",
      description: "Worked on web development and developed a RAG-based chatbot to enable context-aware responses using LLMs. Contributed to AI/ML projects and gained hands-on experience in model building and deployment. Also collaborated on live projects with the team.",
      technologies: ["RAG", "LLMs", "Python", "Web Development", "ML Models"],
    },
    {
      title: "FYP Collaboration",
      company: "PSCA Lahore",
      duration: "Nov 2024 - Jan 2025",
      description: "Developed and tested an AI-powered litter detection system in collaboration with PSCA, integrating YOLO-based object detection and ANPR for real-time offender tracking through surveillance cameras.",
      technologies: ["YOLO", "Computer Vision", "ANPR", "OpenCV", "Python"],
    },
    {
      title: "AI/ML Intern",
      company: "ITSOLERA",
      duration: "July 2024 - Sep 2024",
      description: "Contributed to AI/ML projects, including a fake news detector and earthquake detection system, applying TensorFlow and PyTorch for model training and evaluation, improving classification accuracy and data handling workflows.",
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Python", "ML"],
    },
  ];

  return (
    <section id="experience" ref={ref} className="w-full py-32 relative flex justify-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-display">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-neon-gradient mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional journey in AI, ML, and software development
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-transparent"></div>
              )}

              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-neon-gradient flex items-center justify-center p-1">
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    </div>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pb-12">
                  <div className="glass rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all hover:neon-glow">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-100">{exp.title}</h3>
                      <span className="px-4 py-1 bg-primary-500/20 border border-primary-500/50 rounded-full text-primary-400 text-sm font-medium">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{exp.duration}</p>
                    <p className="text-gray-400 leading-relaxed mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-lg text-sm text-primary-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
