import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "../api";
import { Errors } from "./errors";

type RequestType = "post" | "put" | "patch" | "delete";

interface FormOptions {
  preserveDataOnSuccess: boolean;
}

const defaultOptions: FormOptions = {
  preserveDataOnSuccess: false,
};

export class Form {
  private api: Api;

  private options: FormOptions;

  pending: boolean;

  errors: Errors;

  originalData: string;

  [x: string]: unknown;

  constructor(
    data: Record<string, unknown> = {},
    options?: FormOptions,
    apiConfig?: AxiosRequestConfig
  ) {
    this.api = new Api(apiConfig);
    this.options = Object.assign({}, defaultOptions, options);
    this.pending = false;
    this.errors = new Errors();
    this.originalData = "";

    this._setAttributes(data);
  }

  private _setAttributes(data: Record<string, unknown>): void {
    this.originalData = JSON.stringify(data);

    for (const field in data) {
      this[field] = data[field];
    }
  }

  public data(): Record<string, unknown> {
    const original = JSON.parse(this.originalData);
    const data: Record<string, unknown> = {};

    for (const property in original) {
      data[property] = this[property];
    }

    return data;
  }

  public reset(): void {
    const original = JSON.parse(this.originalData);

    this.errors.clear();

    for (const field in original) {
      this[field] = original[field];
    }
  }

  public post<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    return this.submit<T, R>({ requestType: "post", url, config });
  }

  public put<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    return this.submit<T, R>({ requestType: "put", url, config });
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    return this.submit<T, R>({ requestType: "patch", url, config });
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R | undefined> {
    return this.submit<T, R>({ requestType: "delete", url, config });
  }

  public async submit<T, R = AxiosResponse<T>>({
    requestType,
    url,
    config,
  }: {
    requestType: RequestType;
    url: string;
    config?: AxiosRequestConfig;
  }): Promise<R | undefined> {
    if (this.pending) return;
    this.setLoading(true);
    this.errors.clear();

    try {
      let response: R;
      if (requestType === "delete") {
        response = await this.api[requestType]<T, R>(url, config);
      } else {
        response = await this.api[requestType]<T, unknown, R>(
          url,
          this.data(),
          config
        );
      }
      this.onSuccess<T, R>(response);

      return Promise.resolve(response);
    } catch (error) {
      this.onFail(error);

      return Promise.reject(error);
    }
  }

  private onSuccess<T, R = AxiosResponse<T>>(response: R): void {
    const { data } = response as unknown as AxiosResponse;
    this.pending = false;

    if (data) {
      const originalData = JSON.parse(this.originalData);
      const attrs: Record<string, unknown> = {};

      Object.keys(originalData).forEach((key) => {
        attrs[key] = data[key];
      });

      this._setAttributes(attrs);

      return;
    }

    if (this.options.preserveDataOnSuccess) {
      this.originalData = JSON.stringify(this.data());
    } else {
      this.reset();
      return;
    }
  }

  private onFail(error: unknown): void {
    this.pending = false;
    this.errors.record(error);
  }

  public setLoading(loading = false): void {
    this.pending = loading;
  }

  public loading(): boolean {
    return this.pending;
  }

  public isDirty(): boolean {
    const data = JSON.stringify(this.data());
    return data !== this.originalData;
  }

  public isClean(): boolean {
    return !this.isDirty();
  }
}
