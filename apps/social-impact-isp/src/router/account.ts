/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RouteRecordRaw } from "vue-router";

const Account = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/Index.vue");
const AccountHome = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/Home.vue");
const AccountProfile = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/Profile.vue");
const AccountBilling = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/Billing.vue");
const AccountUsage = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/Usage.vue");
const AccountUsageSummary = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/UsageSummary.vue");
const AccountServiceUsage = () =>
  import(/* webpackChunkName: "account" */ "@/views/account/ServiceUsage.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/account/:nickname",
    component: Account,
    children: [
      {
        path: "",
        component: AccountHome,
        meta: {
          title: "My Account | Social Impact ISP",
        },
      },
      {
        path: "profile",
        component: AccountProfile,
        meta: {
          title: "Profile | Social Impact ISP",
        },
      },
      {
        path: "billing",
        component: AccountBilling,
        meta: {
          title: "Billing | Social Impact ISP",
        },
      },
      {
        path: "usage",
        component: AccountUsage,
        meta: {
          title: "Usage | Social Impact ISP",
        },
        children: [
          {
            path: "summary",
            component: AccountUsageSummary,
            meta: {
              title: "Service Usage | Social Impact ISP",
            },
          },
          {
            path: "service/:serviceId",
            component: AccountServiceUsage,
            meta: {
              title: "Service Usage | Social Impact ISP",
            },
          },
        ],
      },
    ],
  },
];

const accountRoutes = routes;

export default accountRoutes;
