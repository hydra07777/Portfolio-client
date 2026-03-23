"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import SectionWrapper from "./section-wrapper"
import { useDeviceType } from "@/hooks/useDeviceType"

export default function ContactSection() {
  const { isMobile, isTablet } = useDeviceType()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-7xl" style={{ padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
        <div className="text-center" style={{ marginBottom: isMobile ? '2rem' : '4rem' }}>
          <span className="inline-block font-medium text-[#06B6D4] tracking-wide uppercase" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', marginBottom: '1rem' }}>
            Nous Contacter
          </span>
          <h2 className="font-bold text-[#E2E8F0] text-balance" style={{ fontSize: isMobile ? '1.875rem' : isTablet ? '2.25rem' : '3rem', marginBottom: isMobile ? '1rem' : '1rem' }}>
            Lancez Votre Projet Aujourd'hui
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty" style={{ marginTop: isMobile ? '1rem' : '1rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            Vous avez une idée en tête? Nous adorerions l'entendre. Contactez-nous et discutons ensemble d'une stratégie de croissance.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8" style={{ gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(5, 1fr)' }}>
          {/* Contact info */}
          <div className="md:col-span-2 flex flex-col gap-6" style={{ gridColumn: isMobile ? '1' : isTablet ? '1 / span 2' : '1 / span 2' }}>
            <div className="glass rounded-2xl flex flex-col gap-8" style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
              <div>
                <h3 className="font-bold text-[#E2E8F0] mb-2" style={{ fontSize: isMobile ? '1.05rem' : '1.125rem' }}>Informations de Contact</h3>
                <p className="text-[#94A3B8] leading-relaxed" style={{ fontSize: isMobile ? '0.875rem' : '0.9rem' }}>
                  Remplissez le formulaire et notre équipe vous recontactera dans les 24 heures.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Mail, label: "Email", value: "contact@devagency.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Address", value: "123 Tech Street, Digital City" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <item.icon className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#94A3B8]">{item.label}</div>
                      <div className="text-sm text-[#E2E8F0]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-auto">
                {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center font-medium text-[#94A3B8] hover:text-[#E2E8F0] hover:border-[#2563EB]/50 transition-all"
                    style={{ width: '2.5rem', height: '2.5rem', fontSize: '0.75rem' }}
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3" style={{ gridColumn: isMobile ? '1' : isTablet ? '1 / span 2' : '3 / span 3' }}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl flex flex-col gap-6" style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
              <div className="grid sm:grid-cols-2 gap-6" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-medium text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                    style={{ fontSize: isMobile ? '0.9rem' : '0.875rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                    style={{ fontSize: isMobile ? '0.9rem' : '0.875rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-medium text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}>
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                  style={{ fontSize: isMobile ? '0.9rem' : '0.875rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-medium text-[#E2E8F0]" style={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors resize-none"
                  style={{ fontSize: isMobile ? '0.9rem' : '0.875rem' }}
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-[#FFFFFF] font-medium hover:shadow-xl hover:shadow-[#2563EB]/20 transition-shadow"
                style={{ padding: isMobile ? '0.875rem 1.5rem' : '0.875rem 2rem', fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                {submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
