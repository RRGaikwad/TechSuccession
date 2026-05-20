import { useState, useEffect } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { trackEvent } from '../firebase';

export default function Contact() {
  const { contactInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    requirement: '',
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const parseTime = (timeStr: string) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const startTime = parseTime(contactInfo.workHoursStart);
      const endTime = parseTime(contactInfo.workHoursEnd);

      if (startTime <= endTime) {
        setIsAvailable(currentTime >= startTime && currentTime <= endTime);
      } else {
        // Overnights (e.g., 10 PM to 06 AM)
        setIsAvailable(currentTime >= startTime || currentTime <= endTime);
      }
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [contactInfo.workHoursStart, contactInfo.workHoursEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('form_submit', { label: `Requirement Form - ${formData.business}` });
    const message = `Hi! I'm ${formData.name} from ${formData.business}.\n\nRequirement: ${formData.requirement}\nBudget: ${formData.budget}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Let's Build <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 2 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-6 md:p-10">
              <h3 className="text-2xl font-bold text-white font-[Poppins] mb-6">
                Send Us Your Requirement
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-400">We'll get back to you within 2 hours via WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass-light rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all bg-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Business Name *</label>
                      <input
                        type="text"
                        name="business"
                        required
                        value={formData.business}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass-light rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all bg-transparent"
                        placeholder="Your Business"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your Requirement *</label>
                    <textarea
                      name="requirement"
                      required
                      rows={4}
                      value={formData.requirement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 glass-light rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all resize-none bg-transparent"
                      placeholder="Tell us about your project — what do you need?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Budget Range</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Under ₹10,000',
                        '₹10,000 - ₹25,000',
                        '₹25,000 - ₹50,000',
                        '₹50,000 - ₹1L',
                        '₹1L+',
                        'Not sure yet'
                      ].map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: range })}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                            formData.budget === range
                              ? 'bg-electric border-electric text-white shadow-lg shadow-electric/25'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-electric to-accent-purple text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-electric/25 transition-all text-base"
                  >
                    <Send className="w-5 h-5" />
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white font-[Poppins] mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/91${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { label: 'Contact Section' })}
                  className="flex items-center gap-3 text-slate-300 hover:text-[#25D366] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">WhatsApp</div>
                    <div className="text-xs text-slate-400">+91 {contactInfo.whatsapp}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  onClick={() => trackEvent('cta_click', { label: 'Email Link' })}
                  className="flex items-center gap-3 text-slate-300 hover:text-electric transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-xs text-slate-400">{contactInfo.email}</div>
                  </div>
                </a>
                <a
                  href={`tel:+91${contactInfo.phone}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-accent-purple transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-xs text-slate-400">{contactInfo.phone}</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-xs text-slate-400">{contactInfo.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white font-[Poppins] mb-3">⏰ Response Time</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We typically respond within <span className="text-white font-semibold">{contactInfo.responseTime}</span> during our working hours (<span className="text-white font-semibold">{contactInfo.workHoursStart}</span> to <span className="text-white font-semibold">{contactInfo.workHoursEnd}</span>).
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isAvailable ? 'bg-green-400' : 'bg-slate-500'}`} />
                <span className={`font-medium ${isAvailable ? 'text-green-400' : 'text-slate-400'}`}>
                  {isAvailable ? 'Currently Available' : 'Currently Offline'}
                </span>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 bg-gradient-to-br from-[#25D366]/10 to-transparent border-[#25D366]/20">
              <h3 className="text-lg font-bold text-white font-[Poppins] mb-3">💬 Prefer WhatsApp?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Most of our clients prefer chatting on WhatsApp. Quick, easy, and no formalities!
              </p>
              <a
                href="https://wa.me/919511618005?text=Hi%2C%20I%20need%20a%20business%20app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#22c55e] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
