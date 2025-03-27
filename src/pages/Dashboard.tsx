import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(payload.email);
    }
  }, []);

  return (
    <Layout userEmail={userEmail}>
      <h1 className="text-2xl font-bold text-gray-800">👋 Bienvenido al panel de administración</h1>
      <p className="mt-2 text-gray-600">Desde aquí puedes administrar tus productos, ventas y ver el resumen.</p>
    </Layout>
  );
}
