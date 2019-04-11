<template className='left_menu'>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#181d4b"
        text-color="#fff"
        active-text-color="#afb4db">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" ><router-link to='/goods/list'>商品列表</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to='/kind/list'>种类列表</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-service"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><router-link to='/user/list'>用户列表</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot='title'>
            <i class="el-icon-document"></i>
            <span slot="title">业务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1"><router-link to='/order/list'>订单列表</router-link></el-menu-item>
            <el-menu-item index="3-2"><router-link to='/getBook/list'>收书列表</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
}

a {
  text-decoration: none;
  color: #FFF;
  display: inline-block;
  width: 100%;
}
</style>
