export interface IPageView {
  counter: number;
  gallery: HTMLElement[];
  locked: boolean;
}

export type PageSettings = {
  onClick: () => void
}