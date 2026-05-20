import { MessageCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function WhatsAppButton() {
  const { contactInfo, trackEvent } = usePortfolio();

  return (
    <a
      href={`https://wa.me/91${contactInfo.whatsapp}?text=Hi%2C%20I%20need%20a%20business%20app`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', 'Floating Button')}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse" />
        
        {/* Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-lg whitespace-nowrap">
            Chat with us! 💬
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45" />
          </div>
        </div>
      </div>
    </a>
  );
}
