export interface IAppPresenter {
  updateCartCount(data: { count: string }): void;
  changeLocked(): void;
}