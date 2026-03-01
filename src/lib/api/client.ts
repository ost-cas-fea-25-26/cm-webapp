import createClient, { Client, FetchResponse } from "openapi-fetch";
import { AuthServer } from "../auth/server";
import { ApiResponse } from "./client.types";
import { paths } from "./api";

export class ApiClient {
  public readonly client: Client<paths, `${string}/${string}`>;
  private readonly authServer = new AuthServer();

  constructor(baseUrl: string) {
    this.client = createClient<paths>({
      baseUrl,
    });
  }

  public getAuthHeaders = async (): Promise<{
    Authorization: string;
  }> => {
    const token = await this.authServer.getAccessToken();
    return token
      ? { Authorization: `Bearer ${token?.accessToken}` }
      : ({} as any);
  };

  public handleResponse<
    T extends Record<string | number, any>,
    Options,
    Media extends `${string}/${string}`,
    TReturn,
  >(fetchResponse: FetchResponse<T, Options, Media>): ApiResponse<TReturn> {
    if (!fetchResponse.response.ok) {
      const error =
        fetchResponse.error ??
        `HTTP Response Status: ${fetchResponse.response.status}`;
      console.error(error);
      return {
        hasError: true,
        error:
          fetchResponse.error ??
          `HTTP Response Status: ${fetchResponse.response.status}`,
      };
    }

    return { hasError: false, data: fetchResponse.data as TReturn };
  }
}
