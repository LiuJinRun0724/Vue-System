const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const util = require('util');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const app = express();
const port = 3000;

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Usagi',
    connectionLimit: 10 // 设置连接池的最大连接数
});

// 将连接池查询方法转换为 Promise
const query = util.promisify(pool.query).bind(pool);

// 中间件
app.use(express.json());// 解析 JSON 格式请求体
app.use(cors());// 启用 CORS 支持

// 定义注册数据验证规则
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone_number: Joi.string().pattern(/^[0-9]{11}$/).required(), // 假设手机号为 11 位数字
    email: Joi.string().email().required()
});

// 处理注册请求
app.post('/register', async (req, res) => {
    try {
        // 验证输入数据
        const { error } = registerSchema.validate(req.body);
        if (error) {
            console.log('数据验证错误:', error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, password, phone_number, email } = req.body;

        // 检查用户名是否已存在
        const users = await query('SELECT * FROM userInf WHERE username = ?', [username]);
        if (users.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        // 哈希密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 获取当前时间
        const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const lastLoginAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // 插入数据到数据库
        await query('INSERT INTO userInf (username, password, email, phone_number, created_at, last_login_at) VALUES (?, ?, ?, ?, ?, ?)', [
            username,
            hashedPassword,
            email,
            phone_number,
            createdAt,
            lastLoginAt
        ]);

        res.status(200).json({ message: '注册成功' });
    } catch (error) {
        console.error('注册错误详情:', error.stack); // 打印完整错误堆栈
        res.status(500).json({
            message: '服务器内部错误',
            error: error.message // 临时返回错误详情（仅限调试）
        });
    }
});



// 处理登录请求
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // 从数据库查找用户
        const results = await query('SELECT * FROM userInf WHERE username = ?', [username]);
        if (results.length === 0) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }
        const user = results[0];
        // 验证密码
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).json({ message: '登录成功', role: user.role });
        } else {
            res.status(401).json({ message: '用户名或密码错误' });
        }
    } catch (error) {
        console.error('登录错误详情:', error.stack); // 必须打印堆栈
        res.status(500).json({ message: '服务器内部错误' });
    }
});


// 权限验证中间件
const authenticate = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.headers['user-role'];
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (allowedRoles.includes(userRole)) { // 检查用户角色是否在允许的角色列表中
            next();
        } else {
            res.status(403).json({ message: '权限不足' });
        }
    };
};


// 超级管理员专属接口
app.get('/admin-only', authenticate('Usagi'), (req, res) => {
    res.status(200).json({ message: '这是超级管理员专属接口' });
});

// 所有用户都能访问的接口
app.get('/user-access', authenticate(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: '这是所有用户都能访问的接口' });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在运行，端口号为 ${port}`)
})