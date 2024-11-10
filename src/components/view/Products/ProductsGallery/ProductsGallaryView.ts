import { IProduct } from '../../../../types';
import { ProductCardView } from '../ProductsCard/ProductsCardView';

export class ProductsGalleryView {
	constructor(private settings: ProductsGalleryViewType) {}

	render(container: HTMLElement) {
		this.settings.products.map((product) => {
			const Card = new ProductCardView({
				...product,
				onClick: (data: IProduct) => {
					this.settings.onProductClick(data);
				},
				size: 'medium',
			});

			Card.render(container);
		});
	}
}

type ProductsGalleryViewType = {
	products: IProduct[];
	onProductClick: (id: IProduct) => void;
};
