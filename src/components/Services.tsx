import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getIconByName } from '../data/portfolioData';

export default function Services() {
  const { services } = usePortfolio();

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Solutions That <span className="gradient-text">Grow Your Business</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From websites to AI automation — everything your business needs to go digital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group glass rounded-2xl p-6 hover-lift cursor-pointer ${service.shadowColor} ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {(() => {
                const Icon = getIconByName(service.iconName);
                return (
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                );
              })()}

              <h3 className="text-xl font-bold text-white font-[Poppins] mb-2">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-xs text-slate-500">Starting from</span>
                  <div className="text-2xl font-bold text-white font-[Poppins]">{service.price}</div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-electric text-sm font-semibold group-hover:gap-2 transition-all"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
