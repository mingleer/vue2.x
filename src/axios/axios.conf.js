let config = {
    // `url` 是用于请求的服务器 URL
    url: '',
    // `method` 是创建请求时使用的方法
    method: 'get', // 默认是 get
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    // baseURL: '',
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    // transformRequest: [function (data) {
    // // 对 data 进行任意转换处理
    // return data;
    // }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    // transformResponse: [function (data) {// // 对 data 进行任意转换处理
    // return data;
    // }],
    // `headers` 是即将被发送的自定义请求头
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {},
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function (params) {
    // return Qs.parse(params, { arrayFormat: 'brackets' });
    // },
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: {},
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    timeout: 500,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // 默认的
    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    // adapter: function (config) {
    // /* ... */
    // },
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000
};

export default config;
