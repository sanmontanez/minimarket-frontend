import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3000/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return;

    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  const handleSave = async (data: { name: string; price: number; stock: number }, id?: number) => {
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:3000/products/${id}`
      : 'http://localhost:3000/products';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📦 Lista de productos</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          ➕ Agregar producto
        </button>
      </div>

      {showForm && (
        <ProductForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
          initialData={editingProduct || undefined}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">💰 Precio: ${product.price}</p>
            <p className="text-gray-700">📦 Stock: {product.stock}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => {
                  setEditingProduct(product);
                  setShowForm(true);
                }}
              >
                ✏️ Editar
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleDelete(product.id)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}