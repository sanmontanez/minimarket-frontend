import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface SalesCartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onSubmitSale: () => void;
}

export default function SalesCart({ cart, onUpdateQuantity, onRemoveItem, onSubmitSale }: SalesCartProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = () => {
    onSubmitSale();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded shadow ml-4">
      <h2 className="text-xl font-bold mb-4">🧾 Resumen</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No hay productos agregados.</p>
      ) : (
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                    className="w-16 p-1 border rounded"
                  />
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right">
            <p className="text-sm">Total ítems: {itemCount}</p>
            <p className="text-lg font-bold">Total: ${total}</p>
          </div>

          <button
            className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            💸 Registrar venta
          </button>
        </div>
      )}

      {showConfirmation && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 text-sm rounded">
          ✅ Venta registrada con éxito
        </div>
      )}
    </div>
  );
}