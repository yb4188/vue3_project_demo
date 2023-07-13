import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
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
    component: HomeView,
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
      {
        path: "auth",
        name: "auth",
        meta: {
          show: false,
          title: "权限列表",
        },
        component: () => import("../views/AuthView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   if (!token && to.path !== "/login") {
//     router.push("/login");
//   }else{
//     next()
//   }
// });

export default router;
