import { Printer, UtensilsCrossed, GraduationCap, Dumbbell, Scissors, Pill, ShoppingBag, Building2 } from 'lucide-react';

const industries = [
  { icon: Printer, name: 'Print Shops', desc: 'Order tracking, billing & delivery management' },
  { icon: UtensilsCrossed, name: 'Restaurants', desc: 'QR menus, online ordering & kitchen systems' },
  { icon: GraduationCap, name: 'Coaching Classes', desc: 'Attendance, fees & student management' },
  { icon: Dumbbell, name: 'Gyms', desc: 'Memberships, scheduling & progress tracking' },
  { icon: Scissors, name: 'Salons', desc: 'Booking, customer profiles & billing' },
  { icon: Pill, name: 'Medical Stores', desc: 'Inventory, prescriptions & billing' },
  { icon: ShoppingBag, name: 'Retail Shops', desc: 'POS, inventory & customer management' },
  { icon: Building2, name: 'Real Estate', desc: 'Listings, lead management & CRM' },
];

export default function Industries() {
  return (
    <section className="py-20 md:py-28 relative bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Built For <span className="gradient-text">Your Industry</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Custom software built specifically for your business workflow. We understand your challenges.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry) => (
            <a
              key={industry.name}
              href="#contact"
              className="group glass rounded-2xl p-5 md:p-6 text-center hover-lift cursor-pointer"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                <industry.icon className="w-7 h-7 text-electric" />
              </div>
              <h3 className="font-bold text-white font-[Poppins] mb-1 text-sm md:text-base">
                {industry.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                {industry.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
