import { LegacyPlan } from "@affinity/common/api";

export const plans: LegacyPlan[] = [
  {
    productName: "Plan One",
    productImage: "https://placehold.co/200x400.png",
    price: 100,
    productClass: "ufb",
    speedEquivocation: "",
    speeds: {
      down: 1,
      up: 1,
    },
    stripeCode: "",
  },
  {
    productName: "Plan Two",
    productImage: "https://placehold.co/200x400.png",
    price: 200,
    productClass: "adsl",
    speedEquivocation: "",
    speeds: {
      down: 2,
      up: 2,
    },
    stripeCode: "",
  },
];
