'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/client';

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { bookings } = await api('/api/all-bookings');
        setRows(bookings || []);
      } catch (e) { setErr(e.message || 'Failed to load'); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin — All Bookings</h1>
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r._id} className="border rounded p-2 text-sm">
            <div className="font-medium">{r.userId?.name} ({r.userId?.email})</div>
            <div>{new Date(r.slotId).toLocaleString()}</div>
          </div>
        ))}
        {rows.length === 0 && !loading && <p className="text-sm text-gray-600">No bookings yet.</p>}
      </div>
    </div>
  );
}