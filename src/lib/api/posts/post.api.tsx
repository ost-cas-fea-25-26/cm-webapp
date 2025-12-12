import { ApiClient } from "../client";
import { ApiResponse } from "../client.types";
import { PagedPosts, Post } from "./post.types";

export class PostApi {
  private resource: "/posts" = "/posts";
  private apiClient: ApiClient;

  constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public async get(): Promise<ApiResponse<PagedPosts>> {
    const response = await this.apiClient.client.GET(this.resource, {});
    return this.apiClient.handleResponse(response);
  }

  public async create(text: string, file?: File): Promise<ApiResponse<Post>> {
    const form = new FormData();
    form.append("text", text);
    form.append("media", file ?? "");
    const response = await this.apiClient.client.POST("/posts", {
      headers: await this.apiClient.getAuthHeaders(),
      body: form as any,
    });
    return this.apiClient.handleResponse(response);
  }
}
