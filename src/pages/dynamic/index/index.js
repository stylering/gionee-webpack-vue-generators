import 'babel-polyfill';
import config from 'commons/config';
import AndroidClient from 'commons/AndroidClient';
import util from 'commons/util';
import 'styles/commons.styl';
import './styles.styl';

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

})();
