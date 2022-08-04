import { createRouter, createWebHistory } from "vue-router";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import RTL from "../views/Rtl.vue";
import Notifications from "../views/Notifications.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import store from "../store/index";

const routes = [

  /* {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  }, */
  
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
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
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
