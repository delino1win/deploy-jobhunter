import { baseUrl, createDefaultProfile, generateId } from "@/utils";
import axios from "axios";
import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { NextResponse } from "next/server";
import Swal from "sweetalert2";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      async profile(profile: GoogleProfile) {
        const searchId = baseUrl + `/user/${profile.sub}`;

        const res = await fetch(searchId);

        // console.log("profile: ", profile);

        if (!res.ok) {
          // console.log("Masokkk");

          const postUser = baseUrl + "/user";

          const newData: User = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            imageUrl:
              "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=",
            detailId: generateId(),
            provider: "google",
            createdAt: new Date().toISOString(),
            isVerified: false,
            role: "candidate",
          };

          const newUser = await fetch(postUser, {
            method: "post",
            body: JSON.stringify(newData),
          });

          if (!newUser.ok) return;

          const resultProfile = await createDefaultProfile(
            newData.role,
            newData.detailId,
            newData.id
          );
        
          if (resultProfile?.error) {
            return NextResponse.json(
              {
                error: resultProfile.error,
                message: resultProfile.message,
              },
              { status: resultProfile.status }
            );
          }
          return newData;
        }

        const getUserData = await res.json();

        // console.log("json data: ", getUserData);

        return getUserData;
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "name@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials: ", credentials);

        //ini ntar bakal diubah ya gaes, ntar di register functionality kita ubah username nya unique
        //sementara masih manual utk user nya pake data[0]
        const urlEndpoint = baseUrl + `/user?email=${credentials?.email}`;

        // console.log("sesuatu");

        // const res = await fetch(urlEndpoint)
        const { data } = await axios({
          url: urlEndpoint,
        });

        // const credential = data.find()

        // console.log("res options: ", data.length);

        const userCredential = await data[0]

        if (!userCredential) {
          // console.log("true");
          return null;
        }

        if(userCredential.email !== credentials?.email || userCredential.password !== credentials?.password) {
          return null
        }

        //
        return {
          id: userCredential.id,
          email: userCredential.email,
          name: userCredential.name,
          imageUrl: userCredential.imageUrl,
          detailId: userCredential.detailId,
          role: userCredential.role,
          image:
            userCredential.imageUrl || userCredential.role === "candidate"
              ? "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o="
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("cbacks user: ", user);
      // console.log("cbacks token: ", token);

      if (user) {
        token.id = user.id;
        token.detailId = user.detailId;
        token.name = user.name;
        token.role = user.role;
      }

      // console.log("JWT Token: ",token);

      return token;
    },
    async session({ session, token }) {
      // console.log("session Token: ", token);

      if (session?.user) {
        session.user.id = token.id;
        session.user.detailId = token.detailId;
        session.user.role = token.role;
        session.user.name = token.name;
      }

      // console.log("Session: ",session);

      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  pages: {
    signIn: "/auth/signIn",
  },
  debug: true,
};
