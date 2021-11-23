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
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'Sign-in',
        component: () => import('../views/Account.vue')
      },
      {
        path: 'sign-up',
        name: 'Sign-up',
        component: () => import('../views/Account.vue'),
        props: { isSignIn: false }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('app/setNavTitle', { title: to.name })
  next()
})

router.afterEach((to, from) => {
  const { isSideNavOpen } = store.state.app

  if (isSideNavOpen) {
    store.commit('app/closeSideNav')
  }
})

export default router
