import { STRIPE_PRODUCTS } from "@/environment";
import { LegacyPlan, getProducts } from "@affinity/common/api";
import { client } from "./api";

type ProductClass = "ufb" | "fwa" | "adsl" | "vdsl";

type Modem = {
  productName: string;
  productClass: string;
  price: number;
};

type ApiProductMetadata = {
  average_download: string;
  average_upload: string;
  product_class: ProductClass;
  product_code: string;
};

type ApiProduct<M extends Record<string, string> = Record<string, string>> =
  Awaited<ReturnType<typeof getProducts<M>>>[number];

// Define a more specific interface for the Stripe product with recurring info
interface StripeProductWithRecurring {
  name: string;
  id: string;
  metadata: ApiProductMetadata;
  images: string[];
  default_price: {
    unit_amount: number;
    recurring?: {
      interval: string;
      interval_count: number;
    };
  };
}

function isValidProduct(
  product: ApiProduct,
): product is ApiProduct<ApiProductMetadata> {
  const keys = Object.keys(product.metadata);

  return (
    keys.includes("average_download") &&
    keys.includes("average_upload") &&
    keys.includes("product_class") &&
    keys.includes("product_code")
  );
}

function convertProductFromApiToPlan(
  product: ApiProduct<ApiProductMetadata>,
): LegacyPlan {
  // Get interval from recurring if it exists
  let interval = "month";

  // Cast to the more specific type that includes recurring information
  const stripeProduct = product as StripeProductWithRecurring;
  if (stripeProduct.default_price?.recurring?.interval) {
    interval = stripeProduct.default_price.recurring.interval;
  }

  return {
    productName: product.name,
    productClass: product.metadata.product_class,
    productImage: product.images[0],
    stripeCode: product.id,
    price: product.default_price.unit_amount,
    speeds: {
      down: Number(product.metadata.average_download),
      up: Number(product.metadata.average_upload),
    },
    speedEquivocation: "on average",
    interval: interval,
    dataAllowance: 0,
  };
}

export async function getProductListFromApi() {
  const plans = (await getProducts(client))
    .filter(isValidProduct)
    .map(convertProductFromApiToPlan);

  const modems: Modem[] = [
    {
      productName: "BYO Modem",
      productClass: "modem",
      price: 0,
    },
  ];

  return {
    plans,
    modems,
  };
}

const productList = (): { plans: LegacyPlan[]; modems: Modem[] } => {
  const inProduction = STRIPE_PRODUCTS === "live";

  if (inProduction) {
    return {
      plans: [
        {
          productName: "Fibre Lite",
          productClass: "ufb",
          productImage: "light-bulb",
          stripeCode: "prod_OHBjNKpE6c2SAC",
          price: 5300,
          speeds: {
            down: 50,
            up: 10,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre Standard",
          productClass: "ufb",
          productImage: "matches-box",
          stripeCode: "prod_LDNj5p7kovO6AA",
          price: 6700,
          speeds: {
            down: 300,
            up: 100,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre Pro",
          productClass: "ufb",
          productImage: "can-vintage",
          stripeCode: "prod_LDNmvJhJNbxCNM",
          price: 7700,
          speeds: {
            down: 900,
            up: 450,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre 2000",
          productClass: "ufb",
          productImage: "chocolate-bar-20",
          stripeCode: "prod_MyM3x308T8qxge",
          price: 10900,
          speeds: {
            down: 2000,
            up: 2000,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre 4000",
          productClass: "ufb",
          productImage: "chocolate-bar-40",
          stripeCode: "prod_MyM4djZFPdO9Al",
          price: 13900,
          speeds: {
            down: 4000,
            up: 4000,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fixed Wireless",
          productClass: "fwa",
          productImage: "wireless-radio",
          stripeCode: "prod_MyM8vM4OUKfJri",
          price: 6500,
          speeds: {
            down: 32,
            up: 18,
          },
          speedEquivocation: "on average",
        },
        {
          productName: "Copper ADSL",
          productClass: "adsl",
          productImage: "copper-packaging",
          stripeCode: "prod_LDNn5ggZL0E4ND",
          price: 6300,
          speeds: {
            down: 20,
            up: 2,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Copper VDSL",
          productClass: "vdsl",
          productImage: "bottle-copper",
          stripeCode: "prod_LDNnkkrDnbnqMZ",
          price: 6300,
          speeds: {
            down: 100,
            up: 30,
          },
          speedEquivocation: "up to",
        },
      ],
      modems: [
        {
          productName: "BYO Modem",
          productClass: "modem",
          price: 0,
        },
      ],
    };
  } else {
    return {
      plans: [
        {
          productName: "Fibre Lite",
          productClass: "ufb",
          productImage: "light-bulb",
          stripeCode: "prod_OHBqZ9HMkEEGQ0",
          price: 5300,
          speeds: {
            down: 50,
            up: 10,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre Standard",
          productClass: "ufb",
          productImage: "matches-box",
          stripeCode: "prod_LDlz5r4Cg51EQp",
          price: 6700,
          speeds: {
            down: 300,
            up: 100,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre Pro",
          productClass: "ufb",
          productImage: "can-vintage",
          stripeCode: "prod_LDlzKhQmkcAbMM",
          price: 7700,
          speeds: {
            down: 900,
            up: 450,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre 2000",
          productClass: "ufb",
          productImage: "chocolate-bar-20",
          stripeCode: "prod_MyMNkZjvu7bJ65",
          price: 10900,
          speeds: {
            down: 2000,
            up: 2000,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fibre 4000",
          productClass: "ufb",
          productImage: "chocolate-bar-40",
          stripeCode: "prod_MyMNJ2oebBEvG5",
          price: 13900,
          speeds: {
            down: 4000,
            up: 4000,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Fixed Wireless",
          productClass: "fwa",
          productImage: "wireless-radio",
          stripeCode: "prod_MyMOm49LYamzzD",
          price: 6500,
          speeds: {
            down: 32,
            up: 18,
          },
          speedEquivocation: "on average",
        },
        {
          productName: "Copper ADSL",
          productClass: "adsl",
          productImage: "copper-packaging",
          stripeCode: "prod_LDlzTKjY02BCpH",
          price: 6300,
          speeds: {
            down: 20,
            up: 2,
          },
          speedEquivocation: "up to",
        },
        {
          productName: "Copper VDSL",
          productClass: "vdsl",
          productImage: "bottle-copper",
          stripeCode: "prod_LDm0I4DT4UaAqB",
          price: 6300,
          speeds: {
            down: 100,
            up: 30,
          },
          speedEquivocation: "up to",
        },
      ],
      modems: [
        {
          productName: "BYO Modem",
          productClass: "modem",
          price: 0,
        },
      ],
    };
  }
};

export default productList;
