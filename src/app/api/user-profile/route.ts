

//Get all user

import { baseUrl } from "@/utils"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/options";

//Ini khusus buat nampilin informasi user tanpa sensitif data
export async function GET (request: NextRequest) {
  const {href} = request.nextUrl

  const session = await getServerSession(options)

  // console.log("session: " , session);

  if(!session?.user) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }
  
  let query = ""

  //Ini harus dari sisi client
  // let startPage = 0
  // let endPage = 9
  // let offset = 10

  if(href.includes("?")) {
    query = href.split('?').pop() || ""
  }

  let getUserUrl = baseUrl + `/user`

  if(query) {
    getUserUrl += `?${query}`
  }

  // getUserUrl += `${query ? '&' : '?'}_start=${startPage}&_end=${endPage}`

  // console.log(getUserUrl);

  const res = await fetch(getUserUrl)
  
  const data: User[] = await res.json()

  if(!res.ok || data.length < 1) {
    return NextResponse.json({
      message: "No Data"
    }, {status: res.status || 500 });
  }

  const result = data.map(user => ({
    name: user.name,
    email: user.email,
    id: user.id,
    detailId: user.detailId
  }));

  return NextResponse.json(result)  
}