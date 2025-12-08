import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import { Pool } from "pg";

export const authServer = betterAuth({
  database: new Pool({
    connectionString: process.env.MUMBLE_DATABASE_URL,
  }),
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: "zitadel",
          clientId: process.env.ZITADEL_CLIENT_ID ?? "",
          clientSecret: "", // PKCE without client secret
          discoveryUrl:
            "https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration",
          scopes: [
            "openid",
            "profile",
            "email",
            `urn:zitadel:iam:org:project:id:${process.env.ZITADEL_PROJECT_ID}:aud`,
          ],
          pkce: true,
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET ?? "this-is-very-secret",
});

export const getAuthUser = cache(async () => {
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
