import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', shortDesc: '', detailedDesc: '', technologies: '', category: 'Web Development',
    githubUrl: '', liveUrl: '', date: '', featured: false, order: 0, imageUrl: ''
  });
  
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    
    try {
      const { data } = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, imageUrl: data.url });
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };
    
    try {
      if (currentProject) {
        await api.put(`/projects/${currentProject._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setIsEditing(false);
      setCurrentProject(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert('Save failed');
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project? This action cannot be undone.')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', shortDesc: '', detailedDesc: '', technologies: '', category: 'Web Development',
      githubUrl: '', liveUrl: '', date: '', featured: false, order: 0, imageUrl: ''
    });
    setCurrentProject(null);
    setIsEditing(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Projects</h1>
        {!isEditing && (
          <button 
            onClick={resetForm}
            className="flex items-center space-x-2 bg-[#ff4747] text-white px-4 py-2 rounded-lg hover:bg-[#ff2e2e] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Category</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">Short Description</label>
              <input required type="text" value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">Detailed Description</label>
              <textarea required rows="4" value={formData.detailedDesc} onChange={e => setFormData({...formData, detailedDesc: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white"></textarea>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">Technologies (comma separated)</label>
              <input type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888888] mb-1">GitHub URL</label>
                <input type="text" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Live URL</label>
                <input type="text" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm text-[#888888] mb-1">Date</label>
                <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" placeholder="e.g. 2024-2025" />
              </div>
              <div>
                <label className="block text-sm text-[#888888] mb-1">Order (lower appears first)</label>
                <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm text-white">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="rounded bg-[#0f0f11] border-[#333333] text-[#ff4747]" />
                <span>Featured Project</span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1">Project Image</label>
              <div className="flex items-center space-x-4">
                {formData.imageUrl && <img src={formData.imageUrl} alt="preview" className="w-16 h-16 object-cover rounded border border-[#333333]" />}
                <label className="cursor-pointer bg-[#333333] hover:bg-[#444444] px-4 py-2 rounded flex items-center space-x-2 text-sm transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-[#333333]">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-[#888888] hover:text-white transition-colors">Cancel</button>
              <button type="submit" className="bg-[#ff4747] text-white px-6 py-2 rounded hover:bg-[#ff2e2e] transition-colors">Save Project</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-[#1a1a1c] border border-[#333333] rounded-xl text-[#888888]">
              No projects yet. Click Add Project to start.
            </div>
          ) : (
            projects.map(project => (
              <div key={project._id} className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.name} className="w-16 h-16 object-cover rounded border border-[#333333]" />
                  ) : (
                    <div className="w-16 h-16 bg-[#0f0f11] rounded border border-[#333333] flex items-center justify-center text-[#333333]">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-lg">{project.name} {project.featured && <span className="text-xs bg-[#ff4747]/20 text-[#ff4747] px-2 py-0.5 rounded ml-2">Featured</span>}</h3>
                    <p className="text-[#888888] text-sm">{project.shortDesc}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(project)} className="p-2 text-[#888888] hover:text-white hover:bg-[#333333] rounded transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 text-[#888888] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
