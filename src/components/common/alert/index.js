import Vue from 'vue';
import i18n from '../../../i18n/index';
import AlertComponent from './index.vue';
const AlertConstructor = Vue.extend(AlertComponent);
let instance = new AlertConstructor({
    i18n,
    el: document.createElement('div'),
    show: false
});
const Alert = {
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
        instance.type = options.type || 'error';
        instance.showIcon = options.showIcon || true;
        instance.closable = options.closable || false;
        instance.title = options.title || 'http.tips.error';
        instance.desc = options.desc || '';
    },
    hide() {
        instance.show = false;
    }
};

export default {
    install() {
        if (!Vue.$alert) {
            Vue.$alert = Alert;
        }
        Vue.mixin({
            created() {
                this.$alert = Vue.$alert;
            }
        });
    }
};
