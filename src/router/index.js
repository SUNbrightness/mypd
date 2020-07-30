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
        path: '/folder',
        name: 'Folder',
        component: () => import('../views/Folder.vue'),
        props: (route) => {
            return {
                defaultData: route.params
            }
        }
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/user_form',
        name: 'userForm',
        component: () => import('../views/UserForm.vue'),
        props: (route) => route.query,
    },
    {
        path: '/user_list',
        name: 'userList',
        component: () => import('../views/UserList.vue'),
        props: (route) => route.query,
    },
    {
        path: '/webdav',
        name: 'webdav',
        component: () => import('../views/WebDavConfig.vue')
    },
    {
        path: '/crypto_key',
        name: 'CryptoKeyConfig',
        component: () => import('../views/CryptoKeyConfig.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
