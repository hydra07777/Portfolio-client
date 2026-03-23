"use client"

import { useEffect, useState } from "react"
import { Target, Eye, Lightbulb } from "lucide-react"
import SectionWrapper from "./section-wrapper"
import { useDeviceType } from "@/hooks/useDeviceType"

export default function AboutSection() {
  const { isMobile, isTablet } = useDeviceType()
  return (
    <SectionWrapper id="about">
      <div className="mx-auto max-w-7xl" style={{ padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block font-medium text-[#06B6D4] tracking-wide uppercase mb-4" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
              About ArcaneCore
            </span>
            <h2 className="font-bold text-[#E2E8F0] leading-tight text-balance" style={{ fontSize: isMobile ? '1.875rem' : isTablet ? '2.25rem' : '3rem' }}>
              A Digital Agency Designed for Performance
            </h2>
            <p className="text-[#94A3B8] leading-relaxed text-pretty" style={{ marginTop: isMobile ? '1.25rem' : '1.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
              ArcaneCore accompanies ambitious companies in creating robust and scalable digital ecosystems: websites, web applications and business platforms built for speed and reliability. Our team combines technical expertise, product culture and visual storytelling to deliver highly engaging experiences.
            </p>
            <p className="text-[#94A3B8] leading-relaxed text-pretty" style={{ marginTop: isMobile ? '1rem' : '1.25rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
              From analysis to production, we design modern, secure architectures built for growth: microservices, APIs, third-party integrations and process automation, with precise performance management. Modern stack, cloud infrastructure, CI/CD and real-time monitoring ensure reliable, fast and secure products.
            </p>

          </div>

          {/* Right visual */}
          <div className="relative" style={{ display: isMobile ? 'none' : isTablet ? 'none' : 'block' }}>
            <div className="aspect-square rounded-2xl glass p-8 glow-blue">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                {/* Decorative code lines */}
                <div className="w-full max-w-xs space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]/60" />
                  </div>
                  <div className="text-[#7C3AED]">
                    {'const'} <span className="text-[#06B6D4]">agency</span> <span className="text-[#94A3B8]">=</span> <span className="text-[#2563EB]">{'{'}</span>
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    name: <span className="text-[#22C55E]">{'"ArcaneCore"'}</span>,
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    passion: <span className="text-[#22C55E]">{'"Infinite"'}</span>,
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    stack: <span className="text-[#2563EB]">{'['}</span>
                    <span className="text-[#22C55E]">{'"React"'}</span>,
                    <span className="text-[#22C55E]"> {'"Node.js"'}</span>,
                    <span className="text-[#22C55E]"> {'"Next.js"'}</span>
                    <span className="text-[#2563EB]">{']'}</span>,
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    quality: <span className="text-[#F59E0B]">Infinity</span>,
                  </div>
                  <div className="text-[#2563EB]">{'}'}</div>
                  <div className="mt-4 text-[#7C3AED]">
                    {'agency'}.<span className="text-[#06B6D4]">build</span>(<span className="text-[#22C55E]">{'"Your Vision"'}</span>)
                  </div>
                </div>

                {/* Glow effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#2563EB]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#7C3AED]/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
