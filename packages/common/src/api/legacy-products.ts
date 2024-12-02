// @deprecated Use products.ts instead
export type LegacyPlan = {
  productName: string;
  productClass: "ufb" | "fwa" | "adsl" | "vdsl" | "mobile";
  productImage: string;
  stripeCode: string;
  price: number;
  speeds: {
    down: number;
    up: number;
  };
  speedEquivocation: string;
  dataAllowance: number;
};
