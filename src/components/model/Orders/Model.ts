import { IProduct } from '../../../types';
import { OrdersService } from './OrdersService/OrdersService';
import { OrderFetchType } from './types';

export class OrderModel {
	private readonly products: Map<string, IProduct> = new Map();
	private userData: UserData = {
    phone: '',
    email: '',
    address: '',
    payment: PaymentType.cash,
  };

	constructor(private orderService: OrdersService) {}

  sendOrder() {
    const total = 
      this.productsList.reduce((total, product) => {
        return total + product.price;
      }, 0)
    const products = this.productsList.map((product) => product.id)
    console.log(Object.assign({products: products}, {...this.userData}, {total: total}))
    this.orderService.postOrder(Object.assign({products: products}, {...this.userData}, {total: total})).then((data) => console.log(data))
  }

	addProduct(product: IProduct): number {
		this.products.set(product.id, product);
		return this.productsList.length;
	}

  removeProduct(id: string): number {
    this.products.delete(id);
    return this.productsList.length
  }

	get productsList(): IProduct[] {
		return Array.from(this.products.values());
	}

	set user(user: Partial<UserData>) {
    console.log(user)
    console.log({ ...this.userData, ...user })
    this.userData = { ...this.userData, ...user };
    console.log(this.userData)
  }

  hasProduct(id: string) {
    return this.products.has(id)
  }
}

export type UserData = {
	phone: string;
	email: string;
	address: string;
	payment: PaymentType;
};

export enum PaymentType {
	card = 'card',
	cash = 'cash'
}
