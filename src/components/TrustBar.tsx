import { Zap, Smartphone, Bot, Settings, Headphones } from 'lucide-react';

const trustItems = [
  { icon: Zap, label: 'Fast Delivery' },
  { icon: Smartphone, label: 'Mobile Friendly' },
  { icon: Bot, label: 'AI-Powered Development' },
  { icon: Settings, label: 'Custom Solutions' },
  { icon: Headphones, label: 'Support Included' },
];

export default function TrustBar() {
  return (
    <section className="relative py-8 border-y border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-x-4 gap-y-6 md:gap-12 lg:gap-16">
          {trustItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-center md:justify-start gap-2.5 text-slate-400 group ${
                index === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-electric group-hover:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-sm font-medium tracking-tight sm:tracking-normal">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
