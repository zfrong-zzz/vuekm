import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import User from '@/components/user/User'
import Role from '@/components/role/Role'
import Right from '@/components/right/Right'

import Product from '@/components/product/Product'

Vue.use(Router)
let router=new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
               {path:'user',component:User},
               {path:'right',component:Right},
               {path:'role',component:Role},
               {path:'product',component:Product}
              ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path=="/login"){
    next();
  }else{
    const token=localStorage.getItem('token');
    if(token){
      next();
    }else{
      next('/login');
    }
  }
})
export default router