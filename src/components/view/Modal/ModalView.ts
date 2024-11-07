import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { EventEmitter } from "../../base/events";

export class ModalView {
  protected _closeModalElement: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(private container: HTMLElement, protected events: EventEmitter) {
    this._closeModalElement = ensureElement('.modal__close', this.container) as HTMLButtonElement;
    this._content = ensureElement<HTMLElement>('.modal__content', this.container);

    this._closeModalElement.addEventListener('click', this.hideModal.bind(this));
    this.container.addEventListener('click', this.hideModal.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  showModal(template?: HTMLTemplateElement):void {
    this.events.emit('modal-open', this);
    this.content = cloneTemplate(template);
    this.container.classList.add('modal_active');
  }

  hideModal():void {
    this.events.emit('modal-close', this);
    this.container.classList.remove('modal_active');
    this.content = null
  }

}
