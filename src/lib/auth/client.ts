"use client";

import { createAuthClient, SuccessContext } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

const PROVIDER_ID = "zitadel";

export class AuthClient {
  private readonly authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
    plugins: [genericOAuthClient()],
  });

  public login = async () => {
    try {
      await this.authClient.signIn.oauth2({
        providerId: PROVIDER_ID,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  public logout = async (
    onSuccess?: (context: SuccessContext<any>) => Promise<void>
  ) => {
    try {
      await this.authClient.signOut({
        fetchOptions: {
          onSuccess: async () => {
            // Redirect to login page after successful logout
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
}
