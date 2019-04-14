<template >
  <div>
    <el-button
      class='btn'
      type="primary"
      @click="alertShow"
    >增加</el-button>
    <el-table
      :data="dataList"
      border
      class='table'
    >
      <el-table-column
        prop="id"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width='70'
      >
      </el-table-column>
      <el-table-column
        prop="number"
        label="库存"
        width="70">
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
        prop="createTime"
        label="创建时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
      label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row.id)"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            @click="deleteRow(scope.row.id)"
            type="text"
            size="small">
            删除
          </el-button>
      </template>
      </el-table-column>
    </el-table>
    <AddGoods :visible="addVisible" @alertCancel="alertCancel" @getList="getList"/>
    <EditGoods :visible="editVisible" @closeEdit="closeEdit" @getList="getList" :info="detailInfo" />
  </div>
</template>

<script>
import axios from 'axios'
import AddGoods from './AddGoods'
import EditGoods from './EditGoods'
export default {
  components: {
    AddGoods,
    EditGoods
  },
  data () {
    return {
      dataList: [],
      addVisible: false,
      detailInfo: {},
      editVisible: false
    }
  },
  methods: {
    // 编辑弹框消失
    closeEdit () {
      this.editVisible = false
    },
    getList () {
      const data = JSON.stringify({name: '', kind: ''})
      axios.post('/goods/list', data).then((res) => {
        this.dataList = res.data.list
      }).catch((err) => {
        console.log(err)
      })
    },
    // 修改
    edit(id) {
      axios.get('/goods/get', {
        params: {
          id: id
        }
      }).then((res) => {
        this.detailInfo = res.data
        this.editVisible = true
      }).catch((err) => {
        console.log(err)
      })
    },
    // 增加弹框消失
    alertCancel () {
      this.addVisible = false
    },
    // 增加弹框出现
    alertShow() {
      this.addVisible = true
    },
    // 删除
    deleteRow (id) {
      const data = JSON.stringify({id: id})
      axios.post('/goods/del', data).then((res) => {
        this.$message({
          message: res.data.msg,
          type: 'success',
          onClose: () => {
            this.getList()
          }
        })
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
  margin: 20px;
}
</style>
