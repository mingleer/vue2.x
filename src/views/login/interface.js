import axios from '@/axios/index';

const isDev = process.env.NODE_ENV === 'development';
const moduleName = isDev ? '/login/' : '/';

export const getAdminInfo = (params) => {
    return axios({
        loading: true,
        method: 'post',
        data: params,
        url: `${moduleName}getAdminInfo`
    });
};
