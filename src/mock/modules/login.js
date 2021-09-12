import Mock from 'mockjs';
import { successFn, errorFn } from '../utils';
const adminInfo = (params) => {
    const { body } = params;
    const { username, password } = JSON.parse(body);
    if (username === 'admin' && password === '123456') {
        let adminInfo = null;
        /**
         * roleId: 角色ID
         * 0: 系统管理员（全局可增删改）
         * 1：普通管理员（不能增删改系统用户）
         * 2：高级会员（可以查看除了管理员以外的数据）
         * 3：普通会员（只能查看部分数据）
         */
        adminInfo = Mock.mock({
            token: /[A-Za-z0-9]{64}/,
            accountInfo: {
                id: 0,
                accountName: 'admin',
                roleId: 0
            },
            systemInfo: {
                version: '1.0.0.1'
            }
        });
        return successFn(adminInfo);
    }
    return errorFn('Incorrect username or password');
};

export default {
    'post|/login/getAdminInfo': (params) => adminInfo(params)
};
