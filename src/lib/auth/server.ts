import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { customSession, genericOAuth } from "better-auth/plugins";
import { headers } from "next/headers";
import { Pool } from "pg";

const PROVIDER_ID = "zitadel";

export class AuthServer {
  public readonly server = betterAuth({
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
    baseURL: process.env.BASE_URL,
    plugins: [
      nextCookies(),
      genericOAuth({
        config: [
          {
            providerId: PROVIDER_ID,
            clientId: process.env.ZITADEL_CLIENT_ID!,
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

  public getAuthUser = async () => {
    return (
      await this.server.api.getSession({
        headers: await headers(),
      })
    )?.user;
  };

  public isAuthenticated = async () => {
    const user = await this.getAuthUser();
    return !!user;
  };

  public getAccessToken = async () => {
    return await this.server.api.getAccessToken({
      headers: await headers(),
      body: {
        providerId: PROVIDER_ID,
      },
    });
  };
}
