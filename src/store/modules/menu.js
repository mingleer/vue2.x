const state = {
    isCollapsed: false,
    menuList: []
};
const getters = {
    getCollapsed(state) {
        return state.isCollapsed;
    },
    getMenuList(state) {
        return state.menuList;
    }
};
const mutations = {
    setIsCollapsed(state, value) {
        state.isCollapsed = value;
    },
    setMenuList(state, menuList) {
        state.menuList = menuList;
    }
};
const actions = {

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
