

let Toast = {

	showToast(message) {
	    let toastWrap,toastItem,self = this;

		toastWrap	= (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').appendTo('body') : $('.toast-container');
		toastWrap.find('div').remove();
		toastItem	= $('<div></div>').hide().addClass('toast-item').appendTo(toastWrap).html(message).animate({opacity: 'show'}, 600);

		setTimeout(function()
		{
			self.removeToast(toastItem);
		},3000);
	    return toastItem;
	},

	removeToast(obj) {
		obj.animate({opacity: '0'}, 600, function()
		{
			obj.parent().animate({height: '0px'}, 300, function()
			{
				obj.parent().remove();
			});
		});
	}
}

export default Toast