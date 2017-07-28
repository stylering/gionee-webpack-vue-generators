/**
 * H5与客户端交互接口
 **/

const globalAndriodClient = window.AndroidClient || {};
let noop = function() {};

const AndroidClient = {

	/**
	 * 弱提示1
	 * 默认弹出 3 秒
	 * @param message 弱提示内容
	 *	
	 * 弱提示2
	 * @param message 弱提示内容
	 * @param duration 时间，单位毫秒
	 */
	showToast(message, duration) {
		console.log(message)
		let globalShowToast = globalAndriodClient.showToast;
		if (!globalShowToast) {
			return
		}
		duration == undefined ? globalShowToast(message) : globalShowToast(message, duration);
	},

	/**
	 * 普通弹框
	 *
	 * @param title 标题
	 * @param content 内容
	 * @param negativeButtonText 否定按钮文字
	 * @param positiveButtonText 肯定按钮文字
	 *
	 * 列表弹框
	 * @param title 标题
	 * @param contentList 内容列表,传数组
	 **/
	showDialog(title, content, negativeButtonText, positiveButtonText) {
		let globalShowDialog = globalAndriodClient.showDialog
		if (!globalShowDialog) {
			return
		}
		content instanceof Array ? globalShowDialog(title, content)
			: globalShowDialog(title, content, negativeButtonText, positiveButtonText);
	},

	/**
     * 设置标题栏 1
	 * isRightButtonIcon 传 true 时，标题栏右边显示图标，rightButtonText 无效，可传空字符串
	 * isRightButtonIcon 传 false 时，rightButton 需要传入文字
	 *
	 *	设置标题栏 2
	 * @param title 标题
	 * @param displayHomeAsUpEnabled 标题是否显示返回图标
	 * @param isRightButtonIcon 右标题是否是图标
	 * @param rightButtonText 右标题文字
	 **/
	setActionBar(title, displayHomeAsUpEnabled, isRightButtonIcon, rightButtonText) {
		let globalSetActionBar = globalAndriodClient.SetActionBar;
		if (!globalSetActionBar) {
			return
		}
		isRightButtonIcon == undefined && rightButtonText == undefined ?
			globalSetActionBar(title, displayHomeAsUpEnabled) :
			globalSetActionBar(title, displayHomeAsUpEnabled, isRightButtonIcon, rightButtonText);
	},

	// 设置标题栏右边按钮是否可用
	setActionBarRightBtnDisable(disable) {
		globalAndriodClient.setActionBarRightBtnDisable && 
			globalAndriodClient.setActionBarRightBtnDisable(disable)
	},

	// 获取 imei 号
	getImei() {
		return globalAndriodClient.getImei && globalAndriodClient.getImei();
	},

	// 获取手机型号
	getPhoneModel() {
		return globalAndriodClient.getPhoneModel && globalAndriodClient.getPhoneModel();
	},

	// 获得 token
	getToken() {
		return globalAndriodClient.getToken && globalAndriodClient.getToken();
	},

	// 显示省-市-区选择弹框
	showAddressDialog() {
		globalAndriodClient.showAddressDialog && globalAndriodClient.showAddressDialog();
	},

	/**
	 * 弹框按钮被点击了，回调
	 * 普通弹框，左按钮被点击，position 为 0,右按钮点击，position 为 1
	 * 列表弹框，按照列表顺序 position 从 0 开始依次递增
	 *
	 * @param position 点击了哪个按钮
	 */
	onDialogButtonClick(position, callback) {
		callback = callback || noop;
		window.onDialogButtonClick = callback;
	},

	// 标题栏标题被点击了
	onActionBarTitleClick(callback) {
		callback = callback || noop;
		window.onActionBarTitleClick = callback;
	},

	// 标题栏右边文字被点击了
	onActionBarRightButtonClick(callback) {
		callback = callback || noop;
		window.onActionBarRightButtonClick = callback;
	},

	// 获得 imei回调
	onGetImei(callback) {
		callback = callback || noop;
		window.onGetImei = callback;
	},

	// 获得手机型号回调
	onGetPhoneModel(callback) {
		callback = callback || noop;
		window.onGetPhoneModel = callback;
	},

	// 获取成功返回 token,获取失败返回空字符串
	onGetToken(callback) {
		callback = callback || noop;
		window.onGetToken = callback
	},

	/**
	 * 获得选中的地址，省-市-区
	 * @param address json 格式，例子
	 * {"province_id":"12","province":"广东","city_id":"5","city":"深圳","county_id":"6","county":"福田"}
	 */
	onSelectedAddress(callback) {
		callback = callback || noop;
		window.onSelectedAddress = callback
	}

}

export default AndroidClient