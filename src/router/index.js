import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/User.vue'
import Welcome from '../components/Welcome.vue'
import Rights from '../components/powers/Rights.vue'
import Role from '../components/powers/Role.vue'
import Category from '../components/goods/Category.vue'
import Params from '../components/goods/Params.vue'
import List from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Order from '../components/Order.vue'
import Report from '../components/Report.vue'
// 树形表格第三方插件
import ZkTable from 'vue-table-with-tree-grid'
// 第三方插件也就是组件，全局注册该组件
Vue.component('tree-table', ZkTable)
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    // 重定向到welcome组件的路由
    redirect: '/welcome',
    children: [
      { path: '/users', component: User },
      { path: '/welcome', component: Welcome },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Role },
      { path: '/categories', component: Category },
      { path: '/params', component: Params },
      { path: '/goods', component: List },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }]
  }

]

const router = new VueRouter({
  routes
})
// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from:从哪个路径过来
  // next是一个函数,代表放行; next():放行   next('/login'):强制跳转到login路由
  // 当访问登陆页面,则放行
  if (to.path === '/login') return next()
  // 判断是否登陆,即查看sessionStorage中是否存储有token
  var token = sessionStorage.getItem('token')
  // 未登录,没有token,强制跳转到登陆路由的页面
  if (!token) return next('/login')
  // 登陆了,放行
  next()
})
export default router
