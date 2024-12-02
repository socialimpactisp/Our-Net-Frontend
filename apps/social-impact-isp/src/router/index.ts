import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import accountRoutes from "./account";
import registerRoutes from "./register";

const Home = () =>
  import(/* webpackChunkName: "home" */ "@/views/home/Index.vue");
const FAQ = () => import(/* webpackChunkName: "home" */ "@/views/FAQ.vue");
const PrivacyPolicy = () =>
  import(/* webpackChunkName: "company" */ "@/views/PrivacyPolicy.vue");
const TermsAndConditions = () =>
  import(/* webpackChunkName: "company" */ "@/views/TermsAndConditions.vue");
const Login = () =>
  import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue");
const NotFound = () =>
  import(/* webpackChunkName: "not-found" */ "@/views/NotFound.vue");
const CustomerCare = () =>
  import(/* webpackChunkName: "not-found" */ "@/views/CustomerCare.vue");
const CustomerComplaints = () =>
  import(/* webpackChunkName: "not-found" */ "@/views/CustomerComplaints.vue");
const OfferSummary = () =>
  import(/* webpackChunkName: "not-found" */ "@/views/OfferSummary.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Unlimited Internet  | Social Impact ISP",
      description: "",
    },
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
    meta: {
      title: "Got questions? | Social Impact ISP",
      description:
        "Find the answer to your questions on our FAQ page or get in touch with our team.",
    },
  },
  {
    path: "/privacy",
    name: "privacy",
    component: PrivacyPolicy,
    meta: {
      title: "Privacy Policy | Social Impact ISP",
      description:
        "Learn more about our Privacy policy and how we treat and use your information.",
    },
  },
  {
    path: "/terms",
    name: "terms",
    component: TermsAndConditions,
    meta: {
      title: "Terms & Conditions | Social Impact ISP",
      description: "Learn more about our Terms and Conditions.",
    },
  },
  {
    path: "/customer-care",
    name: "customercare",
    component: CustomerCare,
    meta: {
      title: "Customer Care Policy | Social Impact ISP",
      description:
        "This Customer Care Policy outlines our commitment to delivering the highest standards of service, support, and care to our valued customers.",
    },
  },
  {
    path: "/customer-complaints",
    name: "customercomplaints",
    component: CustomerComplaints,
    meta: {
      title: "Customer Complaints Policy | Social Impact ISP",
      description: "Social Impact ISP's Commitment to our customers",
    },
  },
  {
    path: "/offer-summary",
    name: "offersummary",
    component: OfferSummary,
    meta: {
      title: "Offer Summary | Social Impact ISP",
      description:
        "Find out everything you need to know about every one of our plans.",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login | Social Impact ISP",
    },
  },
  ...registerRoutes,
  ...accountRoutes,
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: {
      title: "Page Not Found | Social Impact ISP",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 135,
        behavior: "smooth",
      };
    }

    return {
      left: 0,
      top: 0,
    };
  },
});

router.beforeEach((to, _from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const nearestWithDescription = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.description);

  const metaDescription = document.querySelector('meta[name="description"]');

  // Title
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    document.title = "Social Impact ISP";
  }

  if (metaDescription) {
    if (nearestWithDescription) {
      metaDescription.setAttribute(
        "content",
        nearestWithDescription.meta.description,
      );
    } else {
      metaDescription.setAttribute("content", "");
    }
  }

  next();
});

export default router;
