import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

// this version of authClient runs only in the browser / client
export const authClient = createAuthClient({
  baseURL: window.location.origin,
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
