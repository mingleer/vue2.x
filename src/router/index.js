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
    redirect: '/dashboard',
    component: () =>
        import('views/layout'),
    children: [{
        path: '/dashboard',
        name: 'dashboard',
        icon: 'ios-speedometer',
        meta: {
            title: 'dashboard'
        },
        component: () =>
            import('views/home'),
        children: []
    }, {
        path: '/monitor',
        name: 'monitor',
        icon: 'ios-ionic',
        meta: {
            title: 'monitor'
        },
        component: () =>
            import('views/home'),
        children: []
    }, {
        path: '/log',
        name: 'log',
        icon: 'ios-paper',
        meta: {
            title: 'log'
        },
        component: () =>
            import('views/home'),
        children: []
    }, {
        path: '/deployment',
        name: 'deployment',
        icon: 'ios-paper',
        meta: {
            title: 'deployment'
        },
        component: () =>
            import('views/home'),
        children: []
    }, {
        path: '/settings',
        name: 'settings',
        icon: 'ios-settings',
        meta: {
            title: 'settings'
        },
        component: () =>
            import('views/home'),
        children: []
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
