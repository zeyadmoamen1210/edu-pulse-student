import { wrapFunctional } from './utils'

export { default as Aside } from '../..\\components\\aside.vue'
export { default as AsideSmallScreen } from '../..\\components\\asideSmallScreen.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as ParentAside } from '../..\\components\\parentAside.vue'
export { default as ParentSmallSide } from '../..\\components\\parentSmallSide.vue'
export { default as Question } from '../..\\components\\question.vue'
export { default as SecondParentAside } from '../..\\components\\secondParentAside.vue'
export { default as SecondSmallParentAside } from '../..\\components\\secondSmallParentAside.vue'

export const LazyAside = import('../..\\components\\aside.vue' /* webpackChunkName: "components/aside" */).then(c => wrapFunctional(c.default || c))
export const LazyAsideSmallScreen = import('../..\\components\\asideSmallScreen.vue' /* webpackChunkName: "components/aside-small-screen" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyParentAside = import('../..\\components\\parentAside.vue' /* webpackChunkName: "components/parent-aside" */).then(c => wrapFunctional(c.default || c))
export const LazyParentSmallSide = import('../..\\components\\parentSmallSide.vue' /* webpackChunkName: "components/parent-small-side" */).then(c => wrapFunctional(c.default || c))
export const LazyQuestion = import('../..\\components\\question.vue' /* webpackChunkName: "components/question" */).then(c => wrapFunctional(c.default || c))
export const LazySecondParentAside = import('../..\\components\\secondParentAside.vue' /* webpackChunkName: "components/second-parent-aside" */).then(c => wrapFunctional(c.default || c))
export const LazySecondSmallParentAside = import('../..\\components\\secondSmallParentAside.vue' /* webpackChunkName: "components/second-small-parent-aside" */).then(c => wrapFunctional(c.default || c))
