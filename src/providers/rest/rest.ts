
import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';


import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';

import { Product } from '../../assets/models/product';

@Injectable()

export  class  RestProvider {

baseUrl: string;

constructor(private  httpClient : HttpClient) { }

set_baseUrl(new_baseUrl: string) {
	this.baseUrl = new_baseUrl;
}


/*--------------------------------------------------------------*/
/*------------Envoie une requête get à baseUrl/product----------*/
/*--------------------------------------------------------------*/
public getProducts(): Observable<Product[]> {
	return this.httpClient.get(this.baseUrl + '/products')
		.map(products => {
			return  products.map((product) => new Product(product));
		})
		.catch(err => {
			console.error("Erreur getProducts au niveau du provider : " + err);
		})
	;
}



/*--------------------------------------------------------------*/
/*------------Envoie une requête post à baseUrl/product---------*/
/*--------------------------------------------------------------*/
public createProduct(product: Product): Observable<Product> {
	return this.httpClient.post(this.baseUrl + '/products', product)
		.map(response => {
			return new Product(response);
		})
		.catch(err => {
			console.error("Erreur createProduct au niveau du provider : " + err);
		})
	;
}



/*-----------------------------------------------------------------------*/
/*------------Envoie une requête get à baseUrl/product/productId---------*/
/*-----------------------------------------------------------------------*/
public getProductById(productId: number): Observable<Product> {
	return this.httpClient.get(this.baseUrl + '/products/' + productId)
		.map(response => {
			return new Product(response);
		})
		.catch(err => {
			console.error("Erreur getProductById au niveau du provider : " + err);
		})
	;
}



/*-----------------------------------------------------------------------*/
/*------------Envoie une requête put à baseUrl/product/productId---------*/
/*-----------------------------------------------------------------------*/
public updateProduct(product: Product): Observable<Product> {
	return  this.httpClient.put(this.baseUrl + '/products/' + product.id, product)
		.map(response => {
			return new Product(response);
		})
		.catch(err => {
			console.error("Erreur updateProduct au niveau du provider " + err);
		})
	;
}



/*--------------------------------------------------------------------------*/
/*------------Envoie une requête delete à baseUrl/product/productId---------*/
/*--------------------------------------------------------------------------*/
public deleteProductById(productId: number) {
	return this.httpClient.delete(this.baseUrl+ '/products/' + productId)
		.catch(err => {
			console.error("Erreur deleteProductById au niveau du provider " + err);
		})
	;
}


}