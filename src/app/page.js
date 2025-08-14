'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace('/login'), 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50">
      <div className="text-center">
        <div className="loader border-t-4 border-purple-500 rounded-full w-12 h-12 mx-auto animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">Redirecting to Login...</p>
      </div>

      {/* Tailwind spinner */}
      <style jsx>{`
        .loader {
          border-width: 4px;
          border-top-color: transparent;
        }
      `}</style>
    </div>
  );
}
