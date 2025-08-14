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
    setErr(''); setLoading(true);
    try {
      const { role } = await api('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      router.push(role === 'admin' ? '/admin' : '/dashboard');
    } catch (e) { setErr(e.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={loading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Logging in…' : 'Login'}</button>
      </form>
      <a href="/register" className="text-sm underline">Create a patient account</a>
    </div>
  );
}