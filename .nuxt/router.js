import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _42c116f4 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _45f62ff0 = () => interopDefault(import('..\\pages\\Material\\index.vue' /* webpackChunkName: "pages/Material/index" */))
const _71e98abc = () => interopDefault(import('..\\pages\\parentProfile.vue' /* webpackChunkName: "pages/parentProfile" */))
const _a07d7cf4 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _ec4a9ef0 = () => interopDefault(import('..\\pages\\subjects\\index.vue' /* webpackChunkName: "pages/subjects/index" */))
const _353cfc17 = () => interopDefault(import('..\\pages\\Tasks\\index.vue' /* webpackChunkName: "pages/Tasks/index" */))
const _e85371c8 = () => interopDefault(import('..\\pages\\Auth\\changePass.vue' /* webpackChunkName: "pages/Auth/changePass" */))
const _417bd168 = () => interopDefault(import('..\\pages\\Auth\\code.vue' /* webpackChunkName: "pages/Auth/code" */))
const _5091dfee = () => interopDefault(import('..\\pages\\Auth\\sendEmail.vue' /* webpackChunkName: "pages/Auth/sendEmail" */))
const _3e02740e = () => interopDefault(import('..\\pages\\Parent\\student.vue' /* webpackChunkName: "pages/Parent/student" */))
const _58bff440 = () => interopDefault(import('..\\pages\\Material\\content\\course\\_id.vue' /* webpackChunkName: "pages/Material/content/course/_id" */))
const _174ac869 = () => interopDefault(import('..\\pages\\Material\\content\\unitExam\\_unit\\_id.vue' /* webpackChunkName: "pages/Material/content/unitExam/_unit/_id" */))
const _e675751e = () => interopDefault(import('..\\pages\\Parent\\Subjects\\lessons\\_user\\_section\\_id.vue' /* webpackChunkName: "pages/Parent/Subjects/lessons/_user/_section/_id" */))
const _59fccc1b = () => interopDefault(import('..\\pages\\Material\\content\\_id.vue' /* webpackChunkName: "pages/Material/content/_id" */))
const _0e0008d4 = () => interopDefault(import('..\\pages\\Parent\\Result\\_id\\_section.vue' /* webpackChunkName: "pages/Parent/Result/_id/_section" */))
const _77d9e3ec = () => interopDefault(import('..\\pages\\Parent\\Subjects\\_id\\_section.vue' /* webpackChunkName: "pages/Parent/Subjects/_id/_section" */))
const _43552a4f = () => interopDefault(import('..\\pages\\Parent\\tasks\\_id\\_section.vue' /* webpackChunkName: "pages/Parent/tasks/_id/_section" */))
const _5d1e5b18 = () => interopDefault(import('..\\pages\\exam\\_id.vue' /* webpackChunkName: "pages/exam/_id" */))
const _2195e6c3 = () => interopDefault(import('..\\pages\\lesson\\_id\\index.vue' /* webpackChunkName: "pages/lesson/_id/index" */))
const _67829cdc = () => interopDefault(import('..\\pages\\subjects\\_id\\index.vue' /* webpackChunkName: "pages/subjects/_id/index" */))
const _14f7d16f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _42c116f4,
    name: "login"
  }, {
    path: "/Material",
    component: _45f62ff0,
    name: "Material"
  }, {
    path: "/parentProfile",
    component: _71e98abc,
    name: "parentProfile"
  }, {
    path: "/profile",
    component: _a07d7cf4,
    name: "profile"
  }, {
    path: "/subjects",
    component: _ec4a9ef0,
    name: "subjects"
  }, {
    path: "/Tasks",
    component: _353cfc17,
    name: "Tasks"
  }, {
    path: "/Auth/changePass",
    component: _e85371c8,
    name: "Auth-changePass"
  }, {
    path: "/Auth/code",
    component: _417bd168,
    name: "Auth-code"
  }, {
    path: "/Auth/sendEmail",
    component: _5091dfee,
    name: "Auth-sendEmail"
  }, {
    path: "/Parent/student",
    component: _3e02740e,
    name: "Parent-student"
  }, {
    path: "/Material/content/course/:id?",
    component: _58bff440,
    name: "Material-content-course-id"
  }, {
    path: "/Material/content/unitExam/:unit?/:id?",
    component: _174ac869,
    name: "Material-content-unitExam-unit-id"
  }, {
    path: "/Parent/Subjects/lessons/:user?/:section?/:id?",
    component: _e675751e,
    name: "Parent-Subjects-lessons-user-section-id"
  }, {
    path: "/Material/content/:id?",
    component: _59fccc1b,
    name: "Material-content-id"
  }, {
    path: "/Parent/Result/:id?/:section?",
    component: _0e0008d4,
    name: "Parent-Result-id-section"
  }, {
    path: "/Parent/Subjects/:id?/:section?",
    component: _77d9e3ec,
    name: "Parent-Subjects-id-section"
  }, {
    path: "/Parent/tasks/:id?/:section?",
    component: _43552a4f,
    name: "Parent-tasks-id-section"
  }, {
    path: "/exam/:id?",
    component: _5d1e5b18,
    name: "exam-id"
  }, {
    path: "/lesson/:id",
    component: _2195e6c3,
    name: "lesson-id"
  }, {
    path: "/subjects/:id",
    component: _67829cdc,
    name: "subjects-id"
  }, {
    path: "/",
    component: _14f7d16f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
