import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Product } from '../../assets/models/product';
import { User } from '../../assets/models/user';

import { RestProvider } from  './../../providers/rest/rest';

//Pour faire démarrer le serveur en local : json-server --watch db.json

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private data: Map<String, Array<any>>;

	/*---------------------------------*/
	/*------------Constructeur---------*/
	/*---------------------------------*/
	constructor(public navCtrl: NavController, public restProvider: RestProvider, private toastCtrl: ToastController) {
		this.data = new Map<String, Array<any>>();
		this.restProvider.set_baseUrl("http://localhost:3000");
		this.getProducts();
		this.getUsers();
	}




	/*------------------------------------*/
	/*------------Partie products---------*/
	/*------------------------------------*/
	//TODO : faire une méthode générique getProduct pour toute les tables à trouver ?
	/*---------------------------------------------------------------------------------------------------------------------------*/
	/*------------Récupère tout les produits et les synchronise avec sa variable local TODO: synchronisation avec la BDD---------*/
	/*---------------------------------------------------------------------------------------------------------------------------*/
	getProducts() {
		this.data["products"] = [];
		this.restProvider.getData("products").subscribe((data : Product[])=>{
			this.data["products"] = data;
		});
	}

	/*---------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Ajoute le produit product dans le serveur à baseUrl et l'associe par la même occasion à la variable en local---------*/
	/*---------------------------------------------------------------------------------------------------------------------------------*/
	createProduct(product) {
		this.restProvider.createData("products", product).subscribe(newData => {
			this.data["products"] = this.data["products"].concat(newData);
		});
	}

	/*------------------------------------------------------------------------------------*/
	/*------------Get le produit product dans le serveur à baseUrl avec le bon id---------*/
	/*------------------------------------------------------------------------------------*/
	getProductById(product: Product | number) {
		if(typeof product == "number") {
			//Cas où on file seulement l'id du produit
			this.restProvider.getDataById("products", product).subscribe(data => {
				this.presentToast(data.id + " - " + data.name + " (" + data.cost + ")");
				//Mettre ici les autres actions éventuelles
			});
		} else {
			//Cas où on file directement tout le produit
			this.restProvider.getDataById("products", product.id).subscribe(data => {
				this.presentToast(data.id + " - " + data.name + " (" + data.cost + ")");
				//Mettre ici les autres actions éventuelles
			});
		}
	}

	/*--------------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Supprime le produit product dans le serveur à baseUrl et le supprime par la même occasion de la variable en local---------*/
	/*--------------------------------------------------------------------------------------------------------------------------------------*/
	removeProduct(product: Product | number) {
		if(typeof product == "number") {
			this.restProvider.deleteDataById("products", product).subscribe(() => {
				this.data["products"] = this.data["products"].filter((e) =>  e.id !== product);
			});
		} else {
			this.restProvider.deleteDataById("products", product.id).subscribe(() => {
				this.data["products"] = this.data["products"].filter((e) =>  e.id !== product.id);
			});
		}
	}

	/*-----------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Update le produit product dans le serveur à baseUrl et l'update par la même occasion dans la variable en local---------*/
	/*-----------------------------------------------------------------------------------------------------------------------------------*/
	updateProduct(product) {
		this.restProvider.updateData("products", product).subscribe(updatedData => {
			this.data["products"][this.findIndiceElem(product, "products")] = updatedData;
		});
	}








	





	/*---------------------------------*/
	/*------------Partie users---------*/
	/*---------------------------------*/
	//TODO : faire une méthode générique getUsers pour toute les tables à trouver ?
	/*---------------------------------------------------------------------------------------------------------------------------*/
	/*------------Récupère tout les users et les synchronise avec sa variable local TODO: synchronisation avec la BDD---------*/
	/*---------------------------------------------------------------------------------------------------------------------------*/
	getUsers() {
		this.data["users"] = [];
		this.restProvider.getData("users").subscribe((data : User[])=>{
			this.data["users"] = data;
		});
	}

	/*---------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Ajoute le users user dans le serveur à baseUrl et l'associe par la même occasion à la variable en local---------*/
	/*---------------------------------------------------------------------------------------------------------------------------------*/
	createUser(user) {
		this.restProvider.createData("users", user).subscribe(newData => {
			this.data["users"] = this.data["users"].concat(newData);
		});
	}

	/*------------------------------------------------------------------------------------*/
	/*------------Get le users user dans le serveur à baseUrl avec le bon id---------*/
	/*------------------------------------------------------------------------------------*/
	getUserById(user: User | number) {
		if(typeof user == "number") {
			//Cas où on file seulement l'id du produit
			this.restProvider.getDataById("users", user).subscribe(data => {
				this.presentToast(data.id + " - " + data.name + " (" + data.specialite + ")");
				//Mettre ici les autres actions éventuelles
			});
		} else {
			//Cas où on file directement tout le produit
			this.restProvider.getDataById("users", user.id).subscribe(data => {
				this.presentToast(data.id + " - " + data.name + " (" + data.specialite + ")");
				//Mettre ici les autres actions éventuelles
			});
		}
	}

	/*--------------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Supprime le users user dans le serveur à baseUrl et le supprime par la même occasion de la variable en local---------*/
	/*--------------------------------------------------------------------------------------------------------------------------------------*/
	removeUser(user: User | number) {
		if(typeof user == "number") {
			this.restProvider.deleteDataById("users", user).subscribe(() => {
				this.data["users"] = this.data["users"].filter((e) =>  e.id !== user);
			});
		} else {
			this.restProvider.deleteDataById("users", user.id).subscribe(() => {
				this.data["users"] = this.data["users"].filter((e) =>  e.id !== user.id);
			});
		}
	}

	/*-----------------------------------------------------------------------------------------------------------------------------------*/
	/*------------Update le users user dans le serveur à baseUrl et l'update par la même occasion dans la variable en local---------*/
	/*-----------------------------------------------------------------------------------------------------------------------------------*/
	updateUser(user) {
		this.restProvider.updateData("users", user).subscribe(updatedData => {
			this.data["users"][this.findIndiceElem(user, "users")] = updatedData;
		});
	}












	/*--------------------------------------*/
	/*------------Fonctions Annexes---------*/
	/*--------------------------------------*/
	/*------------------------------------------------------------------------------*/
	/*------------Retourne l'indice correspondant à data dans this.data[table]---------*/
	/*------------------------------------------------------------------------------*/
	findIndiceElem(data, table: string) {
		let i = 0;
		while(i < this.data[table].length && data.id != this.data[table][i].id) {
			i++;
		}
		if(i < this.data[table].length) {
			return i;
		} else {
			return -1;
		}
	}

	//Affichage d'un toast en bas de l'écran
	presentToast(textToDisplay) {
    	let toast = this.toastCtrl.create({
      		message: textToDisplay,
      		duration: 3000,
      		position: 'bottom',
      		showCloseButton: true
    	});

    	toast.onDidDismiss( () => {
      		console.log('Toast Dismissed');
    	});
    	toast.present();
	}

}
