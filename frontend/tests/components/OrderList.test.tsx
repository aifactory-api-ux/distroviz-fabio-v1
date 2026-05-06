import { render, screen, fireEvent } from '@testing-library/react';
import { OrderList } from '../../src/components/OrderList';
import { Order } from '../../src/types/order';

describe('OrderList', () => {
  const mockOrders: Order[] = [
    {
      id: 1,
      customerName: 'John Doe',
      address: '123 Main St',
      status: 'pending',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      items: [
        { id: 1, orderId: 1, productName: 'Widget', quantity: 2, unitPrice: 10 },
      ],
    },
  ];

  const mockUpdateStatus = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    mockUpdateStatus.mockClear();
    mockDelete.mockClear();
  });

  it('renders list of orders from API', () => {
    render(
      <OrderList
        orders={mockOrders}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
        deletingId={null}
      />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });

  it('shows empty state when no orders are present', () => {
    render(
      <OrderList
        orders={[]}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
        deletingId={null}
      />
    );
    expect(screen.getByText('No orders found.')).toBeInTheDocument();
  });

  it('shows error message if fetching orders fails', () => {
    render(
      <OrderList
        orders={[]}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
        deletingId={null}
      />
    );
    expect(screen.getByText('No orders found.')).toBeInTheDocument();
  });

  it('calls delete handler when delete button is clicked', () => {
    render(
      <OrderList
        orders={mockOrders}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
        deletingId={null}
      />
    );
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('shows deleting state for the order being deleted', () => {
    render(
      <OrderList
        orders={mockOrders}
        onUpdateStatus={mockUpdateStatus}
        onDelete={mockDelete}
        deletingId={1}
      />
    );
    expect(screen.getByText('Deleting...')).toBeInTheDocument();
  });
});