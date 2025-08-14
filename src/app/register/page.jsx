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
    e.preventDefault(); setErr(''); setOk(''); setLoading(true);
    try {
      await api('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
      setOk('Registered! You can login now.');
      setTimeout(()=> router.push('/login'), 500);
    } catch (e) { setErr(e.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {ok && <p className="text-green-600 text-sm">{ok}</p>}
        <button disabled={loading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Registering…' : 'Register'}</button>
      </form>
      <a href="/login" className="text-sm underline">Back to login</a>
    </div>
  );
}
