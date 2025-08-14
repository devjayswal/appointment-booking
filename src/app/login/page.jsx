'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const { role } = await api('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      router.push(role === 'admin' ? '/admin' : '/dashboard');
    } catch (e) {
      setErr(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-purple-700 text-center">Clinic Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-gray-500"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-gray-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Don't have an account? <a href="/register" className="text-purple-600 hover:underline">Create a patient account</a>
        </p>
      </div>
    </div>
  );
}
