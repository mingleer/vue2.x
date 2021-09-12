import Vue from 'vue';
import i18n from '../../../i18n/index';
import LoadingComponent from './index.vue';
const LoadingConstructor = Vue.extend(LoadingComponent);
let instance = new LoadingConstructor({
    i18n,
    el: document.createElement('div'),
    show: false
});
const Loading = {
    show(options = {}) {
        instance.show = true;
        if (options.el) {
            if (typeof options.el === 'string') {
                let ele = document.getElementById(options.el);
                if (ele) {
                    ele.appendChild(instance.$el);
                } else {
                    instance.show = false;
                    console.error('[Dom warn]: The current DOM node does not exist.');
                    return false;
                }
            } else {
                options.el.appendChild(instance.$el);
            }
        } else {
            document.body.appendChild(instance.$el);
        }
        instance.text = options.text || 'Loading...';
    },
    hide() {
        instance.show = false;
    }
};

export default {
    install() {
        if (!Vue.$loading) {
            Vue.$loading = Loading;
        }
        Vue.mixin({
            created() {
                this.$loading = Vue.$loading;
            }
        });
    }
};
