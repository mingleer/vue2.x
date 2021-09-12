import { SET_LANG, SET_MENU_COLLAPSED } from './mutations-type';

export default {
    [SET_LANG](state, lang) {
        localStorage.setItem('lang', lang);
        state.lang = lang;
    },
    [SET_MENU_COLLAPSED](state, isCollapsed) {
        state.isCollapsed = isCollapsed;
    }
};
