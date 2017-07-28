let express = require('express');
let router = express.Router();
let Mock = require('mockjs');

// 获取最近多个网店信息接口
router.all('/node.do', (req, res) => {
	let data = {
		"ak":"eKXFE1RQkdZ6FwqZtcV6tbg1" ,  //百度key
		"nodes" :[{
			"i":12,					// 网点id
			"nc":'zn01',					// 网点编号
			"n":"上海客服中心",	　　　　// 网点名称
			"addr":"上海市xxx街",	　　　　// 地址
			"tel":"020xxxx",			　// 电话
			"t":1,			　// 是否维修网点
			"dist":100,			　// 距离
			"lng":"23.1",			　// 经度
			"lat":"23.6",			　// 纬度
			"wt":"9:00-17:00"　　　　　　　　//上班时间
		}]
	}

	res.json(data);
})


// 获取城市信息接口
router.all('/city.do', (req, res) => {
	let data = {"v":0 ,  //版本
			"city" :[{
			"i":1001,					// id
			"n":"上海",	　　　　// 城市名称
			"pid":11,            //上级省份ID，没有为0
			"le":1,　　　　// 1省，2 市,3.县
			"pinyin":"shanghai",			　//拼音缩写
			"py":"sh",			　// 拼音缩写
			"host":1,			　// 热门城市
			"sort":500,			　//热门城市排名，
			"st":1			　//状态　1有效，0无效
		}]
	}

	res.json(data);
})
// 获取用户活动接口
router.all('/banner.do', (req, res) => {
	let data = [{
		"t":0,	          //活动类型,0活动链接，1启动应用，2打开公众号
		"cn":"http://www.baidu.com/",	// 活动内容
		"img":" http://www.baidu.com/",	// 图片地址
		"desc":"release note:…"			// 活动说明，
	}]


	res.json(data);
})

// 3.4	获取会员特权介绍接口
router.all('/privilege.do', (req, res) => {
	let data = {"v":0 ,  //最新版本
		"cates" :[
			{                //特权信息
				"id":1,					//特权分类 id
				"name":"每日抽奖",	　　　　// 分类名称
				"desc":"描述",             //分类描述
				"icon":"http://www.xxx.xxx",	　　　　// 分类图标
				"img":"http://www.xxx.xxx",	　　　　// 特权图片地址

			}, 
			{                //分类标签信息
				"id":10,				//分类 id
				"name":"支付安全",	　　　　// 分类名称
				"desc":"描述",             //分类描述
				"icon":"http://www.xxx.xxx",	　　　　// 分类图标1
				"icon2":"http://www.xxx.xxx",	　　　　// 内容页分类图标高亮
				"img":"http://www.xxx.xxx",	　　　　// 特权图片地址
			}
		],
		"data": [{                //特权内容信息
			"id":1001,					//特权内容 id
			"name":"相机",			//特权名称
			"cid":1,	                //所属分类标签 id
			"cn": "内容",	            //特权内容
			"icon":"http://www.xxx.xxx"	　　　　// 特权图标
		}]
	}



	res.json(data);
})




// 获取街道信息接口
router.all('/addr.do', (req, res) => {
	console.log(req);
	let data = {
		"addrs" :[{"i":"34888","n":"石岐区街道办事处"},{"i":"34889","n":"东区街道办事处"},{"i":"34890","n":"火炬开发区街道办事处"},{"i":"34891","n":"西区街道办事处"},{"i":"34892","n":"南区街道办事处"},{"i":"34893","n":"五桂山街道办事处"},{"i":"34894","n":"小榄镇"},{"i":"34895","n":"黄圃镇"},{"i":"34896","n":"民众镇"},{"i":"34897","n":"东凤镇"},{"i":"34898","n":"东升镇"},{"i":"34899","n":"古镇镇"},{"i":"34900","n":"沙溪镇"},{"i":"34901","n":"坦洲镇"},{"i":"34902","n":"港口镇"},{"i":"34903","n":"三角镇"},{"i":"34904","n":"横栏镇"},{"i":"34905","n":"南头镇"},{"i":"34906","n":"阜沙镇"},{"i":"34907","n":"南朗镇"},{"i":"34908","n":"三乡镇"},{"i":"34909","n":"板芙镇"},{"i":"34910","n":"大涌镇"},{"i":"34911","n":"神湾镇"}],
	}

	res.json(data);
})


module.exports = router;