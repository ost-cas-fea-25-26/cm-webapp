import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

const getAuthClient = () =>
  createAuthClient({
    baseURL: window.location.origin,
    plugins: [genericOAuthClient()],
  });

export const signinZitadel = async () => {
  const { signIn } = getAuthClient();
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
