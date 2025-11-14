import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);

// const { data, error } = await authClient.signIn.email({
//         /**
//          * The user email
//          */
//         email,
//         /**
//          * The user password
//          */
//         password,
//         /**
//          * A URL to redirect to after the user verifies their email (optional)
//          */
//         callbackURL: "/dashboard",
//         /**
//          * remember the user session after the browser is closed.
//          * @default true
//          */
//         rememberMe: false
// }, {
//     //callbacks
// })
