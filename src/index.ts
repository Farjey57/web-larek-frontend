import './scss/styles.scss';
import { Api } from './components/base/api';
import {
	API_URL,
	CDN_URL,
	settings,
	TemplateSettings,
} from './utils/constants';
import { ProductsService } from './components/api/ProductsServices/ProductsService';
import { EventEmitter } from './components/base/events';
import { ProductModel } from './components/model/Products/Model';
import { OrderModel } from './components/model/Orders/Model';
import { OrdersService } from './components/api/OrdersService/OrdersService';
import { IProduct, PaymentType, UserData } from './types';
import { ensureElement } from './utils/utils';
import { FormOrderView } from './components/view/Form/FormOrder/FormOrderView';
import { ModalView } from './components/view/Modal/ModalView';
import {
	OrderFetchType,
	OrderResultType,
} from './types/api/OrderService/OrderService';
import { Success } from './components/view/Success/SuccessView';
import { CartView } from './components/view/Cart/CartView';
import { Page } from './components/view/Page/PageView';
import { IFormState } from './types/view/Form/Form';
import { FormContactsView } from './components/view/Form/FormContacts/FormContactsView';
import { CardPreviewView } from './components/view/Card/CardPreview/CardPreviewView';
import { CardCartView } from './components/view/Card/CardCart/CardCartView';
import { CardGalleryView } from './components/view/Card/CardGallary/CardGallaryView';

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

// return this.productsList.reduce((total, product) => {
//   return total + product.price;
// }, 0);

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
const cart = new CartView(TemplateSettings.cartView, {
	products: orderModel.productsList.reduce((acc, id) => {
    const findProduct = productsModel.getProductById(id);
    if (findProduct) acc.push(findProduct);
    return acc;
  }, []),
	totalPrice: orderModel.total,
	onSubmit: () => {
		eventEmitter.emit('modal.createFormOrder');
	},
});

//Форма доставки
const formOrder = new FormOrderView(TemplateSettings.formOrder, {
	onChangeForm: (field: string, value: PaymentType) => {
		eventEmitter.emit(`order.${String(field)}.change`, {
			field,
			value,
		});
	},
	onSubmit: (formName: string) => {
		eventEmitter.emit(`${formName}Form.submit`);
	},
});

//Форма контакты
const formContacts = new FormContactsView(TemplateSettings.formContacts, {
	onChangeForm: (field: string, value: PaymentType) => {
		eventEmitter.emit(`contacts.${String(field)}.change`, {
			field,
			value,
		});
	},
	onSubmit: (formName: string) => {
		eventEmitter.emit(`${formName}Form.submit`);
	},
});

//Окно завершения заказа
const successView = new Success(TemplateSettings.success, {
	onClick: () => {
		eventEmitter.emit('modal.hideModal');
	},
});

/* СОБЫТИЯ */

// События главной страницы
eventEmitter.on(
	'page.updateProductsCount',
	() => (page.counter = orderModel.count)
);

//Загрузка продкутов завершена. Инициализируется отображение товаров
eventEmitter.on('product.ready', () => {
	page.gallery = productsModel.getProducts().map((product) => {
		const Card = new CardGalleryView(TemplateSettings.cardGallery, {
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
	const preview = new CardPreviewView(TemplateSettings.cardPreview, {
		product,
		state: orderModel.hasProduct(product.id),
		onClick: (preview: CardPreviewView) => {
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
	modal.setContent(cart.render());
	eventEmitter.emit('modal.showModal');
});

//Рендер формы Order
eventEmitter.on('modal.createFormOrder', () => {
	modal.setContent(
		formOrder.render({
			address: '',
			payment: null,
			valid: false,
			errors: '',
		} as Partial<UserData> & IFormState)
	);
});

//Рендер формы Contacts
eventEmitter.on('modal.createFormContacts', () => {
	modal.setContent(
		formContacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: '',
		} as Partial<UserData> & IFormState)
	);
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
  formContacts.valid = false;
  formOrder.valid = false;
});

/* ФОРМА */

// Изменилось одно из полей formOrder
eventEmitter.on(
	/^order\..*\.change/,
	(data: { field: string; value: PaymentType }) => {
		orderModel.user = { [data.field]: data.value };
		orderModel.validateOrder((errors) =>
			eventEmitter.emit('formOrderErrors.change', errors)
		);
	}
);

// Изменилось одно из полей formContacts
eventEmitter.on(
	/^contacts\..*.change/,
	(data: { field: string; value: PaymentType }) => {
		orderModel.user = { [data.field]: data.value };
		orderModel.validateContacts((errors) =>
			eventEmitter.emit('formContactsErrors.change', errors)
		);
	}
);

// Изменилось состояние валидации формы
eventEmitter.on('formOrderErrors.change', (errors: Partial<OrderFetchType>) => {
	const { payment, address } = errors;
	formOrder.valid = !payment && !address;
	formOrder.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

eventEmitter.on(
	'formContactsErrors.change',
	(errors: Partial<OrderFetchType>) => {
		const { email, phone } = errors;
		formContacts.valid = !email && !phone;
		formContacts.errors = Object.values({ phone, email })
			.filter((i) => !!i)
			.join('; ');
	}
);

eventEmitter.on('orderForm.submit', () => {
	eventEmitter.emit('modal.createFormContacts');
});

eventEmitter.on('contactsForm.submit', () => {
	eventEmitter.emit('order.send');
});

/* ЗАКАЗ */

eventEmitter.on('order.add', (product: IProduct) => {
	orderModel.addProduct(product.id);
	eventEmitter.emit('order.update');
});

eventEmitter.on('order.remove', (data: { id: string }) => {
	orderModel.removeProduct(data.id);
	eventEmitter.emit('order.update');
});

eventEmitter.on('order.update', () => {
  const dataOrder = orderModel.productsList.reduce((acc, id) => {
    const findProduct = productsModel.getProductById(id);
    if (findProduct) {
      acc.price += findProduct.price
      acc.list.push(findProduct)
    }
    return acc
  }, {price: 0, list: []} as {price: number, list: IProduct[]})
  orderModel.total = dataOrder.price
	cart.listContainer = dataOrder.list.map((product, i) => {
		return new CardCartView(TemplateSettings.cardCart, {
			product: product,
			index: ++i,
			onDelete: (id: string) => {
				eventEmitter.emit('order.remove', { id });
			},
		}).render();
	});
	cart.totalPrice = orderModel.total;
	eventEmitter.emit('page.updateProductsCount');
});

eventEmitter.on('order.send', () => {
	orderService
		.postOrder(orderModel.dataOrder)
		.then((data) => {
			eventEmitter.emit('order.success', data);
		})
		.catch((err) => {
			console.log(err);
		});
});

eventEmitter.on('order.success', (res: OrderResultType) => {
	orderModel.clearOrder();
	eventEmitter.emit('order.update');
	successView.description = `Списано ${res.total} синапсов`;
	modal.setContent(successView.render());
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
