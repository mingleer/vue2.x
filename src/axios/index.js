'use strict';
import Vue from 'vue';
import Axios from 'axios';
import i18n from '../i18n';
import * as utils from 'utils';
import config from './axios.conf';
import {
    Notice,
    Message
} from 'view-design';
import store from '../store';
const vm = new Vue({ i18n });
// 根据语言种类获取提示描述语
const Tips = (status = 404, type = 'error') => {
    return {
        title: vm.$t('http.tips')[type],
        content: vm.$t('http')[status]
    };
};

let loading = Vue.$loading;
let http = Axios.create(config);
// 请求拦截器
http.interceptors.request.use(config => {
    if (config.method.match(/get/i)) {
        utils.addCurrentTimestamp(config.url);
    }
    if (!config.url.includes('login')) {
        config.headers.token = store.state.token;
        config.headers.lang = store.state.lang;
    }
    config.loading && loading.show();
    return config;
}, err => {
    loading.hide();
    return Promise.reject(err);
});
// 响应拦截器
http.interceptors.response.use(response => {
    loading.hide();
    const { data: { status, data } } = response;
    return new Promise((resolve, reject) => {
        if (status === 200) {
            resolve(data);
        } else {
            Message.error({
                content: vm.$t(data)
            });
            reject(response.data);
        }
    });
}, err => {
    loading.hide();
    let status = err.response.status;
    const { title, content } = Tips(status);
    Notice.error({
        title: title,
        desc: `
            ${vm.$t('http.method')}：${err.config.method}<br/>
            ${vm.$t('http.url')}：${err.config.url}<br/>
            ${vm.$t('http.info')}：${content}<br/>
        `
    });
});
export default http;
