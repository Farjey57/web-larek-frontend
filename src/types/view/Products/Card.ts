import { IProduct } from '../..';
import { CardPreviewView } from '../../../components/view/Card/CardPreview/CardPreviewView';

export interface ICard {
	render(): HTMLElement;
}

export interface ICardPreview extends ICard {
	state: boolean;
}

export interface ICardSettings {
	product: IProduct;
}

export interface ICardGallerySettings extends ICardSettings {
	onClick: (product: IProduct) => void;
}

export interface ICardPreviewSettings extends ICardSettings {
	state: boolean;
	onClick: (preview: CardPreviewView) => void;
}

export interface ICardCartSettings extends ICardSettings {
	index: number;
	onDelete: (id: string) => void;
}
