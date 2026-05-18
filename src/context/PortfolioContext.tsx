import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, 
  Service, 
  Testimonial, 
  ContactInfo,
  PricingPlan,
  initialProjects, 
  initialServices, 
  initialTestimonials,
  initialContactInfo,
  initialPricingPlans
} from '../data/portfolioData';

interface PortfolioContextType {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  pricingPlans: PricingPlan[];
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

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      services, 
      testimonials, 
      contactInfo,
      pricingPlans,
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
      deletePricingPlan
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
