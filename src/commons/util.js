const util = {

	getModule() {
		return document.body.getAttribute('data-module');
	},

	formatPrice(price) {
		let pos = (price % 1000 > 0) ? 2 : (price % 10000 > 0) ? 1 : 0;
		
		if (price / 10000 >= 1) {
			price = (price / 10000).toFixed(pos);
		}

		return price;
	}

}

export default util