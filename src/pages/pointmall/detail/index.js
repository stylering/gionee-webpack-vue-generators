import 'babel-polyfill';
import config from 'commons/config';
import AndroidClient from 'commons/AndroidClient';
import util from 'commons/util';
import 'styles/commons.styl';
import './styles.styl';

AndroidClient.setActionBar('商品详情', true, true, '');

(async () => {
	// 异步加载Vue、Slick插件
    const VueModule = await import('vue');
    const Vue = VueModule.default;

    // 轮播插件及样式
    const Slick = await import('vue-slick');
    const slickStyle = await import('node_modules/slick-carousel/slick/slick.css');

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

})();