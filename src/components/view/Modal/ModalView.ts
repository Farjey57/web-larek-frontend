import { cloneTemplate, ensureElement } from "../../../utils/utils"

export class ModalView {
  protected _closeModalElement: HTMLButtonElement;
  protected _content: HTMLElement;
  protected _contentContainer: HTMLElement;

  constructor(private container: HTMLElement, onClick: () => void) {
    this._closeModalElement = ensureElement('.modal__close', this.container) as HTMLButtonElement;
    this._content = ensureElement<HTMLElement>('.modal__content', this.container);
    this._contentContainer = ensureElement<HTMLElement>('.modal__container', this.container)

    this._closeModalElement.addEventListener('click', onClick);
    this.container.addEventListener('click', onClick);
    this._contentContainer.addEventListener('click', (event) => event.stopPropagation());
  }

  setContent(content: HTMLElement) {
    this._content.replaceChildren(content);
  }

  show():void {
    this.container.classList.add('modal_active');
  }

  hide():void {
    this.container.classList.remove('modal_active');
    this.clear();
  }

  clear():void {
    this._content.innerHTML = null
  }

}
