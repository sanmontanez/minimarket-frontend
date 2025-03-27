import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  userEmail: string;
}

export default function Layout({ children, userEmail }: LayoutProps) {
    return (
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-700 text-white p-4 space-y-4">
          <h2 className="text-2xl font-bold mb-8">🛒 Minimarket</h2>
          <nav className="flex flex-col gap-2">
  <Link
    to="/dashboard"
    className="hover:bg-blue-600 px-3 py-2 rounded transition"
  >
    🏠 Inicio
  </Link>
  <Link
    to="/productos"
    className="hover:bg-blue-600 px-3 py-2 rounded transition"
  >
    📦 Productos
  </Link>
  <Link
    to="/ventas"
    className="hover:bg-blue-600 px-3 py-2 rounded transition"
  >
    🛒 Ventas
  </Link>
  <Link
    to="/resumen"
    className="hover:bg-blue-600 px-3 py-2 rounded transition"
  >
    📊 Resumen
  </Link>
</nav>


        </aside>
  
        {/* Contenido principal */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-end mb-6">
            <p className="text-gray-700">👤 {userEmail}</p>
          </div>
  
          {children}
        </main>
      </div>
    );
  }
  
