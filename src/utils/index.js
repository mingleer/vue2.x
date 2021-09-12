// import store from 'store';

/**
 * @description: 给字符串添加当前系统时间戳(防止缓存)
 * @param {*} str: 要添加时间戳的参数
 * @return {*} 带时间戳的参数
 */
export const addCurrentTimestamp = (str) => {
    let temp = '';

    if (!str) {
        return '';
    }
    if (str.indexOf('?') > 0) {
        temp = str + '&nowTime=' + new Date().getTime();
    } else {
        temp = str + '?nowTime=' + new Date().getTime();
    }
    return temp;
};

/**
 * @description: 字符串数值前补零
 * @param {data} 类型：Number，补零边界值
 * @param {count} 类型：Number，补零个数
 * @return {data}
 */
export const addZero = (data, boundary = 9, count = 1) => {
    let zeroCount = '';
    for (let i = 0; i < count; i++) {
        zeroCount += '0';
    }
    return data > boundary ? data : zeroCount + data;
};

/**
 * 绝对路径Url解析
 * @param {String} url 要解析的url，Url必须带协议http或者https
 * @returns
 */
export const parseURL = (url) => {
    let a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.host,
        hostname: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            let ret = {};
            let seg = a.search.replace(/^\?/, '').split('&');
            let len = seg.length;
            let i = 0;
            let s;
            for (i < len; i++;) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^/?#]+)$/i) || '')[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^/]+(.+)/) || '')[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
};

/**
 * @description: 格式化整数数字位数，即每三位添加逗号
 * @param {ele} 类型：字符串，元素dom
 */
export const formatNumber = (number) => {
    let b = parseInt(number).toString();
    let len = b.length;
    if (len <= 3) {
        return b;
    }
    let r = len % 3;
    return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',');
};

/**
 * @description: 系统切换主题
 * @param {string} currentTheme 当前主题关键字
 */
// export const changeTheme = (currentTheme) => {
//     if (!currentTheme) {
//         return;
//     }
//     let sysTheme = require(`../themes/${currentTheme.toLowerCase()}.js`);
//     let iviewTheme = require(`../themes/iview/iview-${currentTheme.toLowerCase()}.js`);
//     for (let key in sysTheme) {
//         document.documentElement.style.setProperty(key, sysTheme[key]);
//     }
//     for (let item in iviewTheme) {
//         document.documentElement.style.setProperty(item, iviewTheme[item]);
//     }
//     localStorage.setItem('theme', currentTheme);
//     store.commit('SET_THEME', currentTheme);
// };

/**
 * @description: 根据分辨率设置根元素的字体大小
 * @return {string} fontSize 当前的字体大小
 */
export const updateFont = () => {
    let availWidth = document.documentElement.clientWidth; // 浏览器宽度
    const designPx = 1920; // 设计稿宽度
    availWidth = Math.max(1200, availWidth);
    if (!availWidth) {
        return 0;
    }
    let fontSize = parseFloat((100 / designPx) * availWidth, 10).toFixed(2);
    let root = document.documentElement || document.body;
    root.style.fontSize = fontSize + 'px';
    return fontSize;
};
