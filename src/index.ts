import './scss/styles.scss';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { ProductsService } from './components/api/ProductsServices/ProductsService';
import { EventEmitter } from './components/base/events';
import { ProductModel } from './components/model/Products/Model';
import { OrderModel } from './components/model/Orders/Model';
import { OrdersService } from './components/api/OrdersService/OrdersService';
import { IProduct, UserData } from './types';
import { ensureElement } from './utils/utils';
import { FormDeliveryView } from './components/view/Form/FormDelivery/FormDeliveryView';
import { ModalView } from './components/view/Modal/ModalView';
import { ProductCardPreviewView } from './components/view/Products/ProductCardPreview/ProductCardPreviewView';
import { FormContactsView } from './components/view/Form/FormContacts/FormContactsView';
import { OrderResultType } from './types/api/OrderService/OrderService';
import { Success } from './components/view/Success/SuccessView';
import { CartView } from './components/view/Cart/CartView';
import { Page } from './components/view/Page/PageView';
import { ProductCardView } from './components/view/Products/ProductCard/ProductCardView';
import { ICartView } from './types/view/Cart/Cart';

/* ИНИЦИАЛИЗАЦИЯ */

// Адаптеры к Api
const api = new Api(API_URL, settings);
const productService = new ProductsService(api, CDN_URL);
const orderService = new OrdersService(api);

// Модели
const productsModel = new ProductModel();
const orderModel = new OrderModel();

// Эмитер
const eventEmitter = new EventEmitter();

/* VIEW */

//Контейнер страницы
const page = new Page(document.body, {
	onClick: () => {
		eventEmitter.emit('modal.openCart');
	},
});

//Модалка
const modal = new ModalView(ensureElement('#modal-container'), () =>
	eventEmitter.emit('modal.hideModal')
);

//Корзина
const cart: ICartView = new CartView({
	products: orderModel.productsList,
	totalPrice: orderModel.total,
	onSubmit: () => {
		eventEmitter.emit('modal.createFormDelivery');
	},
	onDelete: (id: string) => {
		eventEmitter.emit('order.remove', { id });
	},
}).render();

/* СОБЫТИЯ */

// События главной страницы
eventEmitter.on(
	'page.updateProductsCount',
	() => (page.counter = orderModel.count)
);

//Загрузка продкутов завершена. Инициализируется отображение товаров
eventEmitter.on('product.ready', () => {
	page.gallery = productsModel.getProducts().map((product) => {
		const Card = new ProductCardView({
			product: product,
			onClick: (product: IProduct) => {
				eventEmitter.emit('modal.createPreview', product);
			},
		});
		return Card.render();
	});
});

/* МОДАЛКА */

//Создание карт превью
eventEmitter.on('modal.createPreview', (product: IProduct) => {
	const preview = new ProductCardPreviewView({
		product,
		state: orderModel.hasProduct(product.id),
		onClick: (preview: ProductCardPreviewView) => {
			orderModel.hasProduct(product.id)
				? eventEmitter.emit('order.remove', { id: product.id })
				: eventEmitter.emit('order.add', product);
			preview.state = orderModel.hasProduct(product.id);
		},
	});
	modal.setContent(preview.render());
	eventEmitter.emit('modal.showModal');
});

//Рендер корзины
eventEmitter.on('modal.openCart', () => {
	modal.setContent(cart);
	eventEmitter.emit('modal.showModal');
});

//Рендер формы Delivery
eventEmitter.on('modal.createFormDelivery', () => {
	const formView = new FormDeliveryView({
		onChangeForm: (form) => {
			eventEmitter.emit('form.change', form);
		},
		onSubmit: (data) => {
			console.log(data);
			eventEmitter.emit('form.updateData', data);
			eventEmitter.emit('modal.createFormContacts');
		},
	});
	modal.setContent(formView.template);
});

//Рендер формы Contacts
eventEmitter.on('modal.createFormContacts', () => {
	const formView = new FormContactsView({
		onChangeForm: (form) => {
			eventEmitter.emit('form.change', form);
		},
		onSubmit: (data) => {
			console.log('попытка отправить');
			eventEmitter.emit('form.updateData', data);
			eventEmitter.emit('form.submit');
		},
	});
	modal.setContent(formView.template);
});

//Рендер окна Success
eventEmitter.on('modal.createSuccess', (res: OrderResultType) => {
	console.log('modal.createSuccess');
	const successView = new Success({
		res,
		onClick: () => {
			eventEmitter.emit('modal.hideModal');
		},
	});
	modal.setContent(successView.template);
});

// показать модалку
eventEmitter.on('modal.showModal', () => {
	modal.show();
	page.locked = true;
});

// закрыть модалку
eventEmitter.on('modal.hideModal', () => {
	modal.hide();
	page.locked = false;
});

/* ФОРМА */

eventEmitter.on('form.change', (form: FormDeliveryView) => {
	form.validate();
});

eventEmitter.on('form.updateData', (data: Partial<UserData>) => {
	orderModel.user = data;
});

eventEmitter.on('form.submit', () => {
	eventEmitter.emit('order.setUser', orderModel.user);
});

/* ЗАКАЗ */

eventEmitter.on('order.add', (product: IProduct) => {
	orderModel.addProduct(product);
	eventEmitter.emit('order.update');
});

eventEmitter.on('order.remove', (data: { id: string }) => {
	orderModel.removeProduct(data.id);
	eventEmitter.emit('order.update');
});

eventEmitter.on('order.update', () => {
	cart.totalPrice = `${orderModel.total}`;
	eventEmitter.emit('page.updateProductsCount');
});

eventEmitter.on('order.setUser', (user: UserData) => {
	orderModel.user = user;
	eventEmitter.emit('order.send');
});

eventEmitter.on('order.send', () => {
	orderService
		.postOrder(orderModel.dataOrder)
		.then((data) => {
			eventEmitter.emit('order.success', data);
		})
		.catch((err) => {
			console.log(err);
			setTimeout(() => {
				eventEmitter.emit('order.send');
			}, 1000);
		});
});

eventEmitter.on('order.success', (res: OrderResultType) => {
	orderModel.clearOrder();
	eventEmitter.emit('page.updateProductsCount', {
		count: String(orderModel.count),
	});
	eventEmitter.emit('modal.createSuccess', res);
});

productService
	.getAllProducts()
	.then((data) => {
		productsModel.setProducts(data);
		eventEmitter.emit('product.ready');
	})
	.catch((err) => {
		console.log(err);
	});
