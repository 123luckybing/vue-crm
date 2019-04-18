<template >
  <div>
    <div class='title'>
      <el-button
        class='btn'
        type="primary"
        @click="alertShow"
      >增加</el-button>
      <div class='search'>
        <span>书籍名称：</span>
        <el-input class='input' v-model="input" placeholder="请输入书籍名称"></el-input>
         <span>种类名称：</span>
         <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-button
          class='btn'
          type="primary"
          @click="goodSearch"
        >搜索</el-button>
        <el-button
          class='btn'
          type="primary"
          @click="clearInput"
        >清空</el-button>
      </div>
    </div>
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
        prop="isbn"
        label="书号">
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
import AddGoods from './AddGoods'
import EditGoods from './EditGoods'
import axios from 'axios'
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
      editVisible: false,
      input: '',
      kind: '',
      options: [],
      value: ''
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
    edit (id) {
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
    alertShow () {
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
    },
    // 商品搜索
    goodSearch () {
      const data = JSON.stringify({name: this.input, kind: this.value})
      axios.post('/goods/list', data).then((res) => {
        this.dataList = res.data.list
      }).catch((err) => {
        console.log(err)
      })
    },
    // 清空
    clearInput () {
      this.input = ''
    }
  },
  mounted () {
    this.getList()
    axios.post('/kind/list', {}).then((res) => {
      this.options = res.data.list
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

.btn {
  margin: 20px;
}

.search {
  display: flex;
  align-items: center;
}

.search .el-input {
  width: 150px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input {
  margin-right: 10px;
}
</style>
