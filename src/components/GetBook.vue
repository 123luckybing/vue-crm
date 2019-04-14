<template>
  <div>
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
        prop="number"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="kindName"
        label="种类">
      </el-table-column>
      <el-table-column
        prop="seller"
        label="卖家姓名">
      </el-table-column>
      <el-table-column
        prop="mobileNo"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="address"
        label="收书地址">
      </el-table-column>
      <el-table-column
        prop="status"
        label="商品状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
      label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="ensure(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.status === '未添加'"
          >
            确认入库
          </el-button>
          <el-button
            @click="del(scope.row.id)"
            type="text"
            size="small">
            删除
          </el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    // 确认入库
    ensure(item) {
      const data = JSON.stringify(item)
      axios.post('/recycle/ensure', data).then((res) => {
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
    },
    // 删除
    del(id) {
      const data = JSON.stringify({id: id })
      axios.post('/recycle/del', data).then((res) => {
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
      }).catch(err => {
        console.log(err)
      })
    },
    getList() {
      axios.get('/recycle/find/by/open/id' ,{
        params: {
          openId: 0
        }
      }).then((res) => {
        this.dataList = res.data.recycleList
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
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
