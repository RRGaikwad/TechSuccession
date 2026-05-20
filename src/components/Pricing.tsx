import { Check, ArrowRight, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Pricing() {
  const { pricingPlans } = usePortfolio();

  return (
    <section id="pricing" className="py-20 md:py-28 relative bg-navy-800/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Simple, <span className="gradient-text">Honest Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            No hidden charges. No surprise fees. Know exactly what you're paying for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass rounded-2xl p-6 hover-lift flex flex-col ${
                plan.popular ? 'ring-2 ring-electric glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-electric to-accent-purple rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${plan.color} text-white mb-4`}>
                {plan.name}
              </div>

              <div className="mb-1">
                <span className="text-3xl font-bold text-white font-[Poppins]">{plan.price}</span>
                <span className="text-slate-400 text-sm ml-1">/ {plan.period}</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-electric flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-electric to-accent-purple text-white hover:shadow-lg hover:shadow-electric/25'
                    : 'glass text-white hover:bg-white/5'
                }`}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* AI Automation Custom */}
        <div className="mt-8 glass rounded-2xl p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white font-[Poppins] mb-2">
                🤖 AI Business Automation
              </h3>
              <p className="text-slate-400">
                Need AI chatbots, lead automation, or smart workflows? Every business is different — let's discuss your needs.
              </p>
            </div>
            <a
              href="#contact"
              className="whitespace-nowrap inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-base"
            >
              Get Custom Quote <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
