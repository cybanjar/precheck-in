import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
    path: "/ota",
    name: "OTA",
    component: () => import("../views/OTA"),
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
    path: "/done",
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
    path: "/nicepay",
    name: "nicepay",
    component: () => import("../views/nicepay"),
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("../views/SetUp"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
