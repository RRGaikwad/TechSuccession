import { Zap, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const services = [
  { label: 'Business Websites', href: '#services' },
  { label: 'Android Apps', href: '#services' },
  { label: 'Progressive Web Apps', href: '#services' },
  { label: 'AI Automation', href: '#services' },
  { label: 'Management Software', href: '#services' },
];

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const industries = [
  { label: 'Print Shops', href: '#contact' },
  { label: 'Restaurants', href: '#contact' },
  { label: 'Coaching Classes', href: '#contact' },
  { label: 'Gyms & Salons', href: '#contact' },
];

export default function Footer() {
  const { contactInfo } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-navy-950 border-t border-white/5">
      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-r from-electric/10 to-accent-purple/10 glow">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-[Poppins] mb-3">
                Ready to Digitize Your Business?
              </h3>
              <p className="text-slate-400 text-lg">
                Let's discuss your project — free consultation, no commitments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-electric to-accent-purple text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-electric/25 transition-all whitespace-nowrap text-base"
              >
                Book Free Call
              </a>
              <a
                href={`https://wa.me/91${contactInfo.whatsapp}?text=Hi%2C%20I%20need%20a%20business%20app`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#22c55e] transition-all whitespace-nowrap text-base"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-accent-purple flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[Poppins] text-white">
                Tech<span className="gradient-text">Succession</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              AI-Powered Business Software Developer. Helping local businesses grow with modern apps, websites & automation systems.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/91${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric hover:bg-electric/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/techsuccession"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/techsuccession"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 hover:bg-blue-600/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold font-[Poppins] mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-electric transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-[Poppins] mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-electric transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-bold font-[Poppins] mb-4">Industries</h4>
            <ul className="space-y-2.5">
              {industries.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-electric transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} TechSuccession. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-electric hover:bg-electric/10 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
