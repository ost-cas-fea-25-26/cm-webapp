import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [genericOAuthClient()],
});

export const { signIn, signOut, useSession } = authClient;

export const signinZitadel = async () => {
  try {
    await signIn.oauth2({
      providerId: "zitadel",
      callbackURL: "/",
    });
  } catch (error) {
    console.error("Zitadel sign-in error:", error);
    throw error;
  }
};
