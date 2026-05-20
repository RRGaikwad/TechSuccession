import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  doc, 
  onSnapshot, 
  setDoc
} from 'firebase/firestore';
import { 
  Project, 
  Service, 
  Testimonial, 
  ContactInfo,
  PricingPlan,
  FAQItem,
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
  isLoading: boolean;
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
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(initialPricingPlans);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [isLoading, setIsLoading] = useState(true);

  // Sync with Firestore
  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    // Helper to setup real-time listener
    const setupListener = (collectionName: string, setter: any, initialData: any) => {
      const unsub = onSnapshot(doc(db, "portfolio", collectionName), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setter(data.items || data);
        } else {
          // If no data in Firebase, initialize it
          setDoc(doc(db, "portfolio", collectionName), collectionName === 'contact' ? initialData : { items: initialData });
          setter(initialData);
        }
      }, (error) => {
        console.error(`Error fetching ${collectionName}:`, error);
        setter(initialData);
      });
      unsubscribers.push(unsub);
    };

    setupListener('projects', setProjects, initialProjects);
    setupListener('services', setServices, initialServices);
    setupListener('testimonials', setTestimonials, initialTestimonials);
    setupListener('contact', setContactInfo, initialContactInfo);
    setupListener('pricing', setPricingPlans, initialPricingPlans);
    setupListener('faq', setFaqs, initialFAQs);

    setIsLoading(false);

    return () => unsubscribers.forEach(unsub => unsub());
  }, []);

  const updateProject = async (updatedProject: Project) => {
    const newItems = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    await setDoc(doc(db, "portfolio", "projects"), { items: newItems });
  };

  const addProject = async (project: Project) => {
    const newItems = [...projects, project];
    await setDoc(doc(db, "portfolio", "projects"), { items: newItems });
  };

  const deleteProject = async (id: string) => {
    const newItems = projects.filter(p => p.id !== id);
    await setDoc(doc(db, "portfolio", "projects"), { items: newItems });
  };

  const updateService = async (updatedService: Service) => {
    const newItems = services.map(s => s.id === updatedService.id ? updatedService : s);
    await setDoc(doc(db, "portfolio", "services"), { items: newItems });
  };

  const addService = async (service: Service) => {
    const newItems = [...services, service];
    await setDoc(doc(db, "portfolio", "services"), { items: newItems });
  };

  const deleteService = async (id: string) => {
    const newItems = services.filter(s => s.id !== id);
    await setDoc(doc(db, "portfolio", "services"), { items: newItems });
  };

  const updateTestimonial = async (updatedTestimonial: Testimonial) => {
    const newItems = testimonials.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t);
    await setDoc(doc(db, "portfolio", "testimonials"), { items: newItems });
  };

  const addTestimonial = async (testimonial: Testimonial) => {
    const newItems = [...testimonials, testimonial];
    await setDoc(doc(db, "portfolio", "testimonials"), { items: newItems });
  };

  const deleteTestimonial = async (id: string) => {
    const newItems = testimonials.filter(t => t.id !== id);
    await setDoc(doc(db, "portfolio", "testimonials"), { items: newItems });
  };

  const updateContactInfo = async (info: ContactInfo) => {
    await setDoc(doc(db, "portfolio", "contact"), info);
  };

  const updatePricingPlan = async (updatedPlan: PricingPlan) => {
    const newItems = pricingPlans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
    await setDoc(doc(db, "portfolio", "pricing"), { items: newItems });
  };

  const addPricingPlan = async (plan: PricingPlan) => {
    const newItems = [...pricingPlans, plan];
    await setDoc(doc(db, "portfolio", "pricing"), { items: newItems });
  };

  const deletePricingPlan = async (id: string) => {
    const newItems = pricingPlans.filter(p => p.id !== id);
    await setDoc(doc(db, "portfolio", "pricing"), { items: newItems });
  };

  const updateFAQ = async (updatedFAQ: FAQItem) => {
    const newItems = faqs.map(f => f.id === updatedFAQ.id ? updatedFAQ : f);
    await setDoc(doc(db, "portfolio", "faq"), { items: newItems });
  };

  const addFAQ = async (faq: FAQItem) => {
    const newItems = [...faqs, faq];
    await setDoc(doc(db, "portfolio", "faq"), { items: newItems });
  };

  const deleteFAQ = async (id: string) => {
    const newItems = faqs.filter(f => f.id !== id);
    await setDoc(doc(db, "portfolio", "faq"), { items: newItems });
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      services, 
      testimonials, 
      contactInfo,
      pricingPlans,
      faqs,
      isLoading,
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
      deleteFAQ
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
