'use client';
import LogoutButton from './LogoutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ role }) {
  const pathname = usePathname();

  const linkClasses = (href) =>
    `px-3 py-2 rounded-lg font-medium transition-colors ${
      pathname === href
        ? 'bg-purple-600 text-white'
        : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
    }`;

  return (
    <nav className="flex justify-between items-center mb-6 border-b border-gray-200 bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-purple-700 text-lg">Clinic App</span>
        {role === 'patient' && <Link href="/dashboard" className={linkClasses('/dashboard')}>Dashboard</Link>}
        {role === 'admin' && <Link href="/admin" className={linkClasses('/admin')}>Admin</Link>}
      </div>
      <LogoutButton />
    </nav>
  );
}
