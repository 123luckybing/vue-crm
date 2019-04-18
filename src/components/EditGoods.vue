<template>
  <el-dialog title="修改商品" :visible.sync="visible">
    <el-form :model="form" ref="form" v-if="form.id">
       <el-form-item label="id:" :label-width="formLabelWidth" prop="id">
        <div>{{ form.id }}</div>
      </el-form-item>
      <el-form-item label="名字:" :label-width="formLabelWidth" prop="name">
        <div>{{ form.name }}</div>
      </el-form-item>
      <el-form-item label="种类:" :label-width="formLabelWidth" prop="kind">
        <div>{{ form.kind }}</div>
      </el-form-item>
      <el-form-item label="书号:" :label-width="formLabelWidth" prop="isbn">
        <el-input
          placeholder="请输入书号"
          v-model="form.isbn"
         >
        </el-input>
      </el-form-item>
      <el-form-item label="库存:" :label-width="formLabelWidth" prop="number">
        <el-input
          placeholder="请输入内容"
          v-model="form.number"
         >
        </el-input>
      </el-form-item>
      <el-form-item label="修改图片:" :label-width="formLabelWidth" prop="image">
        <el-input
          placeholder="请输入图片地址"
          v-model="form.image"
         >
        </el-input>
      </el-form-item>
      <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
        <el-input
          placeholder="请输入内容"
          v-model="form.price"
         >
        </el-input>
      </el-form-item>
        <el-form-item label="简介:" :label-width="formLabelWidth" prop="remark">
          <el-input
            placeholder="请输入内容"
            v-model="form.remark"
          >
          </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
      <el-button @click="cancelEdit">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: ['info', 'visible'],
  data () {
    return {
      form: {},
      formLabelWidth: '100px'
    }
  },
  // 父组件通过调用接口将获得的数据通过props传给子组件，
  // 但是是异步的,所以updated再赋值一下
  updated () {
    this.form = this.info
  },
  methods: {
    // 取消编辑弹框
    cancelEdit () {
      this.$emit('closeEdit')
    },
    // 修改
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const data = JSON.stringify(this.form)
          this.$emit('closeEdit')
          this.$refs['form'].resetFields()
          axios.post('/goods/update', data).then((res) => {
            if (res.data.code === 0) {
              this.$message({
                message: '修改成功',
                type: 'success',
                onClose: () => {
                  this.$emit('getList')
                }
              })
            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
