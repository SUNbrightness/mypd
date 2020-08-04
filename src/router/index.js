import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    //首页默认是去输入初始密码
    {
        path: '/',
        name: 'CryptoKeyConfig',
        component: () => import('../views/CryptoKeyConfig.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue')
    },{
        path: '/phone',
        name: 'phone',
        component: () => import('../views/Phone.vue'),
        children:[
            {
                path: '/',
                name: 'folder',
                component: () => import('../views/Folder.vue'),
            },
            {
                path: '/user_form',
                name: 'user_form',
                component: () => import('../views/UserForm.vue'),
                props: (route) => route.query,
            },
            {
                path: '/user_list',
                name: 'user_list',
                component: () => import('../views/UserList.vue'),
                props: (route) => route.query,
            },
            {
                path: '/search_result',
                name: 'search_result',
                component: () => import('../components/SearchResult.vue'),
                props: (route) => route.query,
            }
        ]
    },
    {
        path: '/web_dav_config',
        name: 'web_dav_config',
        component: () => import('../views/WebDavConfig.vue')
    },
    {
        path: '/crypto_key',
        name: 'crypto_key',
        component: () => import('../views/CryptoKeyConfig.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
