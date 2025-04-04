import { API_URL, APPLICATION_IDENTIFIER } from "@/environment";
import { Api } from "@affinity/common/api";
import { buildAffinityBackendClient } from "@affinity/api/http";
import { getStoredPromoCode } from "./promoCode";

export const client = new Api({
  baseURL: (API_URL as string).endsWith("/")
    ? `${API_URL}api`
    : `${API_URL}/api`,
  headers: {
    "X-Application-Identifier": APPLICATION_IDENTIFIER,
    Accept: "application/json",
  },
});

client.api.interceptors.request.use((config) => {
  // If we have a promo code saved, pass it along with _all_ requests to the Affinity backend
  // It helps with analytics between customers.
  const accessCode = getStoredPromoCode();

  if (accessCode?.id) {
    config.headers.set("X-Promo-Code-Identifier", accessCode.id);
  }

  return config;
});

export const fetchClient = buildAffinityBackendClient(
  API_URL,
  APPLICATION_IDENTIFIER,
);
