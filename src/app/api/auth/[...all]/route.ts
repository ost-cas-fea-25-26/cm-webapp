import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";

betterAuth({
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: "zitadel",
          clientId: process.env.ZITADEL_CLIENT_ID + "@mumble",
          clientSecret: "",
          // PKCE without client secret
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
});
