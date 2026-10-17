'use client'

import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  // Highlight the link of whichever section sits in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    ;['#home', ...navLinks.map((link) => link.href)].forEach((href) => {
      const section = document.querySelector(href)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-50 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, paddingTop: scrolled ? 8 : 16 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`relative max-w-6xl mx-auto flex items-center justify-between rounded-2xl border px-4 transition-all duration-500 backdrop-blur-xl ${
          scrolled
            ? 'py-2 bg-ink-900/80 border-line shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]'
            : 'py-3 bg-white/[0.03] border-white/10'
        }`}
      >
        {/* Scroll progress bar */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-brand-violet via-brand-blue to-brand-cyan"
            style={{ scaleX: progress }}
          />
        </div>

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3" style={{ perspective: 600 }}>
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-blue font-display text-sm font-bold text-white ring-1 ring-white/20 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 0.8 }}
          >
            LYJ
          </motion.span>
          <span className="hidden sm:block font-display font-semibold tracking-wide text-fg">
            Layanjala<span className="text-brand-cyan">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-brand-violet/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <a
                href={link.href}
                aria-current={active === link.href ? 'true' : undefined}
                className={`group relative block px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === link.href ? 'text-fg' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {link.label}
                {/* Hover underline */}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-violet to-brand-cyan transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href="/Layanjala CV Resume.pdf"
            download="Layanjala CV Resume.pdf"
            className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Download CV
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-fg ring-1 ring-white/15"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              id="mobile-nav"
              className="absolute top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-2xl border border-line bg-ink-900 p-3 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] lg:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                      active === link.href
                        ? 'bg-white/10 text-brand-cyan'
                        : 'text-fg-muted hover:bg-white/5 hover:text-fg'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="sm:hidden">
                <a
                  href="/Layanjala CV Resume.pdf"
                  download="Layanjala CV Resume.pdf"
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-violet to-brand-blue px-4 py-3 text-sm font-semibold text-white"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
