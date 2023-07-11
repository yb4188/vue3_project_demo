import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "goods",
        name: "goods",
        meta: {
          show: true,
          title: "商品列表",
        },
        component: () => import("../views/GoodsView.vue"),
      },
      {
        path: "users",
        name: "users",
        meta: {
          show: true,
          title: "用户列表",
        },
        component: () => import("../views/UsersView.vue"),
      },
      {
        path: "roles",
        name: "roles",
        meta: {
          show: true,
          title: "角色列表",
        },
        component: () => import("../views/RolesView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
