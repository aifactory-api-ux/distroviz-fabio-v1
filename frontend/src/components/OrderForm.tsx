import React, { useState } from 'react';
import { OrderCreate, OrderItemCreate } from '../types/order';

interface OrderFormProps {
  onSubmit: (data: OrderCreate) => void;
  loading: boolean;
}

export function OrderForm({ onSubmit, loading }: OrderFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState<OrderItemCreate[]>([
    { productName: '', quantity: 1, unitPrice: 0 },
  ]);

  const handleItemChange = (
    index: number,
    field: keyof OrderItemCreate,
    value: string | number,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productName: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ customerName, address, items });
    setCustomerName('');
    setAddress('');
    setItems([{ productName: '', quantity: 1, unitPrice: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px' }}>Create Order</h2>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Customer Name
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Items</h3>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '8px',
              alignItems: 'flex-end',
            }}
          >
            <input
              type="text"
              placeholder="Product Name"
              value={item.productName}
              onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
              required
              style={{ flex: 2, padding: '8px' }}
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, 'quantity', parseInt(e.target.value, 10) || 0)
              }
              required
              min="1"
              style={{ flex: 1, padding: '8px' }}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)
              }
              required
              min="0"
              step="0.01"
              style={{ flex: 1, padding: '8px' }}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{ padding: '8px 12px', backgroundColor: '#ef4444', color: '#fff' }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Item
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#22c55e',
          color: '#fff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Creating...' : 'Create Order'}
      </button>
    </form>
  );
}