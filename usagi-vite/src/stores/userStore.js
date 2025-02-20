// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userRole: null,
    isLoggedIn: false,
    username: '', // 添加用户名
    avatar: ''    // 添加头像链接
  }),
  actions: {
    login(username, password) {
      // 这里偷懒简单模拟验证逻辑，实际应用中应与后端交互
      if (username === 'Usagi' && password === '123456') {
        this.userRole = 'admin';
        this.isLoggedIn = true;
        this.username = username; // 更新用户名
        this.avatar = 'path/to/admin/avatar.png'; // 更新头像链接
        return true;
      } else if (username === 'user' && password === '123456') {
        this.userRole = 'user';
        this.isLoggedIn = true;
        this.username = username; 
        this.avatar = 'path/to/user/avatar.png'; 
        return true;
      }
      return false;
    },
    logout() {
      this.userRole = null;
      this.isLoggedIn = false;
      this.username = '';
      this.avatar = '';
      this.isLoggedIn = false;
      alert('已退出登录');
    },
  },
});