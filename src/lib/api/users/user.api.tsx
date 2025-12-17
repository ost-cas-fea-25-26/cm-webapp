import { ApiClient } from "../client";
import { ApiResponse } from "../client.types";
import { User } from "./user.types";

export class UserApi {
  private apiClient: ApiClient;

  constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public async getById(id: string): Promise<ApiResponse<User>> {
    const response = await this.apiClient.client.GET("/users/{id}", {
      params: { path: { id } },
    });
    return this.apiClient.handleResponse(response);
  }

  public async updateAvatar(file?: File | null): Promise<ApiResponse<string>> {
    const form = new FormData();
    form.append("media", file ?? "");

    // API response with just a string not json, thats why apiclient could not be used.
    const res = await fetch(`${process.env.MUMBLE_API_URL}/users/avatar`, {
      method: "PUT",
      body: form,
      headers: await this.apiClient.getAuthHeaders(),
    });

    const url = await res.text();
    return { hasError: false, data: url } as ApiResponse<string>;
  }
}
