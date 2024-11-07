import './scss/styles.scss';
import {Api} from "./components/base/api";
import {API_URL} from "./utils/constants"
import {ProductsService} from "./components/model/Products/Services/ProductsService";
import {EventEmitter} from "./components/base/events";
import {ProductModel} from "./components/model/Products/Model";
import {ProductsGalleryView} from "./components/view/ProductsGallery/ProductsGallaryView";
import {ensureElement} from "./utils/utils";
import {IProduct} from "./types";
import { ModalView } from './components/view/Modal/ModalView';
import { OrderModel } from './components/model/Orders/Model';

const api = new Api(API_URL);
const eventEmitter = new EventEmitter();

const productService = new ProductsService(api)
const productsModel = new ProductModel(productService)
const orderModel = new OrderModel(eventEmitter);

const pageWrapper = ensureElement('.page__wrapper');

//темплэйты
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const BasketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');



const modalView = new ModalView(
  ensureElement('#modal-container'),
  eventEmitter
)


eventEmitter.on('products-ready', (e: IProduct[]) => {
    const gallery = new ProductsGalleryView({
        products: e,
        onProductClick: (product: IProduct) => eventEmitter.emit('product-click', {product:{...product}})
    })
    gallery.render(ensureElement('.gallery'))
})

//ПРЕВЬЮ КАРТОЧКИ
eventEmitter.on('product-click', (card) => {
  modalView.showModal(cardPreviewTemplate)
})

// Блокируем прокрутку страницы если открыта модалка
eventEmitter.on('modal-open', (modal) => {
  pageWrapper.classList.add('page__wrapper_locked');
});

// ... и разблокируем
eventEmitter.on('modal-close', () => {
  pageWrapper.classList.remove('page__wrapper_locked');
});

productsModel.refresh((products)=>eventEmitter.emit('products-ready', products))