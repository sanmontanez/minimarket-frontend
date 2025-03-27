import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

export default function Productos() {
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
      <ProductList />
    </Layout>
  );
}
