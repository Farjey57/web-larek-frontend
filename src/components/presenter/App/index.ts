import {ProductModel} from "../../model/Products/Model";
import {EventEmitter} from "../../base/events";
import {OrderModel} from "../../model/Orders/Model";
import {bem, ensureElement} from "../../../utils/utils";
import { ProductsPresenter } from "../Products";
import { ModalPresenter } from "../Modal/ModalPresenter";
import { OrderPresenter } from "../Order/OrderPresenter";
import { FormPresenter } from "../Form/FormPresenter";

export class AppPresenter {
    private cartElement: HTMLElement | null = null;
    private cartCount: HTMLElement | null = null;
    private pageWrapper: HTMLElement | null = null;

    constructor(private readonly productsModel: ProductModel,
                private readonly orderModel: OrderModel,
                private readonly eventEmitter: EventEmitter) {
        const productsPresenter = new ProductsPresenter(this.productsModel, this.eventEmitter);
        const modalPresenter = new ModalPresenter(this.orderModel, this.eventEmitter)
        const orderPresenter = new OrderPresenter(this.orderModel, this.eventEmitter);
        const formPresenter = new FormPresenter(this.orderModel, this.eventEmitter)

        productsPresenter.refreshProducts()

        this.addEventListeners()
        this.initPageElements()
    }

    private initPageElements(): void {
      this.cartElement = ensureElement('.header__basket');
      this.cartCount = ensureElement('.header__basket-counter');
      this.pageWrapper = ensureElement('.page__wrapper');

      this.cartElement.onclick = () => {
        this.eventEmitter.emit('modal.createCart')
        this.eventEmitter.emit('modal.showModal')
      };
    }

    updateCartCount(data: {count: string}) {
			this.cartCount.innerText = data.count;
		}

    changeLocked() {
      this.pageWrapper.classList.toggle(bem('page','wrapper','locked').name)
    }

    addEventListeners() {
        this.eventEmitter.on('app.updateProductsCount', this.updateCartCount.bind(this))
        this.eventEmitter.on('modal.showModal', this.changeLocked.bind(this))
        this.eventEmitter.on('modal.hideModal', this.changeLocked.bind(this))
        this.eventEmitter.on('order.send', this.orderModel.sendOrder.bind(this.orderModel))
    }
}