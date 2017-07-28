let express = require('express');
let router = express.Router();
let Mock = require('mockjs');

// 每日抽奖接口
router.all('/luck.do', (req, res) => {
	let data = {
		st: -2,//-1未登录,-2活动未开始,-3活动已结束,-4、-5次数用完,-6积分不够,1成功,0网络异常
		seq: 1,
		name: 'S9手机',
		pc: 123,
		rc: 3,
		pt:1,        //奖品类型,1实物、2实物虚拟卡、3A币、4积分
		u:{             //用户中了实物返回用户地址信息,否不返回
			"name":"张三",
			"tel":"134888888888",
			"addr":"广东省惠州…..",
			"qq":"631530",
		}, 

	}
	res.json(data);
})

// 兑换抽奖次数接口
router.all('/exchange.do', (req, res) => {
	let data = {
		r: 200,
		m: '兑换成功'
	}
	res.json(data);
})

// 3.5	获取中奖信息接口
router.all('/prize.do', (req, res) => {
	let data = { 
		"cn": ["恭喜xxx中了xxx","恭喜xxx中了xxx "]	
	}
	res.json(data);
})

// 3.7	查看我的中奖记录接口
router.all('/record.do', (req, res) => {
	let data = { 
		"pg":1,//第一页
		"rs":[{
			"id":1,	          
			"st":0	,          //状态, // 0 发送中 1 已发放
			"name":"自拍杆",	// 
			"time":"2016-09-10"
			},
			{"id":2,          
			"st":1,	          //状态, // 0 发送中 1 已发放
			"name":"游戏优惠券"	,// 
			"time":"2016-11-10"
			}

		]

	}
	res.json(data);
})

module.exports = router;