import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/page=:currentPage",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create" */ "../views/Create.vue"),
  },
  {
    path: "/cat/:id",
    name: "Cat",
    component: () => import(/* webpackChunkName: "Сat" */ "../views/Cat.vue")
  },
  {
    path: "/cat/:id/edit",
    name: "Update",
    component: () => import(/* webpackChunkName: "Update" */ "../views/Update.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
