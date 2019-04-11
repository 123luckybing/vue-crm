<template>
  <el-row>
    <el-col :span="5"><LeftMenu /></el-col>
    <el-col :span="19"><router-view /></el-col>
    <!-- router-view是指子路由渲染在什么位置 -->
  </el-row>
</template>

<script>
import LeftMenu from './LeftMenu'
export default {
  components: {
    LeftMenu
  }
}
</script>

<style scoped>

</style>
