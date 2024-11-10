import { OrderModel, PaymentType, UserData } from '../../model/Orders/Model';
import { EventEmitter } from '../../base/events';
import { IProduct } from '../../../types';
import { FormDeliveryView } from '../../view/Form/FormDelivery/FormDeliveryView';
import { FormContactsView } from '../../view/Form/FormContacts/FormContactsView';

export class FormPresenter implements UserData {
	address: string;
	email: string;
	payment: PaymentType;
	phone: string;

	constructor(
		private orderModel: OrderModel,
		private readonly eventEmitter: EventEmitter
	) {
		this.addListeners();
	}

	addListeners() {
    this.eventEmitter.on('form.change', (form: FormDeliveryView) => {
      form.validate()
    })

		this.eventEmitter.on('form.updateData', (data: Partial<UserData>) => {
      Object.assign(this, data);
		})

		this.eventEmitter.on('form.submit', () => {
		  this.eventEmitter.emit('order.setUser', this.data)
		})
	}

	get data() {
		const res: UserData = {
			phone: this.phone,
			email: this.email,
			address: this.address,
			payment: this.payment,
		};
		return res;
	}
}

export enum Step {
	delivery = 'delivery',
	contacts = 'contacts',
}
