<template>
    <div class="register-container">
        <el-card class="register-card">
            <template #header>
                <h3>用户注册</h3>
            </template>
            <el-form :model="registerForm" :rules="registerRules" ref="formRef" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRegister">注册</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 表单引用
const formRef = ref(null);

// 注册表单数据
const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: ''
});

// 自定义确认密码验证规则
const validateConfirmPassword = (rule, value, callback) => {
    if (value === registerForm.value.password) {
        callback();
    } else {
        callback(new Error('两次输入的密码不一致'));
    }
};

// 自定义用户名验证规则：只能包含字母、数字和下划线
const validateUsername = (rule, value, callback) => {
    const pattern = /^[a-zA-Z0-9_]+$/;
    if (pattern.test(value)) {
        callback();
    } else {
        callback(new Error('用户名只能包含字母、数字和下划线'));
    }
};

// 自定义密码复杂度验证规则：至少包含一个大写字母、一个小写字母和一个数字
const validatePasswordComplexity = (rule, value, callback) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (pattern.test(value)) {
        callback();
    } else {
        callback(new Error('密码至少包含一个大写字母、一个小写字母和一个数字'));
    }
};

// 自定义手机号运营商验证规则：简单验证是否为常见运营商号码段
const validatePhoneOperator = (rule, value, callback) => {
    const commonOperators = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[1,8,9])\d{8}$/;
    if (commonOperators.test(value)) {
        callback();
    } else {
        callback(new Error('请输入有效的手机号'));
    }
};

// 表单验证规则
const registerRules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符之间', trigger: 'blur' },
        { validator: validateUsername, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能少于 8 个字符', trigger: 'blur' },
        { validator: validatePasswordComplexity, trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: validatePhoneOperator, trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                const bannedDomains = ['example.com', 'test.com'];
                const domain = value.split('@')[1];
                if (bannedDomains.includes(domain)) {
                    callback(new Error('该邮箱域名不被允许'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
});

// 处理注册事件
const handleRegister = async () => {
    await formRef.value.validate((valid) => {
        if (valid) {
            // 这里可以添加实际的注册逻辑，例如发送请求到后端
            console.log('注册成功，用户名：', registerForm.value.username);
        } else {
            console.log('验证失败');
            return false;
        }
    });
};

// 处理重置事件
const handleReset = () => {
    formRef.value.resetFields();
};
</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ADD8E6;
}

.register-card {
    width: 400px;
}
</style>