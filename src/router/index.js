import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import MyCenter from '@/views/MyCenter'
import ChangeUserInfo from "@/views/ChangeUserInfo"
import RegisterStore from '@/views/RegisterStore'
import ReleaseGoods from '@/views/ReleaseGoods'
import GoodsAllMessage from '@/views/GoodsAllMessage'
import AdminHome from '@/views/AdminHome'
import UserRegister from '@/views/AdminPage/UserManage/UserRegister'
import UserList from '@/views/AdminPage/UserManage/UserList'
import StoreGoods from '@/views/AdminPage/StoreManage/StoreGoods'
import StoreList from '@/views/AdminPage/StoreManage/StoreList'
import StoreRegister from '@/views/AdminPage/StoreManage/StoreRegister'
import AdminLogin from '@/views/AdminLogin'
import MyCart from '@/views/MyCart'
import MyOrders from '@/views/MyOrders'
import StoreManagement from '@/views/StoreManagement'
import StoreLogin from '@/views/StoreLogin'
import GoodsManagement from '@/views/GoodsManagement'
import GoodsPreview from '@/views/GoodsPreview'
import GoodsHome from '@/views/StoreHome'



const routes = [

    // 重定向，项目跑起来的时候跳转到登录界面
    {
        path: '*',
        redirect: "/login"
    },

    {
        path: "/home",
        component: Home,
        name: "home"
    },

    {
        path: "/login",
        component: Login
    },

    {
        path: "/register",
        component: Register
    },

    {
        path: "/search",
        component: Search,
        name: "search"
    },

    {
        path: "/changeuserinfo",
        component: ChangeUserInfo,
        name: "changeuserinfo"
    },

    {
        path: "/goodsallmessage",
        component: GoodsAllMessage,
        name: "goodsallmessage"
    },

    {
        path: "/adminlogin",
        component: AdminLogin,
        name: "adminlogin"
    },
    {
        path: "/goodsHome",
        component: GoodsHome,
        name: "goodsHome",
        children: [
            {
                path: "/storeManagement",
                component: StoreManagement,
                name: "storeManagement"
            },
            {
                path: "/goodsManagement",
                component: GoodsManagement,
                name: "goodsManagement"
            },
            {
                path: "/releasegoods",
                component: ReleaseGoods,
                name: "releasegoods"
            }
        ]
    },

    {
        path: "/home",
        component: Home,
        name: "home",
        children: [
            {
              path: "/goodsPreview",
              component: GoodsPreview,
              name: 'goodsPreview'
            },
            {
                path: "/myCart",
                component: MyCart,
                name: "myCart"
            },
            {
                path: "/myOrders",
                component: MyOrders,
                name: "myOrders"
            },
            {
                path: "/registerstore",
                component: RegisterStore,
                name: "registerstore"
            },
            {
                path: "/mycenter",
                component: MyCenter,
                name: "mycenter"
            }
        ]
    },
    {
        path: "/adminhome",
        component: AdminHome,
        name: "adminhome",
        redirect: "/adminhome/userRegister",
        children: [

            // 用户注册管理
            {
                path: "userRegister",
                component: UserRegister,
                name: "userRegister",
            },
            // 用户列表管理
            {
                path: "userList",
                component: UserList,
                name: "userList",
            },
            //商家发布商品审核
            {
                path: "storeGoods",
                component: StoreGoods,
                name: "storeGoods",
            },
            //商家列表管理
            {
                path: "storeList",
                component: StoreList,
                name: "storeList",
            },
            //商家注册店铺审核
            {
                path: "storeRegister",
                component: StoreRegister,
                name: "storeRegister",
            }
        ]
    },

    {
        path: "/storeLogin",
        component: StoreLogin,
        name: "storeLogin"
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
