import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Admin from "../components/Admin.vue";
import User from "../components/User.vue";
import Function from "../components/Function.vue";
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
    path: '/function',
    component: Function,
    meta: { 
      // 添加路由元信息标识需要登录
      requiresLogin: true  
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  
  // 1. 需要登录的路由检查
  if (to.meta.requiresLogin) {
    // 用户未登录时跳转登录页，并记录原始路径
    if (!userStore.isLoggedIn) {
      return {
        path: '/login',
        query: { 
          redirect: to.fullPath,  // 保留原始跳转路径
          reason: 'unauthorized'  // 可选：添加跳转原因
        }
      }
    }
  }

  // 2. 已登录用户禁止访问登录/注册页
  if (userStore.isLoggedIn) {
    const authPages = ['/login', '/register']
    if (authPages.includes(to.path)) {
      return from.path || '/'  // 返回来源页面或首页
    }
  }
})

export default router;