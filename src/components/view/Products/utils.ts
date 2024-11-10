import { bem } from "../../../utils/utils";

export function getCategoryClass(type: string): string {
  switch (type) {
    case 'хард-скил':
      return bem('card', 'category', 'hard').name;
    case 'софт-скил':
      return bem('card', 'category', 'soft').name;
    case 'другое':
      return bem('card', 'category', 'other').name;
    case 'дополнительное':
      return bem('card', 'category', 'additional').name;
    case 'кнопка':
      return bem('card', 'category', 'button').name;
    default:
      return bem('card', 'category', 'other').name;
  }
}