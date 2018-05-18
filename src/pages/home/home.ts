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

	/*---------------------------------*/
	/*------------Constructeur---------*/
	/*---------------------------------*/
	constructor(public navCtrl: NavController, public restProvider: RestProvider) {
		this.restProvider.set_baseUrl("http://localhost:3000");
		this.getProducts();
	}


	/*---------------------------------------------------------------------------------------------------------------------------*/
	/*------------Récupère tout les produits et les synchronise avec sa variable local TODO: synchronisation avec la BDD---------*/
	/*---------------------------------------------------------------------------------------------------------------------------*/
	getProducts() {
		this.restProvider.getProducts().subscribe((products : Product[])=>{
			this.products = products;
		});
	}

	/*---------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Ajoute le produit product dans le serveur à baseUrl et l'associe par la même occasion à la variable en local---------*/
	/*---------------------------------------------------------------------------------------------------------------------------------*/
	createProduct(product) {
		this.restProvider.createProduct(product).subscribe(newProduct => {
			this.products = this.products.concat(newProduct);
		});
	}

	/*--------------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Supprime le produit product dans le serveur à baseUrl et le supprime par la même occasion de la variable en local---------*/
	/*--------------------------------------------------------------------------------------------------------------------------------------*/
	removeProduct(product) {
		this.restProvider.deleteProductById(product.id).subscribe(() => {
			this.products = this.products.filter((e) =>  e.id !== product.id);
		});
	}

	/*-----------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Update le produit product dans le serveur à baseUrl et l'update par la même occasion dans la variable en local---------*/
	/*-----------------------------------------------------------------------------------------------------------------------------------*/
	updateProduct(product) {
		this.restProvider.updateProduct(product).subscribe(updatedProduct => {
			this.products[this.findIndiceElem(product)] = updatedProduct;
		});
	}

	/*------------------------------------------------------------------------------*/
	/*------------Retourne l'indice correspondant à data dans this.products---------*/
	/*------------------------------------------------------------------------------*/
	findIndiceElem(data) {
		let i = 0;
		while(i < this.products.length && data.id != this.products[i].id) {
			i++;
		}
		if(i < this.products.length) {
			return i;
		} else {
			return -1;
		}
	}

}
