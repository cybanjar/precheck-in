const routes = [
  // {
  //   path: "/",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [{ path: "", component: () => import("pages/Index.vue") }]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  },
  {
    path: "/test",
    component: () => import("pages/Test.vue")
  },
  {
    path: "/ota",
    component: () => import("pages/Ota.vue")
  },
  {
    path: "/",
    component: () => import("pages/About.vue")
  },
  {
    path: "/success",
    component: () => import("pages/Success.vue")
  }
];

export default routes;
