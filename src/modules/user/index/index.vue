<template>
  <h1>user</h1>
  <p>计数：<span :class="{ countStyle: count }">{{count}}</span></p>
  <button @click="setCount">接口</button>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy, appContext } = getCurrentInstance()
const { $api } = appContext.config.globalProperties

const count = ref(0)

function setCount () {
  $api.query.getUser(count.value).then(res => {
    count.value++
    console.log('setCount', count.value, '--', res)
  })
}
</script>

<style scoped lang="stylus">
.countStyle
  color: #409EFF
  font-size: 20px
</style>
