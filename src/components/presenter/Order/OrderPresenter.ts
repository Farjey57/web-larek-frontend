import { EventEmitter } from '../../base/events';
import { OrderModel, UserData } from '../../model/Orders/Model';
import { IProduct } from '../../../types';

export class OrderPresenter {
	constructor(
		private readonly orderModel: OrderModel,
		private readonly eventEmitter: EventEmitter
	) {
		this.eventEmitter.on('order.add', (product: IProduct) => {
			const count = this.orderModel.addProduct(product);
			this.eventEmitter.emit('app.updateProductsCount', {
				count: String(count),
			});
		});

		this.eventEmitter.on('order.remove', (data: { id: string }) => {
			const count = this.orderModel.removeProduct(data.id);
			this.eventEmitter.emit('app.updateProductsCount', {
				count: String(count),
			});
		});

		this.eventEmitter.on('order.setUser', (user: UserData) => {
			this.orderModel.user = user;
      this.eventEmitter.emit('order.send');
		});
	}
}
