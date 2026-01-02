import { updateTag } from "next/cache";
import { ApiClient } from "../client";
import { ApiResponse } from "../client.types";
import {
  PagedPosts,
  PagedReplies,
  Post,
  PostQueryParams,
  PostSchema,
  PagedPostsSchema,
  PagedRepliesSchema,
} from "./post.types";

export class PostApi {
  private apiClient: ApiClient;

  constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public async get(params: PostQueryParams): Promise<ApiResponse<PagedPosts>> {
    const response = await this.apiClient.client.GET("/posts", {
      headers: await this.apiClient.getAuthHeaders(),
      params: {
        query: { ...params },
      },
      next: { tags: ["posts"], revalidate: 60 },
    });
    return this.apiClient.handleResponse(response, {
      schema: PagedPostsSchema,
    });
  }

  public async getById(id: string): Promise<ApiResponse<Post>> {
    const response = await this.apiClient.client.GET("/posts/{id}", {
      headers: await this.apiClient.getAuthHeaders(),
      params: {
        path: { id },
      },
    });
    return this.apiClient.handleResponse(response, { schema: PostSchema });
  }

  public async getReplies(
    postId: string,
    params: { limit?: number; offset?: number } = {}
  ): Promise<ApiResponse<PagedReplies>> {
    const response = await this.apiClient.client.GET("/posts/{id}/replies", {
      headers: await this.apiClient.getAuthHeaders(),
      params: {
        path: { id: postId },
        query: { limit: params.limit, offset: params.offset },
      },
    });
    return this.apiClient.handleResponse(response, {
      schema: PagedRepliesSchema,
    });
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
    updateTag("posts");
    return this.apiClient.handleResponse(response, { schema: PostSchema });
  }

  public async createReply(
    postId: string,
    text: string,
    file?: File
  ): Promise<ApiResponse<Post>> {
    const form = new FormData();
    form.append("text", text);
    form.append("media", file ?? "");
    const response = await this.apiClient.client.POST("/posts/{id}/replies", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id: postId } },
      body: form as any,
    });
    updateTag("posts");
    return this.apiClient.handleResponse(response, { schema: PostSchema });
  }

  public async like(id: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.PUT("/posts/{id}/likes", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id } },
    });
    updateTag("posts");
    return this.apiClient.handleResponse(response);
  }

  public async unlike(id: string): Promise<ApiResponse<void>> {
    const response = await this.apiClient.client.DELETE("/posts/{id}/likes", {
      headers: await this.apiClient.getAuthHeaders(),
      params: { path: { id } },
    });
    updateTag("posts");
    return this.apiClient.handleResponse(response);
  }
}
