import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminJourney() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ year: '', title: '', description: '', order: 0, imageUrl: '' });
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/journey');
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
      if (currentItem) await api.put(`/journey/${currentItem._id}`, payload);
      else await api.post('/journey', payload);
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
        await api.delete(`/journey/${id}`);
        fetchItems();
      } catch (error) { console.error(error); }
    }
  };

  const resetForm = () => {
    setFormData({ year: '', title: '', description: '', order: 0, imageUrl: '' });
    setCurrentItem(null);
    setIsEditing(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Journey</h1>
        {!isEditing && (
          <button onClick={resetForm} className="flex items-center space-x-2 bg-[#ff4747] text-white px-4 py-2 rounded-lg hover:bg-[#ff2e2e]">
            <Plus className="w-4 h-4" /><span>Add Journey</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm text-[#888888] mb-1">Year</label><input required type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Title</label><input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            <div><label className="block text-sm text-[#888888] mb-1">Description</label><textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white"></textarea></div>
            <div><label className="block text-sm text-[#888888] mb-1">Order</label><input  type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" /></div>
            
            <div>
              <label className="block text-sm text-[#888888] mb-1">Image</label>
              <div className="flex items-center space-x-4">
                {formData.imageUrl && <img src={formData.imageUrl} alt="preview" className="w-16 h-16 object-cover rounded border border-[#333333]" />}
                <label className="cursor-pointer bg-[#333333] hover:bg-[#444444] px-4 py-2 rounded flex items-center space-x-2 text-sm">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
            </div>
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
                  
                  {item.imageUrl ? <img src={item.imageUrl} className="w-12 h-12 object-cover rounded border border-[#333333]" /> : <div className="w-12 h-12 bg-[#0f0f11] rounded border border-[#333333] flex items-center justify-center text-[#333333]"><ImageIcon className="w-5 h-5" /></div>}
                  
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
