import { ArrowRight, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects() {
  const { projects, trackEvent } = usePortfolio();

  const formatUrl = (url: string) => {
    if (!url) return null;
    if (url === '#') return '#contact'; // Redirect to contact if no link is provided
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Real Solutions, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See how we've helped businesses digitize their operations with custom software.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`glass rounded-3xl overflow-hidden group hover-lift ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`grid lg:grid-cols-2 gap-0`}>
                {/* Image */}
                <div className={`relative overflow-hidden min-h-[300px] lg:min-h-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-10`} />
                </div>

                {/* Content */}
                <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${project.color} text-white`}>
                    Case Study
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white font-[Poppins] mb-3">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    <span className="text-slate-300 font-medium">Problem: </span>
                    {project.problem}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 glass-light rounded-lg text-xs font-medium text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-electric to-accent-purple text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-electric/25 transition-all"
                    >
                      Book Similar App <ArrowRight className="w-4 h-4" />
                    </a>
                    {formatUrl(project.demoLink || '') && (
                      <a 
                        href={formatUrl(project.demoLink || '') || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 glass text-white text-sm font-semibold rounded-xl hover:bg-white/5 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
