import { IProduct } from '../../../types';
import { IProductsPresenter } from '../../../types/presenter/Products/ProductsPresenter';
import { ensureElement } from '../../../utils/utils';
import { EventEmitter } from '../../base/events';
import { ProductModel } from '../../model/Products/Model';
import { ProductsGalleryView } from '../../view/Products/ProductsGallery/ProductsGallaryView';

export class ProductsPresenter implements IProductsPresenter {
	private galleryView: ProductsGalleryView | null = null;

	constructor(
		private productModel: ProductModel,
		private eventEmitter: EventEmitter
	) {
		this.eventEmitter.on('product.ready', (data: IProduct[]) => {
			this.createGallery(data);
		});
	}

	refreshProducts() {
		this.productModel.refresh((products) =>
			this.eventEmitter.emit('product.ready', products)
		);
	}

	createGallery(products: IProduct[]) {
		this.galleryView = new ProductsGalleryView({
			products: products,
			onProductClick: (product: IProduct) => {
				this.openProduct(product);
			},
		});
		this.galleryView.render(ensureElement('.gallery'));
	}

	openProduct(product: IProduct) {
		this.eventEmitter.emit('modal.createProduct', product);
		this.eventEmitter.emit('modal.showModal');
	}
}
