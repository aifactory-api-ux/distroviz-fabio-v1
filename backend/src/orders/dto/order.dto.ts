export interface Order {
  id: number;
  product_name: string;
  quantity: number;
  plant: string;
  distribution_center: string;
  status: 'pending' | 'dispatched' | 'delivered';
  created_at: string;
  updated_at: string;
}