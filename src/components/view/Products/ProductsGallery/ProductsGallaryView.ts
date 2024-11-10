import { IProduct } from '../../../../types';
import { ProductsGallerySettings } from '../../../../types/view/Products/ProductsGallary/ProductsGallary';
import { ProductCardView } from '../ProductCard/ProductCardView';

export class ProductsGalleryView implements ProductsGalleryView {
	constructor(private settings: ProductsGallerySettings) {}

	render(container: HTMLElement) {
		this.settings.products.map((product) => {
			const Card = new ProductCardView({
				...product,
				onClick: (data: IProduct) => {
					this.settings.onProductClick(data);
				},
			});

			Card.render(container);
		});
	}
}
