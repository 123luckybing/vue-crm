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
        prop="goodsName"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        prop="goodsKind"
        label="商品种类">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态">
      </el-table-column>
      <el-table-column
        prop="number"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品单价">
      </el-table-column>
      <el-table-column
        prop="priceTotal"
        label="商品总价">
      </el-table-column>
      <el-table-column
        prop="name"
        label="买家姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width=150
      >
        <template slot-scope="scope">
          <el-button
            @click="del(scope.row.id)"
            type="text"
            size="small">
            删除
          </el-button>
          <el-button
            @click="sure(scope.row.id)"
            v-if="scope.row.status === '已付款'"
            type="text"
            size="small">
            确认发货
          </el-button>
        </template>
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
  methods: {
    // 确认发货
    sure (id) {
      axios.get('/order/send/goods', {
        params: {
          id: id
        }
      }).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'success',
            onClose: () => {
              this.getList()
            }
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 请求列表
    getList () {
      axios.get('/order/list').then((res) => {
        this.dataList = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除
    del (id) {
      const data = JSON.stringify({id: id})
      axios.post('/order/del', data).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.msg,
            type: 'success',
            onClose: () => {
              this.getList()
            }
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getList()
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
