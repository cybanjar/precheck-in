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
    name: "404",
    component: () => import("pages/Error404.vue")
  },
  {
    path: "/test",
    component: () => import("pages/Test.vue")
  },
  {
    path: "/mobilecheckin",
    name: "OTA",
    component: () => import("pages/Ota.vue")
  },
  {
    path: "/precheckin",
    name: "Home",
    component: () => import("pages/About.vue")
  },
  {
    path: "/list",
    name: "List",
    component: () => import("pages/List.vue")
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("pages/Success.vue")
  }
];

export default routes;
