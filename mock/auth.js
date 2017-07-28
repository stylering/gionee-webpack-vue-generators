let express = require('express');
let router = express.Router();
let Mock = require('mockjs');

// 3.8	积分商城接口
router.all('/pshop.do', (req, res) => {
	let data = {
		
	}
	res.json(data);
})


// 3.9	赚积分接口
router.all('/ptask.do', (req, res) => {
	let data = [{
		"t":0,	          //任务类型, // 1 领取积分 2 启动应用
		"cn":"activity页面",	// 活动内容
		"name":"任务名称",
		"desc":"release note:…",			// 任务说明，
		"p":0	 　　　// 任务奖励积分，
	}]

	res.json(data);
})

module.exports = router;