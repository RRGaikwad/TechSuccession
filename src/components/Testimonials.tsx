import { Star, Quote } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Testimonials() {
  const { testimonials } = usePortfolio();

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real feedback from business owners who trusted us with their digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="glass rounded-2xl p-6 md:p-8 hover-lift">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-electric/20" />
                <p className="text-slate-300 leading-relaxed pl-6 italic">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-accent-purple flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
