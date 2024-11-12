import { IProduct, UserData } from '../../../types';
import { IOrdersModel } from '../../../types/model/Orders/OrdersModel';
import { OrderFetchType } from '../../../types/api/OrderService/OrderService';

export class OrderModel implements IOrdersModel {
	private readonly products: Map<string, IProduct> = new Map();
	//Для отображения списка товаров в корзине
	//нужный спсиок ID мы получаем через геттер dataOrder()
	private userData: UserData;

	constructor() {
		this.user = {
			phone: '',
			email: '',
			address: '',
			payment: null,
		};
	}

	get productsList(): IProduct[] {
		return Array.from(this.products.values());
	}

	get dataOrder(): OrderFetchType {
		const products = this.productsList.map((product) => product.id);
		return Object.assign(
			{ items: products },
			{ ...this.userData },
			{ total: this.total }
		);
	}

	get count() {
		return this.products.size;
	}

	get total(): number {
		return this.productsList.reduce((total, product) => {
			return total + product.price;
		}, 0);
	}

	set user(user: Partial<UserData>) {
		this.userData = { ...this.userData, ...user };
	}

	addProduct(product: IProduct) {
		this.products.set(product.id, product);
	}

	removeProduct(id: string) {
		this.products.delete(id);
	}

	hasProduct(id: string): boolean {
		return this.products.has(id);
	}

	clearOrder() {
		this.products.clear();
		this.userData = {
			phone: '',
			email: '',
			address: '',
			payment: null,
		};
	}
}
