import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import { Pool } from "pg";

const PROVIDER_ID = "zitadel";

export const authServer = betterAuth({
  database: new Pool({
    connectionString: process.env.MUMBLE_DATABASE_URL,
  }),
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: PROVIDER_ID,
          clientId: process.env.ZITADEL_CLIENT_ID ?? "",
          clientSecret: "", // PKCE without client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            `urn:zitadel:iam:org:project:id:${process.env.ZITADEL_PROJECT_ID}:aud`,
            "urn:zitadel:iam:org:project:id:348701753820117818:aud"
          ],
          pkce: true,
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET ?? "this-is-very-secret",
});

const getAuthUser = cache(async () => {
  return (
    await authServer.api.getSession({
      headers: await headers(),
    })
  )?.user;
});

export const isAuthenticated = cache(async () => {
  const user = await getAuthUser();
  return !!user;
});

export const getAccessToken = async () => {
  return await authServer.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: PROVIDER_ID,
    },
  });
};
