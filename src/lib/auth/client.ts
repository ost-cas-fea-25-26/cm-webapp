"use client";

import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const PROVIDER_ID = "zitadel";

export class AuthClient {
  constructor() {
    // Das erscheint in der Browser-Konsole (F12)
    console.log(
      "🔍 API URL im Client:",
      process.env.NEXT_PUBLIC_MUMBLE_API_URL
    );
  }

  private readonly authClient = createAuthClient({
    baseURL:
      process.env.NEXT_PUBLIC_MUMBLE_API_URL ||
      (typeof window !== "undefined" ? window.location.origin : ""),
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

  public logout = async () => {
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
