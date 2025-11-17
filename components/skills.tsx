'use client'

import { useEffect, useRef, useState } from 'react'

export function Skills() {
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

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'SQL', 'JavaScript', 'HTML', 'CSS']
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['Django', 'Flask', 'React', 'Tailwind CSS']
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'SQLite']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Pandas', 'NumPy']
    }
  ]

  return (
    <section
      id="skills"
      className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-[#F5F3F0] to-white"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          style={{ color: '#3D348B' }}
        >
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`glass-card p-6 rounded-lg card-hover transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: isVisible ? `${index * 0.1}s` : '0s' }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: '#5F1773' }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full font-semibold text-sm skill-badge transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-[#3D348B]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
