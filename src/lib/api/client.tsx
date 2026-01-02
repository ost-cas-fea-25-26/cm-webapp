import createClient, { Client, FetchResponse } from "openapi-fetch";
import { z } from "zod";
import { AuthServer } from "../auth/server";
import { ApiResponse, ValidationConfig } from "./client.types";
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
  >(
    fetchResponse: FetchResponse<T, Options, Media>,
    validationConfig?: ValidationConfig<TReturn>
  ): ApiResponse<TReturn> {
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

    // If a Zod schema is provided, validate and parse the response
    if (validationConfig?.schema) {
      try {
        const validatedData = validationConfig.schema.parse(fetchResponse.data);
        return { hasError: false, data: validatedData };
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("API Response Validation Error:", error.issues);
          return {
            hasError: true,
            error: `Validation failed: ${error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")}`,
          };
        }
        console.error("Unexpected validation error:", error);
        return {
          hasError: true,
          error: "Unexpected validation error",
        };
      }
    }

    return { hasError: false, data: fetchResponse.data as TReturn };
  }
}
