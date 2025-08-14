import './globals.css';
export const metadata = {
  title: 'Clinic Appointments',
  description: 'Minimal appointment booking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-50 text-gray-900 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-purple-700">Clinic Appointments</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:text-purple-500 transition-colors">Home</a>
            <a href="/appointments" className="hover:text-purple-500 transition-colors">Appointments</a>
            <a href="/about" className="hover:text-purple-500 transition-colors">About</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-white shadow-inner p-4 text-center text-gray-600">
          © {new Date().getFullYear()} Dev Jayswal. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
