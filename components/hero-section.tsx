"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("./scene-3d"), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-3xl" />
      </div>

      {/* 3D Scene */}
      <Scene3D />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#06B6D4]" />
          <span className="text-sm text-[#94A3B8]">Construire l'Avenir du Digital</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-balance"
        >
          <span className="text-[#E2E8F0]">Nous Construisons </span>
          <span className="text-gradient">des Solutions</span>
          <br />
          <span className="text-[#E2E8F0]">Digitales Puissantes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          From stunning websites to high-performance applications, we craft digital experiences
          that drive growth and leave lasting impressions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-[#FFFFFF] font-medium hover:shadow-xl hover:shadow-[#2563EB]/20 transition-all"
          >
            Lancer mon projet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg glass text-[#E2E8F0] font-medium hover:bg-[#1E293B]/80 transition-all"
          >
            Voir les projets en action
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "30+", label: "Projets livrés" },
            { value: "99.9%", label: "Disponibilité moyenne" },
            { value: "95/100", label: "Score Core Web Vitals" },
            { value: "30+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
            { value: "99%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-1 text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#334155] flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
          />
        </div>
      </motion.div>
    </section>
  )
}
