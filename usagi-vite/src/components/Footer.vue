<template>
    <el-footer class="footer-container">
      <div class="footer-content">
        <div class="footer-left">
          <p>&copy; 2025 刘能练手项目.</p>
        </div>
        <div class="footer-right">
          <a href="#" target="_blank"><i class="el-icon-twitter"></i></a>
          <a href="#" target="_blank"><i class="el-icon-facebook"></i></a>
          <a href="#" target="_blank"><i class="el-icon-instagram"></i></a>
        </div>
      </div>
    </el-footer>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  .footer-container {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .footer-content {
    width: 90%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .footer-left p {
    margin: 0;
    font-size: 14px;
  }
  
  .footer-right a {
    color: #fff;
    font-size: 20px;
    margin-left: 15px;
    transition: color 0.3s ease;
  }
  
  .footer-right a:hover {
    color: #00a1d6;
  }
  </style>