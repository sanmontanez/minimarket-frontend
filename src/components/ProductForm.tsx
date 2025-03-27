import { useState, useEffect } from 'react';

interface ProductFormProps {
  onSave: (data: { name: string; price: number; stock: number }, id?: number) => void;
  onClose: () => void;
  initialData?: { id: number; name: string; price: number; stock: number };
}

export default function ProductForm({ onSave, onClose, initialData }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setStock(initialData.stock);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, price, stock }, initialData?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? '✏️ Editar producto' : '➕ Nuevo producto'}
        </h2>
        <label className="block mb-1 text-sm font-medium text-gray-700">
            Nombre
            </label>
        <input
          type="text"
          placeholder="Nombre"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

            <label className="block mb-1 text-sm font-medium text-gray-700">
            Precio
            </label>
            <input
            type="number"
            placeholder="Precio"
            className="w-full mb-3 p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            />
 <label className="block mb-1 text-sm font-medium text-gray-700">
           Stock
            </label>
        <input
          type="number"
          placeholder="Stock"
          className="w-full mb-3 p-2 border rounded"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
        />

        <div className="flex justify-between">
          <button
            type="button"
            className="text-gray-600 hover:underline"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
