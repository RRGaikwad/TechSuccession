import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FAQItem } from '../../data/portfolioData';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const ManageFAQ = () => {
  const { faqs, updateFAQ, addFAQ, deleteFAQ } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FAQItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditing = (faq: FAQItem) => {
    setEditingId(faq.id);
    setEditForm({ ...faq });
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!editForm?.question || !editForm?.answer) {
      alert('Question and Answer are required');
      return;
    }
    if (editForm) {
      if (isAdding) {
        addFAQ(editForm);
      } else {
        updateFAQ(editForm);
      }
      cancelEditing();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      deleteFAQ(id);
    }
  };

  const startAdding = () => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: '',
      answer: '',
    };
    setEditForm(newFAQ);
    setIsAdding(true);
    setEditingId(newFAQ.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Manage FAQ</h1>
        <button
          onClick={startAdding}
          className="flex items-center gap-2 bg-electric hover:bg-electric/90 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {isAdding && editForm && (
          <div className="glass p-6 rounded-2xl border-2 border-electric/30">
            <h2 className="text-white font-bold mb-4">New FAQ</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Question</label>
                <input
                  type="text"
                  value={editForm.question}
                  onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="e.g. How long does development take?"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Answer</label>
                <textarea
                  value={editForm.answer}
                  onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-32"
                  placeholder="Provide a detailed answer..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={cancelEditing} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-bold">
                  <Check className="w-5 h-5" /> Save FAQ
                </button>
              </div>
            </div>
          </div>
        )}

        {faqs.map((faq) => (
          <div key={faq.id} className="glass p-6 rounded-2xl">
            {editingId === faq.id && !isAdding ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Question</label>
                  <input
                    type="text"
                    value={editForm?.question}
                    onChange={(e) => setEditForm({ ...editForm!, question: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Answer</label>
                  <textarea
                    value={editForm?.answer}
                    onChange={(e) => setEditForm({ ...editForm!, answer: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-32"
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
              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h3 className="text-white font-bold mb-2">{faq.question}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEditing(faq)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
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

export default ManageFAQ;
