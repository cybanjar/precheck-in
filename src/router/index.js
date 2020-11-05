import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/precheckin",
    name: "Home",
    component: Home,
  },
  // {
  //   path: '/about/:id',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: "/guest-list",
    name: "Guest List",
    component: () => import("../views/GuestList"),
  },
  {
    path: "/mobilecheckin",
    name: "MobileCheckin",
    component: () => import("../views/mobileCheckin"),
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("../views/Success"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import("../views/List"),
  },
  {
    path: "/step",
    name: "Step",
    component: () => import("../views/Step"),
  },
  {
    path: "/successcheckin",
    name: "SuccessCheckIn",
    component: () => import("../views/SuccessCheckin"),
  },
  {
    path: "/listcheckin",
    name: "ListCheckIn",
    component: () => import("../views/ListCheckin"),
  },
  {
    path: "/precheckinloading",
    name: "Done",
    component: () => import("../views/Done"),
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: () => import("../views/NotFound"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404"),
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("../views/SetUp"),
  },
  {
    path: "/setup2",
    name: "Setup2",
    component: () => import("../views/SetUp2"),
  },
  {
    path: "/successdeposit",
    name: "Successdeposit",
    component: () => import("../views/SuccessDeposit"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;
