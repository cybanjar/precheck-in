import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/precheckinform",
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
    component: () =>
      import(/* webpackChunkName: "GuestList" */ "../views/GuestList"),
  },
  {
    path: "/mobilecheckin",
    name: "MobileCheckin",
    component: () =>
      import(/* webpackChunkName: "MobileCheckin" */ "../views/mobileCheckin"),
  },
  {
    path: "/success",
    name: "Success",
    component: () =>
      import(/* webpackChunkName: "Success" */ "../views/Success"),
  },
  {
    path: "/list",
    name: "List",
    component: () => import(/* webpackChunkName: "List" */ "../views/List"),
  },
  {
    path: "/step",
    name: "Step",
    component: () => import(/* webpackChunkName: "Step" */ "../views/Step"),
  },
  {
    path: "/successcheckin",
    name: "SuccessCheckIn",
    component: () =>
      import(
        /* webpackChunkName: "SuccessCheckin" */ "../views/SuccessCheckin"
      ),
  },
  {
    path: "/listcheckin",
    name: "ListCheckIn",
    component: () =>
      import(/* webpackChunkName: "ListCheckin" */ "../views/ListCheckin"),
  },
  {
    path: "/precheckin",
    name: "Done",
    component: () => import(/* webpackChunkName: "Done" */ "../views/Done"),
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "../views/404"),
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import(/* webpackChunkName: "Setup" */ "../views/SetUp"),
  },
  {
    path: "/setup2",
    name: "Setup2",
    component: () => import(/* webpackChunkName: "Setup2" */ "../views/SetUp2"),
  },
  {
    path: "/successdeposit",
    name: "Successdeposit",
    component: () =>
      import(
        /* webpackChunkName: "SuccessDeposit" */ "../views/SuccessDeposit"
      ),
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
