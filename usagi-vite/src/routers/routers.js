import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Admin from "../components/Admin.vue";
import User from "../components/User.vue";
import { useUserStore } from '../stores/userStore';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        component: About
    }, 
    {
        path: '/contact',
        component: Contact
    }, 
    {
        path: '/login',
        component: Login
    }, 
    {
        path: '/register',
        component: Register
    }, 
    {
       path:'/admin',
       component:Admin, 
       meta: { requiresAdmin: true } // 该路由需要超级管理员权限
    },
    {
        path:'/user',
        component:User,
        meta: { requiresLogin: true } // 该路由需要登录
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
  
    if (to.meta.requiresAdmin) {
      if (userStore.userRole === 'admin') {
        next();
      } else {
        next('/'); // 没有权限，重定向到首页
      }
    } else if (to.meta.requiresLogin) {
      if (userStore.isLoggedIn) {
        next();
      } else {
        next('/login'); // 未登录，重定向到登录页
      }
    } else {
      next();
    }
  });


export default router;