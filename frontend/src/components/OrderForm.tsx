import React, { useState } from 'react';
import { CreateOrder } from '../types/create-order';

interface OrderFormProps {
  onSubmit: (data: CreateOrder) => Promise<void>;
  loading: boolean;
}

export function OrderForm({ onSubmit, loading }: OrderFormProps) {
  const [formData, setFormData] = useState<CreateOrder>({
    product_name: '',
    quantity: 0,
    plant: '',
    distribution_center: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
    setErrors([]);
    setSuccess(false);
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];
    if (!formData.product_name) newErrors.push('product_name');
    if (formData.quantity <= 0) newErrors.push('quantity');
    if (!formData.plant) newErrors.push('plant');
    if (!formData.distribution_center) newErrors.push('distribution_center');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit(formData);
      setSuccess(true);
      setFormData({ product_name: '', quantity: 0, plant: '', distribution_center: '' });
    } catch (error) {
      setErrors(['Failed to create order']);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create New Order</h2>

      {success && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '15px' }}>
          Order created successfully!
        </div>
      )}

      {errors.length > 0 && errors[0] && !errors.includes('Failed to create order') && (
        <div data-testid="validation-error" style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '15px' }}>
          Please fill in: {errors.join(', ')}
        </div>
      )}

      {errors.includes('Failed to create order') && (
        <div data-testid="error-message" style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '15px' }}>
          Failed to create order
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Plant</label>
          <input
            type="text"
            name="plant"
            value={formData.plant}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Distribution Center</label>
          <input
            type="text"
            name="distribution_center"
            value={formData.distribution_center}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
}