"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import SectionWrapper from "./section-wrapper"
import { useDeviceType } from "@/hooks/useDeviceType"

const technologies = [
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
  { name: "Node.js", slug: "nodedotjs", color: "#68A063" },
  { name: "Java", slug: "java", color: "#ED8B00" },
  { name: "Spring Boot", slug: "springboot", color: "#6DB33F" },
  { name: "MySQL", slug: "mysql", color: "#4479A1" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "Git", slug: "git", color: "#F05032" },
]

function TechCard({
  tech,
  index,
}: {
  tech: (typeof technologies)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative glass rounded-xl p-6 flex flex-col items-center gap-4 hover:bg-[#1E293B]/80 transition-all duration-300"
      style={{
        boxShadow: `0 0 0 rgba(0, 0, 0, 0)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 50px ${tech.color}15, 0 0 50px ${tech.color}08`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 rgba(0, 0, 0, 0)`
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 p-3"
        style={{
          background: `${tech.color}10`,
          border: `1px solid ${tech.color}30`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`} 
          alt={`${tech.name} logo`} 
          className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all"
        />
      </div>
      <span className="font-medium text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors" style={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem' }}>
        {tech.name}
      </span>
    </motion.div>
  )
}

export default function TechnologiesSection() {
  const { isMobile, isTablet } = useDeviceType()
  return (
    <SectionWrapper id="technologies">
      <div className="mx-auto max-w-7xl" style={{ padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
        <div className="text-center" style={{ marginBottom: isMobile ? '2rem' : '4rem' }}>
          <span className="inline-block font-medium text-[#06B6D4] tracking-wide uppercase" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', marginBottom: '1rem' }}>
            Stack Technologique
          </span>
          <h2 className="font-bold text-[#E2E8F0] text-balance" style={{ fontSize: isMobile ? '1.875rem' : isTablet ? '2.25rem' : '3rem', marginBottom: isMobile ? '1rem' : '1rem' }}>
            Technologies Que Nous Utilisons
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty" style={{ marginTop: isMobile ? '1rem' : '1rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            Nous exploitons les technologies les plus fiables et les plus récentes pour construire des solutions évolutives, performantes et maintenables.
          </p>
        </div>

        <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : isTablet ? 'repeat(4, 1fr)' : 'repeat(6, 1fr)' }}>
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Orbiting animation visual */}
        <div className="mt-20 flex justify-center">
          <div className="relative" style={{ width: isMobile ? '12rem' : isTablet ? '14rem' : '16rem', height: isMobile ? '12rem' : isTablet ? '14rem' : '16rem' }}>
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center glow-blue z-10" style={{ width: isMobile ? '2rem' : '3rem', height: isMobile ? '2rem' : '3rem' }}>
              <span className="text-[#FFFFFF] font-bold" style={{ fontSize: isMobile ? '0.625rem' : '0.75rem' }}>DEV</span>
            </div>

            {/* Orbit ring 1 */}
            <div className="absolute inset-4 rounded-full border border-[#334155]/50 animate-[spin_20s_linear_infinite]">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#61DAFB] shadow-lg shadow-[#61DAFB]/30" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#68A063] shadow-lg shadow-[#68A063]/30" />
            </div>

            {/* Orbit ring 2 */}
            <div className="absolute inset-0 rounded-full border border-[#334155]/30 animate-[spin_30s_linear_infinite_reverse]">
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#ED8B00] shadow-lg shadow-[#ED8B00]/30" />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#3178C6] shadow-lg shadow-[#3178C6]/30" />
            </div>

            {/* Orbit ring 3 */}
            <div className="absolute -inset-6 rounded-full border border-[#334155]/20 animate-[spin_40s_linear_infinite]">
              <div className="absolute -top-1.5 left-1/3 w-3 h-3 rounded-full bg-[#06B6D4] shadow-lg shadow-[#06B6D4]/30" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
