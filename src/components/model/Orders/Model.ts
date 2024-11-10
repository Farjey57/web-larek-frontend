import { IProduct, PaymentType, UserData } from '../../../types';
import { IOrdersModel } from '../../../types/model/Orders/OrdersModel';
import { OrdersService } from './Service/OrdersService';

export class OrderModel implements IOrdersModel {
	private readonly products: Map<string, IProduct> = new Map();
	private userData: UserData = {
		phone: '',
		email: '',
		address: '',
		payment: PaymentType.cash,
	};

	constructor(private orderService: OrdersService) {}

  get productsList(): IProduct[] {
		return Array.from(this.products.values());
	}

	set user(user: Partial<UserData>) {
		this.userData = { ...this.userData, ...user };
	}

	sendOrder() {
		const total = this.productsList.reduce((total, product) => {
			return total + product.price;
		}, 0);
		const products = this.productsList.map((product) => product.id);
		return this.orderService.postOrder(
			Object.assign({ items: products }, { ...this.userData }, { total: total })
		);
	}

	addProduct(product: IProduct): number {
		this.products.set(product.id, product);
		return this.productsList.length;
	}

	removeProduct(id: string): number {
		this.products.delete(id);
		return this.productsList.length;
	}

	hasProduct(id: string): boolean {
		return this.products.has(id);
	}

	clearOrder(): number {
		this.products.clear();
		this.userData = {
			phone: '',
			email: '',
			address: '',
			payment: PaymentType.cash,
		};
		return this.products.size;
	}
}
