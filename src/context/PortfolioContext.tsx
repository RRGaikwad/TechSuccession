import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, 
  Service, 
  Testimonial, 
  ContactInfo,
  PricingPlan,
  FAQItem,
  AnalyticsEvent,
  initialProjects, 
  initialServices, 
  initialTestimonials,
  initialContactInfo,
  initialPricingPlans,
  initialFAQs
} from '../data/portfolioData';

interface PortfolioContextType {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  pricingPlans: PricingPlan[];
  faqs: FAQItem[];
  contactInfo: ContactInfo;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateService: (service: Service) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateContactInfo: (info: ContactInfo) => void;
  updatePricingPlan: (plan: PricingPlan) => void;
  addPricingPlan: (plan: PricingPlan) => void;
  deletePricingPlan: (id: string) => void;
  updateFAQ: (faq: FAQItem) => void;
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  analyticsEvents: AnalyticsEvent[];
  trackEvent: (type: AnalyticsEvent['type'], label?: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('portfolio_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('portfolio_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('portfolio_contact');
    return saved ? JSON.parse(saved) : initialContactInfo;
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('portfolio_pricing');
    return saved ? JSON.parse(saved) : initialPricingPlans;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('portfolio_faqs');
    return saved ? JSON.parse(saved) : initialFAQs;
  });

  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>(() => {
    const saved = localStorage.getItem('portfolio_analytics');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('portfolio_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('portfolio_contact', JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem('portfolio_pricing', JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem('portfolio_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('portfolio_analytics', JSON.stringify(analyticsEvents));
  }, [analyticsEvents]);

  const trackEvent = (type: AnalyticsEvent['type'], label?: string) => {
    const newEvent: AnalyticsEvent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      page: window.location.pathname,
      label,
      timestamp: Date.now(),
    };
    setAnalyticsEvents(prev => [newEvent, ...prev].slice(0, 1000)); // Keep last 1000 events
  };

  // Auto-track page views on mount and when path changes
  useEffect(() => {
    // Prevent double tracking in development (Strict Mode)
    let isTracked = false;
    if (!isTracked) {
      trackEvent('page_view');
      isTracked = true;
    }
  }, [window.location.pathname]);

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const addService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateTestimonial = (updatedTestimonial: Testimonial) => {
    setTestimonials(prev => prev.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [...prev, testimonial]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
  };

  const updatePricingPlan = (updatedPlan: PricingPlan) => {
    setPricingPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
  };

  const addPricingPlan = (plan: PricingPlan) => {
    setPricingPlans(prev => [...prev, plan]);
  };

  const deletePricingPlan = (id: string) => {
    setPricingPlans(prev => prev.filter(p => p.id !== id));
  };

  const updateFAQ = (updatedFAQ: FAQItem) => {
    setFaqs(prev => prev.map(f => f.id === updatedFAQ.id ? updatedFAQ : f));
  };

  const addFAQ = (faq: FAQItem) => {
    setFaqs(prev => [...prev, faq]);
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      services, 
      testimonials, 
      contactInfo,
      pricingPlans,
      faqs,
      updateProject, 
      addProject, 
      deleteProject,
      updateService, 
      addService,
      deleteService,
      updateTestimonial,
      addTestimonial,
      deleteTestimonial,
      updateContactInfo,
      updatePricingPlan,
      addPricingPlan,
      deletePricingPlan,
      updateFAQ,
      addFAQ,
      deleteFAQ,
      analyticsEvents,
      trackEvent
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
