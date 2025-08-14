export const metadata = { title: 'Clinic Appointments', description: 'Minimal appointment booking' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}