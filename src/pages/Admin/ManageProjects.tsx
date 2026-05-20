import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../data/portfolioData';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const ManageProjects = () => {
  const { projects, updateProject, addProject, deleteProject } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditing = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!editForm?.title || !editForm?.problem) {
      alert('Title and Problem are required');
      return;
    }
    if (editForm) {
      if (isAdding) {
        addProject(editForm);
      } else {
        updateProject(editForm);
      }
      cancelEditing();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const startAdding = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      image: '',
      problem: '',
      features: [],
      tech: [],
      color: 'from-blue-500 to-cyan-400',
      demoLink: '',
    };
    setEditForm(newProject);
    setIsAdding(true);
    setEditingId(newProject.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Manage Projects</h1>
        <button
          onClick={startAdding}
          className="flex items-center gap-2 bg-electric hover:bg-electric/90 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {isAdding && editForm && (
          <div className="glass p-6 rounded-2xl border-2 border-electric/30">
            <h2 className="text-white font-bold mb-4">New Project</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="Project Title"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Problem Statement</label>
                <textarea
                  value={editForm.problem}
                  onChange={(e) => setEditForm({ ...editForm, problem: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-20"
                  placeholder="What problem does this solve?"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Demo Link (Full URL)</label>
                  <input
                    type="text"
                    value={editForm.demoLink}
                    onChange={(e) => setEditForm({ ...editForm, demoLink: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="https://your-demo-site.com"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Make sure to include https:// for external sites.</p>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={editForm.features.join(', ')}
                    onChange={(e) => setEditForm({ ...editForm, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '') })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="Feature 1, Feature 2..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={editForm.tech.join(', ')}
                  onChange={(e) => setEditForm({ ...editForm, tech: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') })}
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="React, Node.js, ..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={cancelEditing} className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" /> Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-bold">
                  <Check className="w-5 h-5" /> Save Project
                </button>
              </div>
            </div>
          </div>
        )}

        {projects.map((project) => (
          <div key={project.id} className="glass p-6 rounded-2xl">
            {editingId === project.id ? (
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
                    <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={editForm?.image}
                      onChange={(e) => setEditForm({ ...editForm!, image: e.target.value })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Problem Statement</label>
                  <textarea
                    value={editForm?.problem}
                    onChange={(e) => setEditForm({ ...editForm!, problem: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Demo Link (Full URL)</label>
                  <input
                    type="text"
                    value={editForm?.demoLink}
                    onChange={(e) => setEditForm({ ...editForm!, demoLink: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
                    <input
                      type="text"
                      value={editForm?.features.join(', ')}
                      onChange={(e) => setEditForm({ ...editForm!, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '') })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={editForm?.tech.join(', ')}
                      onChange={(e) => setEditForm({ ...editForm!, tech: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') })}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
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
                <div className="flex items-center gap-4">
                  <img src={project.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex flex-col">
                    <h3 className="text-white font-bold">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-1">{project.problem}</p>
                    {project.demoLink && (
                      <span className="text-electric text-[10px] font-mono mt-1 opacity-70">
                        Demo: {project.demoLink}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(project)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

export default ManageProjects;
