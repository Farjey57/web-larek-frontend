import { UserData } from '../../../types';
import { IOrdersModel } from '../../../types/model/Orders/OrdersModel';
import { OrderFetchType } from '../../../types/api/OrderService/OrderService';


export class OrderModel implements IOrdersModel {
	private products: string[] = [];
	private userData: UserData;
	private formErrors: Partial<OrderFetchType> = {};
  private _total: number;

	constructor() {
		this.clearOrder();
	}

	get productsList(): string[] {
		return this.products;
	}

	get dataOrder(): OrderFetchType {
		return Object.assign(
			{ items: this.products },
			{ ...this.userData },
			{ total: this._total }
		);
	}

	get count() {
		return this.products.length;
	}

  set total(total: number) {
    this._total = total;
  }

	get total(): number {
		return this._total
	}

	set user(user: Partial<UserData>) {
		this.userData = { ...this.userData, ...user };
	}

	addProduct(id: string) {
		this.products.push(id);
	}

	removeProduct(idRemove: string) {
		this.products = this.products.filter((id) => id !== idRemove);
	}

	hasProduct(id: string): boolean {
		return this.products.includes(id);
	}

	clearOrder() {
		this.products.length = 0;
    this.total = 0;
		this.userData = {
			phone: '',
			email: '',
			address: '',
			payment: null,
		};
		this.formErrors = {};
	}

	validateOrder(cb?: (errors: Partial<OrderFetchType>) => void) {
		const errors: typeof this.formErrors = {};
		if (!this.userData.payment) {
			errors.payment = 'Необходимо выбрать способ доставки';
		}
		if (!this.userData.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		this.formErrors = errors;
		cb && cb(this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts(cb?: (errors: Partial<OrderFetchType>) => void) {
		const errors: typeof this.formErrors = {};
		if (!this.userData.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.userData.email) {
			errors.email = 'Необходимо указать email';
		}
		this.formErrors = errors;
		cb && cb(this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
