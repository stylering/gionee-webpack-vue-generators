import 'babel-polyfill';
import config from 'commons/config';
import AndroidClient from 'commons/AndroidClient';
import util from 'commons/util';
import 'styles/commons.styl';
import './styles.styl';

AndroidClient.setActionBar('积分商城', true, true, '');

const goodsListAjaxUrl = '/auth/pshop/goodsList.do';

(async () => {

	// 异步加载jquery、Vue、VueRouter、Slick插件
    const $ = await import('jquery');
    const VueModule = await import('vue');
    const VueRouterModule = await import('vue-router');
    const Vue = VueModule.default;
    const VueRouter = VueRouterModule.default;
    // 轮播插件及样式
    const Slick = await import('vue-slick');
    const slickStyle = await import('node_modules/slick-carousel/slick/slick.css');
    
    Vue.use(VueRouter);

    // 轮播
    const slider = new Vue({

    	el: '#slider',

    	components: { Slick },

    	data() {
    		return {
    			slickOptions: {
    				arrows: false
    			}
    		}
    	}
    });

    // 商品列表
    const ListItem = {
    	
    	props: ['item'],

    	template: `
    		<a class="pro-item">
    			<div class="pro-img">
    				<img :src="item.img">
    				<span v-if="item.st" class="pro-soldout">今日已抢光<br>SOLD OUT</span>
    				<span else class="pro-num">剩余{{item.remain}}件</span>
    			</div>
    			<span class="pro-name">{{item.name}}</span>
    			<span class="pro-integral">{{item.point | formatPrice}}</span>
    			<span class="pro-val">市场参考价: {{item.price}}元</span>
    		</a>
    	`,

    	filters: {
    		formatPrice(value) {
    			return util.formatPrice(value)
    		}
    	}
    }

    const MenuView = {

    	props: ['routeId'],

    	template: `
    		<div class="pro-menu bb">
    			<a href="#/id/0" :class="{active: routeId==0}">全部</a>
    			<a href="#/id/1" :class="{active: routeId==1}">热门</a>
    			<a href="#/id/2" :class="{active: routeId==2}">实物</a>
    			<a href="#/id/3" :class="{active: routeId==3}">虚拟</a>
    		</div>
    	`,
    }

    // 路由
    const router = new VueRouter({
    	routes: [
    		{ path: '/id/:id', component: ListView }
    	]
    })

    // 列表
    const ListView = new Vue({

    	el: '#J_listWrap',

    	template: `
    		<section class="pro">
    			<menu-view :routeId="$route.params.id"></menu-view>
    			<div class="pro-con">
    				<div class="pro-list active">
    					<list-item :key="key" v-for="(item,key) in listData" :item="item"></list-item>
    				</div>
    			</div>
    		</section>
    	`,

    	router,

    	data() {
    		return {
    			listData: []
    		}
    	},

    	mounted() {
    		let id = this.$route.params.id
    		if (id == undefined) {
    			router.replace('/id/' + 0)
    			return;
    		}
    		this.loadGoodsList({id: id})
    	},

    	methods: {
    		loadGoodsList(args) {
    			args = args || {}
    			$.ajax({
    				url: goodsListAjaxUrl,
    				type: 'GET',
    				data: args
    			}).then(result => {
    				this.listData = result.gl;
    			})
    		},

    		routeTo(id) {
    			router.replace('/id/' + id)
    		}
    	},

    	watch: {
    		'$route'(to, from) {
    			this.loadGoodsList({id: to.params.id})
    		}
    	},

    	components: {
    		ListItem: ListItem,
    		MenuView: MenuView,
    	}

    })

})();
