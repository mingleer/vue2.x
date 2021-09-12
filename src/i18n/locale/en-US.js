// 公共国际化配置
const common = {
    lang: 'en-US',
    langList: {
        'zh-CN': 'Simplified Chinese',
        'zh-TW': 'Traditional Chinese',
        'en-US': 'English',
        'ja': 'Japanese',
        'ko': 'Korean'
    },
    // placeholder 文本
    placeholder: {
        input: 'Please Enter...',
        select: 'Please Select...'
    },
    // 必填项
    required: {
        text: 'This Field Is Required',
        min: 'The Minimum Length Of This Field Is',
        max: 'The Maximum Length Of This Field Is',
        prev: 'The Length Of The field Is',
        last: 'Between',
        format: 'The Format Of This Field Is'
    },
    text: {
        // btn 文本
        btn: {
            reset: 'Reset',
            add: 'Add',
            delete: 'Delete',
            edit: 'Edit',
            search: 'Search',
            view: 'View',
            import: 'Import',
            export: 'Export',
            submit: 'Submit',
            save: 'Save',
            confirm: 'Confirm',
            loginIn: 'Login In',
            loginOut: 'Login Out',
            cancel: 'Cancel'
        }
    },
    form: {
        // 用户名称
        username: 'Username',
        // 密码
        password: 'Password',
        // 验证码
        validCode: 'Valid Code',
        // 刷新验证码
        refreshValidCode: 'Refresh Valid Code',
        // 验证信息
        validatorInfo: {
            validCode: 'Verification code input error! Please re-enter...'
        }
    }
};

// http 国际化配置
const http = {
    tips: {
        primary: 'Tips:',
        success: 'Success Tips:',
        warning: 'Warning Tips:',
        error: 'Error Tips:'
    },
    method: 'Method',
    url: 'URL',
    info: 'Response Info',
    // 响应码
    305: 'The requested resource must be accessed through a proxy',
    400: 'The syntax of the client request is incorrect and the server cannot understand it',
    401: 'The token is null',
    402: 'Token is invalid, please login again',
    403: 'The server denied the access (there was a problem with access rights)',
    404: 'The server could not find the resource (web page) according to the client\'s request',
    405: 'Method in client request is prohibited',
    406: 'The requested server could not complete based on the requested content',
    407: 'The request requires the proxy\'s identity authentication, similar to 401, but the requester should use the proxy for authorization',
    408: 'The server timed out waiting for the request sent by the client for too long',
    409: 'This code may be returned when the server completes the put request from the client. There is a conflict when the server processes the request',
    411: 'The server cannot process the request information sent by the client without content length',
    412: 'Prerequisite error for client request information',
    413: 'The request was rejected because the requested entity was too large for the server to process',
    414: 'The requested URI is too long (usually a URL) and cannot be processed by the server',
    415: 'The server was unable to process the media format that came with the request',
    416: 'The scope requested by the client is not valid',
    417: 'The server could not satisfy the request header of expect',
    500: 'Server internal error, unable to complete request',
    501: 'The server does not support the requested function and cannot complete the request',
    502: 'An invalid response was received from the remote server when the server working as a gateway or proxy attempted to execute the request',
    503: 'Due to server overload or system maintenance, the server is temporarily unable to process client requests',
    504: 'The server acting as a gateway or proxy failed to obtain the request from the remote server in time',
    505: 'The server does not support the version of the HTTP protocol requested and cannot complete processing',
    507: 'Server dog error, please try again later',
    520: 'The system is busy. Please try again later'
};

const login = {
    title: 'Login Center',
    rememberPass: 'Remember the password? ',
    thirdParty: 'third party'
};

module.exports = {
    common,
    http,
    login
};
