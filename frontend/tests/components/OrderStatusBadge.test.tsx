import { render, screen } from '@testing-library/react';
import { OrderStatusBadge } from '../../src/components/OrderStatusBadge';

describe('OrderStatusBadge', () => {
  it('displays pending status correctly', () => {
    render(<OrderStatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('displays in_transit status correctly', () => {
    render(<OrderStatusBadge status="in_transit" />);
    expect(screen.getByText('In Transit')).toBeInTheDocument();
  });

  it('displays delivered status correctly', () => {
    render(<OrderStatusBadge status="delivered" />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('displays cancelled status correctly', () => {
    render(<OrderStatusBadge status="cancelled" />);
    expect(screen.getByText('Cancelled')).toBeInTheDocument();
  });
});