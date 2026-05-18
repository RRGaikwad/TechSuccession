import { LucideIcon, Globe, Smartphone, AppWindow, Bot, BarChart3 } from 'lucide-react';
import printShopImg from '../assets/images/print-shop.png';
import restaurantAppImg from '../assets/images/restaurant-app.png';
import coachingAppImg from '../assets/images/coaching-app.png';

export interface Project {
  id: string;
  title: string;
  image: string;
  problem: string;
  features: string[];
  tech: string[];
  color: string;
  demoLink?: string;
}

export interface Service {
  id: string;
  iconName: string; // Store icon name as string for serializability
  title: string;
  description: string;
  features: string[];
  price: string;
  color: string;
  shadowColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
}

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Print Shop Management System',
    image: printShopImg,
    problem: 'Print shops struggle with order tracking, billing, and customer management using manual registers.',
    features: ['Order tracking dashboard', 'Automated billing', 'Status updates via WhatsApp', 'Customer database'],
    tech: ['React', 'Firebase', 'Tailwind CSS', 'Node.js'],
    color: 'from-blue-500 to-cyan-400',
    demoLink: '#',
  },
  {
    id: '2',
    title: 'Restaurant Ordering App',
    image: restaurantAppImg,
    problem: 'Restaurants need digital menus and ordering systems to reduce wait times and increase efficiency.',
    features: ['QR code menu', 'Online ordering system', 'Kitchen display dashboard', 'Payment integration'],
    tech: ['React Native', 'Firebase', 'Stripe', 'PWA'],
    color: 'from-orange-500 to-red-400',
    demoLink: '#',
  },
  {
    id: '3',
    title: 'Coaching Class App',
    image: coachingAppImg,
    problem: 'Coaching institutes need a centralized system for attendance, fees, and student communication.',
    features: ['Attendance tracking', 'Fees management', 'Student/Parent login', 'Performance reports'],
    tech: ['Flutter', 'Firebase', 'Cloud Functions', 'PWA'],
    color: 'from-purple-500 to-pink-400',
    demoLink: '#',
  },
];

export const initialServices: Service[] = [
  {
    id: '1',
    iconName: 'Globe',
    title: 'Business Websites',
    description: 'Professional websites for local businesses that generate leads and build credibility.',
    features: ['Responsive design', 'Inquiry forms', 'WhatsApp integration', 'SEO basics', 'Google Maps'],
    price: '₹7,999',
    color: 'from-blue-500 to-cyan-400',
    shadowColor: 'hover:shadow-blue-500/20',
  },
  {
    id: '2',
    iconName: 'Smartphone',
    title: 'Android APK Apps',
    description: 'Custom Android applications that streamline your business operations.',
    features: ['Customer login', 'Push notifications', 'Product/catalog system', 'Order management'],
    price: '₹19,999',
    color: 'from-green-500 to-emerald-400',
    shadowColor: 'hover:shadow-green-500/20',
  },
  {
    id: '3',
    iconName: 'AppWindow',
    title: 'Progressive Web Apps',
    description: 'Installable mobile-like web applications that work everywhere.',
    features: ['Offline support', 'Fast performance', 'App-like experience', 'Push notifications'],
    price: '₹14,999',
    color: 'from-purple-500 to-pink-400',
    shadowColor: 'hover:shadow-purple-500/20',
  },
  {
    id: '4',
    iconName: 'Bot',
    title: 'AI Business Automation',
    description: 'Automate repetitive business tasks with intelligent AI systems.',
    features: ['AI chat systems', 'Lead automation', 'Smart workflows', 'Customer handling'],
    price: 'Custom',
    color: 'from-orange-500 to-yellow-400',
    shadowColor: 'hover:shadow-orange-500/20',
  },
  {
    id: '5',
    iconName: 'BarChart3',
    title: 'Billing & Management Software',
    description: 'Complete business operation software systems tailored to your workflow.',
    features: ['Billing system', 'Inventory management', 'Staff management', 'Analytics dashboard'],
    price: '₹24,999',
    color: 'from-electric to-accent-purple',
    shadowColor: 'hover:shadow-electric/20',
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    role: 'Owner, QuickPrint Solutions',
    content: 'TechSuccession built our print shop management system in just 5 days. Our order tracking is now completely automated and customers love the WhatsApp updates!',
    rating: 5,
    avatar: 'RS',
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'Manager, Spice Garden Restaurant',
    content: 'The QR menu and ordering app transformed our restaurant. We\'ve seen a 40% increase in orders since going digital. Incredibly fast delivery and affordable pricing.',
    rating: 5,
    avatar: 'PP',
  },
  {
    id: '3',
    name: 'Amit Deshmukh',
    role: 'Director, Excel Coaching Classes',
    content: 'Managing 500+ students was a nightmare with registers. Now with the app, attendance, fees, and parent communication is all automated. Best investment we made!',
    rating: 5,
    avatar: 'AD',
  },
  {
    id: '4',
    name: 'Neha Gupta',
    role: 'Owner, Glow Beauty Salon',
    content: 'Our booking system and customer management app is so easy to use. My team learned it in one day. The support has been fantastic throughout.',
    rating: 5,
    avatar: 'NG',
  },
];

export const initialPricingPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Business Website',
    price: '₹7,999',
    period: 'one-time',
    description: 'Perfect for local businesses going digital',
    features: [
      'Responsive design',
      'Up to 5 pages',
      'Contact & inquiry forms',
      'WhatsApp integration',
      'SEO optimization',
      'Google Maps embed',
      '1 month free support',
    ],
    popular: false,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: '2',
    name: 'PWA Application',
    price: '₹14,999',
    period: 'one-time',
    description: 'Installable app without app store hassle',
    features: [
      'Everything in Website',
      'Offline capability',
      'Push notifications',
      'App-like experience',
      'Home screen install',
      'Fast performance',
      '2 months free support',
    ],
    popular: false,
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: '3',
    name: 'Android App',
    price: '₹19,999',
    period: 'one-time',
    description: 'Full-featured native Android application',
    features: [
      'Custom Android APK',
      'Customer login system',
      'Push notifications',
      'Product catalog',
      'Order management',
      'Play Store listing',
      '3 months free support',
    ],
    popular: true,
    color: 'from-electric to-accent-purple',
  },
  {
    id: '4',
    name: 'Management Software',
    price: '₹24,999',
    period: 'one-time',
    description: 'Complete business management system',
    features: [
      'Billing system',
      'Inventory tracking',
      'Staff management',
      'Analytics dashboard',
      'Report generation',
      'Multi-user access',
      '3 months free support',
    ],
    popular: false,
    color: 'from-green-500 to-emerald-400',
  },
];

export const getIconByName = (name: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    Globe,
    Smartphone,
    AppWindow,
    Bot,
    BarChart3,
  };
  return icons[name] || Globe;
};

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  responseTime: string;
  workHoursStart: string;
  workHoursEnd: string;
}

export const initialContactInfo: ContactInfo = {
  phone: '9511618005',
  whatsapp: '9511618005',
  email: 'hello@techsuccession.in',
  location: 'India — Serving Worldwide',
  responseTime: '2 hours',
  workHoursStart: '09:00 AM',
  workHoursEnd: '09:00 PM',
};
