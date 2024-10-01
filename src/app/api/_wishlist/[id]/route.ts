// import { NextRequest, NextResponse } from "next/server";
// import { options } from "../../auth/[...nextauth]/options";
// import { getServerSession } from "next-auth";
// import { baseUrl, generateId, getDetailWishlist } from "@/utils";

// //Route API GET detail wishlist ada di utils

// //Nge save kerjaan berdasarkan Job Id
// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(options);
//   // console.log("session: ", session);

//   const applyJobUrl = baseUrl + "/wishlist-job";

//   if (session?.user?.role !== "candidate") {
//     return NextResponse.json(
//       {
//         error: "Unauthorized",
//       },
//       { status: 401 }
//     );
//   }

//   const newData: WishlistJob = {
//     id: generateId(),
//     jobId: params.id,
//     candidateId: session.user.id,
//     createdAt: new Date().toISOString(),
//   };

//   try {
//     const res = await fetch(applyJobUrl, {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newData),
//     });

//     if (!res.ok) {
//       return NextResponse.json(
//         {
//           error: "Failed",
//           message: "Something went wrong",
//         },
//         { status: res.status || 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Job added to Wishlist",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// }

// //Ini ID si wishlist nya
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(options);

//   // console.log(session);
//   // console.log(params.id);

//   let wishlistUrl = baseUrl + `/wishlist-job`;

//   if (session?.user?.role !== "candidate") {
//     return NextResponse.json(
//       {
//         error: "Unauthorized",
//       },
//       { status: 401 }
//     );
//   }

//   const detailWishlistRes: WishlistJob = await getDetailWishlist(params.id);

//   // console.log("detail: ", detailWishlistRes);

//   wishlistUrl += `/${detailWishlistRes.id}`;

//   // console.log(wishlistUrl);

//   const res = await fetch(wishlistUrl, {
//     method: "delete",
//   });

//   if (!res.ok) {
//     return NextResponse.json(
//       {
//         error: "Failed",
//         message: "Something went wrong",
//       },
//       { status: res.status || 500 }
//     );
//   }

//   return NextResponse.json(
//     {
//       message: "Wishlist Successfully Deleted",
//     },
//     { status: 200 }
//   );
// }
