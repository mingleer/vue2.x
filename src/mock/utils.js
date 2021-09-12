const successFn = (data) => {
    return {
        status: 200,
        message: 'success',
        data
    };
};

const errorFn = (data = 'not Found', message = 'fail', status = 404) => {
    return {
        status,
        message,
        data
    };
};

export default {
    successFn,
    errorFn
};

export {
    successFn,
    errorFn
};
