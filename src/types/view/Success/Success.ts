export type successSettings = {
	res?: { id: string; total: number };
	onClick: () => void;
};

export interface ISuccess {
  render(): HTMLElement
}