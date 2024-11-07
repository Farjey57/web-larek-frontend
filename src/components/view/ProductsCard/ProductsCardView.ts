import {bem, cloneTemplate, ensureElement, getImageUrl} from "../../../utils/utils";
import {CDN_URL} from "../../../utils/constants";
import {IProduct} from "../../../types";

export class ProductCardView {
    constructor(private settings: ProductCardViewType) {

    }

    getCategoryClass(type: string): string {
        switch (type) {
            case 'хард-скил':
              return bem('card', 'category', 'hard').name
            case 'софт-скил':
              return bem('card', 'category', 'soft').name
            case 'другое':
              return bem('card', 'category', 'other').name
            case 'дополнительное':
              return bem('card', 'category', 'additional').name
            case 'кнопка':
              return bem('card', 'category', 'button').name
            default:
              return bem('card', 'category', 'other').name
        }
    }

    render(container: HTMLElement) {

        const card = cloneTemplate('#card-catalog');
        ensureElement('.card__title', card).innerText = this.settings.title
        ensureElement<HTMLImageElement>('.card__image', card).src = getImageUrl(CDN_URL, this.settings.image)
        ensureElement('.card__category', card).innerText = this.settings.category

        const classname = this.getCategoryClass(this.settings.category)

        ensureElement('.card__category', card).classList.add(classname)
        ensureElement('.card__price', card).innerText = this.settings.price ? `${String(this.settings.price)} синапсов` : `Бесценно`
        card.onclick = () => {
            this.settings.onClick(this.settings)
        }
        container.appendChild(card)

    }
}

export type ProductCardViewType = {
    size: 'medium' | 'large' | 'small';
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    id: string;

    onClick: (data: IProduct) => void;
}