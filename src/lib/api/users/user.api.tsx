import { updateTag } from "next/cache";
import { ApiClient } from "../client";
import { ApiResponse } from "../client.types";
import { PagedUsers, User, UserSchema, PagedUsersSchema } from "./user.types";

export class UserApi {
  private apiClient: ApiClient;

  constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public async getById(id: string): Promise<ApiResponse<User>> {
    const response = await this.apiClient.client.GET("/users/{id}", {
      params: { path: { id } },
      next: { tags: [`user:${id}`], revalidate: 300 },
    });
    return this.apiClient.handleResponse(response, { schema: UserSchema });
  }

  public async updateAvatar(
    userId: string,
    file: File
  ): Promise<ApiResponse<string>> {
    const form = new FormData();
    form.append("media", file);

    // API response with just a string not json, thats why apiclient could not be used.
    const res = await fetch(`${process.env.MUMBLE_API_URL}/users/avatar`, {
      method: "PUT",
      body: form,
      headers: await this.apiClient.getAuthHeaders(),
    });
    updateTag(`user:${userId}`);

    const url = await res.text();
    return { hasError: false, data: url } as ApiResponse<string>;
  }

  public async deleteAvatar(userId: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.DELETE("/users/avatar", {
      headers: await this.apiClient.getAuthHeaders(),
    });
    updateTag(`user:${userId}`);
    return this.apiClient.handleResponse(response);
  }

  public async getFollowers(id: string): Promise<ApiResponse<PagedUsers>> {
    const response = await this.apiClient.client.GET("/users/{id}/followers", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id } },
    });
    return this.apiClient.handleResponse(response, {
      schema: PagedUsersSchema,
    });
  }

  public async followUser(id: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.PUT("/users/{id}/followers", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id } },
    });
    return this.apiClient.handleResponse(response);
  }

  public async unfollowUser(id: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.DELETE(
      "/users/{id}/followers",
      {
        headers: await this.apiClient.getAuthHeaders(),
        params: { path: { id } },
      }
    );
    return this.apiClient.handleResponse(response);
  }

  public async updateUser(
    userId: string,
    data: {
      username?: string | null;
      firstname?: string | null;
      lastname?: string | null;
    }
  ): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.PATCH("/users", {
      headers: await this.apiClient.getAuthHeaders(),
      body: data,
    });
    updateTag(`user:${userId}`);
    return this.apiClient.handleResponse(response);
  }
}
