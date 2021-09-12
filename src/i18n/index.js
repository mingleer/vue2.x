import Vue from 'vue';
import VueI18n from 'vue-i18n';
import iZh from 'view-design/dist/locale/zh-CN';
import iEn from 'view-design/dist/locale/en-US';
import * as zh from './locale/zh-CN';
import * as en from './locale/en-US';

Vue.use(VueI18n);

const messages = {
    'zh-CN': {
        ...zh,
        ...iZh
    },
    'en-US': {
        ...en,
        ...iEn
    }
};
const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'zh-CN',
    messages
});

export default i18n;
