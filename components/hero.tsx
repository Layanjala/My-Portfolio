import { Download, Github, Linkedin, Mail, Phone } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="home"
      className="gradient-hero text-white py-20 md:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
          {/* Photo Section */}
          <div className="animate-fade-in-scale">
            <div className="profile-photo mx-auto">
              <img
                src="/professional-portrait-photo.jpg"
                alt="LayanJala Yasashrini Jayasundara"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
              Layanjala Yasashrini Jayasundara
            </h1>
            <p className="text-xl md:text-2xl mb-2 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Python Developer | Data Analyst | Data Scientist
            </p>
            <p className="text-lg opacity-80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              BSc Hons Computer Science & Technology | Uva Wellassa University
            </p>
            <p className="text-lg opacity-75 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Motivated and quick learner with expertise in Python, Django, Flask, PostgreSQL, and SQL. Passionate about building scalable solutions and uncovering insights from data.
            </p>

            {/* Social Links and CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#C2E7D9', color: '#3D348B' }}
              >
                <Download size={20} />
                Download CV
              </a>

              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
                  style={{ backgroundColor: 'rgba(194, 231, 217, 0.3)' }}
                  title="Email"
                >
                  <Mail size={24} />
                </a>
                <a
                  href="#contact"
                  className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
                  style={{ backgroundColor: 'rgba(194, 231, 217, 0.3)' }}
                  title="Phone"
                >
                  <Phone size={24} />
                </a>
                <a
                  href="#contact"
                  className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
                  style={{ backgroundColor: 'rgba(194, 231, 217, 0.3)' }}
                  title="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="#contact"
                  className="p-3 rounded-full transition-all hover:scale-125 hover:shadow-lg"
                  style={{ backgroundColor: 'rgba(194, 231, 217, 0.3)' }}
                  title="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
