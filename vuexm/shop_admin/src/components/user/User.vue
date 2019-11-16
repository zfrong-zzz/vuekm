<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
  <el-breadcrumb-item >用户管理</el-breadcrumb-item>
  <el-breadcrumb-item >用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-input placeholder="请输入用户名" v-model="queryStr" class="input-with-select" clearable>
</el-input>
<el-button slot="append"  icon="el-icon-search" @click="queryUserList"></el-button>
  <el-button type="success" @click="open" plain>添加用户</el-button>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180">
    </el-table-column>

    <el-table-column prop="email" label="邮箱" width="180">
    </el-table-column>

    <el-table-column prop="mobile" label="电话">
    </el-table-column>
    
     <el-table-column label='用户状态'>
       <template slot-scope="scope">
       <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row.id,scope.row.mg_state)"></el-switch>
         
       </template>
    </el-table-column>

     <el-table-column prop="option" label="用户操作">
       <template slot-scope="">
       <el-button type="primary" icon="el-icon-edit" plain></el-button><el-button type="danger" icon="el-icon-delete" plain></el-button>
       <el-button type="success" icon="el-icon-check" plain>分配角色</el-button>

       </template>
    </el-table-column>

  </el-table>
 <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curpage" @current-change="changePage">
    </el-pagination>
</div>
</template>

<script>
//import axios from 'axios';

export default {
  created() {
  this.getUserList();
},
data() {
      return {
        tableData: [],
        pageSize:3,
        curpage:2,
        total:0,
        queryStr:''
        
      }
    },
    methods: {
      async getUserList(curpage=1){
        const res=await this.$http.get("/users",{
            params:{
              pagenum:curpage,
              pagesize: this.pageSize,
              query:this.queryStr
            },
            // headers:{
            //   "Authorization":localStorage.getItem('token')
            // }
        })
      //    this.tableData=res.data.data.users;
      //  console.log(this.tableData);
        const { data, meta } = res.data
      if (meta.status === 200) {
        // 获取数据成功
        this.tableData = data.users

        this.total = data.total
        this.curpage = data.pagenum
         
      }
      },
      changePage(curPage) {
      // console.log('当前页为：', curPage)
      this.getUserList(curPage)
    },

    // 搜索
    queryUserList() {
      // console.log(this.queryStr)
      this.curPage = 1
      this.getUserList()
    },
 
    async changeStatus(id,state){
      const res=await this.$http.put(`/users/${id}/state/${state}`)
        const {data,meta}=res.data
        console.log(res)
        if(meta.status==200){
          this.$message({
            type:"success",
            message:data.mg_state===0?'禁用成功':'启用成功',
            duration:1000
          })
        }else{
          this.$message({
            type:'error',
            message:meta.msg,
            duration:1000
          })
        }
    },
            open() {
        this.$prompt('请输入用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '邮箱格式不正确'
        }).$prompt('请输入密码', '提示', {
          
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
      
    },

}
</script>

<style>
.el-input{
    width: 30%;
}
.el-main{
    text-align: left;
    line-height: 0;
}
.el-breadcrumb{
    line-height: 4;
    background: #909399;
    border-radius: 5px;
    padding-left: 10px;
}


</style>