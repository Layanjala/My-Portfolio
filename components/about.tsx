'use client'

import { useEffect, useRef, useState } from 'react'

export function About() {
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
    <section id="about" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-[#F5F3F0] to-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          style={{ color: '#3D348B' }}
        >
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}`}>
            <p
              className="text-lg leading-relaxed"
              style={{ color: '#3D3E65' }}
            >
              I'm a BSc Honours Computer Science and Technology undergraduate at Uva Wellassa University of Sri Lanka. I'm passionate about software development and data science, with a strong focus on Python ecosystem technologies.
            </p>

            <p
              className="text-lg leading-relaxed"
              style={{ color: '#3D3E65' }}
            >
              As a quick learner and motivated individual, I continuously explore new technologies and best practices to build efficient and scalable solutions. My goal is to contribute meaningfully to projects as a Python Developer, Data Analyst, or Data Scientist.
            </p>

            <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: '#5F1773' }}
              >
                Education
              </h3>
              <div className="glass-card p-4 rounded-lg" style={{ borderLeft: '4px solid #3D348B' }}>
                <h4 className="font-semibold text-lg" style={{ color: '#3D348B' }}>
                  BSc Hons Computer Science and Technology
                </h4>
                <p style={{ color: '#3D3E65' }}>Uva Wellassa University of Sri Lanka</p>
                <p className="text-sm opacity-75">Undergraduate</p>
              </div>
            </div>
          </div>

          <div
            className={`glass-card p-8 rounded-lg transition-all duration-700 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}`}
          >
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: '#3D348B' }}
            >
              Why Work With Me
            </h3>
            <ul className="space-y-4">
              {[
                'Quick learner and adaptable to new technologies',
                'Strong problem-solving skills',
                'Attention to detail and code quality',
                'Collaborative team player',
                'Motivated to deliver excellence',
                'Continuous commitment to learning'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${0.1 + (i * 0.05)}s` }}>
                  <span
                    className="font-bold text-lg mt-1 animate-pulse-subtle"
                    style={{ color: '#5F1773' }}
                  >
                    ✓
                  </span>
                  <span style={{ color: '#3D348B' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
