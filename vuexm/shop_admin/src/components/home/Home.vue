<template>
<el-container>
  <el-header>
  <el-col :span="5"><div class="grid-content logo" ><img src="@/assets/logo.jpg" alt="" width="50px"> 快马商城后台</div></el-col>
  <el-col :span="16"><div class="grid-content system" >电商后台管理系统</div></el-col>
  <el-col :span="3"><div class="grid-content welcome">欢迎星曜会员<a href="" @click.prevent="loginout">退出</a></div></el-col>
</el-header>
  <el-container>
    <el-aside width="200px">
            <el-menu 
            :router="true"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             class="el-menu-vertical-demo"
             @open="handleOpen"
              @close="handleClose">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
        <el-menu-item index="/home/user" >用户列表</el-menu-item>
        </el-menu-item-group>
            </el-submenu>

         <el-submenu index="2">
   <template slot="title"><i class="el-icon-message"></i>权限管理</template>
        <el-menu-item-group>
       <el-menu-item index="/home/role"><i class="el-icon-menu"></i><span slot="title">角色列表</span></el-menu-item>
       <el-menu-item index="/home/right"><i class="el-icon-menu"></i><span slot="title">权限列表</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>

         <el-submenu index="3">
   <template slot="title"><i class="el-icon-message"></i>商品管理</template>
        <el-menu-item-group>
       <el-menu-item index="/home/product"><i class="el-icon-menu"></i><span slot="title">商品列表</span></el-menu-item>

        </el-menu-item-group>
      </el-submenu>
    
    </el-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>

  </el-container>
</el-container>
</template>

<script>
export default {
methods: {
  loginout(){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         localStorage.removeItem('token')
         this.$router.push('./login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  },
  handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
},
}
</script>

<style>
.logo{
    font-size: 20px;
    font-family: '宋体';
    font-weight: bolder;
}
.system{
color: #f9fafc;
font-family: "黑体";
font-size: 25px;
}
.welcome{
font-size: 12px;
color: #000000;
font-weight: bolder;
}
.welcome a{
    font-weight: bolder;
    color: darkorange;
    width: 20px;
}
.el-submenu__title,.el-menu-item-group__title,.el-menu-item{
color: #fff;
}
.el-submenu__title:hover{
    color: #000000;
}
.el-menu-item:hover{
    color: #000000;
}
  section.el-container {
    height: 100%;
}
   body > .el-container {
      height: 100%;
    margin-bottom: 40px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .el-header{
       padding:0px; 
   }
  
  .el-aside {
    background-color: #606266;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-menu{
       background-color: #606266;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
   .el-row {
    margin-bottom: 20px;
  
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>