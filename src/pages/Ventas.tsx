import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SalesPanel from '../components/SalesPanel';
import SalesCart from '../components/SalesCart';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Ventas() {
  const [userEmail, setUserEmail] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(payload.email);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitSale = async () => {
    for (const item of cart) {
      await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      });
    }

    alert('✅ Venta registrada');
    setCart([]);
  };

  return (
    <Layout userEmail={userEmail}>
      <div className="flex flex-col md:flex-row gap-6">
        <SalesPanel onAddToCart={handleAddToCart} />
        <SalesCart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onSubmitSale={handleSubmitSale}
        />
      </div>
    </Layout>
  );
}
