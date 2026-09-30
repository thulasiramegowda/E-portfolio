import { useState, useEffect } from 'react';
import api from '../api';
import { Loader2, Image as ImageIcon, FileText } from 'lucide-react';

export default function AdminProfile() {
  const [formData, setFormData] = useState({
    name: '', headline: '', shortBio: '', longBio: '', location: '', email: '', 
    photoUrl: '', resumeUrl: '', github: '', linkedin: '', twitter: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        if (data) setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (type === 'photo') setUploadingPhoto(true);
    else setUploadingResume(true);
    
    const form = new FormData();
    form.append('file', file);
    
    try {
      const { data } = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, [type === 'photo' ? 'photoUrl' : 'resumeUrl']: data.url });
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      if (type === 'photo') setUploadingPhoto(false);
      else setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile', formData);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Update failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-serif mb-8">Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 space-y-6">
        
        {/* Images & Files */}
        <div className="flex space-x-8 pb-6 border-b border-[#333333]">
          <div>
            <label className="block text-sm text-[#888888] mb-2">Profile Photo</label>
            <div className="flex flex-col items-start space-y-3">
              {formData.photoUrl ? (
                <img src={formData.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border border-[#333333]" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#0f0f11] border border-[#333333] flex items-center justify-center text-[#333333]">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <label className="cursor-pointer bg-[#333333] hover:bg-[#444444] px-4 py-2 rounded flex items-center space-x-2 text-sm transition-colors">
                {uploadingPhoto ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                <span>Upload Photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'photo')} disabled={uploadingPhoto} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#888888] mb-2">Resume (PDF)</label>
            <div className="flex flex-col items-start space-y-3">
              {formData.resumeUrl ? (
                <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-[#ff4747] hover:underline">
                  <FileText className="w-5 h-5" />
                  <span>View Current Resume</span>
                </a>
              ) : (
                <div className="text-sm text-[#888888]">No resume uploaded</div>
              )}
              <label className="cursor-pointer bg-[#333333] hover:bg-[#444444] px-4 py-2 rounded flex items-center space-x-2 text-sm transition-colors">
                {uploadingResume ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                <span>Upload PDF</span>
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleUpload(e, 'resume')} disabled={uploadingResume} />
              </label>
            </div>
          </div>
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#888888] mb-1">Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-[#888888] mb-1">Headline</label>
            <input type="text" value={formData.headline} onChange={e => setFormData({...formData, headline: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#888888] mb-1">Short Bio</label>
          <textarea rows="2" value={formData.shortBio} onChange={e => setFormData({...formData, shortBio: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white"></textarea>
        </div>

        <div>
          <label className="block text-sm text-[#888888] mb-1">Long Bio</label>
          <textarea rows="5" value={formData.longBio} onChange={e => setFormData({...formData, longBio: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-sm text-[#888888] mb-1">Location</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-[#888888] mb-1">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
           <div>
            <label className="block text-sm text-[#888888] mb-1">GitHub URL</label>
            <input type="text" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-[#888888] mb-1">LinkedIn URL</label>
            <input type="text" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-[#888888] mb-1">Twitter URL</label>
            <input type="text" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full bg-[#0f0f11] border border-[#333333] rounded p-2 text-white" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#333333]">
          <button type="submit" className="bg-[#ff4747] text-white px-6 py-2 rounded hover:bg-[#ff2e2e]">Save Profile</button>
        </div>
      </form>
    </div>
  );
}
