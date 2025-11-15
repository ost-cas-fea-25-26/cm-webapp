import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
    : "http://localhost:3000",
  plugins: [genericOAuthClient()],
});

console.warn(process.env.VERCEL_URL);
console.warn(process.env.VERCEL_BRANCH_URL);
console.warn(process.env.NEXT_PUBLIC_VERCEL_URL);
console.warn(process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL);
console.warn(process.env.NEXT_PUBLIC_MUMBLE_DATABASE_URL);

export const { signIn, signOut, useSession } = authClient;

export const signinZitadel = async () => {
  await signIn.oauth2({
    providerId: "zitadel",
    callbackURL: "/",
  });
};
