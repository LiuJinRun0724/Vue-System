<template>
    <div class="contact-page">
      <h1>联系刘能</h1>
      <p>你可以通过以下方式与刘能取得联系：</p>
      <ul>
        <li>邮箱：951704573@qq.com</li>
        <li>QQ：951704573</li>
        <li>电话：13713804820</li>
        <li>微信：13713804820</li>
        <li>地址：深圳技术大学北区宿舍17A-7105</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contact'
  }
  </script>
  
  <style scoped>
  .contact-page {
    background-color: #ADD8E6;
    padding: 20px;
    min-height: 100vh;
  }
  
  h1 {
    color: #333;
  }
  
  p {
    color: #555;
    line-height: 1.6;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
    color: #555;
  }
  </style>