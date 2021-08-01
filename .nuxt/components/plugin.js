import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Aside: () => import('../..\\components\\aside.vue' /* webpackChunkName: "components/aside" */).then(c => wrapFunctional(c.default || c)),
  AsideSmallScreen: () => import('../..\\components\\asideSmallScreen.vue' /* webpackChunkName: "components/aside-small-screen" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  ParentAside: () => import('../..\\components\\parentAside.vue' /* webpackChunkName: "components/parent-aside" */).then(c => wrapFunctional(c.default || c)),
  ParentSmallSide: () => import('../..\\components\\parentSmallSide.vue' /* webpackChunkName: "components/parent-small-side" */).then(c => wrapFunctional(c.default || c)),
  Question: () => import('../..\\components\\question.vue' /* webpackChunkName: "components/question" */).then(c => wrapFunctional(c.default || c)),
  SecondParentAside: () => import('../..\\components\\secondParentAside.vue' /* webpackChunkName: "components/second-parent-aside" */).then(c => wrapFunctional(c.default || c)),
  SecondSmallParentAside: () => import('../..\\components\\secondSmallParentAside.vue' /* webpackChunkName: "components/second-small-parent-aside" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
