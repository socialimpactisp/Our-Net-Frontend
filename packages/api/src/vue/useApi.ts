import { inject } from "vue";
import { API_INJECTION_KEY } from "./plugin";
import { buildClient } from "../client";
import { header } from "../client/middleware";
import { PROMO_CODE_IDENTIFIER } from "../http/headers";

export function useApi() {
  const client = inject<typeof fetch>(API_INJECTION_KEY);
  // TODO reactive property
  const promoCode = undefined;

  if (!client) {
    throw new Error("No API client has been provided.");
  }

  if (promoCode) {
    return buildClient(client)
      .with(header(PROMO_CODE_IDENTIFIER, promoCode))
      .getClient();
  }

  return client;
}
