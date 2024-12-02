import { buildClient } from "../client";
import {
  header,
  hostname,
  pathPrefix,
  successfulResponse,
} from "../client/middleware";
import { APPLICATION_IDENTIFIER } from "./headers";

export function buildAffinityBackendClient(
  apiHostname: string,
  applicationIdentifier: string
) {
  const url = new URL(apiHostname);

  return buildClient(fetch)
    .with(successfulResponse())
    .with(hostname(url.hostname))
    .with(pathPrefix("/api"))
    .with(header(APPLICATION_IDENTIFIER, applicationIdentifier))
    .with(header("Accept", "application/json"))
    .getClient();
}
