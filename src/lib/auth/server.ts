import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { headers } from "next/headers";
import { AuthUser } from "./auth.types";
import { cache } from "react";
import { getBaseUrl } from "../utils/link";
import { Pool } from "pg";

const PROVIDER_ID = "zitadel";

const clientId = process.env.ZITADEL_CLIENT_ID;
if (!clientId) {
  throw new Error("ZITADEL_CLIENT_ID is not set");
}

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.MUMBLE_DATABASE_URL,
  }),
  user: {
    additionalFields: {
      identifier: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false,
      },
    },
  },
  baseURL: getBaseUrl(),
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: PROVIDER_ID,
          clientId: clientId!,
          clientSecret: "", // PKCE without client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            "urn:zitadel:iam:org:project:id:348701753820117818:aud",
          ],
          pkce: true,
          mapProfileToUser: (profile) => {
            return {
              identifier: profile.sub,
              email: profile.email,
            };
          },
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET!,
});

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
