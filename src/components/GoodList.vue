<template >
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
      label="商品名称"
    >
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价">
    </el-table-column>
    <el-table-column
      prop="number"
      label="库存">
    </el-table-column>
    <el-table-column
      prop="kind"
      label="种类">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="简介">
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间">
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
  beforeCreate () {
    const data = JSON.stringify({name: '', kind: ''})
    axios.post('/goods/list', data).then((res) => {
      this.dataList = res.data.data
      console.log(res)
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
