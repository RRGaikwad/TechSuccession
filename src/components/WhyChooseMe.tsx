import { Zap, IndianRupee, Smartphone, Target } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'AI-Assisted Fast Delivery',
    description: 'Projects completed faster than traditional agencies. Most projects delivered within 1–7 days.',
    stat: '3x Faster',
    color: 'from-yellow-500 to-orange-400',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Custom Solutions',
    description: 'Get custom-built systems without the huge agency pricing. Premium quality at freelancer rates.',
    stat: '60% Savings',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Every application built for smartphone users first. Your customers browse on mobile — we design for that.',
    stat: '100% Responsive',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Target,
    title: 'Business-Focused Development',
    description: 'Software designed around real business operations, not just code. We solve problems, not just build features.',
    stat: 'ROI Driven',
    color: 'from-purple-500 to-pink-400',
  },
];

export default function WhyChooseMe() {
  return (
    <section className="py-20 md:py-28 relative bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Why Businesses <span className="gradient-text">Trust Us</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We're not just developers. We're business solution architects who understand your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="glass rounded-2xl p-8 hover-lift group">
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center flex-shrink-0`}>
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white font-[Poppins]">
                      {reason.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${reason.color} text-white`}>
                      {reason.stat}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
