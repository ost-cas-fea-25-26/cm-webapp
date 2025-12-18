import { ApiClient } from "../client";
import { ApiResponse } from "../client.types";
import { PagedPosts, Post, PostQueryParams } from "./post.types";

export class PostApi {
  private apiClient: ApiClient;

  constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public async get(params: PostQueryParams): Promise<ApiResponse<PagedPosts>> {
    const response = await this.apiClient.client.GET("/posts", {
      headers: await this.apiClient.getAuthHeaders(),
      params: {
        query: { limit: params.limit, olderThan: params.olderThan },
      },
    });
    return this.apiClient.handleResponse(response);
  }

  public async getById(id: string): Promise<ApiResponse<Post>> {
    const response = await this.apiClient.client.GET("/posts/{id}", {
      headers: await this.apiClient.getAuthHeaders(),
      params: {
        path: { id },
      },
    });
    return this.apiClient.handleResponse(response);
  }

  public async create(
    text: string,
    file?: File | null
  ): Promise<ApiResponse<Post>> {
    const form = new FormData();
    form.append("text", text);
    form.append("media", file ?? "");
    const response = await this.apiClient.client.POST("/posts", {
      headers: await this.apiClient.getAuthHeaders(),
      body: form as any,
    });
    return this.apiClient.handleResponse(response);
  }

  public async like(id: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.PUT("/posts/{id}/likes", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id } },
    });
    return this.apiClient.handleResponse(response);
  }

  public async unlike(id: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.DELETE("/posts/{id}/likes", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id } },
    });
    return this.apiClient.handleResponse(response);
  }
}
