
import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';


import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';

import { Product } from '../../assets/models/product';

@Injectable()

export  class  RestProvider {

baseUrl:string = "http://localhost:3000";

constructor(private  httpClient : HttpClient) { }


// Sending a GET request to /products
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



// Sending a POST request to /products
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



// Sending a GET request to /products/:id
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



// Sending a PUT request to /products/:id
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

// Sending a DELETE request to /products/:id
public deleteProductById(productId: number) {
	return this.httpClient.delete(this.baseUrl+ '/products/' + productId)
		.catch(err => {
			console.error("Erreur deleteProductById au niveau du provider " + err);
		})
	;
}


}