export interface IOrdersService {
  postOrder(order: OrderFetchType): Promise<success>
}

export type OrderFetchType = {
  payment: string; 
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[];
}

export type success = {
	id: string;
	total: number;
};
