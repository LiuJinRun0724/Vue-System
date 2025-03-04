<template>
    <div class="function-container">
        <!-- 操作按钮组 -->
        <div class="button-group">
            <button class="btn create-btn" @click="handleCreateClick">
                <span class="icon">📊</span> 新建图表
            </button>
            <button class="btn delete-btn" @click="deleteChart" :disabled="!chartInstance">
                <span class="icon">🗑️</span> 删除图表
            </button>
        </div>

        <!-- 图表配置表单 -->
        <transition name="slide-fade">
            <div v-if="showForm" class="chart-form">
                <h3>📈 图表配置</h3>

                <!-- 图表类型选择 -->
                <div class="form-group">
                    <label>图表类型：</label>
                    <select v-model="chartType" class="styled-select">
                        <option value="bar">柱状图</option>
                        <option value="line">折线图</option>
                        <option value="pie">饼图</option>
                    </select>
                </div>

                <!-- 数据输入 -->
                <div class="form-group">
                    <template v-if="chartType === 'bar' || chartType === 'line'">
                        <label>X轴标签：</label>
                        <input v-model="inputData.labels" placeholder="例: 一月, 二月, 三月" class="styled-input">

                        <label>Y轴数据：</label>
                        <input v-model="inputData.values" placeholder="例: 10, 20, 30" class="styled-input">
                    </template>

                    <template v-if="chartType === 'pie'">
                        <label>数据标签：</label>
                        <input v-model="inputData.labels" placeholder="例: 苹果, 香蕉, 橙子" class="styled-input">

                        <label>数值：</label>
                        <input v-model="inputData.values" placeholder="例: 30, 50, 20" class="styled-input">
                    </template>
                </div>

                <div class="form-actions">
                    <button class="btn confirm-btn" @click="createChart">🚀 生成</button>
                    <button class="btn cancel-btn" @click="showForm = false">❌ 取消</button>
                </div>
            </div>
        </transition>

        <!-- 图表展示 -->
        <div class="chart-container" :class="{ 'has-chart': chartInstance }">
            <canvas ref="chartCanvas"></canvas>
            <div v-if="!chartInstance" class="empty-state">
                🌟 点击上方按钮创建新图表
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Chart from 'chart.js/auto'

const showForm = ref(false)
const chartType = ref('bar')  // 添加缺失的chartType声明
const chartCanvas = ref(null)
const inputData = reactive({
  labels: '',
  values: ''
})
const chartInstance = ref(null)

const handleCreateClick = () => {
  showForm.value = true
  inputData.labels = ''
  inputData.values = ''
}

// 修改后的createChart方法
const createChart = () => {
  if (!inputData.labels || !inputData.values) {
    alert('请输入完整数据！')
    return
  }

  try {
    const labels = inputData.labels.split(',').map(item => item.trim())
    const values = inputData.values.split(',').map(Number)
    
    if (labels.length !== values.length) {
      throw new Error('标签与数值数量不一致')
    }

    if (chartInstance.value) {
      chartInstance.value.destroy()
    }

    chartInstance.value = new Chart(chartCanvas.value, {
      type: chartType.value,
      data: {
        labels: labels,
        datasets: [{
          label: '数据集',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderWidth: 1
        }]
      }
    })
    
    showForm.value = false

  } catch (error) {
    alert(`生成图表失败: ${error.message}`)
    console.error(error)
  }
}

// 逻辑部分保持相同，新增删除方法
// 删除图表时
const deleteChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
    // 清空画布
    chartCanvas.value.getContext('2d').clearRect(0, 0, 
      chartCanvas.value.width, 
      chartCanvas.value.height
    )
  }
}
</script>

<style scoped>
/* 基础样式保持相同，新增美化样式 */
.function-container {
    background-color: #ADD8E6;
    min-height: 100vh;
}

.button-group {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.btn {
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.create-btn {
    background: #4CAF50;
    color: white;
    box-shadow: 0 4px 6px rgba(76, 175, 80, 0.2);
}

.delete-btn {
    background: #ff4444;
    color: white;
    box-shadow: 0 4px 6px rgba(255, 68, 68, 0.2);
}

.delete-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
}

.btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* 表单美化 */
.styled-select {
    width: 100%;
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    background: white;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

.styled-input {
    width: 100%;
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    margin: 8px 0;
    transition: border-color 0.3s;
}

.styled-input:focus {
    border-color: #4CAF50;
    outline: none;
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
}

.confirm-btn {
    background: #2196F3;
    color: white;
}

.cancel-btn {
    background: #9E9E9E;
    color: white;
}

/* 空状态提示 */
.empty-state {
    text-align: center;
    color: #666;
    padding: 40px;
    font-size: 1.2em;
}

/* 过渡动画 */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

/* 图表容器效果 */
.chart-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}

.chart-container.has-chart {
    transform: translateY(0);
    opacity: 1;
}
</style>