'use client'

import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-[#F5F3F0] to-white"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          style={{ color: '#3D348B' }}
        >
          Get In Touch
        </h2>

        <div className={`glass-card rounded-lg p-8 md:p-12 transition-all duration-700 ${isVisible ? 'animate-fade-in-scale' : 'opacity-0 scale-95'}`}>
          <p
            className="text-lg text-center mb-12"
            style={{ color: '#3D3E65' }}
          >
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all duration-300 hover:scale-110 animate-float glass"
                style={{ backgroundColor: '#C2E7D9' }}
              >
                <Mail style={{ color: '#3D348B' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#3D348B' }}>
                Email
              </h3>
              <a
                href="mailto:your.email@example.com"
                style={{ color: '#5F1773' }}
                className="hover:underline transition-all duration-300"
              >
                your.email@example.com
              </a>
            </div>

            <div className={`text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.2s' : '0s' }}>
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all duration-300 hover:scale-110 animate-float glass"
                style={{ backgroundColor: '#C2E7D9' }}
              >
                <Phone style={{ color: '#3D348B' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#3D348B' }}>
                Phone
              </h3>
              <a
                href="tel:+94712345678"
                style={{ color: '#5F1773' }}
                className="hover:underline transition-all duration-300"
              >
                +94 71 234 5678
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 pt-12">
            <h3
              className={`text-2xl font-bold mb-8 text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ color: '#3D348B', animationDelay: isVisible ? '0.3s' : '0s' }}
            >
              Connect With Me
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg glass ${isVisible ? 'animate-fade-in-scale' : 'opacity-0'}`}
                style={{ backgroundColor: '#C2E7D9', animationDelay: isVisible ? '0.4s' : '0s' }}
                title="GitHub"
              >
                <Github size={24} style={{ color: '#3D348B' }} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg glass ${isVisible ? 'animate-fade-in-scale' : 'opacity-0'}`}
                style={{ backgroundColor: '#C2E7D9', animationDelay: isVisible ? '0.5s' : '0s' }}
                title="LinkedIn"
              >
                <Linkedin size={24} style={{ color: '#3D348B' }} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg glass ${isVisible ? 'animate-fade-in-scale' : 'opacity-0'}`}
                style={{ backgroundColor: '#C2E7D9', animationDelay: isVisible ? '0.6s' : '0s' }}
                title="Portfolio"
              >
                <MapPin size={24} style={{ color: '#3D348B' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
