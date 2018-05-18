import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Product } from '../../assets/models/product';
import { RestProvider } from  './../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private products: Product[] = [];

	constructor(public navCtrl: NavController, public restProvider: RestProvider) {
		this.getProducts();
	}

	getProducts() {
		this.restProvider.getProducts().subscribe((products : Product[])=>{
			this.products = products;
		});
	}


	createProduct(product) {
		this.restProvider.createProduct(product).subscribe(newProduct => {
			this.products = this.products.concat(newProduct);
		});
	}


	removeProduct(product) {
		this.restProvider.deleteProductById(product.id).subscribe(() => {
			this.products = this.products.filter((e) =>  e.id !== product.id);
		});
	}


	updateProduct(product) {
		this.restProvider.updateProduct(product).subscribe(updatedProduct => {
			this.products[this.findIndiceElem(product)] = updatedProduct;
		});
	}



	findIndiceElem(product) {
		let i = 0;
		while(i < this.products.length && product.id != this.products[i].id) {
			i++;
		}
		if(i < this.products.length) {
			return i;
		} else {
			return -1;
		}
	}

}
