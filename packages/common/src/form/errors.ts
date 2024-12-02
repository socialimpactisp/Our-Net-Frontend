import { AxiosError } from "axios";
import { reactive } from "vue";

interface ErrorsBag {
  [name: string]: string[];
}

export class Errors {
  private errors: ErrorsBag;
  private statusCode: string;
  private message: string;

  public constructor() {
    this.errors = reactive({});
    this.message = "";
    this.statusCode = "";
  }

  public add(field: string | number, error: unknown): void {
    const e = Array.isArray(error) ? error : [error];
    if (this.errors[field]) {
      this.errors[field].unshift(...e);
      return;
    }
    this.errors[field] = e;
  }

  public has(field: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.errors, field);
  }

  public get<T = unknown>(field: string, alias: string): T | undefined {
    if (this.errors[field]) {
      let error = this.errors[field][0];
      if (alias) {
        error = error.replace(field, alias);
      }
      return error as unknown as T;
    }
    return undefined;
  }

  public record(error: unknown): void {
    const data = error as AxiosError;

    if (data.response) {
      if (data.response.data.message) this.message = data.response.data.message;
      if (data.response.data.errors) this.errors = data.response.data.errors;
    } else {
      this.message = data.toString();
    }
  }

  public clear(field?: string): void {
    if (field) {
      delete this.errors[field];
      return;
    }

    this.errors = {};
    this.message = "";
  }
}
