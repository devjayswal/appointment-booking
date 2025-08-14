'use client';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/client';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await api('/api/logout', { method: 'POST' });
      router.push('/login');
    } catch (e) {
      console.error('Logout failed', e);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-1 text-purple-700 font-medium hover:text-white hover:bg-purple-600 transition px-3 py-2 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
      </svg>
      <span>Logout</span>
    </button>
  );
}
