// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import i18n from './i18n/index';
import store from './store';
import App from './App';
import router from './router';
// 公共工具
import * as utils from './utils';

// 前端插件
import ViewUI from 'view-design';
import globalComponents from './components';

// UI样式文件
import 'assets/less/index.less';
import common from 'components/common';
// 注入iview组件
Vue.use(ViewUI, {
    transfer: true,
    size: 'default',
    modal: {
        maskClosable: false
    }
});
// 注入自定义公共组件（包含以服务的方式运行）
for (let key in common) {
    Vue.use(common[key]);
}
// 注入自定义组件（不包含以服务的方式运行）
Vue.use(globalComponents);
if (process.env.NODE_ENV === 'development') {
    require('./mock/index.js');
}

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.path === '/login') {
        // 跳转到登录路由时，要删除的 storage 信息
        const keyArr = ['token', 'accountInfo', 'systemInfo'];
        keyArr.forEach(key => {
            sessionStorage.removeItem(key);
        });
        return next();
    }
    const token = sessionStorage.getItem('token');
    if (!token) {
        return next({ path: '/login' });
    }
    next();
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    store,
    router,
    components: {
        App
    },
    template: '<App/>',
    mounted() {
        utils.updateFont();
        window.addEventListener('resize', utils.updateFont);
    },
    beforeDestroy() {
        window.removeEventListener('resize', utils.updateFont);
    }
});
