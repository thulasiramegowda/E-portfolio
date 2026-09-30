import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ organization: '', position: '', startDate: '', endDate: '', description: '', technologies: '', certificateUrl: '', order: 0 });
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/experience');
      setItems(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const { data } = await api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setFormData({ ...formData, imageUrl: data.url });
    } catch (error) { alert('Upload failed'); } 
    finally { setUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...formData };
    if (payload.technologies && typeof payload.technologies === 'string') {
      payload.technologies = payload.technologies.split(',').map(tx => tx.trim()).filter(Boolean);
    }
    
    try {
      if (currentItem) await api.put(`/experience/${currentItem._id}`, payload);
      else await api.post('/experience', payload);
      setIsEditing(false);
      setCurrentItem(null);
      fetchItems();
    } catch (error) { alert('Save failed'); }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    let edited = { ...item };
    if (edited.technologies && Array.isArray(edited.technologies)) {
      edited.technologies = edited.technologies.join(', ');
    }
    setFormData(edited);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await api.delete(`/experience/${id}`);
        fetchItems();
      } catch (error) { console.error(error); }
    }
  };

  const resetForm = () => {
    setFormData({ organization: '', position: '', startDate: '', endDate: '', description: '', technologies: '', certificateUrl: '', order: 0 });
    setCurrentItem(null);
    setIsEditing(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Experience</h1>
        {!isEditing && (
          <button onClick={resetForm} className="flex items-center space-x-2 bg-[#ff4747] text-white px-4 py-2 rounded-lg hover:bg-[#ff2e2e]">
            <Plus className="w-4 h-4" /><span>Add Experience</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm text-[#888888] mb-1">Organization</label><input required type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Position</label><input required type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Start Date</label><input required type="text" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">End Date</label><input  type="text" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Description</label><textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white"></textarea></div>
            <div><label className="block text-sm text-[#888888] mb-1">Technologies (comma sep)</label><input  type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Certificate URL</label><input  type="text" value={formData.certificateUrl} onChange={e => setFormData({...formData, certificateUrl: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Order</label><input  type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t border-[#333333]">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-[#888888] hover:text-white">Cancel</button>
              <button type="submit" className="bg-[#ff4747] text-white px-6 py-2 rounded hover:bg-[#ff2e2e]">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 bg-[#1a1a1c] border border-[#333333] rounded-xl text-[#888888]">No items yet.</div>
          ) : (
            items.map(item => (
              <div key={item._id} className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  
                  <div>
                    <h3 className="font-medium text-lg">{item.title || item.name || item.institution || item.organization}</h3>
                    <p className="text-[#888888] text-sm">{item.description || item.category || item.program || item.position}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-[#888888] hover:text-white hover:bg-[#333333] rounded"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-[#888888] hover:text-red-500 hover:bg-red-500/10 rounded"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
