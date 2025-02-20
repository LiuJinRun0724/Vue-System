<template>
  <el-header class="header-container">
    <el-row>
      <el-col :span="6">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/Logo.png" alt="Logo">
          </router-link>
          <span>点击兔头回到首页</span>
        </div>
      </el-col>
      <el-col :span="12">
        <el-menu
          mode="horizontal"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="activeMenuIndex"
        >
          <el-menu-item index="/">
            <router-link to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="/about">
            <router-link to="/about">关于我们</router-link>
          </el-menu-item>
          <el-menu-item index="/contact">
            <router-link to="/contact">联系我们</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6" class="login-register-buttons">
        <!-- 根据登录状态显示不同内容 -->
        <div v-if="userStore.isLoggedIn">
          <img src="../assets/Logo.png" alt="Avatar" class="avatar">
          <span style="font-size: medium; font-weight: bold; color: white; text-align:center" >{{ userStore.username }}</span>
          <el-button type="primary" @click="userStore.logout">退出</el-button>
        </div>
        <div v-else>
          <router-link to="/login">
            <el-button type="primary">登录</el-button>
          </router-link>
          <router-link to="/register">
            <el-button type="primary">注册</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore.js';

const route = useRoute();
const activeMenuIndex = ref(route.path);
const userStore = useUserStore();

watch(() => route.path, (newPath) => {
  activeMenuIndex.value = newPath;
});
</script>

<style scoped>
.header-container {
  background-color: #304156;
  padding: 0;
}

.logo {
  color: white;
  font-size: 24px;
  line-height: 60px;
  padding-left: 100px;
}
.logo img {
  width: 40px;
  height: auto;
  vertical-align: middle;
  transition: transform 0.3s ease;
  margin-right: 20px; 
}
.logo img:hover {
  transform: scale(1.5);
}
.logo span {
  font-size: 24px;
  vertical-align: middle;
}

.login-register-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}

.login-register-buttons .el-button {
  margin-left: 10px;
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: 20px; 
}


.login-register-buttons div.v-if {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  margin-right: 20px; 
}

.login-register-buttons span {
  font-size: medium;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-right: 20px; 
}

/* 媒体查询响应式布局 */
@media (max-width: 1500px) {
  .logo {
    padding-left: 20px;
  }
  .logo span {
    display: none;
  }
  .login-register-buttons {
    padding-right: 10px;
  }
  .login-register-buttons .el-button {
    padding: 5px 10px;
  }
}
</style>