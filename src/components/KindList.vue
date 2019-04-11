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
export default {

}
</script>

<style>

</style>
