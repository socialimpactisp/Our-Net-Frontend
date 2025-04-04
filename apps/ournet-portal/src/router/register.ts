/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RouteRecordRaw } from "vue-router";

const Register = () =>
  import(/* webpackChunkName: "register" */ "@/views/auth/signup/Index.vue");
const RegisterStep1 = () =>
  import(/* webpackChunkName: "register" */ "@/views/auth/signup/Step1.vue");
const RegisterStep2 = () =>
  import(/* webpackChunkName: "register" */ "@/views/auth/signup/Step2.vue");
const RegisterSuccess = () =>
  import(/* webpackChunkName: "register" */ "@/views/auth/signup/Success.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Join Now | Our Net",
    },
  },
  {
    path: "/register/1",
    name: "step1",
    component: RegisterStep1,
    meta: {
      title: "Join Now | Our Net",
    },
  },
  {
    path: "/register/2",
    name: "step2",
    component: RegisterStep2,
    meta: {
      title: "Join Now | Our Net",
    },
  },
  {
    path: "/success",
    name: "success",
    component: RegisterSuccess,
    meta: {
      title: "Thank You | Our Net",
    },
  },
];

const registerRoutes = routes;

export default registerRoutes;
