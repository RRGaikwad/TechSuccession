import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  MessageSquare, 
  CreditCard,
  Phone,
  HelpCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import ManageProjects from './ManageProjects';
import ManageServices from './ManageServices';
import ManageTestimonials from './ManageTestimonials';
import ManagePricing from './ManagePricing';
import ManageContact from './ManageContact';
import ManageFAQ from './ManageFAQ';
import { usePortfolio } from '../../context/PortfolioContext';

const SidebarItem = ({ to, icon: Icon, label, active, onClick }: { to: string, icon: any, label: string, active: boolean, onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-electric text-white shadow-lg shadow-electric/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="w-4 h-4 ml-auto" />}
  </Link>
);

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { projects, services, testimonials, isLoading } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-electric/30 border-t-electric rounded-full animate-spin" />
          <p className="text-slate-400 font-medium">Connecting to Firebase...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-navy-900 border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-xl font-bold text-white font-[Poppins]">Admin Panel</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-0 z-40 md:relative md:z-0 w-64 bg-navy-900 border-r border-white/5 p-6 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="mb-10 hidden md:block">
          <h2 className="text-xl font-bold text-white font-[Poppins]">Admin Panel</h2>
          <p className="text-xs text-slate-500">Portfolio Management</p>
        </div>

        <nav className="space-y-2 flex-grow">
          <SidebarItem 
            to="/admin" 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={location.pathname === '/admin'} 
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/projects" 
            icon={Briefcase} 
            label="Projects" 
            active={location.pathname === '/admin/projects'} 
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/services" 
            icon={Settings} 
            label="Services" 
            active={location.pathname === '/admin/services'} 
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/testimonials" 
            icon={MessageSquare} 
            label="Testimonials" 
            active={location.pathname === '/admin/testimonials'} 
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/pricing" 
            icon={CreditCard} 
            label="Pricing" 
            active={location.pathname === '/admin/pricing'} 
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/faq" 
            icon={HelpCircle} 
            label="FAQ" 
            active={location.pathname === '/admin/faq'} 
            onClick={closeSidebar}
          />
          <SidebarItem 
            to="/admin/contact" 
            icon={Phone} 
            label="Contact Info" 
            active={location.pathname === '/admin/contact'} 
            onClick={closeSidebar}
          />
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">View Site</span>
            </Link>
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-grow overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 font-[Poppins]">Welcome back, Admin!</h1>
                  <p className="text-slate-400">Here's what's happening with your portfolio today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4 text-blue-400">
                      <Briefcase className="w-5 h-5" />
                      <h3 className="font-semibold">Projects</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">{projects.length}</div>
                    <p className="text-xs text-slate-500 mt-2">All projects live</p>
                  </div>
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4 text-purple-400">
                      <Settings className="w-5 h-5" />
                      <h3 className="font-semibold">Services</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">{services.length}</div>
                    <p className="text-xs text-slate-500 mt-2">Active offerings</p>
                  </div>
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4 text-orange-400">
                      <MessageSquare className="w-5 h-5" />
                      <h3 className="font-semibold">Testimonials</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">{testimonials.length}</div>
                    <p className="text-xs text-slate-500 mt-2">Verified reviews</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/projects" element={<ManageProjects />} />
            <Route path="/services" element={<ManageServices />} />
            <Route path="/testimonials" element={<ManageTestimonials />} />
            <Route path="/pricing" element={<ManagePricing />} />
            <Route path="/faq" element={<ManageFAQ />} />
            <Route path="/contact" element={<ManageContact />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
