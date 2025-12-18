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
    try {
      // Try to get the OAuth access token
      const tokenResult = await this.authServer.getAccessToken();
      const headers = { Authorization: "" };

      if (tokenResult?.accessToken) {
        headers.Authorization = `Bearer ${tokenResult.accessToken}`;
      } else {
        // Fallback: use the user's identifier if access token is not available
        const user = await this.authServer.getAuthUser();
        if (user?.identifier) {
          headers.Authorization = `Bearer ${user.identifier}`;
        }
      }

      return headers;
    } catch (error) {
      console.error("Failed to get auth headers:", error);
      // Last resort fallback: try to use user identifier
      try {
        const user = await this.authServer.getAuthUser();
        if (user?.identifier) {
          return { Authorization: `Bearer ${user.identifier}` };
        }
      } catch (e) {
        console.error("Failed to get user:", e);
      }
      return { Authorization: "" };
    }
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
