'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/client';
import Navbar from '@/components/Navbar';

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { bookings } = await api('/api/all-bookings');
        setRows(bookings || []);
      } catch (e) {
        setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50 pb-12">
      <Navbar role="admin" />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">Admin Dashboard</h1>

        {loading && (
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-16 bg-white rounded-lg shadow animate-pulse"></div>
              ))}
          </div>
        )}

        {err && <p className="text-red-600 text-sm">{err}</p>}

        {!loading && rows.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rows.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <div className="font-medium text-purple-700">{r.userId?.name}</div>
                <div className="text-gray-600 text-sm">{r.userId?.email}</div>
                <div className="mt-2 text-gray-700 text-sm">
                  {new Date(r.slotId).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && rows.length === 0 && (
          <p className="text-sm text-gray-600">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}
