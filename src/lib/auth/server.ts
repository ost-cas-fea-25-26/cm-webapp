import { headers } from "next/headers";
import { AuthUser } from "./auth.types";
import { cache } from "react";
import { auth, PROVIDER_ID } from "./auth.config";

export class AuthServer {
  public readonly server = auth;

  public getAuthUser = cache(async (): Promise<AuthUser> => {
    const requestHeaders = await headers();
    const response = await this.server.api.getSession({
      headers: requestHeaders,
    });
    return response?.user as AuthUser;
  });

  public isAuthenticated = async () => {
    const user = await this.getAuthUser();
    return !!user;
  };

  public getAccessToken = cache(async () => {
    const reqHeaders = await headers();
    const session = await this.server.api.getSession({ headers: reqHeaders });

    if (!session?.user) {
      return null;
    }

    const token = await this.server.api.getAccessToken({
      headers: reqHeaders,
      body: {
        providerId: PROVIDER_ID,
      },
    });

    if (!token?.accessToken) {
      return null;
    }

    return token;
  });
}
