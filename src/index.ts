import './scss/styles.scss';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { ProductsService } from './components/model/Products/Services/ProductsService';
import { EventEmitter } from './components/base/events';
import { ProductModel } from './components/model/Products/Model';
import { OrderModel } from './components/model/Orders/Model';
import { OrdersService } from './components/model/Orders/Service/OrdersService';
import { IProduct, UserData } from './types';
import { ProductsGalleryView } from './components/view/Products/ProductsGallery/ProductsGallaryView';
import { bem, ensureElement } from './utils/utils';
import { FormDeliveryView } from './components/view/Form/FormDelivery/FormDeliveryView';
import { ModalView } from './components/view/Modal/ModalView';
import { ProductCardPreviewView } from './components/view/Products/ProductCardPreview/ProductCardPreviewView';
import { OrderCartView } from './components/view/Order/OrderCart/OrderCartView';
import { FormContactsView } from './components/view/Form/FormContacts/FormContactsView';
import { success } from './types/model/Orders/Service/Service';
import { Success } from './components/view/Success/SuccessView';

/* Много чего ещё можно сделать (базовые классы, абстракции), но времени нет( и переходов больше тоже */

/* ИНИЦИАЛИЗАЦИЯ */

// Адаптеры к Api
const api = new Api(API_URL, settings);
const productService = new ProductsService(api);
const orderService = new OrdersService(api);

// Модели
const productsModel = new ProductModel();
const orderModel = new OrderModel();

// Эмитер
const eventEmitter = new EventEmitter();

// Глобальные значения на главной странице
const cartElement = ensureElement('.header__basket');
const cartCount = ensureElement('.header__basket-counter');
const pageWrapper = ensureElement('.page__wrapper');

cartElement.onclick = () => {
	eventEmitter.emit('modal.createCart');
	eventEmitter.emit('modal.showModal');
};

//Модалка
const modal = new ModalView(ensureElement('#modal-container'), () =>
	eventEmitter.emit('modal.hideModal')
);

/* СОБЫТИЯ */

// События главной страницы
eventEmitter.on(
	'app.updateProductsCount',
	(data: { count: string }) => (cartCount.innerText = data.count)
);

// Получение данных с сервера

eventEmitter.on('product.download', async () => {
	await productService
		.getAllProducts()
		.then((data) => {
			productsModel.setProducts(data.items);
			eventEmitter.emit('product.ready', data.items);
		})
		.catch((err) => {
			console.log(err);
			setTimeout(() => {
				eventEmitter.emit('product.download');
			}, 1000);
		});
});

//Загрузка продкутов завершена. Инициализируется отображение товаров
eventEmitter.on('product.ready', (data: IProduct[]) => {
	const galleryView = new ProductsGalleryView({
		products: data,
		onProductClick: (product: IProduct) => {
			eventEmitter.emit('modal.createProduct', product);
			eventEmitter.emit('modal.showModal');
		},
	});
	galleryView.render(ensureElement('.gallery'));
});

/* МОДАЛКА */

//Создание карт превью
eventEmitter.on('modal.createProduct', (product: IProduct) => {
	console.log('modal.createProduct');
	const content = new ProductCardPreviewView({
		product,
		buttonText: orderModel.hasProduct(product.id)
			? 'Удалить из корзины'
			: 'Купить',
		onClick: () => {
			orderModel.hasProduct(product.id)
				? eventEmitter.emit('order.remove', { id: product.id })
				: eventEmitter.emit('order.add', product);
			eventEmitter.emit('modal.createProduct', product);
		},
	});
	modal.setContent(content.template);
});

//Рендер корзины
eventEmitter.on('modal.createCart', () => {
	const cartView = new OrderCartView({
		products: orderModel.productsList,
		totalPrice: String(
			orderModel.productsList.reduce((total, product) => {
				return total + product.price;
			}, 0)
		),
		onSubmit: () => {
			eventEmitter.emit('modal.createFormDelivery');
		},
		onDelete: (id: string) => {
			eventEmitter.emit('order.remove', { id });
			eventEmitter.emit('modal.createCart', { id });
		},
	});
	modal.setContent(cartView.template);
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
eventEmitter.on('modal.createSuccess', (res: success) => {
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
	pageWrapper.classList.toggle(bem('page', 'wrapper', 'locked').name);
});

// закрыть модалку
eventEmitter.on('modal.hideModal', () => {
	modal.hide();
	pageWrapper.classList.toggle(bem('page', 'wrapper', 'locked').name);
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
	eventEmitter.emit('app.updateProductsCount', {
		count: String(orderModel.count),
	});
});

eventEmitter.on('order.remove', (data: { id: string }) => {
	orderModel.removeProduct(data.id);
	eventEmitter.emit('app.updateProductsCount', {
		count: String(orderModel.count),
	});
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

eventEmitter.on('order.success', (res: success) => {
	orderModel.clearOrder();
	eventEmitter.emit('app.updateProductsCount', {
		count: String(orderModel.count),
	});
	eventEmitter.emit('modal.createSuccess', res);
});

// Инициализация
eventEmitter.emit('product.download');
