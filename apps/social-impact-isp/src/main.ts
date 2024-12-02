import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as Sentry from "@sentry/vue";
import { ApiPlugin } from "@affinity/api/vue";
import "./styles/app.css"; // Import CSS for application.
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, MODE, PUBLIC_DSN } from "./environment";
import { Auth0 } from "@affinity/common/auth";
import { client, fetchClient } from "./lib/api";

const rootElement: HTMLElement = document.getElementById("app") as HTMLElement;

const app = createApp(App);

if (MODE === "production") {
  Sentry.init({
    app,
    dsn: PUBLIC_DSN,
    tracingOptions: {
      trackComponents: true,
    },
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 1.0,
  });
}

app.config.globalProperties.$auth = new Auth0({
  domain: AUTH0_DOMAIN || "",
  clientId: AUTH0_CLIENT_ID || "",
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

app.config.globalProperties.$api = client;

app.config.globalProperties.$whitelabel = {
  company: "Social Impact ISP",
};

app.use(router);
app.use(ApiPlugin, {
  client: fetchClient,
});

// Mount Vue application
app.mount(rootElement);
