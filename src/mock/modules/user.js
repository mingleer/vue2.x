import Mock from 'mockjs';
import {
    successFn
} from '../utils';

const userInfo = () => {
    let userInfo = Mock.mock({
        results: {
            userId: '@num'
        }
    });

    return userInfo;
};

export default {
    'POST|/userInfo': () => successFn(userInfo())
};
