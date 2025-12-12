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
}
