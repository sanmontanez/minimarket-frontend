import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

interface Agrupado {
    producto: string;
    totalVendidas: number;
    ingresos: number;
  }

export default function Resumen() {
  const [userEmail, setUserEmail] = useState('');
  const [resumen, setResumen] = useState<Agrupado[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(payload.email);
    }

    fetchResumen();
  }, []);

  const fetchResumen = async () => {
    let url = 'http://localhost:3000/sales/summary';
    const params = [];

    if (from) params.push(`from=${from}`);
    if (to) params.push(`to=${to}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log('Resumen recibido:', data);

    if (Array.isArray(data)) {
      setResumen(data);
    } else {
      setResumen([]);
    }
  };

  const totalIngresos = resumen.reduce((sum, item) => sum + (item.ingresos || 0), 0);

  return (
    <Layout userEmail={userEmail}>
      <h1 className="text-2xl font-bold mb-4">📊 Resumen de Ventas</h1>

      <div className="flex gap-4 items-end mb-6">
        <div>
          <label className="block text-sm mb-1">Desde</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Hasta</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={fetchResumen}
        >
          Filtrar
        </button>
      </div>

      {resumen.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas.</p>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Producto</th>
                <th className="py-2">Cantidad</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
  {resumen.map((item, index) => (
    <tr key={index} className="border-b">
      <td className="py-2">{item.producto}</td>
      <td className="py-2">{item.totalVendidas}</td>
      <td className="py-2">${item.ingresos?.toFixed(0) ?? '0'}</td>
    </tr>
  ))}
</tbody>

          </table>

          <p className="mt-4 font-bold text-right text-lg">
            Total ingresos: ${totalIngresos.toFixed(0)}
          </p>
        </div>
      )}
    </Layout>
  );
}
