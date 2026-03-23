"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import SectionWrapper from "./section-wrapper"

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Application",
    description: "A full-featured e-commerce platform with real-time inventory management, payment integration, and analytics dashboard.",
    tech: ["React", "Node.js", "MySQL", "Stripe"],
    color: "#EC4899",
  },
  {
    title: "Healthcare Dashboard",
    category: "Web Application",
    description: "An intuitive healthcare management dashboard for patient tracking, appointments, and medical records.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL"],
    color: "#F59E0B",
  },
  {
    title: "FinTech Mobile App",
    category: "Mobile Application",
    description: "A secure banking application with real-time transactions, biometric authentication, and financial insights.",
    tech: ["React Native", "Java", "MySQL"],
    color: "#10B981",
  },
  {
    title: "DevAgency Manager",
    category: "SaaS Platform",
    description: "Our flagship project management tool designed for agencies to streamline workflows and client communication.",
    tech: ["Next.js", "Node.js", "MongoDB", "WebSocket"],
    color: "#EC4899",
  },
  {
    title: "Real Estate Portal",
    category: "Web Application",
    description: "A modern real estate platform with virtual tours, advanced search filters, and AI-powered recommendations.",
    tech: ["React", "Spring Boot", "MySQL"],
    color: "#F59E0B",
  },
  {
    title: "Education Platform",
    category: "Web Application",
    description: "An interactive learning management system with video streaming, live classes, and progress tracking.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    color: "#10B981",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
    >
      {/* Project preview area */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
        }}
      >
        {/* Abstract grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${project.color}20 1px, transparent 1px),
                linear-gradient(90deg, ${project.color}20 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {/* Floating elements */}
        <div
          className="absolute top-6 right-6 w-16 h-16 rounded-lg border opacity-30 group-hover:opacity-60 transition-opacity duration-500 group-hover:rotate-12 transition-transform"
          style={{ borderColor: project.color }}
        />
        <div
          className="absolute bottom-6 left-6 w-10 h-10 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: project.color }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1E293B]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-4 h-4 text-[#E2E8F0]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#E2E8F0] group-hover:text-gradient transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed text-pretty">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-md bg-[#1E293B] text-[#94A3B8] border border-[#334155]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#10B981] tracking-wide uppercase mb-4">
            Our Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] text-balance">
            Featured Work
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty">
            Explore our portfolio of successful projects, each crafted with precision
            and passion to deliver exceptional results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#EC4899] hover:text-[#10B981] transition-colors font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Want to see more? Let{"'"}s talk about your project
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
