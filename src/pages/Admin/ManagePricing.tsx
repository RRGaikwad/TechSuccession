import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PricingPlan } from '../../data/portfolioData';
import { Plus, Edit2, Trash2, X, Check, Star } from 'lucide-react';

const ManagePricing = () => {
  const { pricingPlans, updatePricingPlan, addPricingPlan, deletePricingPlan } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PricingPlan | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditing = (plan: PricingPlan) => {
    setEditingId(plan.id);
    setEditForm({ ...plan });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!editForm?.name || !editForm?.price) {
      alert('Name and Price are required');
      return;
    }
    if (editForm) {
      if (isAdding) {
        addPricingPlan(editForm);
      } else {
        updatePricingPlan(editForm);
      }
      cancelEditing();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this pricing plan?')) {
      deletePricingPlan(id);
    }
  };

  const startAdding = () => {
    const newPlan: PricingPlan = {
      id: Date.now().toString(),
      name: '',
      price: '',
      period: 'one-time',
      description: '',
      features: [],
      popular: false,
      color: 'from-blue-500 to-cyan-400',
    };
    setEditForm(newPlan);
    setIsAdding(true);
    setEditingId(newPlan.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Manage Pricing Plans</h1>
        <button
          onClick={startAdding}
          className="flex items-center gap-2 bg-electric hover:bg-electric/90 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Plan
        </button>
      </div>

      <div className="space-y-4">
        {isAdding && editForm && (
          <div className="glass p-6 rounded-2xl border-2 border-electric/30">
            <h2 className="text-white font-bold mb-4">New Pricing Plan</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="e.g. Business Website"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Price</label>
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="e.g. ₹7,999"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Period</label>
                  <input
                    type="text"
                    value={editForm.period}
                    onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="e.g. one-time"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="new-popular"
                    checked={editForm.popular}
                    onChange={(e) => setEditForm({ ...editForm, popular: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-navy-800 text-electric focus:ring-electric"
                  />
                  <label htmlFor="new-popular" className="text-sm text-slate-300">Mark as Popular</label>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="Short description of the plan"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
                <textarea
                  value={editForm.features.join(', ')}
                  onChange={(e) => setEditForm({ ...editForm, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '') })}
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-20"
                  placeholder="Feature 1, Feature 2, ..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={cancelEditing} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-bold">
                  <Check className="w-5 h-5" /> Save Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {pricingPlans.map((plan) => (
          <div key={plan.id} className={`glass p-6 rounded-2xl ${plan.popular ? 'ring-2 ring-electric/30' : ''}`}>
            {editingId === plan.id && !isAdding ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Plan Name</label>
                    <input
                      type="text"
                      value={editForm?.name}
                      onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
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
                    <label className="block text-xs text-slate-400 mb-1">Period</label>
                    <input
                      type="text"
                      value={editForm?.period}
                      onChange={(e) => setEditForm({ ...editForm!, period: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id={`popular-${plan.id}`}
                      checked={editForm?.popular}
                      onChange={(e) => setEditForm({ ...editForm!, popular: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-navy-800 text-electric focus:ring-electric"
                    />
                    <label htmlFor={`popular-${plan.id}`} className="text-sm text-slate-300">Mark as Popular</label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
                  <textarea
                    value={editForm?.features.join(', ')}
                    onChange={(e) => setEditForm({ ...editForm!, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '') })}
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
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{plan.name}</h3>
                    {plan.popular && <Star className="w-4 h-4 text-electric fill-electric" />}
                  </div>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                  <span className="text-electric font-bold text-sm">{plan.price} / {plan.period}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(plan)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
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

export default ManagePricing;
