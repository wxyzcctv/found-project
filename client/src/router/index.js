import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import NotFound from "../views/404.vue"
import Home from "../views/Home.vue"
import inforShow from "../views/inforShow.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: '/home', name: 'home', component: Home },
      { path: '/inforshow', name: 'inforshow', component: inforShow },
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('userToken') ? true : false;
  // 如果跳转到登录和注册页面时不进行token的判断，跳转到其他界面时就判断token是否存在，此处主要校验的是用户是否登录了。
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
