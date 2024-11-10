import { PaymentType, UserData } from '../../../types';
import { IFormPresenter } from '../../../types/presenter/Form/FormPresenter';
import { EventEmitter } from '../../base/events';
import { FormDeliveryView } from '../../view/Form/FormDelivery/FormDeliveryView';

export class FormPresenter implements IFormPresenter {
	address: string;
	email: string;
	payment: PaymentType;
	phone: string;

	constructor(private readonly eventEmitter: EventEmitter) {
		this.addListeners();
	}

	addListeners() {
		this.eventEmitter.on('form.change', (form: FormDeliveryView) => {
			form.validate();
		});

		this.eventEmitter.on('form.updateData', (data: Partial<UserData>) => {
			Object.assign(this, data);
		});

		this.eventEmitter.on('form.submit', () => {
			this.eventEmitter.emit('order.setUser', this.data);
		});
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
