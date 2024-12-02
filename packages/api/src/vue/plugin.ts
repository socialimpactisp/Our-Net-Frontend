import { Plugin } from "vue";

export const API_INJECTION_KEY = Symbol("api");

type Options = {
  client: typeof fetch;
};

export const ApiPlugin: Plugin<Options> = {
  install(app, config) {
    app.provide(API_INJECTION_KEY, config.client);
  },
};
