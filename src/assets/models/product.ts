
export  class  Product {
	id: number;
	name: string;
	cost: number;
	quantity: number;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}

}