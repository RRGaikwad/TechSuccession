import { MessageSquare, Palette, Code2, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Requirement Discussion',
    description: 'We discuss your business needs, challenges, and goals to plan the perfect solution.',
  },
  {
    icon: Palette,
    step: '02',
    title: 'UI/UX Planning',
    description: 'We design intuitive interfaces that your team and customers will love using.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Development',
    description: 'AI-assisted rapid development to build your solution in the shortest time possible.',
  },
  {
    icon: TestTube,
    step: '04',
    title: 'Testing & QA',
    description: 'Thorough testing across all devices to ensure everything works perfectly.',
  },
  {
    icon: Rocket,
    step: '05',
    title: 'Deployment & Support',
    description: 'We deploy your app and provide ongoing support to keep things running smoothly.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            How We <span className="gradient-text">Build Your Solution</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A simple, transparent 5-step process from idea to launch.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric via-accent-purple to-accent-cyan -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group">
                <div className="glass rounded-2xl p-6 text-center hover-lift h-full">
                  {/* Step number */}
                  <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-electric to-accent-purple flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-bold text-electric mb-2 tracking-wider">STEP {step.step}</div>
                  <h3 className="text-lg font-bold text-white font-[Poppins] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2 text-electric">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
