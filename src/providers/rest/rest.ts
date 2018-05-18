
import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';


import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';


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
//Retourne un Observable<any[]> dans le cas normal
public getData(champ: string): Observable<any> {
	return this.httpClient.get(this.baseUrl + '/' + champ)
		.map(data => {
			if(data instanceof Array) {
				return data.map((dataElem) => dataElem);
			} else {
				return data;
			}
		})
		.catch(err => {
			console.error("Erreur getData au niveau du provider : " + err);
			return err;
		})
	;
}



/*--------------------------------------------------------------*/
/*------------Envoie une requête post à baseUrl/product---------*/
/*--------------------------------------------------------------*/
public createData(champ: string, data: any): Observable<any> {
	return this.httpClient.post(this.baseUrl + '/' + champ, data)
		.map(response => {
			return response;
		})
		.catch(err => {
			console.error("Erreur createData au niveau du provider : " + err);
			return err;
		})
	;
}



/*-----------------------------------------------------------------------*/
/*------------Envoie une requête get à baseUrl/product/productId---------*/
/*-----------------------------------------------------------------------*/
public getDataById(champ: string, id: number): Observable<any> {
	return this.httpClient.get(this.baseUrl + '/' + champ + '/' + id)
		.map(response => {
			return (response);
		})
		.catch(err => {
			console.error("Erreur getDataById au niveau du provider : " + err);
			return err;
		})
	;
}



/*-----------------------------------------------------------------------*/
/*------------Envoie une requête put à baseUrl/product/productId---------*/
/*-----------------------------------------------------------------------*/
public updateData(champ: string, data: any): Observable<any> {
	return  this.httpClient.put(this.baseUrl + '/' + champ + '/' + data.id, data)
		.map(response => {
			return response;
		})
		.catch(err => {
			console.error("Erreur updateData au niveau du provider " + err);
			return err;
		})
	;
}



/*--------------------------------------------------------------------------*/
/*------------Envoie une requête delete à baseUrl/product/productId---------*/
/*--------------------------------------------------------------------------*/
public deleteDataById(champ: string, id: number): Observable<any> {
	return this.httpClient.delete(this.baseUrl+ '/' + champ + '/' + id)
		.catch(err => {
			console.error("Erreur deleteDataById au niveau du provider " + err);
			return err;
		})
	;
}


}