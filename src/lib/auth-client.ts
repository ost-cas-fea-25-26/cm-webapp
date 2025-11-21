import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
        : process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : "http://localhost:3000",
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
