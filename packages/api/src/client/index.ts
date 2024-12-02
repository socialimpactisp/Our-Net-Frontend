// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = (...args: any[]) => any;
export type Middleware<
  UpstreamClient extends Client,
  DownstreamClient extends Client,
> = (client: UpstreamClient) => DownstreamClient;

export function buildClient<C extends Client>(client: C) {
  return {
    with<DownstreamClient extends Client>(
      middleware: Middleware<C, DownstreamClient>
    ) {
      return buildClient(middleware(client));
    },
    getClient() {
      return client;
    },
  };
}
