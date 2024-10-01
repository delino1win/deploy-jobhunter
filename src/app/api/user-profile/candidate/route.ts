import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { baseUrl, generateId } from "@/utils";

export async function POST (request: NextRequest) {

  const session = await getServerSession(options)
  
  const req: CandidateProfile = await request.json()
  
  const userProfileUrl = baseUrl + "/user-profile";

  if(!session?.user || session?.user?.role !== "candidate" ) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }

  const newData: CandidateProfile  = {
    ...req,
    id: generateId(),
    userId: session.user.id,
    updatedAt: new Date().toISOString()
  }

  try {

    const res = await fetch(userProfileUrl, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })

    if(!res.ok) {
      return NextResponse.json({
        error: "Failed",
        message: "Something went wrong", 
  
      }, {status: res.status || 500});
    }

    return NextResponse.json({
      message: "Resume successfully added"
    }, {status: 201})

  } catch (error) {
    console.error(error)
  } 
}