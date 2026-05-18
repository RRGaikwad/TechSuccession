import { ArrowRight, MessageCircle, Eye } from 'lucide-react';
import dashboardMockup from '../assets/images/dashboard-mockup.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-grid overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-electric/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300 font-medium">Available for new projects</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-[Poppins] leading-tight mb-6">
              <span className="text-white">AI-Powered Apps</span>
              <br />
              <span className="text-white">& Software For</span>
              <br />
              <span className="gradient-text">Modern Businesses</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
              Helping businesses automate operations with websites, Android apps, PWAs & AI-powered systems. 
              <span className="text-slate-300 font-medium"> Fast delivery. Affordable pricing.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-electric to-accent-purple text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-electric/25 transition-all duration-300 text-base"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/5 transition-all duration-300 text-base"
              >
                <Eye className="w-5 h-5" />
                View Projects
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20business%20app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-semibold rounded-2xl hover:bg-[#25D366]/20 transition-all duration-300 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Me
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[Poppins]">50+</div>
                <div className="text-[10px] sm:text-sm text-slate-400 mt-1 uppercase tracking-wider font-semibold">Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[Poppins]">30+</div>
                <div className="text-[10px] sm:text-sm text-slate-400 mt-1 uppercase tracking-wider font-semibold">Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[Poppins]">1-7</div>
                <div className="text-[10px] sm:text-sm text-slate-400 mt-1 uppercase tracking-wider font-semibold">Days</div>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div className="relative animate-float hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden glow-strong">
              <img
                src={dashboardMockup}
                alt="Business Dashboard Preview"
                className="w-full rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent rounded-3xl" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">AI-Powered</div>
                <div className="text-xs text-slate-400">Smart Automation</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-3">
              <div className="text-sm font-semibold text-white">⚡ Fast Delivery</div>
              <div className="text-xs text-slate-400">1-7 Days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
