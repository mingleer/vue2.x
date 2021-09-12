const Mock = require('mockjs');

Mock.setup({
    // timeout: 10 ** 4
    timeout: '200-600'
});
const files = require.context('./', true, /\.js/);
let interfaceInfo = [];
files.keys().forEach(fileName => {
    if (fileName === './index.js' || fileName === './utils.js') return false;
    interfaceInfo.push(files(fileName).default);
});
// 注册所有的Mock接口
interfaceInfo.forEach(i => {
    for (const [key, value] of Object.entries(i)) {
        const method = key.split('|')[0];
        const url = key.split('|')[1];
        Mock.mock(url, method, value);
    }
});
