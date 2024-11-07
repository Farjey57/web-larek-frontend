import { IOrder, IProduct, TUserData } from "../../../types";
import { EventEmitter } from "../../base/events";

export class OrderModel {
  private cart: IProduct[] = []
  private userData: TUserData

  constructor(protected events: EventEmitter) {
  }

  setUserData(data: TUserData) {
    this.userData = data;
  }

  addProduct(product: IProduct) {
    this.cart.push(product);
    this.events.emit('cart-update', this.cart);
  }

  removeProduct(id: string) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.events.emit('cart-update', this.cart);
  }

  get order():IOrder  {
    return {
      ...this.userData,
      products: this.cart
    }
  }
}