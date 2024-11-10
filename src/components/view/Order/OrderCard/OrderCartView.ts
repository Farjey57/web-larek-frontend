import { IProduct } from "../../../../types";
import { IOrderCardView, OrderCardViewSettings } from "../../../../types/view/Order/OrderCard/OrderCard";
import { cloneTemplate, ensureElement } from "../../../../utils/utils";

export class OrderCardView implements IOrderCardView {
  cartItem: HTMLElement
  product: IProduct
  index: number

  constructor(private settings: OrderCardViewSettings) {
    this.cartItem = cloneTemplate('#card-basket');
    this.product = settings.product
    this.index = settings.index
  }

  render(container: HTMLElement) {
		ensureElement('.basket__item-index', this.cartItem).innerText = String(this.index);
		ensureElement('.card__title', this.cartItem).innerText = this.product.title;
		ensureElement('.card__price', this.cartItem).innerText = `${Number(
			this.product.price
		)} синапсов`;
		ensureElement('.basket__item-delete', this.cartItem).onclick = () =>
			this.settings.onDelete(this.product.id);

		container.appendChild(this.cartItem)
  }
}

