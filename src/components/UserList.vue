<template>
  <el-table
    :data="dataList"
    border
    class='table'
  >
    <el-table-column
      prop="id"
      label="序号"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
    >
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dataList: []
    }
  },
  mounted () {
    axios.get('/user/list').then((res) => {
      this.dataList = res.data
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.table {
  margin: 10px;
}

.el-table {
  width: auto;
}
</style>
