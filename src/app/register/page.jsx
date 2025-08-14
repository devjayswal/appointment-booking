'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/client';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    setLoading(true);
    try {
      await api('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
      setOk('Registered! You can login now.');
      setTimeout(() => router.push('/login'), 500);
    } catch (e) {
      setErr(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-purple-700 text-center">Register</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          {ok && <p className="text-green-600 text-sm">{ok}</p>}
          <button
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Back to login</a>
        </p>
      </div>
    </div>
  );
}
