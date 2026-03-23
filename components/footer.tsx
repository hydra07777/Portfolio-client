"use client"

import { Code2 } from "lucide-react"
import { useDeviceType } from "@/hooks/useDeviceType"

export default function Footer() {
  const { isMobile, isTablet } = useDeviceType()
  return (
    <footer className="relative border-t border-[#334155]/50 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl" style={{ padding: isMobile ? '4rem 1.5rem' : isTablet ? '4rem 2rem' : '4rem 3rem' }}>
        <div className="gap-10" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)' }}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2" style={{ marginBottom: isMobile ? '1rem' : '1rem' }}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-[#FFFFFF]" />
              </div>
              <span className="font-sans font-bold text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                ArcaneCore<span className="text-gradient"></span>
              </span>
            </a>
            <p className="text-[#94A3B8] leading-relaxed" style={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}>
              Une agence digitale pensée pour la performance, la fluidité et l'immersion. Nous accompagnons les entreprises ambitieuses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.95rem' : '1rem', marginBottom: '1rem' }}>Services</h4>
            <ul className="flex flex-col gap-3">
              {["Développement Web", "Applications Web", "Design UI/UX", "Maintenance"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors" style={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.95rem' : '1rem', marginBottom: '1rem' }}>Entreprise</h4>
            <ul className="flex flex-col gap-3">
              {["À propos", "Projets", "Processus", "Contact"].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s.toLowerCase().replace(" ", "")}`}
                    className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                    style={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.95rem' : '1rem', marginBottom: '1rem' }}>Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-[#94A3B8]" style={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}>contact@devagency.com</li>
              <li className="text-[#94A3B8]" style={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}>+1 (555) 123-4567</li>
              <li className="text-[#94A3B8]" style={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}>123 Tech Street, Digital City</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4" 
          style={{
            marginTop: isMobile ? '2rem' : '3rem',
            paddingTop: isMobile ? '2rem' : '2rem',
            borderTop: '1px solid rgba(52, 65, 85, 0.5)',
          }}
        >
          <p className="text-[#94A3B8]" style={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
            © 2025 ArcaneCore. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Politique de Confidentialité", "Conditions"].map((link) => (
              <a key={link} href="#" className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors" style={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
