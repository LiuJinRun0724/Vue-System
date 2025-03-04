// src/stores/userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../routers/routers';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || null,
    username: localStorage.getItem('username') || '',
    avatar: localStorage.getItem('avatar') || '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.token, // 根据 token 判断登录状态
  },

  actions: {
    async login(credentials) {
      try {
        // 1. 修正请求URL和参数
        const response = await axios.post(
          'http://localhost:3000/login', 
          {
            username: credentials.username,
            password: credentials.password
          }
        );

        // 2. 处理响应数据结构
        const { 
          token = null,
          role = 'user',
          avatar = '',
          username = credentials.username 
        } = response.data;

        if (!token) {
          throw new Error('服务器未返回有效的 Token');
        }

        // 3. 更新状态
        this.token = token;
        this.userRole = role;
        this.username = username;
        this.avatar = avatar;

        // 4. 持久化存储
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', username);
        localStorage.setItem('avatar', avatar);
      
        return true;
      } catch (error) {
        // 5. 错误处理优化
        this.logout();
        
        let message = '登录失败，请检查网络连接';
        if (error.response) {
          message = error.response.data?.message || message;
        } else if (error.message.includes('Token')) {
          message = error.message;
        }

        throw new Error(message);
      }
    },

    logout() {
      // 6. 状态清理
      this.token = null;
      this.userRole = null;
      this.username = '';
      this.avatar = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      router.push('/');
    }
  }
});