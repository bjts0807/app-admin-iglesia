import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [

  {
    path: "/",
    name: "/",
    redirect: "/signin",
    component: () => import("../views/SignIn")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/SignIn"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta : {requiresLogin: true},
  },
  {
    path: "/members",
    name: "members",
    component: () => import("../views/members/index.vue"),
    meta : {requiresLogin: true},
  },
  {
    path: "/tithes",
    name: "tithes",
    component: () => import("../views/tithes/index.vue"),
    meta : {requiresLogin: true},
  },
  {
    path: "/tithes/create",
    name: "tithes.create",
    component: () => import("../views/tithes/create.vue"),
    meta : {requiresLogin: true},
  },
  {
    path: "/offerings",
    name: "offerings",
    component: () => import("../views/offerings/index.vue"),
    meta : {requiresLogin: true},
  },
  {
    path: "/expenses",
    name: "expenses",
    component: () => import("../views/expenses/index.vue"),
    meta : {requiresLogin: true},
  },
  {
    path: "/cash",
    name: "cash",
    component: () => import("../views/cash/index.vue"),
    meta : {requiresLogin: true},
  },
  /* {
    path: '/members',
    redirect: '/members/index',
    component: () => import('@/views/members/index'),
    meta : {requiresLogin : true},
    children: [
        {
            name: 'census.dashboard',
            path: 'dashboard',
            component: () => import('@/views/census/Dashboard'),
        },
        {
            name: 'census.reports',
            path: 'reports',
            component: () => import('@/views/census/Reports'),
        },
        {
            name: 'users.index',
            path: 'users',
            component: () => import('@/views/users/index'),
        }
    ]
  }, */
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'history',
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.is_logged) {
      next("/signin")
  } else {
      next()
  }
})
export default router;
