<template>
  <el-dialog title="添加商品" :visible.sync="visible">
    <el-form :model="form" ref="form">
      <el-form-item label="商品名称" :label-width="formLabelWidth" prop='name' :rules="[{ required: true, message: '请输入商品名称' }]">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="种类" :label-width="formLabelWidth" prop='kind' :rules="[{ required: true, message: '请输入种类' }]">
        <el-select v-model="form.kind" placeholder="请选择种类">
          <el-option v-for="(item, index) in kindList" :key="index" :label="item.name" :value="item.name" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth" prop='price' :rules="[{ required: true, message: '请输入价格价格' }]">
          <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth" prop='number' :rules="[{ required: true, message: '请输入数量' }]">
       <el-input v-model="form.number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" :label-width="formLabelWidth" prop='image'>
       <el-input v-model="form.image" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth" prop='remark'>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="简介"
          v-model="form.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: ['visible'],
  data () {
    return {
      kindList: [],
      form: {
        name: '',
        price: '',
        number: '',
        kind: '',
        remark: '',
        image: ''
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    // 关闭弹窗
    cancel () {
      this.$emit('alertCancel') // 调用父组件的方法
    },
    // 确定提交
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const data = JSON.stringify(this.form)
          axios.post('/goods/add', data).then((res) => {
            this.$emit('alertCancel')
            this.$refs['form'].resetFields()
            this.$message({
              message: res.data.msg,
              type: 'success',
              onClose: () => {
                this.$emit('getList')
              }
            })
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  beforeCreate () {
    axios.post('/kind/list', {}).then((res) => {
      this.kindList = res.data.list
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>
