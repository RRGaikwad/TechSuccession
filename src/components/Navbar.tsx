import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { contactInfo } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-accent-purple flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[Poppins] text-white">
              Tech<span className="gradient-text">Succession</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/91${contactInfo.whatsapp}?text=Hi%2C%20I%20need%20a%20business%20app`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-electric to-accent-purple text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-electric/25 transition-all duration-300"
            >
              WhatsApp Me
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-4 border-t border-white/10 pt-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href={`https://wa.me/91${contactInfo.whatsapp}?text=Hi%2C%20I%20need%20a%20business%20app`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-electric to-accent-purple text-white font-bold rounded-xl shadow-lg shadow-electric/20"
              >
                WhatsApp Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
