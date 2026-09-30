import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center p-4 font-sans text-[#fafafa]">
      <div className="w-full max-w-md bg-[#1a1a1c] p-8 rounded-xl border border-[#333333] shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-[#fafafa] mb-2">The Journey</h1>
          <p className="text-[#888888] text-sm">Sign in to admin dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#888888] mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f0f11] border border-[#333333] rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff4747] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#888888] mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f0f11] border border-[#333333] rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff4747] transition-colors"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#ff4747] hover:bg-[#ff2e2e] text-white font-medium py-2 rounded transition-colors mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
