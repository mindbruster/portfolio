"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = {
    "AI/ML": ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "OpenCV", "YOLO", "RAG"],
    "Web": ["SvelteKit", "FastAPI", "Tailwind", "REST API", "HTML/CSS", "JavaScript", "TypeScript"],
    "Database": ["PostgreSQL", "MongoDB", "Firebase", "MySQL"],
    "Tools": ["Android Studio", "VS Code", "Jupyter", "N8N", "LangChain", "Docker", "Git"],
  };

  return (
    <section id="skills" ref={ref} className="w-full py-32 relative flex justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-display">
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-neon-gradient mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-8 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all neon-glow"
            >
              <h3 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-3xl">
                  {category === "AI/ML" && "🤖"}
                  {category === "Web" && "💻"}
                  {category === "Database" && "🗄️"}
                  {category === "Tools" && "🛠️"}
                </span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-lg text-sm text-primary-400 font-medium hover:bg-primary-500/20 hover:border-primary-500/50 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
