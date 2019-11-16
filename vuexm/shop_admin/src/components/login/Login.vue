<template>
<div class="login-wrapper">
<el-row type="flex" class="loginForm" justify="center" align="middle">
     <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
  <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm">
  <el-form-item  label="用户名称" prop="username">
    <el-input  v-model="ruleForm.username" ></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
     </el-col>
</el-row>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          username: 'admin',
          password:'123456'
         
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在6-20', trigger: 'blur' }
          ]
         
        }
      };
    },
    methods: {
        login(){
                axios.post("http://localhost:8888/api/private/v1/login",this.ruleForm)
                      .then((res)=>{
                         let {data,meta}=res.data
                         if(meta.status==200){               
                             localStorage.setItem('token',data.token)
                             this.$router.push('./home')                              
                         }else{
                             this.$message({
                                 type:'error',
                                 message:meta.msg,
                                 duration:1000
                             })
                         }
                      })
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
.login-wrapper,
.loginForm {
  height: 100%;
}
.login-wrapper{
    background-color: #2d434c;   
}

.login-content {
  min-width: 240px;
  padding: 20px 35px;
  border-radius: 10px;
  background-color: #fff;
}
</style>