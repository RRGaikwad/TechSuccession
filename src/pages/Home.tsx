import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Projects from '../components/Projects';
import WhyChooseMe from '../components/WhyChooseMe';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Industries />
      <Projects />
      <WhyChooseMe />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
