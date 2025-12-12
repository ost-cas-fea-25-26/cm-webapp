import { ApiClient } from "../client";
import { ApiResponse } from "../client.types";
import { User } from "./user.types";

export class UserApi {
  private collectionResource: "/users" = "/users";
  private entityResource: "/users/{id}" = "/users/{id}";
  private apiClient: ApiClient;

  constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public async getById(id: string): Promise<ApiResponse<User>> {
    const response = await this.apiClient.client.GET(this.entityResource, {
      params: { path: { id } },
    });
    return this.apiClient.handleResponse(response);
  }
}
