import { Api } from "./client";

type Metadata = Record<string, string>;

type Price = {
  unit_amount: 5300;
};

type Product<M extends Metadata> = {
  id: string;
  default_price: Price;
  images: Array<string>;
  metadata: M;
  name: string;
};

export async function getProducts<M extends Metadata>(
  client: Api,
  promoCode?: string
) {
  const config: Parameters<typeof client.get>[1] = {};

  if (typeof promoCode !== "undefined") {
    // Some customers have products filtered on the server based on their unlock code.
    config.headers = {
      "X-Promo-Code-Identifier": promoCode,
    };
  }

  const response = await client.get<Product<M>[]>("products", config);
  return response.data;
}
