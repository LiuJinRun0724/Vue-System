<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h3>用户登录</h3>
      </template>
      <el-form :model="loginForm" :rules="loginRules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="RememberPwd" v-model="rememberPassword">记住密码</el-checkbox>
          <el-link @click="handleForgotPassword">忘记密码?</el-link>
        </el-form-item>
        <el-form-item>
          <el-button class="Login" type="primary" @click="handleLogin">登录</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </el-form-item>
      </el-form>
      <hr>
      <div class="third-party-login">
        <h4>第三方登录</h4>
        <svg xmlns="http://www.w3.org/2000/svg" @click="handleWechatLogin" viewBox="0 0 1024 1024">
          <path fill="currentColor"
            d="M544 894.72a382.336 382.336 0 0 0 215.936-89.472L577.024 622.272c-10.24 6.016-21.248 10.688-33.024 13.696v258.688zm261.248-134.784A382.336 382.336 0 0 0 894.656 544H635.968c-3.008 11.776-7.68 22.848-13.696 33.024l182.976 182.912zM894.656 480a382.336 382.336 0 0 0-89.408-215.936L622.272 446.976c6.016 10.24 10.688 21.248 13.696 33.024h258.688zm-134.72-261.248A382.336 382.336 0 0 0 544 129.344v258.688c11.776 3.008 22.848 7.68 33.024 13.696zM480 129.344a382.336 382.336 0 0 0-215.936 89.408l182.912 182.976c10.24-6.016 21.248-10.688 33.024-13.696zm-261.248 134.72A382.336 382.336 0 0 0 129.344 480h258.688c3.008-11.776 7.68-22.848 13.696-33.024zM129.344 544a382.336 382.336 0 0 0 89.408 215.936l182.976-182.912A127.232 127.232 0 0 1 388.032 544zm134.72 261.248A382.336 382.336 0 0 0 480 894.656V635.968a127.232 127.232 0 0 1-33.024-13.696zM512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896m0-384a64 64 0 1 0 0-128 64 64 0 0 0 0 128">
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" @click="handleWechatLogin" viewBox="0 0 1024 1024">
          <path fill="currentColor"
            d="M300.032 188.8c174.72-113.28 408-63.36 522.24 109.44 5.76 10.56 11.52 20.16 17.28 30.72v.96a22.4 22.4 0 0 1-7.68 26.88l-352.32 228.48c-9.6 6.72-22.08 3.84-28.8-5.76l-18.24-27.84a54.336 54.336 0 0 1 16.32-74.88l225.6-146.88c9.6-6.72 12.48-19.2 5.76-28.8-.96-1.92-1.92-3.84-3.84-4.8a267.84 267.84 0 0 0-315.84-17.28c-123.84 81.6-159.36 247.68-78.72 371.52a268.096 268.096 0 0 0 370.56 78.72 54.336 54.336 0 0 1 74.88 16.32l17.28 26.88c5.76 9.6 3.84 21.12-4.8 27.84-8.64 7.68-18.24 14.4-28.8 21.12a377.92 377.92 0 0 1-522.24-110.4c-113.28-174.72-63.36-408 111.36-522.24zm526.08 305.28a22.336 22.336 0 0 1 28.8 5.76l23.04 35.52a63.232 63.232 0 0 1-18.24 87.36l-35.52 23.04c-9.6 6.72-22.08 3.84-28.8-5.76l-46.08-71.04c-6.72-9.6-3.84-22.08 5.76-28.8l71.04-46.08z">
          </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" @click="handleWechatLogin" xml:space="preserve"
          style="enable-background:new 0 0 1024 1024;" viewBox="0 0 1024 1024">
          <path fill="currentColor"
            d="M938.67 512.01c0-44.59-6.82-87.6-19.54-128H682.67a212.372 212.372 0 0 1 42.67 128c.06 38.71-10.45 76.7-30.42 109.87l-182.91 316.8c235.65-.01 426.66-191.02 426.66-426.67z">
          </path>
          <path fill="currentColor"
            d="M576.79 401.63a127.92 127.92 0 0 0-63.56-17.6c-22.36-.22-44.39 5.43-63.89 16.38s-35.79 26.82-47.25 46.02a128.005 128.005 0 0 0-2.16 127.44l1.24 2.13a127.906 127.906 0 0 0 46.36 46.61 127.907 127.907 0 0 0 63.38 17.44c22.29.2 44.24-5.43 63.68-16.33a127.94 127.94 0 0 0 47.16-45.79v-.01l1.11-1.92a127.984 127.984 0 0 0 .29-127.46 127.957 127.957 0 0 0-46.36-46.91">
          </path>
          <path fill="currentColor"
            d="M394.45 333.96A213.336 213.336 0 0 1 512 298.67h369.58A426.503 426.503 0 0 0 512 85.34a425.598 425.598 0 0 0-171.74 35.98 425.644 425.644 0 0 0-142.62 102.22l118.14 204.63a213.397 213.397 0 0 1 78.67-94.21m117.56 604.72H512zm-97.25-236.73a213.284 213.284 0 0 1-89.54-86.81L142.48 298.6c-36.35 62.81-57.13 135.68-57.13 213.42 0 203.81 142.93 374.22 333.95 416.55h.04l118.19-204.71a213.315 213.315 0 0 1-122.77-21.91z">
          </path>
        </svg>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// 表单引用
const formRef = ref(null);
const loginForm = ref({
  username: '',
  password: ''
});
const rememberPassword = ref(false);
const errorMessage = ref('');

// 表单验证规则
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});

// 处理登录事件
const handleLogin = async () => {
  try {
    // 1. 执行表单验证
    const valid = await formRef.value.validate();
    if (!valid) return;

    // 2. 调用Store登录
    await userStore.login({
      username: loginForm.value.username,
      password: loginForm.value.password
    });

    // 3. 记住密码处理
    if (!rememberPassword.value) {
      loginForm.value.password = ''; // 清空密码
    }

    // 4. 跳转到首页
    router.replace('/');
  } catch (error) {
    // 错误处理
    errorMessage.value = error.message || '登录失败，请稍后重试';
    
    // 开发环境打印错误
    if (import.meta.env.DEV) {
      console.error('登录错误详情：', error);
    }
  }
};
// 处理重置事件
const handleReset = () => {
  formRef.value.resetFields();
  errorMessage.value = '';
};

// 处理忘记密码事件
const handleForgotPassword = () => {
  alert('该功能尚未开放，但其实永远都不会开放了，因为我是一条懒狗');
};

// 处理微信登录事件
const handleWechatLogin = () => {
  alert('该功能尚未开放，但其实永远都不会开放了，因为我是一条懒狗');
};

// 处理 QQ 登录事件
const handleQQLogin = () => {
  alert('该功能尚未开放，但其实永远都不会开放了，因为我是一条懒狗');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #ADD8E6, #87CEEB);
}

.login-card {
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: red;
  text-align: center;
}

.third-party-login {
  text-align: center;
  margin-top: 20px;
}

.third-party-login h4 {
  margin-bottom: 10px;
}

.third-party-login .el-button {
  margin: 0 5px;
}

svg {
  width: 20px;
  height: auto;
  fill: gray;
  transition: fill 0.3s ease;
  margin-right: 10px;
}

svg:hover {
  transform: scale(1.5);
}

.RememberPwd {
  padding-right: 50px;
}

.Login {
  margin-right: 50px;
}
</style>