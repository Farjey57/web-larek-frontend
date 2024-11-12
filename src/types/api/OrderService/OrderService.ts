export interface IOrdersService {
  postOrder(order: OrderFetchType): Promise<OrderResultType>
}

export type OrderFetchType = {
  payment: string; 
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[];
}

export type OrderResultType = {
	id: string;
	total: number;
};
