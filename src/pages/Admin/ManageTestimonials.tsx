import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Testimonial } from '../../data/portfolioData';
import { Edit2, X, Check, Plus, Trash2 } from 'lucide-react';

const ManageTestimonials = () => {
  const { testimonials, updateTestimonial, addTestimonial, deleteTestimonial } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditing = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({ ...testimonial });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!editForm?.name || !editForm?.content) {
      alert('Name and Content are required');
      return;
    }
    if (editForm) {
      if (isAdding) {
        addTestimonial(editForm);
      } else {
        updateTestimonial(editForm);
      }
      cancelEditing();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  const startAdding = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: '',
      role: '',
      content: '',
      rating: 5,
      avatar: '',
    };
    setEditForm(newTestimonial);
    setIsAdding(true);
    setEditingId(newTestimonial.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Manage Testimonials</h1>
        <button
          onClick={startAdding}
          className="flex items-center gap-2 bg-electric hover:bg-electric/90 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="glass p-6 rounded-2xl">
            {editingId === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm?.name}
                      onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Role</label>
                    <input
                      type="text"
                      value={editForm?.role}
                      onChange={(e) => setEditForm({ ...editForm!, role: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Avatar Initials (e.g., JD)</label>
                    <input
                      type="text"
                      value={editForm?.avatar}
                      onChange={(e) => setEditForm({ ...editForm!, avatar: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editForm?.rating}
                      onChange={(e) => setEditForm({ ...editForm!, rating: parseInt(e.target.value) })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Content</label>
                  <textarea
                    value={editForm?.content}
                    onChange={(e) => setEditForm({ ...editForm!, content: e.target.value })}
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
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-electric flex items-center justify-center text-white text-xs font-bold">
                      {testimonial.avatar}
                    </div>
                    <h3 className="text-white font-bold">{testimonial.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm italic">"{testimonial.content}"</p>
                  <span className="text-xs text-slate-500">{testimonial.role}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(testimonial)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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

export default ManageTestimonials;
