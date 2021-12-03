import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/queue'
  },
  {
    path: '/queue',
    name: 'Queue Management',
    component: () => import('../views/QueueManagement.vue')
  },
  {
    path: '/sites',
    name: 'Sites Management',
    component: () => import('../views/SitesManagement.vue')
  },
  {
    path: '/sign-in',
    name: 'Sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/walk-in',
    name: 'Walk-in',
    component: () => import('../views/WalkInReportForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('app/setNavTitle', { title: to.name })
  if (to.path === '/sign-in' && store.state.app.isAuth) next('/queue')
  else next()
})

router.afterEach((to, from) => {
  const { isSideNavOpen } = store.state.app

  if (isSideNavOpen) {
    store.commit('app/closeSideNav')
  }
})

export default router
