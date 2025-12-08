import { authServer } from "@/lib/AuthServer";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(authServer);
