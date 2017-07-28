let express = require('express');
let router = express.Router();
let Mock = require('mockjs');
let Random = Mock.Random;


router.all('/address.do', (req, res) => {
	let data = {//300　积分不足400　兑换错误500　商品已抢光
		"r":100, 
		"m":"保存成功"

	}
	res.json(data);
})

// 商品兑换接口
router.all('/exchange.do', (req, res) => {
	let data = {
		r: 100,
		m: '虚拟物品兑换成功'
	}
	res.json(data);
})

// 商品详情接口
router.all('/detail.do', (req, res) => {
	let data = {
		r: 200,
		m: '兑换成功'
	}
	res.json(data);
})

// 3.15	查询商品信息接口
router.all('/goodsList.do', (req, res) => {

	let data = {
		pg: 1,
		gl: []
	};

	for (let i=0; i<10; i++) {
		data.gl.push(Mock.mock({
			i: i,
			img: Random.image('200x200'),
			point: Random.integer(10, 1000),
			name: Random.cword(10, 20),
			price: Random.integer(10, 2000),
			remain: Random.integer(10, 2000),
			st: Random.boolean()
		}))
	}

	return res.json(data);
})


module.exports = router;