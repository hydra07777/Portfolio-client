"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, PenTool, Code, Rocket } from "lucide-react"
import SectionWrapper from "./section-wrapper"
import { useDeviceType } from "@/hooks/useDeviceType"

const steps = [
  {
    icon: Search,
    title: "Analyse",
    description: "Nous approfondissons notre compréhension de vos besoins métier, de votre public cible et de vos objectifs de projet.",
    color: "#2563EB",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Nos designers créent des maquettes et prototypes magnifiques qui s'alignent avec votre marque et les besoins des utilisateurs.",
    color: "#7C3AED",
    step: "02",
  },
  {
    icon: Code,
    title: "Développement",
    description: "Nos ingénieurs donnent vie aux designs avec un code propre, efficace et évolutif.",
    color: "#06B6D4",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Livraison",
    description: "Nous déployons, testons et optimisons votre projet pour assurer un lancement impeccable et un support continu.",
    color: "#2563EB",
    step: "04",
  },
]

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-start gap-6"
    >
      {/* Vertical line + circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center relative z-10"
          style={{
            background: `${step.color}15`,
            border: `2px solid ${step.color}40`,
          }}
        >
          <step.icon className="w-6 h-6" style={{ color: step.color }} />
        </div>
        {!isLast && (
          <div
            className="w-0.5 mt-2"
            style={{
              background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
              height: window.innerWidth < 768 ? '3rem' : '5rem',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pt-2" style={{ paddingBottom: window.innerWidth < 768 ? '1rem' : '2rem' }}>
        <div className="flex items-center gap-3 mb-2">
          <span
            className="font-mono font-bold"
            style={{ color: step.color, fontSize: window.innerWidth < 768 ? '0.625rem' : '0.75rem' }}
          >
            ÉTAPE {step.step}
          </span>
        </div>
        <h3 className="font-bold text-[#E2E8F0] mb-2" style={{ fontSize: window.innerWidth < 768 ? '1.05rem' : '1.25rem' }}>{step.title}</h3>
        <p className="text-[#94A3B8] leading-relaxed max-w-md text-pretty" style={{ fontSize: window.innerWidth < 768 ? '0.875rem' : '1rem' }}>{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function ProcessSection() {
  const { isMobile, isTablet } = useDeviceType()
  return (
    <SectionWrapper id="process">
      <div className="mx-auto max-w-7xl" style={{ padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block font-medium text-[#06B6D4] tracking-wide uppercase" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', marginBottom: '1rem' }}>
              Notre Processus
            </span>
            <h2 className="font-bold text-[#E2E8F0] text-balance" style={{ fontSize: isMobile ? '1.875rem' : isTablet ? '2.25rem' : '3rem', marginBottom: isMobile ? '1rem' : '1rem' }}>
              Comment Nous Travaillons
            </h2>
            <p className="text-[#94A3B8] leading-relaxed text-pretty" style={{ marginTop: isMobile ? '1rem' : '1rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
              Notre processus éprouvé en quatre étapes garantit que chaque projet est livré à temps, dans le budget, et dépassant les attentes. Nous vous impliquez à chaque étape pour une transparence complète.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-6" style={{ marginTop: isMobile ? '1.5rem' : '2.5rem' }}>
              {[
                { value: "100%", label: "Livraison Ponctuelle" },
                { value: "4 Étapes", label: "Processus Clair" },
                { value: "24/7", label: "Support Disponible" },
                { value: "Agile", label: "Méthodologie" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl" style={{ padding: isMobile ? '1rem' : '1rem' }}>
                  <div className="font-bold text-gradient" style={{ fontSize: isMobile ? '1.05rem' : '1.125rem' }}>{stat.value}</div>
                  <div className="text-[#94A3B8] mt-1" style={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
