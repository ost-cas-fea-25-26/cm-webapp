import { createAuthClient, SuccessContext } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

const getAuthClient = () =>
  createAuthClient({
    baseURL: window.location.origin,
    plugins: [genericOAuthClient()],
  });

export const login = async () => {
  const { signIn } = getAuthClient();
  try {
    await signIn.oauth2({
      providerId: "zitadel",
      callbackURL: "/",
    });
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async (
  onSuccess?: (context: SuccessContext<any>) => Promise<void>
) => {
  const { signOut } = getAuthClient();
  try {
    await signOut({});
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
