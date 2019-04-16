<template>
  <el-dialog title="增加种类" :visible.sync="visible">
  <el-form :model="form" ref="form">
    <el-form-item label="种类名称" :label-width="formLabelWidth" :rules="[{ required: true, message: '请填写种类名称'}]">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上传图片" :label-width="formLabelWidth">
      <el-input v-model="form.image" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="digCancel">取 消</el-button>
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
      form: {
        name: '',
        image: ''
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    digCancel () {
      this.$emit('digCancel')
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const data = JSON.stringify(this.form)
          axios.post('/kind/add', data).then((res) => {
            if (res.data.code === 0) {
              this.$emit('digCancel')
              this.$refs['form'].resetFields()
              this.$message({
                message: res.data.msg,
                type: 'success',
                onClose: () => {
                  this.$emit('getList')
                }
              })
            } else {
              this.$emit('digCancel')
              this.$message({
                message: res.data.msg,
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

<style scoped>

</style>
