import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
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
        component: () => import('../views/Phone.vue'),
        children:[
            {
                path: '/',
                name: 'folder',
                component: () => import('../views/Folder.vue'),
                meta: {
                  title: '账号文件夹'
                },
            },
            {
                path: '/user_form',
                name: 'user_form',
                component: () => import('../views/UserForm.vue'),
                props: (route) => route.query,
                meta: {
                  title: '账号'
                },
            },
            {
                path: '/user_list',
                name: 'user_list',
                component: () => import('../views/UserList.vue'),
                props: (route) => route.query,
                meta: {
                  title: '账号列表'
                },
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

router.beforeEach((to, from, next) => {
   store.commit('setMetaTitle',to.meta.title);
   next();
})


export default router
