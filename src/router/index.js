import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err);
};

let routes = [{
    path: '/login',
    name: 'login',
    meta: {
        title: 'login'
    },
    component: () =>
        import('views/login')
}, {
    path: '/',
    name: 'layout',
    meta: {
        title: 'layout'
    },
    redirect: '/home',
    component: () =>
        import('views/layout'),
    children: [{
        path: '/home',
        name: 'home',
        meta: {
            title: 'home'
        },
        component: () =>
            import('views/home')
    }]
}, {
    path: '/404',
    name: 'notFound',
    meta: {
        title: 'notFound'
    },
    component: () =>
        import('views/404')
}, {
    path: '*',
    redirect: '/404'
}];

export default new Router({
    routes: routes
});
