'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/client';

export default function Dashboard() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true); setErr('');
    try {
      const s = await api('/api/slots');
      const b = await api('/api/my-bookings');
      setSlots(s.slots || []);
      setBookings(b.bookings || []);
    } catch (e) { setErr(e.message || 'Failed to load'); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function book(slotId) {
    setMsg(''); setErr('');
    try {
      await api('/api/book', { method: 'POST', body: JSON.stringify({ slotId }) });
      setMsg('Booked!');
      await load();
    } catch (e) { setErr(e.message || 'Booking failed'); }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600 text-sm">{err}</p>}
      {msg && <p className="text-green-600 text-sm">{msg}</p>}

      <section className="space-y-2">
        <h2 className="font-medium">Available Slots (Next 7 days)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {slots.map((s) => (
            <button key={s.startAt}
              onClick={() => book(new Date(s.startAt).toISOString())}
              className="border rounded p-2 text-left hover:bg-gray-100">
              <div className="text-sm">{new Date(s.startAt).toLocaleString()}</div>
              <div className="text-xs text-gray-500">→ {new Date(s.endAt).toLocaleTimeString()}</div>
            </button>
          ))}
          {slots.length === 0 && !loading && <p className="text-sm text-gray-600">No slots available.</p>}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-medium">My Bookings</h2>
        <ul className="space-y-1">
          {bookings.map((b) => (
            <li key={b._id} className="border rounded p-2 text-sm">
              {new Date(b.slotId).toLocaleString()}
            </li>
          ))}
          {bookings.length === 0 && !loading && <p className="text-sm text-gray-600">No bookings yet.</p>}
        </ul>
      </section>
    </div>
  );
}
