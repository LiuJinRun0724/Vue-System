<template>
  <div class="home-container">
      <!-- 页面标题 -->
      <h1 class="page-title">可视化系统主页</h1>
      <!-- 系统简介 -->
      <div class="system-intro">
          <p>这是一个功能弱小的可视化系统，旨在为刘能提供一个项目经历。</p>
          <p>超级管理员账号：Usagi，密码123456</p>
          <p>普通用户账号：user，密码123456</p>
      </div>
      <!-- 第一行图表容器 -->
      <div class="charts-wrapper">
          <!-- 折线图容器 -->
          <div id="line-chart" class="chart-item" style="width: 48%; height: 300px;"></div>
          <!-- 柱状图容器 -->
          <div id="bar-chart" class="chart-item" style="width: 48%; height: 300px;"></div>
      </div>
      <!-- 第二行图表容器 -->
      <div class="charts-wrapper">
          <!-- 饼图容器 -->
          <div id="pie-chart" class="chart-item" style="width: 48%; height: 300px;"></div>
          <!-- 雷达图容器 -->
          <div id="radar-chart" class="chart-item" style="width: 48%; height: 300px;"></div>
      </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
  // 初始化折线图
  const lineChartDom = document.getElementById('line-chart');
  const lineChart = echarts.init(lineChartDom);
  const lineOption = {
      title: {
          text: '折线图示例'
      },
      tooltip: {
          trigger: 'axis'
      },
      xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }
      ]
  };
  lineChart.setOption(lineOption);

  // 初始化柱状图
  const barChartDom = document.getElementById('bar-chart');
  const barChart = echarts.init(barChartDom);
  const barOption = {
      title: {
          text: '柱状图示例'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      xAxis: {
          type: 'category',
          data: ['苹果', '香蕉', '橙子', '葡萄', '草莓']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              data: [5, 20, 36, 10, 10],
              type: 'bar'
          }
      ]
  };
  barChart.setOption(barOption);

  // 初始化饼图
  const pieChartDom = document.getElementById('pie-chart');
  const pieChart = echarts.init(pieChartDom);
  const pieOption = {
      title: {
          text: '饼图示例',
          left: 'center'
      },
      tooltip: {
          trigger: 'item'
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: [
                  { value: 1048, name: '搜索引擎' },
                  { value: 735, name: '直接访问' },
                  { value: 580, name: '邮件营销' },
                  { value: 484, name: '联盟广告' },
                  { value: 300, name: '视频广告' }
              ]
          }
      ]
  };
  pieChart.setOption(pieOption);

  // 初始化雷达图
  const radarChartDom = document.getElementById('radar-chart');
  const radarChart = echarts.init(radarChartDom);
  const radarOption = {
      title: {
          text: '雷达图示例',
          left: 'center'
      },
      tooltip: {},
      radar: {
          indicator: [
              { name: '销售', max: 6500 },
              { name: '管理', max: 16000 },
              { name: '信息技术', max: 30000 },
              { name: '客服', max: 38000 },
              { name: '研发', max: 52000 },
              { name: '市场', max: 25000 }
          ]
      },
      series: [
          {
              name: '预算 vs 开销',
              type: 'radar',
              data: [
                  {
                      value: [4300, 10000, 28000, 35000, 50000, 19000],
                      name: '预算分配'
                  },
                  {
                      value: [5000, 14000, 28000, 31000, 42000, 21000],
                      name: '实际开销'
                  }
              ]
          }
      ]
  };
  radarChart.setOption(radarOption);
});
</script>

<style scoped>
/* 主页容器样式 */
.home-container {
  background-color: #ADD8E6;
  padding: 20px;
  min-height: 100vh;
}

/* 页面标题样式 */
.page-title {
  text-align: center;
  color: #333;
  font-size: 32px;
  margin-bottom: 20px;
}

/* 系统简介样式 */
.system-intro {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  line-height: 1.6;
}

/* 图表包裹容器样式 */
.charts-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
  transition: all 1s ease; /* 添加过渡效果 */
}

/* 单个图表项样式 */
.chart-item {
  transition: all 1s ease; /* 添加过渡效果 */
}

/* 媒体查询，当屏幕宽度小于等于 768px 时调整布局 */
@media (max-width: 1400px) {
  .page-title {
      font-size: 24px; /* 减小标题字体大小 */
  }
  .charts-wrapper {
      flex-direction: column; /* 让图表垂直排列 */
  }
  .charts-wrapper > div {
      width: 100%; /* 让图表容器宽度占满一行 */
      margin-bottom: 20px; /* 增加图表之间的间距 */
  }
}
</style>