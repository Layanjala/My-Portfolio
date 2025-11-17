'use client'

import { ExternalLink, Github } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Projects() {
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

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Django and PostgreSQL, featuring user authentication, product catalog, and order management.',
      technologies: ['Django', 'PostgreSQL', 'HTML/CSS', 'JavaScript'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Data Analysis Dashboard',
      description: 'Interactive data visualization dashboard analyzing business metrics and trends using Python, Pandas, and visualization libraries.',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Flask'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management App',
      description: 'A Flask-based web application for managing tasks with features like user profiles, task categories, and progress tracking.',
      technologies: ['Flask', 'SQLite', 'Bootstrap', 'JavaScript'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Weather Prediction Model',
      description: 'Machine learning model for weather prediction using historical data, built with Python and scikit-learn.',
      technologies: ['Python', 'NumPy', 'Scikit-learn', 'Jupyter'],
      github: '#',
      demo: '#'
    }
  ]

  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-[#F5F3F0] to-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-12 text-center transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          style={{ color: '#3D348B' }}
        >
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-card rounded-lg overflow-hidden card-hover transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: isVisible ? `${index * 0.15}s` : '0s' }}
            >
              <div
                className="h-32 animate-pulse-subtle"
                style={{
                  background: 'linear-gradient(135deg, #3D348B 0%, #5F1773 100%)'
                }}
              ></div>

              <div className="p-6">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#3D348B' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: '#3D3E65' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full skill-badge transition-all hover:scale-110"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: '#3D3E65',
                      color: '#C2E7D9'
                    }}
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: '#C2E7D9',
                      color: '#3D348B'
                    }}
                  >
                    <ExternalLink size={18} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
