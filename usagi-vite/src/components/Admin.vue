
<template>
    <div class="about-page">
      <h1>超级管理员</h1>
      <p>这是超级管理员才能看到的页面</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About'
  }
  </script>
  
  <style scoped>
  .about-page {
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
  </style>