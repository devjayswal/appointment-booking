'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/client';
import Navbar from '@/components/Navbar';

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50 pb-12">
      <Navbar role="patient" />
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Messages */}
        {loading && <p className="text-gray-500 animate-pulse">Loading…</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {msg && <p className="text-green-600 text-sm">{msg}</p>}

        {/* Available Slots */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-purple-700">Available Slots (Next 7 days)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-20 bg-white rounded-lg shadow animate-pulse"></div>
              ))
            ) : slots.length ? (
              slots.map((s) => (
                <button
                  key={s.startAt}
                  onClick={() => book(new Date(s.startAt).toISOString())}
                  className="bg-white border rounded-lg p-3 text-left shadow hover:shadow-lg transition hover:bg-purple-50"
                >
                  <div className="text-sm font-medium">{new Date(s.startAt).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(s.startAt).toLocaleTimeString()} → {new Date(s.endAt).toLocaleTimeString()}
                  </div>
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-600">No slots available.</p>
            )}
          </div>
        </section>

        {/* My Bookings */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-purple-700">My Bookings</h2>
          <div className="space-y-2">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-12 bg-white rounded-lg shadow animate-pulse text-gray-500"></div>
              ))
            ) : bookings.length ? (
              bookings.map((b) => (
                <div key={b._id} className="bg-white border rounded-lg p-3 shadow text-sm text-gray-500">
                  {new Date(b.slotId).toLocaleString()}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No bookings yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
