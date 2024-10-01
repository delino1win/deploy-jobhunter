
import NextAuth from "next-auth/next";
import { options } from "./options"

const handler = NextAuth(options);

// handler as PUT, handler as DELETE
export {handler as GET, handler as POST};
