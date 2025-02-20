const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 解析 JSON 格式请求体
app.use(express.json());

// 启用 CORS 支持
app.use(cors());

// 模拟用户数据库
const users = [
    { username: 'Usagi', password: '123456', role: 'admin' },
    { username: 'user', password: '123456', role: 'user' }
];

// 权限验证中间件
const authenticate = (requiredRole) => {
    return (req, res, next) => {
        // 这里假设前端在请求头中传递用户角色信息
        const userRole = req.headers['user-role'];
        if (userRole === requiredRole) {
            next();
        } else {
            res.status(403).json({ message: '权限不足' });
        }
    };
};

// 处理登录请求
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 查找用户
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // 登录成功，返回用户角色
        res.status(200).json({ message: '登录成功', role: user.role });
    } else {
        res.status(401).json({ message: '用户名或密码错误' });
    }
});

// 超级管理员专属接口
app.get('/admin-only', authenticate('Usagi'), (req, res) => {
    res.status(200).json({ message: '这是超级管理员专属接口' });
});

// 普通用户和超级管理员都能访问的接口
app.get('/user-access', authenticate(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: '这是普通用户和超级管理员都能访问的接口' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});