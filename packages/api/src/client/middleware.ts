import { Middleware } from ".";

type Fetch = typeof fetch;
type FetchParameters = Parameters<Fetch>;
type FetchInput = FetchParameters[0];
type FetchInit = NonNullable<FetchParameters[1]>;
type FetchRequestBody = NonNullable<FetchInit["body"]>;
type FetchResponse = Awaited<ReturnType<Fetch>>;

type FetchClient<
  ResponseBody = FetchResponse,
  RequestBody = FetchRequestBody,
> = (
  input: FetchInput,
  init?:
    | ({ body?: RequestBody | null | undefined } & Omit<FetchInit, "body">)
    | undefined
) => Promise<ResponseBody>;

type FetchMiddleware<
  UpstreamClient extends FetchClient = FetchClient,
  DownstreamClient extends FetchClient = FetchClient,
> = Middleware<UpstreamClient, DownstreamClient>;

export function pathPrefix(prefix: string): FetchMiddleware {
  function addPrefix(input: FetchInput) {
    const apply = (value: string) =>
      `${prefix}${value}` as `${typeof prefix}${typeof value}`;

    if (input instanceof Request) {
      return new Request(apply(input.url), input);
    }

    if (input instanceof URL) {
      return new URL(apply(input.toString()));
    }

    if (typeof input === "string") {
      return apply(input);
    }

    throw new Error("Unable to add prefix");
  }

  return (client) => (input, init) => {
    return client(addPrefix(input), init);
  };
}

export function hostname(
  hostname: string,
  https: boolean = true
): FetchMiddleware {
  const protocol = https ? "https" : "http";
  const origin = `${protocol}://${hostname}`;

  function addHostname(input: FetchInput) {
    const getUrl = (url: string): URL => {
      const withOrigin = new URL(url, origin);
      withOrigin.hostname = hostname;
      withOrigin.protocol = protocol;
      return withOrigin;
    };

    if (input instanceof Request) {
      return new Request(getUrl(input.url), input);
    }

    if (input instanceof URL) {
      input.hostname = hostname;
      input.protocol = https ? "https" : "http";
      return input;
    }

    if (typeof input === "string") {
      return getUrl(input).toString();
    }

    throw new Error("Unable to add hostname to input");
  }

  return (client) => (input, init) => {
    return client(addHostname(input), init);
  };
}

export function header(
  headerName: string,
  headerValue: string
): FetchMiddleware {
  return (client) => (input, init) => {
    return client(input, {
      ...init,
      headers: { ...init?.headers, [headerName]: headerValue },
    });
  };
}

export function acceptsHeader(mimeType: string): FetchMiddleware {
  return header("Accepts", mimeType);
}

export function applicationIdentifierHeader(
  applicationIdentifier: string
): FetchMiddleware {
  return header("X-Application-Identifier", applicationIdentifier);
}

export function successfulResponse(): FetchMiddleware {
  return (client) => async (input, init) => {
    const response = await client(input, init);

    if (response.ok) {
      return response;
    }

    throw new (class extends Error {
      constructor(public readonly response: Response) {
        super(`HTTP Error ${response.status}: ${response.statusText}`);
      }
    })(response);
  };
}

export function jsonResponse<R extends FetchResponse>(): FetchMiddleware<
  FetchClient,
  FetchClient<R>
> {
  return (client) => async (input, init) =>
    client(input, init).then((response) => response.json());
}
