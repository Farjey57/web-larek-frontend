import { IProduct } from '../../../types';
import { success } from '../../../types/model/Orders/Service/Service';
import { IModalPresenter } from '../../../types/presenter/Modal/ModalPresenter';
import { ensureElement } from '../../../utils/utils';
import { EventEmitter } from '../../base/events';
import { OrderModel } from '../../model/Orders/Model';
import { FormContactsView } from '../../view/Form/FormContacts/FormContactsView';
import { FormDeliveryView } from '../../view/Form/FormDelivery/FormDeliveryView';
import { ModalView } from '../../view/Modal/ModalView';
import { OrderCartView } from '../../view/Order/OrderCart/OrderCartView';
import { ProductCardPreviewView } from '../../view/Products/ProductCardPreview/ProductCardPreviewView';
import { Success } from '../../view/Success/SuccessView';

export class ModalPresenter implements IModalPresenter {
	modal: ModalView;
	constructor(
		private readonly orderModel: OrderModel,
		private readonly eventEmitter: EventEmitter
	) {
		this.modal = new ModalView(ensureElement('#modal-container'), () =>
			this.eventEmitter.emit('modal.hideModal')
		);
		this.addListeners();
	}

	addListeners() {
		//Рендер товара
		this.eventEmitter.on('modal.createProduct', (product: IProduct) => {
			const content = new ProductCardPreviewView({
				product,
				buttonText: this.orderModel.hasProduct(product.id)
					? 'Удалить из корзины'
					: 'Купить',
				onClick: () => {
					this.orderModel.hasProduct(product.id)
						? this.eventEmitter.emit('order.remove', { id: product.id })
						: this.eventEmitter.emit('order.add', product);
					this.eventEmitter.emit('modal.createProduct', product);
				},
			});
			this.modal.setContent(content.template);
		});

		//Рендер корзины
		this.eventEmitter.on('modal.createCart', () => {
			const cartView = new OrderCartView({
				products: this.orderModel.productsList,
				totalPrice: String(
					this.orderModel.productsList.reduce((total, product) => {
						return total + product.price;
					}, 0)
				),
				onSubmit: () => {
					this.eventEmitter.emit('modal.createFormDelivery');
				},
				onDelete: (id: string) => {
					this.eventEmitter.emit('order.remove', { id });
					this.eventEmitter.emit('modal.createCart', { id });
				},
			});
			this.modal.setContent(cartView.template);
		});

		//Рендер формы Delivery
		this.eventEmitter.on('modal.createFormDelivery', () => {
			const formView = new FormDeliveryView({
				onChangeForm: (form) => {
					this.eventEmitter.emit('form.change', form);
				},
				onSubmit: (data) => {
					this.eventEmitter.emit('form.updateData', data);
					this.eventEmitter.emit('modal.createFormContacts');
				},
			});
			this.modal.setContent(formView.template);
		});

		//Рендер формы Contacts
		this.eventEmitter.on('modal.createFormContacts', () => {
			const formView = new FormContactsView({
				onChangeForm: (form) => {
					this.eventEmitter.emit('form.change', form);
				},
				onSubmit: (data) => {
					console.log('попытка отправить');
					this.eventEmitter.emit('form.updateData', data);
					this.eventEmitter.emit('form.submit');
				},
			});
			this.modal.setContent(formView.template);
		});

		//Рендер окна Success
		this.eventEmitter.on('modal.createSuccess', (res: success) => {
			console.log('modal.createSuccess');
			const successView = new Success({
				res,
				onClick: () => {
					this.eventEmitter.emit('modal.hideModal');
				},
			});
			this.modal.setContent(successView.template);
		});

		// показать модалку
		this.eventEmitter.on('modal.showModal', () => {
			this.modal.show();
		});

		// закрыть модалку
		this.eventEmitter.on('modal.hideModal', () => {
			this.modal.hide();
		});
	}
}
