export interface IModalView {
  setContent(content: HTMLElement): void;
  show(): void;
  hide(): void;
  clear(): void;
}