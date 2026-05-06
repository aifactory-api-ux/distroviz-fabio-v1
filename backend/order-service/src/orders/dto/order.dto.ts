export interface Order {
  id: number;
  customerName: string;
  address: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderCreate {
  customerName: string;
  address: string;
  items: OrderItemCreate[];
}

export interface OrderItemCreate {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderUpdateStatus {
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
}