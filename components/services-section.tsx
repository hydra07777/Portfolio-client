"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, Smartphone, Palette, Wrench } from "lucide-react"
import SectionWrapper from "./section-wrapper"
import { useDeviceType } from "@/hooks/useDeviceType"

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    description:
      "Sites web et applications web personnalisés construit avec des frameworks modernes pour une performance et une scalabilité exceptionnelles.",
    color: "#2563EB",
    features: ["Next.js & React", "Design Responsif", "SEO Optimisé", "Rapide & Sécurisé"],
  },
  {
    icon: Smartphone,
    title: "Applications Web",
    description:
      "Applications full-stack avec des interfaces utilisateur riches, des fonctionnalités temps réel et une architecture backend robuste.",
    color: "#7C3AED",
    features: ["Full-Stack", "Temps Réel", "Déploy Cloud", "Intégration API"],
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    description:
      "Design centré sur l'utilisateur qui combine l'esthétique et la fonctionnalité pour créer des expériences numériques intuitives.",
    color: "#06B6D4",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Wrench,
    title: "Maintenance et Support",
    description:
      "Support technique continu, surveillance des performances et améliorations permanentes pour maintenir votre projet en bon fonctionnement.",
    color: "#2563EB",
    features: ["Surveillance 24/7", "Corrections de Bugs", "Mises à jour", "Performance"],
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative glass rounded-2xl hover:bg-[#1E293B]/80 transition-all duration-500 hover:shadow-xl"
      style={{
        padding: window.innerWidth < 768 ? '1.25rem' : '2rem',
        boxShadow: `0 0 0 rgba(0, 0, 0, 0)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px rgba(37, 99, 235, 0.15), 0 0 60px rgba(37, 99, 235, 0.05)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 rgba(0, 0, 0, 0)`
      }}  
    >
      <div
        className="rounded-xl flex items-center justify-center mb-6"
        style={{ background: `${service.color}20`, width: window.innerWidth < 768 ? '2.5rem' : '3rem', height: window.innerWidth < 768 ? '2.5rem' : '3rem' }}
      >
        <service.icon className="w-6 h-6" style={{ color: service.color }} />
      </div>

      <h3 className="font-bold text-[#E2E8F0] mb-3" style={{ fontSize: window.innerWidth < 768 ? '1.05rem' : '1.25rem' }}>{service.title}</h3>
      <p className="text-[#94A3B8] leading-relaxed mb-6 text-pretty" style={{ fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>{service.description}</p>

      <div className="flex flex-wrap gap-2">
        {service.features.map((feature) => (
          <span
            key={feature}
            className="text-xs px-3 py-1 rounded-full text-[#94A3B8]"
            style={{ background: `${service.color}10`, border: `1px solid ${service.color}25` }}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Decorative corner glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${service.color}10` }}
      />
    </motion.div>
  )
}

export default function ServicesSection() {
  const { isMobile, isTablet } = useDeviceType()
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl" style={{ padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
        <div className="text-center" style={{ marginBottom: isMobile ? '2rem' : '4rem' }}>
          <span className="inline-block font-medium text-[#06B6D4] tracking-wide uppercase" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', marginBottom: '1rem' }}>
            Nos Services
          </span>
          <h2 className="font-bold text-[#E2E8F0] text-balance" style={{ fontSize: isMobile ? '1.875rem' : isTablet ? '2.25rem' : '3rem', marginBottom: isMobile ? '1rem' : '1rem' }}>
            Ce Que Nous Faisons de Mieux
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty" style={{ marginTop: isMobile ? '1rem' : '1rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            Nous proposons des services numériques complets pour aider votre entreprise à prospérer dans le paysage moderne, du concept au déploiement et au-delà.
          </p>
        </div>

        <div className="gap-6" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)' }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
