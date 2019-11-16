<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
     <el-breadcrumb-item >权限管理</el-breadcrumb-item>
     <el-breadcrumb-item >角色列表</el-breadcrumb-item>
   </el-breadcrumb>
    <el-table :data="rolelist" stripe style="width: 100%">

    <el-table-column type="expand">
      <template slot-scope="props">

       <el-row v-if="props.row.children.length === 0">
          <el-col>暂无权限，请分配</el-col>
        </el-row>
        
        <!-- props.row.children 一级菜单 -->
        <el-row v-else class="rights-level1" v-for="level1 in props.row.children" :key="level1.id">
          <!-- 一级菜单的名称 -->
          <el-col :span="4">
            <el-tag closable>
              {{ level1.authName }}
            </el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>

             <el-col :span="20">
              <el-row  class="rights-level2" v-for="level2 in level1.children" :key="level2.id">
              <!-- 二级菜单的名称 -->
              <el-col :span="4">
                <el-tag closable type="success">{{ level2.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>

              <el-col :span="20">
                <!-- 三级菜单的名称 -->
                <el-tag v-for="level3 in level2.children" :key="level3.id"  closable  type="warning">
                  {{ level3.authName }}
                </el-tag>
              </el-col>

            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
       <el-table-column  type="index"  label="#"   width="180">
       </el-table-column>
       <el-table-column   prop="roleName" label="角色描述" width="180">
       </el-table-column>
       <el-table-column prop="roleDesc" label="名称" width="180" >
       </el-table-column>
       <el-table-column prop="" label="操作"  >
           <template slot-scope="scope">
       <el-button type="primary" size="mini" icon="el-icon-edit" @click="openw(scope.row)" plain></el-button>
       <el-button type="danger" size="mini" icon="el-icon-delete" @click="delRole(scope.row.id)" plain></el-button>
       <el-button type="success" size="mini" icon="el-icon-check" @click="assign(scope.row)" plain>分配角色</el-button> 
       </template>
       </el-table-column>
     </el-table>
     <!-- 编辑 -->
                <el-dialog title="编辑角色" :visible.sync="roleEdit">
                <el-form ref="roleEditForm" :model="roleEditForm" >
                    <el-form-item  label="角色名称" >
                    <el-input v-model="roleEditForm.roleName" ></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" >
                    <el-input v-model="roleEditForm.roleDesc" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="roleEdit = false">取 消</el-button>
                    <el-button type="primary" @click="editRole">确 定</el-button>
                </div>
                </el-dialog>
                 <!-- 分配权限 -->
  <el-dialog title="分配权限" :visible.sync="assignRightsDialog">
    <!-- 树形权限菜单 -->
    <el-tree
      :data="rightsTreeData"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="rightsTree"
      highlight-current
      :props="defaultProps">
    </el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="assignRightsDialog = false">取 消</el-button>
      <el-button type="primary" @click="setRoleRights">确 定</el-button>
    </div>
  </el-dialog>

  </div>

</template>

<script>
export default {
    created() {
        this.getrolelist()
    },
    data() {
        return {
            rolelist:[],
            roleEdit: false,
            roleEditForm:{
                roleDesc:'',
                roleName:'',
                id:-1
            },
             // 分配权限
      assignRightsDialog: false,
      // 树形权限数据
      rightsTreeData: [],  
       defaultProps: {
        // 指定页面中节点名称使用数据中的哪个属性
        label: 'authName'
      },

      // 当前选中角色id
      curSelectedRoleId: -1
        }
    },

    methods: {
      async  getrolelist(){
          const res=await this.$http.get('/roles')
          const {data,meta}=res.data 
          console.log(res.data)    
           if(meta.status===200){
               this.rolelist=data   
           }
          },

      indexMethod (index) {
          return index
               },

         openw(role){
             this.roleEdit=true;
            this.roleEditForm.roleDesc=role.roleDesc
            this.roleEditForm.roleName=role.roleName
            this.roleEditForm.id=role.id      
          },

        async editRole(){
          const {id,roleName,roleDesc}=this.roleEditForm
          const res=await this.$http.put(`roles/${id}`,{
              roleName,roleDesc
          })
          const {meta}=res.data        
          if(meta.status === 200){
              this.$message.success(meta.msg)
              this.roleEdit=false
              this.getrolelist()
          }
        },

        delRole(id){
            this.$confirm('确认删除该角色吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.delRoleById(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },

       async delRoleById(id){
           const res=await this.$http.delete(`roles/${id}`)
           const {meta}=res.data 
           if(meta.status===200){
               this.$message.success(meta.msg);
               this.getrolelist()

           }
        },
           // 展示分配权限对话框
    showAssignRightsDialog (role) {
      this.curSelectedRoleId = role.id
      this.getAllRights(role)
    },

    // 获取到全部权限列表
    async getAllRights (role) {
      const res = await this.$http.get('rights/tree')
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.rightsTreeData = data
        this.assignRightsDialog = true
        this.$nextTick(() => {
          const level3Ids = []
          role.children.forEach(level1 => {
            level1.children.forEach(level2 => {
              level2.children.forEach(level3 => {
                level3Ids.push(level3.id)
              })
            })
          })
          // 设置默认选中
          this.$refs.rightsTree.setCheckedKeys(level3Ids)
        })
      }
    },
    // 设置角色权限
    async setRoleRights () {
      const checkedRights = this.$refs.rightsTree.getCheckedKeys()
      const checkedHalfRights = this.$refs.rightsTree.getHalfCheckedKeys()
      const allCheckedRights = [...checkedRights, ...checkedHalfRights]
      const res = await this.$http.post(`/roles/${this.curSelectedRoleId}/rights`, {
        rids: allCheckedRights.join(',')
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.assignRightsDialog = false
        this.getRolesList()
      }
    }



        
       
    },

}
</script>

<style>

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