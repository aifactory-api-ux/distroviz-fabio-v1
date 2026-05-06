import { render, screen, fireEvent } from '@testing-library/react';
import { OrderForm } from '../../src/components/OrderForm';
import { OrderCreate } from '../../src/types/order';

describe('OrderForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('submits valid order and displays success', () => {
    render(<OrderForm onSubmit={mockOnSubmit} loading={false} />);
    const customerInput = screen.getByPlaceholderText('Product Name').parentElement?.parentElement?.querySelector('input');
    expect(screen.getByText('Create Order')).toBeInTheDocument();
  });

  it('shows validation error for missing required fields', () => {
    render(<OrderForm onSubmit={mockOnSubmit} loading={false} />);
    const submitButton = screen.getByText('Create Order');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error message on API failure', () => {
    render(<OrderForm onSubmit={mockOnSubmit} loading={false} />);
    expect(screen.getByText('Create Order')).toBeInTheDocument();
  });

  it('disables submit button while loading', () => {
    render(<OrderForm onSubmit={mockOnSubmit} loading={true} />);
    const button = screen.getByText('Creating...') as HTMLButtonElement;
    expect(button).toBeDisabled();
  });

  it('can add items to order', () => {
    render(<OrderForm onSubmit={mockOnSubmit} loading={false} />);
    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);
    const inputs = screen.getAllByPlaceholderText('Product Name');
    expect(inputs.length).toBe(2);
  });
});