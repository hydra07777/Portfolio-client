"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code2 } from "lucide-react"

const navLinks = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Technologies", href: "#technologies" },
  { label: "Processus", href: "#process" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-[#2563EB]/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#2563EB]/30 transition-shadow">
            <Code2 className="w-5 h-5 text-[#FFFFFF]" />
          </div>
          <span className="font-sans font-bold text-lg text-[#E2E8F0]">
            ArcaneCore<span className="text-gradient"></span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-sm font-medium text-[#FFFFFF] hover:shadow-lg hover:shadow-[#2563EB]/30 transition-all"
        >
          Commencer
        </a>

        <button
          className="md:hidden text-[#E2E8F0]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#334155]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#EC4899] to-[#F59E0B] text-sm font-medium text-[#FFFFFF]"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
