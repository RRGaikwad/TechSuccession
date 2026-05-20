import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Service } from '../../data/portfolioData';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const ManageServices = () => {
  const { services, updateService, addService, deleteService } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!editForm?.title || !editForm?.price) {
      alert('Title and Price are required');
      return;
    }
    if (editForm) {
      if (isAdding) {
        addService(editForm);
      } else {
        updateService(editForm);
      }
      cancelEditing();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
    }
  };

  const startAdding = () => {
    const newService: Service = {
      id: Date.now().toString(),
      iconName: 'Globe',
      title: '',
      description: '',
      features: [],
      price: '',
      color: 'from-blue-500 to-cyan-400',
      shadowColor: 'hover:shadow-blue-500/20',
    };
    setEditForm(newService);
    setIsAdding(true);
    setEditingId(newService.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Manage Services</h1>
        <button
          onClick={startAdding}
          className="flex items-center gap-2 bg-electric hover:bg-electric/90 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="glass p-6 rounded-2xl">
            {editingId === service.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={editForm?.title}
                      onChange={(e) => setEditForm({ ...editForm!, title: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Price</label>
                    <input
                      type="text"
                      value={editForm?.price}
                      onChange={(e) => setEditForm({ ...editForm!, price: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Icon Name (e.g., Globe, Bot)</label>
                    <input
                      type="text"
                      value={editForm?.iconName}
                      onChange={(e) => setEditForm({ ...editForm!, iconName: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
                    <input
                      type="text"
                      value={editForm?.features.join(', ')}
                      onChange={(e) => setEditForm({ ...editForm!, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '') })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea
                    value={editForm?.description}
                    onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-20"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={cancelEditing} className="p-2 text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <button onClick={handleSave} className="p-2 text-green-400 hover:text-green-300 transition-colors">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{service.title}</h3>
                  <p className="text-slate-400 text-sm">{service.description}</p>
                  <span className="text-electric font-bold text-sm">{service.price}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(service)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
