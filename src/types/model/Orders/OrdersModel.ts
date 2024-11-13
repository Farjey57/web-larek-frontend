import { UserData } from '../..';
import { OrderFetchType } from '../../api/OrderService/OrderService';

export interface IOrdersModel {
	productsList: string[];
	dataOrder: OrderFetchType;
	user: Partial<UserData>;
	count: number;
	total: number;

	addProduct(id: string): void;
	removeProduct(id: string): void;
	hasProduct(id: string): boolean;
	clearOrder(): void;
	validateOrder(cb?: (errors: Partial<OrderFetchType>) => void): boolean;
	validateContacts(cb?: (errors: Partial<OrderFetchType>) => void): boolean;
}
