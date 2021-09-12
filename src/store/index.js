import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

// modules
// import login from './modules/login';
// import menu from './modules/menu';

Vue.use(Vuex);

const state = {
    lang: localStorage.getItem('lang') || 'zh-CN', // 系统当前语种
    token: sessionStorage.getItem('token') || '', // 用户 token
    accountInfo: sessionStorage.getItem('accountInfo') || null, // 账号信息
    systemInfo: sessionStorage.getItem('systemInfo') || null, // 系统信息
    isCollapsed: false // 是否折叠系统主菜单
};

const store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {}
});

if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./getters', './mutations', './actions'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
        // 加载新模块
        store.hotUpdate({
            getters: require('./getters').default,
            actions: require('./actions').default,
            mutations: require('./mutations').default
        });
    });
}

export default store;
