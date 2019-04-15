<template>
  <div>
    <el-button type='primary' class='btn' @click="addKind">增加</el-button>
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
        label="种类名称"
      >
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
            @click="del(scope.row.id)"
            type="text"
            size="small">
            删除
          </el-button>
      </template>
      </el-table-column>
    </el-table>
    <KindAdd :visible="dialogFormVisible" @digCancel="digCancel" @getList="getList" />
  </div>
</template>

<script>
import KindAdd from './KindAdd'
import axios from 'axios'
export default {
  components: {
    KindAdd
  },
  data () {
    return {
      dataList: [],
      dialogFormVisible: false
    }
  },
  methods: {
    // 种类删除
    del (id) {
      const data = JSON.stringify({ id: id })
      axios.post('/kind/del', data).then((res) => {
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
    // 种类增加弹框
    addKind () {
      this.dialogFormVisible = true
    },
    digCancel () {
      this.dialogFormVisible = false
    },
    getList () {
      axios.post('/kind/list', {}).then((res) => {
        this.dataList = res.data.list
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

.btn {
  margin: 10px;
}
</style>
