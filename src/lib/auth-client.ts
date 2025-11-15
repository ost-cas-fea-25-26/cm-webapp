import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.VERCEL_URL ?? "http://localhost:3000",
  plugins: [genericOAuthClient()],
});

export const { signIn, signOut, useSession } = authClient;

export const signinZitadel = async () => {
  await signIn.oauth2({
    providerId: "zitadel",
    callbackURL: "/",
  });
};
