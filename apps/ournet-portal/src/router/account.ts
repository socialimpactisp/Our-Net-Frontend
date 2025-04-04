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
          title: "My Account | Our Net",
        },
      },
      {
        path: "profile",
        component: AccountProfile,
        meta: {
          title: "Profile | Our Net",
        },
      },
      {
        path: "billing",
        component: AccountBilling,
        meta: {
          title: "Billing | Our Net",
        },
      },
      {
        path: "usage",
        component: AccountUsage,
        meta: {
          title: "Usage | Our Net",
        },
        children: [
          {
            path: "summary",
            component: AccountUsageSummary,
            meta: {
              title: "Service Usage | Our Net",
            },
          },
          {
            path: "service/:serviceId",
            component: AccountServiceUsage,
            meta: {
              title: "Service Usage | Our Net",
            },
          },
        ],
      },
    ],
  },
];

const accountRoutes = routes;

export default accountRoutes;
