import { DefaultUser, DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            role: string,
            detailId: string, //
            imageUrl?: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        imageUrl: string,
        detailId: string, //
        name: string,
        role: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        imageUrl?: string,
        detailId:string, //
        name: string,
        role: string
    }
}