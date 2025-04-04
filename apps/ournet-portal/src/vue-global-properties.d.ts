import { Api } from "@affinity/common/api";
import { Auth0, Whitelabel } from "@affinity/common";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: Api;
    $auth: Auth0;
    $whitelabel: Whitelabel;
  }
}

export {};
