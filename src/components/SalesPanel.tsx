import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface SalesPanelProps {
  onAddToCart: (product: Product) => void;
}

export default function SalesPanel({ onAddToCart }: SalesPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:3000/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-2/3">
      <h2 className="text-xl font-bold mb-4">🛒 Buscar productos</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => onAddToCart(product)}
            >
              ➕ Agregar
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm">No hay productos que coincidan</p>
        )}
      </div>
    </div>
  );
}
